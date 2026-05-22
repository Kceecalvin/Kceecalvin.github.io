import Navbar from '@/components/Navbar';

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <Navbar />
      <article className="max-w-4xl mx-auto py-24 prose-invert">
        {children}
      </article>
    </main>
  );
}
