'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BloxItemProps {
  name: string;
  desc: string;
  index: number;
  isFlagship?: boolean;
}

function MorphIcon({ hovered, index }: { hovered: boolean; index: number }) {
  if (index === 0) {
    // Supa Blox: Circle -> Square morph
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-orange">
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{
            rx: hovered ? 3 : 12,
            rotate: hovered ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </svg>
    );
  }

  if (index === 1) {
    // Hype Blox: Diamond -> Hexagon morph
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-orange">
        <motion.polygon
          points="12,2 22,12 12,22 2,12"
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{
            points: hovered 
              ? "12,2 21,7 21,17 12,22 3,17 3,7" // Hexagon
              : "12,2 22,12 12,22 2,12",       // Diamond
            rotate: hovered ? 180 : 0,
          }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        />
      </svg>
    );
  }

  if (index === 2) {
    // Frame Blox: Crosshair -> Target morph
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-orange">
        <motion.circle
          cx="12"
          cy="12"
          r={hovered ? "5" : "9"}
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{
            r: hovered ? 5 : 9,
          }}
          transition={{ duration: 0.35 }}
        />
        <motion.path
          d="M12 2v20M2 12h20"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            rotate: hovered ? 45 : 0,
            scale: hovered ? 0.8 : 1,
          }}
          style={{ originX: '12px', originY: '12px' }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    );
  }

  // Flagship (Ultra Blox): Pulsing core
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary-orange">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        fill="currentColor"
        animate={{
          scale: hovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function BloxChip({ name, desc, index, isFlagship = false }: BloxItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          type: 'spring', 
          stiffness: 120, 
          damping: 18, 
          delay: isFlagship ? 0.3 : index * 0.08 
        }}
        whileHover={{ 
          y: -6,
          boxShadow: 'inset 0 0 15px rgba(255, 95, 31, 0.15), 0 10px 30px rgba(0,0,0,0.6)'
        }}
        className={`flex items-center gap-4 bg-white/[0.02] border rounded-2xl px-8 py-5 cursor-default transition-all duration-300 ${
          isFlagship 
            ? 'border-primary-orange/30 bg-primary-orange/[0.01] scale-105' 
            : 'border-white/5 hover:border-primary-orange/20'
        }`}
      >
        {/* Pulsing ring for flagship */}
        {isFlagship && (
          <div className="absolute inset-0 rounded-2xl border border-primary-orange/20 animate-ping pointer-events-none opacity-40" />
        )}

        <motion.div 
          animate={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.1 }}
          className="flex items-center justify-center"
        >
          <MorphIcon hovered={hovered} index={isFlagship ? 3 : index} />
        </motion.div>

        <span className={`font-black tracking-[0.15em] uppercase text-xs sm:text-sm ${
          isFlagship ? 'text-white' : 'text-white/70'
        }`}>
          {name}
        </span>
      </motion.div>

      {/* Tooltip Description Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-neutral-950 border border-white/10 p-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-50 text-center pointer-events-none"
          >
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-950" />
            <span className="text-primary-orange font-mono text-[8px] font-black uppercase tracking-widest block mb-1">
              COMPONENT PARAMETERS
            </span>
            <p className="text-white/60 text-[10px] leading-relaxed font-semibold uppercase">
              {desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LogoBar() {
  const bloxList = [
    { name: 'Supa Blox', desc: 'Secure Server-Less Relational Data Projections.' },
    { name: 'Hype Blox', desc: 'Deterministic High-Performance Event-Streaming Channels.' },
    { name: 'Frame Blox', desc: 'Hardware Edge Compute Cluster Relays.' }
  ];

  const flagshipBlox = {
    name: 'Ultra Blox',
    desc: 'Flagship Core Logic Clearing Processor.'
  };

  return (
    <div className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        
        {/* Row 1: The standard chips */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 w-full">
          {bloxList.map((blox, i) => (
            <BloxChip
              key={blox.name}
              name={blox.name}
              desc={blox.desc}
              index={i}
            />
          ))}
        </div>

        {/* Row 2: Flagship Ultra Blox Row */}
        <div className="flex items-center justify-center w-full mt-4">
          <BloxChip
            name={flagshipBlox.name}
            desc={flagshipBlox.desc}
            index={3}
            isFlagship
          />
        </div>

      </div>
    </div>
  );
}
