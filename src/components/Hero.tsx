'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 lg:px-24 pb-20 lg:pb-32 overflow-hidden pt-4">
      <div className="relative hero-card min-h-[85vh] overflow-hidden flex flex-col justify-end px-8 pb-20 lg:px-24 lg:pb-32 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        
        {/* Background Engineering / Laptop Imagery */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full lg:w-[75%] h-full opacity-80 lg:opacity-100 mix-blend-overlay lg:mix-blend-normal">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2920&auto=format&fit=crop" 
              alt="High-End Engineering Setup"
              className="w-full h-full object-cover object-center grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5F1F]/10 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <div className="lg:col-span-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 font-bold mb-4 lg:mb-6 tracking-wide text-lg lg:text-xl"
            >
              Hey, I'm a
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter"
            >
              Systems <br />
              Architect
            </motion.h1>
          </div>

          <div className="lg:col-span-4 pb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-sm"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                Complex engineering <br className="hidden lg:block" /> should feel invisible.
              </h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                I design and build high-performance systems that bridge the gap between financial strategy and physical infrastructure.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Pillar List - Numerical Indexes */}
        <div className="max-w-7xl mx-auto w-full mt-20 relative z-10 hidden lg:grid grid-cols-4 gap-8 border-t border-white/10 pt-10">
          {[
            { num: '01', label: 'Financial Systems' },
            { num: '02', label: 'IoT Infrastructure' },
            { num: '03', label: 'Embedded Logic' },
            { num: '04', label: 'Technical Strategy' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col group cursor-default"
            >
              <span className="text-xs font-black text-primary-orange mb-2 tracking-widest">{item.num}</span>
              <span className="text-base font-bold text-white tracking-wide group-hover:translate-x-1 transition-transform">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
