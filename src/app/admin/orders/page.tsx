import { readJsonArray } from '@/lib/json-store';
import { notFound } from 'next/navigation';

type OrderRecord = {
  id: string;
  created_at: string;
  email: string;
  products: Array<{ id: string; price: number }>;
  amount: number;
  utm_source?: string;
};

export default async function AdminOrdersPage() {
  if (process.env.ADMIN_ENABLED !== '1') {
    notFound();
  }

  const orders = await readJsonArray<OrderRecord>('orders.json');

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-8">Order Review</h1>
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Product</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">UTM Source</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-white/10">
                  <td className="p-3">{order.email || '—'}</td>
                  <td className="p-3">{order.products.map((product) => product.id).join(', ') || '—'}</td>
                  <td className="p-3">${(order.amount / 100).toFixed(2)}</td>
                  <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="p-3">{order.utm_source || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
