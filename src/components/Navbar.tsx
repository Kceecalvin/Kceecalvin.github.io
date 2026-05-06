'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const y = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.nav 
      style={{ width, y }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav px-8 py-3 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative flex items-center justify-center transition-folio">
            <Image 
              src="/assets/logo.svg" 
              alt="Cal dev Logo" 
              width={60} 
              height={60} 
              className="w-14 h-14 invert group-hover:scale-110 transition-transform brightness-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-[-0.05em] text-white uppercase leading-none">
              Cal <span className="text-primary-orange">dev</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.5em] text-white/20 uppercase mt-1">Engineering</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link href="#about" className="text-[11px] font-black text-white/50 hover:text-white transition-folio uppercase tracking-[0.2em]">About</Link>
          <Link href="#services" className="text-[11px] font-black text-white/50 hover:text-white transition-folio uppercase tracking-[0.2em]">Services</Link>
          <Link href="#portfolio" className="text-[11px] font-black text-white/50 hover:text-white transition-folio uppercase tracking-[0.2em]">Portfolio</Link>
          <Link href="/cv" className="text-[11px] font-black text-white/50 hover:text-white transition-folio uppercase tracking-[0.2em]">CV</Link>
        </div>

        <Link 
          href="#contact" 
          className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary-orange hover:text-white transition-folio"
        >
          <span className="hidden md:block">Get in touch</span>
          <div className="w-5 h-5 bg-primary-orange group-hover:bg-white rounded-full flex items-center justify-center transition-folio">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>
      </div>
    </motion.nav>
  );
}

