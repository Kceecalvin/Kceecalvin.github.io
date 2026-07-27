import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Resend } from 'resend';
import Stripe from 'stripe';
import { appendJsonRecord } from '@/lib/json-store';
import { getProductById, Product } from '@/lib/products';

type FulfillmentLineItem = Stripe.LineItem;

type FulfillmentOrder = {
  id: string;
  created_at: string;
  email: string;
  products: Array<{ id: string; price: number }>;
  amount: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  stripe_session_id: string;
};

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

async function generateDownloadUrl(product: Product) {
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (
    bucket &&
    region &&
    accessKeyId &&
    secretAccessKey &&
    product.downloadS3Key
  ) {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: product.downloadS3Key,
    });

    return getSignedUrl(client, command, { expiresIn: 60 * 30 });
  }

  if (product.downloadPath) {
    return `${siteBaseUrl()}${product.downloadPath}`;
  }

  return null;
}

export async function fulfillOrder(
  session: Stripe.Checkout.Session,
  lineItems: FulfillmentLineItem[],
) {
  const metadata = session.metadata ?? {};
  const email = session.customer_details?.email ?? session.customer_email ?? '';
  const fallbackProduct = metadata.productId ? getProductById(metadata.productId) : undefined;

  const mappedProducts = lineItems
    .map((lineItem) => {
      const metadataProductId = lineItem.price?.metadata?.productId;
      const product = metadataProductId
        ? getProductById(metadataProductId)
        : fallbackProduct;

      return {
        product,
        price: lineItem.amount_total ?? lineItem.amount_subtotal ?? 0,
      };
    })
    .filter((entry): entry is { product: Product; price: number } => Boolean(entry.product));

  const products = mappedProducts.map(({ product, price }) => ({
    id: product.id,
    price,
  }));

  const order: FulfillmentOrder = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    email,
    products,
    amount: session.amount_total ?? 0,
    utm_source: metadata.utm_source,
    utm_medium: metadata.utm_medium,
    utm_campaign: metadata.utm_campaign,
    utm_term: metadata.utm_term,
    utm_content: metadata.utm_content,
    stripe_session_id: session.id,
  };

  await appendJsonRecord('orders.json', order);

  const emailProducts = await Promise.all(
    mappedProducts.map(async ({ product }) => ({
      product,
      downloadUrl: product.isDigital ? await generateDownloadUrl(product) : null,
    })),
  );

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey || !email) {
    console.log('Fulfillment notification skipped (missing RESEND_API_KEY or customer email).', {
      orderId: order.id,
      email,
      products,
    });
    return order;
  }

  const resend = new Resend(resendApiKey);
  const from = process.env.RESEND_FROM_EMAIL || 'noreply@caldev.io';

  const itemsHtml = emailProducts
    .map(({ product, downloadUrl }) => {
      const linkSection = downloadUrl
        ? `<p><a href="${downloadUrl}">Download ${product.name}</a></p>`
        : `<p>${product.instructions ?? 'Your order will be delivered shortly.'}</p>`;

      return `<li><strong>${product.name}</strong>${linkSection}</li>`;
    })
    .join('');

  await resend.emails.send({
    from,
    to: email,
    subject: 'Your CALDEV order is ready',
    html: `
      <h1>Thank you for your purchase</h1>
      <p>Order ID: ${order.id}</p>
      <ul>${itemsHtml}</ul>
      <p>If you have any issues, reply to this email and we will help immediately.</p>
    `,
  });

  return order;
}
