'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-[40px] sm:rounded-[80px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop" 
                alt="Studio Shot"
                className="w-full h-full object-cover grayscale transition-folio group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-folio" />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-primary-orange font-black text-xs uppercase tracking-[0.3em] mb-6 sm:mb-8 block">About the Architect</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8 sm:mb-10 uppercase">
              Merging Technical <br /> 
              Fidelity with <br />
              Business Logic.
            </h2>
            <div className="space-y-6 sm:space-y-8 max-w-2xl">
              <p className="text-white/60 text-lg sm:text-xl leading-relaxed">
                I am a systems engineer and architect focused on building industrial-grade solutions that solve complex real-world challenges.
              </p>
              <p className="text-white/40 text-base sm:text-lg leading-relaxed">
                Whether it is an algorithmic trading core or a nationwide infrastructure relay, my goal is always the same: absolute engineering excellence.
              </p>
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-8 sm:gap-12 border-t border-white/10 pt-10 sm:pt-12">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block mb-1 sm:mb-2">5+ Years</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Experience</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block mb-1 sm:mb-2">20+ Projects</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Deployed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
