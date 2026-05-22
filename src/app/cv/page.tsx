'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CVPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-primary-orange selection:text-white pb-32 overflow-hidden relative">
      
      {/* Decorative Large Background Logo */}
      <div className="absolute top-[-15%] right-[-15%] w-[100%] h-[100%] opacity-[0.02] pointer-events-none rotate-[-15deg]">
        <Image 
          src="/assets/logo.svg" 
          alt="" 
          width={1500} 
          height={1500} 
          className="w-full h-full invert brightness-200"
        />
      </div>

      <div className="max-w-6xl mx-auto pt-20 px-6 relative z-10">
        
        {/* CV HEADER & BACK KEY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 sm:mb-32 items-start">
          
          {/* Logo as Back Key */}
          <div className="lg:col-span-3">
            <Link href="/" className="group flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-6 transition-folio">
              <div className="relative flex items-center justify-center transition-folio group-hover:scale-105">
                <Image 
                  src="/assets/logo.svg" 
                  alt="Cal dev Logo" 
                  width={140} 
                  height={140} 
                  className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 invert brightness-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                />
              </div>
              <div className="flex flex-col pl-2 lg:pl-4">
                <span className="text-xl sm:text-3xl font-black tracking-[-0.05em] text-white uppercase leading-none">
                  Cal <span className="text-primary-orange">dev</span>
                </span>
                <span className="text-[8px] sm:text-[10px] font-black tracking-[0.4em] lg:tracking-[0.6em] text-white/60 uppercase mt-1 lg:mt-2">Practice Home</span>
              </div>
            </Link>
          </div>

          {/* Name & Classification */}
          <div className="lg:col-span-9 pt-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary-orange font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 block underline decoration-2 underline-offset-8 decoration-primary-orange/30">PRINCIPAL PROFILE</span>
              <h1 className="text-6xl sm:text-8xl lg:text-[9vw] font-black tracking-tighter uppercase leading-[0.8] mb-8 text-white">
                Kencalvin <br />
                <span className="text-white/20">Mwenda</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-4 sm:px-6 py-2 rounded-full border border-white/15 bg-white/5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary-orange">Systems Architect</span>
                <span className="px-4 sm:px-6 py-2 rounded-full border border-white/15 bg-white/5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/70">INTEGRATION</span>
                <span className="px-4 sm:px-6 py-2 rounded-full border border-white/15 bg-white/5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/70">RESILIENCE</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CV BODY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-white/5 pt-16 sm:pt-20">
          
          {/* LEFT COLUMN: Contact & Metadata */}
          <div className="lg:col-span-4 space-y-12 lg:space-y-20">
            
            {/* Mission Statement */}
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6 lg:mb-8 border-l-2 border-primary-orange pl-4">Mission</h3>
              <p className="text-lg lg:text-xl font-medium text-white/70 leading-relaxed italic">
                "To design resilient, deterministic architectures that serve as the foundation for enterprise performance."
              </p>
            </section>

            {/* Direct Connect */}
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6 lg:mb-8 border-l-2 border-primary-orange pl-4">Direct Connect</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Email</p>
                  <p className="font-bold text-base sm:text-lg break-all">kcalvinmwenda@gmail.com</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Global Repository</p>
                  <p className="font-bold text-base sm:text-lg text-primary-orange underline decoration-2 underline-offset-4 decoration-primary-orange/20">github.com/Kceecalvin</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">SECURE VOCAL CHANNEL</p>
                  <p className="font-bold text-base sm:text-lg">0748 324 656</p>
                </div>
              </div>
            </section>

            {/* Education Architecture */}
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6 lg:mb-8 border-l-2 border-primary-orange pl-4">Foundation</h3>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary-orange" />
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2 block">2022 — Present</span>
                  <h4 className="text-lg font-black uppercase text-white leading-tight mb-2 tracking-tight">Kirinyaga University</h4>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest leading-none">BSc. Software Engineering</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Expertise & Sequence */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-24">
            
            {/* Core Competencies - High Visibility */}
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-10 lg:mb-12 border-l-2 border-primary-orange pl-4">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { name: 'Systems Architecture', level: '98%', desc: 'Industrial-grade design.' },
                  { name: 'Modern Web Systems', level: '95%', desc: 'Advanced hydration logic.' },
                  { name: 'Hardware-Accelerated Interaction', level: '92%', desc: 'Hardware-accelerated UI.' },
                  { name: 'High-Fidelity Interface Systems', level: '90%', desc: 'High-fidelity aesthetics.' },
                  { name: 'Distributed Microservice Networks', level: '94%', desc: 'Laravel & Django systems.' },
                  { name: 'System Resilience Auditing', level: '88%', desc: 'Vulnerability assessment.' }
                ].map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="font-black uppercase tracking-widest text-[10px] sm:text-[11px] text-white/80 group-hover:text-primary-orange transition-colors">{skill.name}</span>
                      <span className="font-mono text-[9px] text-white/55">{skill.level}</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-4 italic">{skill.desc}</p>
                    <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-primary-orange"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Sequence */}
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-12 lg:mb-16 border-l-2 border-primary-orange pl-4">Career Sequence</h3>
              <div className="space-y-12 lg:space-y-20">
                {[
                  {
                    date: '2023 — NOW',
                    role: 'Lead Systems Architect',
                    context: 'Private Practice Advisory — Nairobi',
                    desc: 'Delivering resilient system architectures and quantitative platforms for international financial and industrial stakeholders.'
                  },
                  {
                    date: '2024 — NOW',
                    role: 'Systems Security Auditor',
                    context: 'Strategic Resilience Practice — Kirinyaga',
                    desc: 'Authoring security audits and executing system hardening protocols for large-scale enterprise foundations.'
                  }
                ].map((job, i) => (
                  <div key={i} className="group transition-folio">
                    <span className="text-[10px] font-black text-primary-orange mb-3 block tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity uppercase">{job.date}</span>
                    <h4 className="text-2xl sm:text-4xl font-black uppercase text-white mb-2 tracking-tighter group-hover:text-primary-orange transition-colors">{job.role}</h4>
                    <p className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-[0.2em] mb-6 italic">{job.context}</p>
                    <p className="text-base sm:text-lg font-medium text-white/75 leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6 sm:pl-8 group-hover:border-primary-orange/30 transition-folio">
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>

        {/* Technical Summary */}
        <section className="mt-24 sm:mt-40 p-8 sm:p-16 rounded-[40px] sm:rounded-[80px] bg-white/[0.02] border border-white/10 text-center">
          <span className="text-primary-orange font-black text-[10px] uppercase tracking-[0.5em] mb-6 sm:mb-8 block underline decoration-2 underline-offset-8 decoration-primary-orange/30 uppercase">THE PRINCIPAL</span>
          <p className="text-xl sm:text-3xl font-medium text-white/80 leading-tight max-w-4xl mx-auto mb-10 sm:mb-12">
            "We engineer systems of absolute clarity, architectures of complete determinism, and interfaces of unmatched precision."
          </p>
          <div className="w-16 sm:w-20 h-1 bg-primary-orange/20 mx-auto rounded-full" />
        </section>

      </div>

      {/* Extreme Footer Branding */}
      <footer className="max-w-7xl mx-auto py-32 px-6 mt-20 text-center relative z-10 border-t border-white/5">
        <div className="flex flex-col items-center gap-10">
          <div className="relative w-40 h-40 flex items-center justify-center transition-folio hover:scale-110">
            <Image 
              src="/assets/logo.svg" 
              alt="Cal dev Logo" 
              width={160} 
              height={160} 
              className="w-32 h-32 invert brightness-200"
            />
          </div>
          <h2 className="text-5xl font-black tracking-[-0.05em] text-white uppercase">
            Cal <span className="text-primary-orange">dev</span>
          </h2>
          <p className="text-[11px] font-black uppercase tracking-[1em] text-white/20">
            ARCHITECTURE · SEQUENCE · LOGIC
          </p>
        </div>
      </footer>
    </main>
  );
}

