'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

const insights = [
  {
    slug: 'scaling-fintech-infrastructure',
    title: 'Scaling Fintech Infrastructure: Deterministic Logic in High-Frequency Trading',
    excerpt: 'A comprehensive research brief on latency optimization and ledger stewardship in high-frequency trading networks.',
    date: 'May 13, 2026',
    category: 'Architecture',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'iot-hardware-abstraction',
    title: 'The Future of IoT: Hardware Abstraction Layers for Industrial Automation',
    excerpt: 'A systems study on decoupling physical sensors from legacy logic modules using secure virtual abstractions.',
    date: 'April 28, 2026',
    category: 'Embedded',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <Navbar />
      <div className="max-w-7xl mx-auto py-24">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-[1px] h-4 bg-primary-orange rotate-12" />
            <span className="text-white/70 font-black text-[10px] uppercase tracking-[0.4em]">INSIGHTS — THE PRACTICE</span>
          </motion.div>
          
          <h1 className="text-7xl sm:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]">
            Technical <br />
            <span className="text-primary-orange italic">Authority.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
          {insights.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/insights/${article.slug}`}>
                <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                   <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-16 h-16 rounded-full bg-primary-orange flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,95,31,0.4)]">
                        <ArrowUpRight className="w-8 h-8" strokeWidth={3} />
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-6 mb-4 text-[10px] font-black uppercase tracking-widest text-white/55">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3 text-primary-orange" />
                    {article.category}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-primary-orange transition-colors">
                  {article.title}
                </h2>
                <p className="text-white/70 leading-relaxed font-medium mb-8 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="w-full h-[1px] bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
