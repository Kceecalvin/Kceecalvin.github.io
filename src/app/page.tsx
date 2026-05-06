'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoBar from '@/components/LogoBar';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/ArchitectureGrid';

function ScrollSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -50]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }} className="relative z-10">
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-black overflow-x-hidden">
      {/* Fixed Background Gradient - Fluid & Atmospheric */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,95,31,0.1)_0%,rgba(0,0,0,1)_80%)]" />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-orange/5 blur-[150px] rounded-full" 
        />
      </div>

      <Navbar />
      
      <div className="relative z-10">
        <ScrollSection>
          <Hero />
        </ScrollSection>
        
        <ScrollSection>
          <LogoBar />
        </ScrollSection>
        
        <ScrollSection>
          <About />
        </ScrollSection>
        
        <ScrollSection>
          <Services />
        </ScrollSection>
        
        <ScrollSection>
          <Portfolio />
        </ScrollSection>
        
        {/* Contact Section - Extreme High-End CTA */}
        <section id="contact" className="relative z-10 py-60 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-[12rem] font-black text-white tracking-tighter leading-none mb-16 uppercase">
                Ready to <br />
                <span className="text-primary-orange italic">Architect?</span>
              </h2>
              <p className="text-white/40 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-medium">
                Secure a tier-one engineering contract for your next high-performance financial, IoT, or infrastructure system.
              </p>
              <a 
                href="mailto:contact@caldev.tech" 
                className="inline-flex items-center gap-6 bg-primary-orange text-white px-16 py-8 rounded-full text-2xl font-black uppercase tracking-widest hover:scale-105 hover:bg-white hover:text-black transition-folio shadow-[0_40px_80px_rgba(255,95,31,0.2)]"
              >
                Initialize Project
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            </motion.div>
          </div>
        </section>
      </div>

      <footer className="relative z-10 py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center lg:items-start gap-6 group">
            <div className="relative flex items-center justify-center transition-folio">
              <img 
                src="/assets/logo.svg" 
                alt="Cal dev Logo" 
                className="w-24 h-24 invert brightness-200"
              />
            </div>
            <div className="text-center lg:text-left">
              <span className="text-5xl font-black tracking-[-0.05em] text-white uppercase leading-none">
                Cal <span className="text-primary-orange">dev</span>
              </span>
              <p className="text-[10px] font-black tracking-[1em] text-white/20 uppercase mt-4">
                Architecture of Choice
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-8">
            <div className="flex gap-12">
              <a href="#" className="text-xs font-black text-white/40 hover:text-white transition-folio uppercase tracking-widest">Twitter</a>
              <a href="#" className="text-xs font-black text-white/40 hover:text-white transition-folio uppercase tracking-widest">LinkedIn</a>
              <a href="#" className="text-xs font-black text-white/40 hover:text-white transition-folio uppercase tracking-widest">Github</a>
            </div>
            <p className="text-white/10 text-[9px] font-mono uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} CALDEV ENGINEERING STUDIO // LOGIC IS ABSOLUTE
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
