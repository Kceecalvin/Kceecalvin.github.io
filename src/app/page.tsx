'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoBar from '@/components/LogoBar';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/ArchitectureGrid';
import ContactForm from '@/components/ContactForm';
import Playground from '@/components/Playground';
import ScrollMergeSection from '@/components/ScrollMergeSection';
import SectionDivider from '@/components/SectionDivider';
import SocialIcons from '@/components/SocialIcons';

// Simple fade-in on scroll — no fade-out, no dead space
function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        
        <LogoBar />

        <SectionDivider />

        <ScrollMergeSection 
          images={{
            topLeft: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2940&auto=format&fit=crop",
            topRight: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            bottomLeft: "https://images.unsplash.com/photo-1640341719942-0570b5b71948?q=80&w=2832&auto=format&fit=crop",
            bottomRight: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
            merged: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
          }}
        />

        <SectionDivider />
        
        <RevealSection>
          <About />
        </RevealSection>

        <SectionDivider />
        
        <RevealSection>
          <Services />
        </RevealSection>

        <SectionDivider />

        <RevealSection>
          <Playground />
        </RevealSection>

        <SectionDivider />
        
        <RevealSection>
          <Portfolio />
        </RevealSection>

        <SectionDivider />
        
        {/* Contact Section */}
        <section id="contact" className="relative z-10 py-24 px-6">
          <ContactForm />
        </section>
      </div>

      <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
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
                ENGINEERED FOR RESILIENCE
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-8">
            <SocialIcons />
            <p className="text-white/10 text-[9px] font-mono uppercase tracking-[0.4em]">
              &copy; CALDEV ENGINEERING LIMITED · MMXXVI · ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

