import { getProductById } from '@/lib/products';
import { getStripeClient } from '@/lib/stripe';

type SuccessPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-black text-white p-24">
        <h1 className="text-4xl font-black uppercase mb-4">Payment status unavailable</h1>
        <p>Missing checkout session id.</p>
      </main>
    );
  }

  let productIds: string[] = [];
  let hasCheckoutData = false;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
    const metadata = session.metadata ?? {};

    productIds = lineItems.data
      .map((lineItem) => lineItem.price?.metadata?.productId || metadata.productId)
      .filter((value): value is string => Boolean(value));
    hasCheckoutData = true;

    await fetch(`${siteBaseUrl()}/api/track-conversion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        amount: session.amount_total ?? 0,
        productIds,
        utm_source: metadata.utm_source,
        utm_medium: metadata.utm_medium,
        utm_campaign: metadata.utm_campaign,
        utm_term: metadata.utm_term,
        utm_content: metadata.utm_content,
      }),
      cache: 'no-store',
    }).catch(() => undefined);

  } catch {
    hasCheckoutData = false;
  }

  if (!hasCheckoutData) {
    return (
      <main className="min-h-screen bg-black text-white p-24">
        <h1 className="text-4xl font-black uppercase mb-4">Payment confirmation pending</h1>
        <p>We were unable to fetch checkout details right now. Please contact support if needed.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase mb-4">Payment successful</h1>
        <p className="text-white/70 mb-8">A confirmation email with your delivery links has been sent.</p>
        <ul className="space-y-4">
          {productIds.map((productId) => {
            const product = getProductById(productId);
            if (!product) return null;
            return (
              <li key={productId} className="border border-white/10 rounded-xl p-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                {product.downloadPath ? (
                  <a className="text-primary-orange underline" href={product.downloadPath}>
                    Download now
                  </a>
                ) : (
                  <p>{product.instructions || 'Check your email for fulfillment details.'}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
