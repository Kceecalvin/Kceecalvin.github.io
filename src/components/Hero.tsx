'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-4 sm:px-6 lg:px-24 pb-12 sm:pb-20 lg:pb-32 overflow-hidden pt-4">
      <div className="relative hero-card min-h-[80vh] sm:min-h-[85vh] overflow-hidden flex flex-col justify-end px-6 sm:px-12 lg:px-24 pb-16 sm:pb-20 lg:pb-32 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        
        {/* Background Engineering / Laptop Imagery */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full lg:w-[75%] h-full opacity-60 sm:opacity-80 lg:opacity-100 mix-blend-overlay lg:mix-blend-normal">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2920&auto=format&fit=crop" 
              alt="High-End Engineering Setup"
              className="w-full h-full object-cover object-center grayscale brightness-75 sm:brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5F1F]/10 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          <div className="lg:col-span-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 font-bold mb-4 tracking-wide text-base sm:text-lg lg:text-xl uppercase"
            >
              Personnel Profile // Studio
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase"
            >
              Cal <br />
              <span className="text-primary-orange">dev.</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-4 pb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-sm"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight uppercase tracking-tight">
                Deterministic <br className="hidden sm:block" /> Engineering.
              </h2>
              <p className="text-white/40 text-sm sm:text-base lg:text-lg leading-relaxed">
                I design and build high-performance systems that bridge the gap between financial strategy and physical infrastructure.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Pillar List - Numerical Indexes */}
        <div className="max-w-7xl mx-auto w-full mt-12 sm:mt-20 relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10">
          {[
            { num: '01', label: 'Financial' },
            { num: '02', label: 'Embedded' },
            { num: '03', label: 'Scalable' },
            { num: '04', label: 'Strategy' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col group cursor-default"
            >
              <span className="text-[10px] font-black text-primary-orange mb-1 tracking-widest">{item.num}</span>
              <span className="text-xs sm:text-base font-bold text-white uppercase tracking-wider group-hover:translate-x-1 transition-transform">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
