import { NextResponse } from 'next/server';
import { z } from 'zod';
import { appendJsonRecord } from '@/lib/json-store';
import { getProductById } from '@/lib/products';
import { getStripeClient } from '@/lib/stripe';

const createCheckoutSchema = z.object({
  productId: z.string().min(1),
  email: z.string().email().optional(),
  utm: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_term: z.string().optional(),
      utm_content: z.string().optional(),
    })
    .optional(),
});

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = createCheckoutSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request body' }, { status: 400 });
    }

    const { productId, email, utm } = parsed.data;
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      success_url: `${siteBaseUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteBaseUrl()}/store?canceled=1`,
      metadata: {
        productId: product.id,
        utm_source: utm?.utm_source ?? '',
        utm_medium: utm?.utm_medium ?? '',
        utm_campaign: utm?.utm_campaign ?? '',
        utm_term: utm?.utm_term ?? '',
        utm_content: utm?.utm_content ?? '',
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
              metadata: {
                productId: product.id,
              },
            },
          },
        },
      ],
    });

    await appendJsonRecord('checkouts.json', {
      id: crypto.randomUUID(),
      event: 'checkout_started',
      session_id: session.id,
      productId: product.id,
      email: email ?? null,
      utm_source: utm?.utm_source,
      utm_medium: utm?.utm_medium,
      utm_campaign: utm?.utm_campaign,
      utm_term: utm?.utm_term,
      utm_content: utm?.utm_content,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Unable to create checkout session', error);
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 });
  }
}
