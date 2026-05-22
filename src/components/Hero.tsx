'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight, Activity, Cpu, Layers, Target } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';

const PillarVisual = ({ type, isActive }: { type: string; isActive: boolean }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="h-12 flex items-center mb-4 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={type}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center gap-4"
          >
            {type === 'Financial' && (
              <div className="flex items-end gap-1 h-8 w-full">
                {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                    className="w-1 bg-primary-orange/40 rounded-full"
                  />
                ))}
                <span className="text-[8px] font-mono text-primary-orange/60 ml-2 mb-1 animate-pulse">ROI_PASS</span>
              </div>
            )}
            {type === 'Embedded' && (
              <div className="relative w-full h-8 flex items-center">
                <motion.div 
                   animate={{ x: [-10, 40], opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="w-2 h-2 bg-primary-orange rounded-full shadow-[0_0_10px_#FF5F1F]"
                />
                <div className="absolute inset-0 border-b border-dashed border-white/10 w-2/3 top-1/2" />
                <Cpu size={16} className="text-white/20 ml-auto" />
              </div>
            )}
            {type === 'Scalable' && (
              <div className="grid grid-cols-2 gap-1 w-full h-8">
                {[1, 2, 3, 4].map((b) => (
                  <motion.div 
                    key={b}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: b * 0.2 }}
                    className="bg-white/10 border border-white/5 rounded-sm"
                  />
                ))}
              </div>
            )}
            {type === 'Strategy' && (
              <div className="relative w-full h-8 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-8 h-8 rounded-full border border-primary-orange/20 border-t-primary-orange/60"
                />
                <Target size={12} className="absolute text-white/40" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();



  // Parallax Tilt Coordinates for the Hero Image Setup
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Range mappings (±6deg limits)
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };



  const pillars = [
    { num: '01', label: 'Capital Systems', id: 'Financial' },
    { num: '02', label: 'Embedded Engineering', id: 'Embedded' },
    { num: '03', label: 'Scalable Platforms', id: 'Scalable' },
    { num: '04', label: 'Commercial Strategy', id: 'Strategy' }
  ];

  return (
    <section 
      ref={imageContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative min-h-screen flex flex-col justify-end px-6 pb-16 sm:pb-20 lg:pb-32 overflow-hidden pt-32 select-none"
    >
      <VideoPlayer 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Placeholder VSL
      />
      
      {/* Atmospheric Ambient Glows & Vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)] pointer-events-none z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-[45%] bg-gradient-to-l from-primary-orange/[0.07] via-primary-orange/[0.02] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none z-10" />

      {/* Background Engineering Setup Parallax Layer */}
      <motion.div 
        style={{ 
          rotateX: shouldReduceMotion ? 0 : rotateX, 
          rotateY: shouldReduceMotion ? 0 : rotateY,
          z: 0 
        }}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <motion.div 
          animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-full lg:w-[75%] h-full opacity-60 sm:opacity-80 lg:opacity-100 mix-blend-overlay lg:mix-blend-normal"
        >
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2920&auto=format&fit=crop" 
            alt="High-End Engineering Setup"
            className="w-full h-full object-cover object-center grayscale brightness-75 sm:brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95" />
        </motion.div>
      </motion.div>

      {/* Hero Interactive Elements */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-24">
        
        <div className="lg:col-span-8">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/60 font-black mb-4 tracking-[0.25em] text-xs sm:text-sm lg:text-base uppercase font-mono"
          >
            PRINCIPAL PROFILE — CALDEV ENGINEERING
          </motion.p>
          
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase select-none font-feature-settings"
          >
            <SplitText text="CAL" delay={0.3} staggerDelay={0.08} duration={0.9} />
            <br />
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-primary-orange inline-block drop-shadow-[0_0_40px_rgba(255,95,31,0.2)] font-feature-settings relative"
            >
              DEV.
            </motion.span>
          </motion.h1>
        </div>

        <div className="lg:col-span-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-sm"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-6 sm:mb-8 leading-tight uppercase tracking-tight">
              Architecting <br className="hidden sm:block" /> Scalable Growth.
            </h2>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 font-medium">
              We design resilient digital infrastructure that accelerates commercial performance and underwrites long-term operational excellence.
            </p>

            <div className="flex flex-col gap-4">
              <MagneticButton 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group w-full bg-primary-orange text-black px-8 py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_12px_30px_rgba(255,95,31,0.25)]"
              >
                <span className="relative z-10 flex items-center justify-between w-full">
                  Request an Advisory Briefing
                  <motion.span className="inline-block relative">
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </motion.span>
                </span>
              </MagneticButton>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors text-xs font-black uppercase tracking-widest px-8 py-5"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary-orange transition-colors bg-black/40 backdrop-blur-sm">
                  <Play className="w-4 h-4 fill-current ml-1 text-primary-orange" />
                </div>
                View the Capabilities Film
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Unified Bottom Category Strip (01–04) */}
      <div className="max-w-7xl mx-auto w-full mt-12 sm:mt-20 relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/15 pt-8 sm:pt-10">
        {pillars.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.1 }}
            onMouseEnter={() => setActivePillar(item.id)}
            onMouseLeave={() => setActivePillar(null)}
            className="flex flex-col group cursor-pointer relative"
          >
            <PillarVisual type={item.id} isActive={activePillar === item.id} />
            
            <div className="flex flex-col select-none overflow-hidden">
              <motion.span 
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 100 }}
                className="text-[10px] font-mono font-black text-white/60 mb-1 tracking-[0.2em] inline-block origin-top will-change-transform group-hover:text-primary-orange transition-colors"
              >
                {item.num}
              </motion.span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-wider group-hover:text-primary-orange transition-colors">
                {item.label}
              </span>
            </div>
            
            {/* Left-to-right animated stroke underliner */}
            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-primary-orange/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
