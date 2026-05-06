'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const works = [
  {
    title: 'Algorithmic Financial Engine',
    category: 'Fintech Strategy',
    image: 'https://images.unsplash.com/photo-1640341719942-0570b5b71948?q=80&w=2832&auto=format&fit=crop'
  },
  {
    title: 'Smart Infrastructure Relay',
    category: 'IoT Engineering',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2940&auto=format&fit=crop'
  },
  {
    title: 'Commercial Ops Dashboard',
    category: 'Systems Management',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Inspiration Header Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-24 items-start">
          <div>
            <span className="text-primary-orange font-black text-xs uppercase tracking-[0.3em] mb-6 block">Behind the Engineering</span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Shaping Systems <br /> 
              That Scale
            </h2>
          </div>
          <div className="lg:pt-20">
            <p className="text-white/50 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed mb-10 max-w-lg">
              I specialize in designing clean, high-performance architectures that solve real-world problems through deterministic logic.
            </p>
            <Link href="/cv" className="flex items-center gap-4 text-white font-bold group cursor-pointer">
              <span className="border-b-2 border-primary-orange pb-1 group-hover:pr-4 transition-all uppercase tracking-widest text-sm">View CV</span>
              <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Project Grid - Vertical Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {works.map((work, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -20 }}
              className="relative aspect-[3/4] rounded-[40px] sm:rounded-[60px] overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                src={work.image} 
                alt={work.title}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 right-8 sm:right-12">
                <span className="text-[10px] sm:text-xs font-black text-primary-orange uppercase tracking-widest mb-2 sm:mb-3 block">{work.category}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-primary-orange transition-colors">
                  {work.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
