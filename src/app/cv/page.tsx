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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
          
          {/* Logo as Back Key */}
          <div className="lg:col-span-3">
            <Link href="/" className="group flex flex-col items-start gap-6 transition-folio">
              <div className="relative flex items-center justify-center transition-folio group-hover:scale-105">
                <Image 
                  src="/assets/logo.svg" 
                  alt="Cal dev Logo" 
                  width={140} 
                  height={140} 
                  className="w-32 h-32 invert brightness-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                />
              </div>
              <div className="flex flex-col pl-4">
                <span className="text-3xl font-black tracking-[-0.05em] text-white uppercase leading-none">
                  Cal <span className="text-primary-orange">dev</span>
                </span>
                <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase mt-2">Studio Back</span>
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
              <span className="text-primary-orange font-black text-xs uppercase tracking-[0.5em] mb-4 block">Professional Curriculum Vitae</span>
              <h1 className="text-[9vw] font-black tracking-tighter uppercase leading-[0.75] mb-8 text-white">
                Kencalvin <br />
                <span className="text-white/20">Mwenda</span>
              </h1>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-primary-orange">Systems Architect</span>
                <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">Full-Stack Engineer</span>
                <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">Security Auditor</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CV BODY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 border-t border-white/5 pt-20">
          
          {/* LEFT COLUMN: Contact & Metadata */}
          <div className="lg:col-span-4 space-y-20">
            
            {/* Mission Statement */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-l-2 border-primary-orange pl-4">Mission</h3>
              <p className="text-xl font-medium text-white/70 leading-relaxed italic">
                "To engineer deterministic, industrial-grade architectures that redefine the boundary between abstract logic and physical reality."
              </p>
            </section>

            {/* Direct Connect */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-l-2 border-primary-orange pl-4">Direct Connect</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Electronic Mail</p>
                  <p className="font-bold text-lg">kcalvinmwenda@gmail.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Global Repository</p>
                  <p className="font-bold text-lg text-primary-orange">github.com/Kceecalvin</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Hertzian Line</p>
                  <p className="font-bold text-lg">0748 324 656</p>
                </div>
              </div>
            </section>

            {/* Education Architecture */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-l-2 border-primary-orange pl-4">Foundation</h3>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary-orange" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2 block">2022 — Present</span>
                  <h4 className="text-lg font-black uppercase text-white leading-tight mb-2 tracking-tight">Kirinyaga University</h4>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest leading-none">BSc. Software Engineering</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Expertise & Sequence */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Core Competencies - High Visibility */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-12 border-l-2 border-primary-orange pl-4">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { name: 'Systems Architecture', level: '98%', desc: 'Industrial-grade infrastructure design.' },
                  { name: 'Next.js 15 / React 19', level: '95%', desc: 'Advanced SSR & hydration optimization.' },
                  { name: 'Framer Motion Orchestration', level: '92%', desc: 'Hardware-accelerated scroll interactions.' },
                  { name: 'Industrial UI/UX Design', level: '90%', desc: 'High-fidelity, deterministic aesthetics.' },
                  { name: 'Full-Stack Ecosystems', level: '94%', desc: 'End-to-end Laravel & Django integration.' },
                  { name: 'Security Auditing', level: '88%', desc: 'System hardening & vulnerability assessment.' }
                ].map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="font-black uppercase tracking-widest text-[11px] text-white/80 group-hover:text-primary-orange transition-colors">{skill.name}</span>
                      <span className="font-mono text-[10px] text-white/30">{skill.level}</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4 italic">{skill.desc}</p>
                    <div className="w-full h-[2px] bg-white/5 overflow-hidden">
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
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-16 border-l-2 border-primary-orange pl-4">Career Sequence</h3>
              <div className="space-y-20">
                {[
                  {
                    date: '2023 — NOW',
                    role: 'Lead Systems Architect',
                    context: 'Freelance Engineering // Nairobi',
                    desc: 'Orchestrating high-performance digital systems for fintech and industrial clients. Specialized in bridging high-level business logic with low-level deterministic codebases.'
                  },
                  {
                    date: '2024 — NOW',
                    role: 'Systems Security Auditor',
                    context: 'Resilience Strategy // Kirinyaga',
                    desc: 'Delivering comprehensive security audits using advanced penetration testing and system hardening protocols. Focused on ensuring absolute technical fidelity and data integrity.'
                  }
                ].map((job, i) => (
                  <div key={i} className="group transition-folio">
                    <span className="text-[10px] font-black text-primary-orange mb-4 block tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity uppercase">{job.date}</span>
                    <h4 className="text-4xl font-black uppercase text-white mb-3 tracking-tighter group-hover:text-primary-orange transition-colors">{job.role}</h4>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8 italic">{job.context}</p>
                    <p className="text-lg font-medium text-white/50 leading-relaxed max-w-2xl border-l-2 border-white/5 pl-8 group-hover:border-primary-orange/30 transition-folio">
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>

        {/* Technical Summary */}
        <section className="mt-40 p-16 rounded-[80px] bg-white/[0.02] border border-white/5 text-center">
          <span className="text-primary-orange font-black text-[10px] uppercase tracking-[0.5em] mb-8 block underline decoration-2 underline-offset-8 decoration-primary-orange/30">Detailed Biography</span>
          <p className="text-2xl md:text-3xl font-medium text-white/60 leading-tight max-w-4xl mx-auto mb-12">
            "Software Engineer specialized in high-fidelity digital systems. I build logic that is <span className="text-white">absolute</span>, architectures that are <span className="text-white">deterministic</span>, and interfaces that are <span className="text-white">seamless</span>."
          </p>
          <div className="w-20 h-1 bg-primary-orange/20 mx-auto rounded-full" />
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
          <p className="text-[11px] font-black uppercase tracking-[1em] text-white/5">
            Architecture // Sequence // Logic
          </p>
        </div>
      </footer>
    </main>
  );
}
