'use client';

import { useState } from 'react';
import { products } from '@/lib/products';

type CheckoutState = {
  loading: boolean;
  error: string | null;
};

export default function StorePage() {
  const [state, setState] = useState<CheckoutState>({ loading: false, error: null });
  const [email, setEmail] = useState('');

  async function startCheckout(productId: string) {
    setState({ loading: true, error: null });

    try {
      const utmRaw = window.localStorage.getItem('utm_params');
      const utm = utmRaw ? JSON.parse(utmRaw) : undefined;

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          email: email || undefined,
          utm,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.url) {
        throw new Error(payload.error || 'Checkout failed');
      }

      window.location.assign(payload.url);
    } catch (error) {
      setState({ loading: false, error: error instanceof Error ? error.message : 'Checkout failed' });
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8 uppercase">Store</h1>
        <label className="block text-sm uppercase tracking-wider mb-8">
          Email (optional)
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded border border-white/20 bg-black px-4 py-3"
            placeholder="you@example.com"
          />
        </label>
        <div className="space-y-8">
          {products.map((product) => (
            <section key={product.id} className="border border-white/10 rounded-xl p-6">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-white/70 mb-4">{product.description}</p>
              <p className="mb-6">${(product.price / 100).toFixed(2)}</p>
              <button
                type="button"
                disabled={state.loading}
                onClick={() => startCheckout(product.id)}
                className="rounded bg-primary-orange text-black px-6 py-3 font-bold disabled:opacity-50"
              >
                {state.loading ? 'Redirecting...' : 'Buy now'}
              </button>
            </section>
          ))}
        </div>

        {state.error && <p className="mt-6 text-red-400">{state.error}</p>}
      </div>
    </main>
  );
}
