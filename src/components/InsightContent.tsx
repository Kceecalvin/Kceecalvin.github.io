'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Tag } from 'lucide-react';

interface ArticleData {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  heroImage: string;
  sections: {
    heading: string;
    body: string;
    highlight?: string;
  }[];
  stats: { label: string; value: string }[];
}

const articles: Record<string, ArticleData> = {
  'scaling-fintech-infrastructure': {
    title: 'Scaling Fintech Infrastructure',
    subtitle: 'Deterministic Logic in High-Frequency Trading',
    date: 'May 13, 2026',
    category: 'Architecture',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Latency Reduction', value: '94%' },
      { label: 'Throughput', value: '12k/s' },
      { label: 'Uptime SLA', value: '99.97%' },
    ],
    sections: [
      {
        heading: 'The Problem: Non-Deterministic Execution Paths',
        body: 'Legacy financial platforms rely on monolithic architectures where a single database bottleneck can cascade into catastrophic execution delays. In high-frequency trading, a 50ms delay is not an inconvenience — it is a direct financial loss. The core challenge was re-engineering a Kenyan fintech platform processing XAUUSD and BTCUSD pairs to achieve sub-millisecond deterministic execution.',
      },
      {
        heading: 'Architecture: Event-Sourced Microservices',
        body: 'I designed a fully event-sourced microservice architecture using Kafka as the central nervous system. Each trading signal passes through three deterministic validation gates before execution: schema validation (Zod), risk-limit enforcement (custom engine), and order-book depth analysis. The system guarantees that identical inputs always produce identical outputs — zero ambiguity in production.',
        highlight: 'Every state mutation is an immutable event. Replay any moment in trading history with mathematical certainty.',
      },
      {
        heading: 'The Data Layer: Write-Ahead Logging + CQRS',
        body: 'Read and write paths were completely separated using CQRS (Command Query Responsibility Segregation). Write operations flow through a PostgreSQL WAL (Write-Ahead Log) pipeline, ensuring crash recovery without data loss. Read operations hit a Redis-backed projection layer optimized for sub-millisecond queries. This separation reduced p99 latency from 340ms to 18ms.',
      },
      {
        heading: 'Results: Production Under Load',
        body: 'After deployment, the platform sustained 12,000 order executions per second during peak volatility with zero dropped transactions. The deterministic validation pipeline caught and rejected 847 malformed signals in the first week alone — signals that would have previously slipped through the legacy system unchecked.',
      },
    ],
  },

  'iot-hardware-abstraction': {
    title: 'The Future of IoT',
    subtitle: 'Hardware Abstraction Layers for Industrial Automation',
    date: 'April 28, 2026',
    category: 'Embedded Systems',
    readTime: '12 min read',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Sensor Nodes', value: '240+' },
      { label: 'Packet Loss', value: '<0.01%' },
      { label: 'Edge Latency', value: '8ms' },
    ],
    sections: [
      {
        heading: 'The Challenge: Vendor Lock-In at Scale',
        body: 'Industrial IoT deployments across East Africa face a fundamental problem: every sensor manufacturer ships proprietary protocols and SDKs. When a facility runs 240+ nodes across 4 different vendors (temperature, pressure, flow, vibration), integrating them into a unified telemetry pipeline becomes an engineering nightmare. Firmware updates for one vendor can brick compatibility with another.',
      },
      {
        heading: 'Solution: The Hardware Abstraction Layer (HAL)',
        body: 'I designed a custom Hardware Abstraction Layer that sits between raw sensor firmware and the application logic. Each sensor type registers through a standardized driver interface — regardless of vendor. The HAL normalizes all data into a unified schema (timestamp, node_id, measurement_type, value, unit, confidence_score) before it hits the edge gateway. Adding a new vendor means writing one driver, not re-architecting the pipeline.',
        highlight: 'One driver per vendor. One schema for everything. Zero downtime when hardware changes.',
      },
      {
        heading: 'Edge Computing: Local Intelligence',
        body: 'Rather than shipping every raw reading to the cloud, I deployed edge compute nodes (ESP32-S3 clusters) that perform local aggregation, anomaly detection, and threshold alerting. Only actionable events and compressed summaries are transmitted upstream via MQTT over TLS. This reduced bandwidth consumption by 87% and eliminated cloud dependency for critical safety alerts.',
      },
      {
        heading: 'The Mesh Network: Self-Healing Connectivity',
        body: 'The deployment uses a custom mesh topology where each sensor node maintains awareness of its 3 nearest neighbors. If a node goes offline, traffic automatically re-routes through the mesh. During a 6-month pilot, the network sustained a 99.99% packet delivery rate across a 12-hectare industrial compound — including through concrete walls and metal infrastructure.',
      },
    ],
  },
};

export default function InsightContent({ slug }: { slug: string }) {
  const article = articles[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-black pt-32 px-6">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 text-center">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Article Not Found</h1>
          <Link href="/insights" className="text-primary-orange font-bold uppercase tracking-widest text-sm">
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <Navbar />
      <article className="max-w-4xl mx-auto py-24">

        {/* Back Link */}
        <Link
          href="/insights"
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        {/* Hero Header */}
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary-orange font-black text-[10px] uppercase tracking-[0.4em]">
              Case Study // {article.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
            {article.title}
          </h1>
          <p className="text-2xl sm:text-3xl font-black text-white/15 uppercase tracking-tighter leading-tight mb-8 italic">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-8 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Tag className="w-3 h-3 text-primary-orange" />{article.category}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-orange" />
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" />{article.readTime}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span>{article.date}</span>
          </div>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-white/5"
        >
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover grayscale brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-24 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          {article.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl sm:text-5xl font-black text-primary-orange block mb-2 tracking-tighter">{stat.value}</span>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Article Body */}
        <div className="space-y-16">
          {article.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                {section.heading}
              </h2>
              <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-6">
                {section.body}
              </p>
              {section.highlight && (
                <div className="p-8 rounded-2xl bg-primary-orange/5 border-l-4 border-primary-orange">
                  <p className="text-white/70 text-base sm:text-lg font-medium italic leading-relaxed">
                    {section.highlight}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center text-center">
          <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-10">
            Build similar <br />
            <span className="text-primary-orange italic">architecture?</span>
          </h3>
          <Link
            href="/#contact"
            className="group flex items-center gap-4 bg-primary-orange text-black font-black uppercase tracking-[0.2em] px-12 py-6 rounded-full hover:bg-white transition-all text-sm"
          >
            Start Strategy Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>
        </footer>
      </article>
    </main>
  );
}
