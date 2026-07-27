import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

const title = 'Scaling Fintech Infrastructure: Deterministic Logic in High-Frequency Trading';
const description = 'A technical breakdown of event-sourced architecture and deterministic execution in trading systems.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
  },
};

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-05-13',
    author: {
      '@type': 'Person',
      name: 'Kencalvin Mwenda',
    },
  };

  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <Navbar />
      <article className="max-w-4xl mx-auto py-24 prose-invert">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        {children}
      </article>
    </main>
  );
}
