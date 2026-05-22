'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Brain, Target, Cpu, Coins, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface ScrollMergeProps {
  images?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    merged: string;
  };
}

// ─── AMBIENT ILLUSTRATION 1: SONAR PULSE (CARD 01 - INTELLIGENCE) ───
const SonarPulseIllustration = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const ringCount = 4;
  const duration = isHovered ? 1.5 : 4.0;

  return (
    <svg 
      className="absolute top-0 right-0 w-64 h-64 pointer-events-none z-0 overflow-visible"
      style={{ transform: 'translate(20%, -20%)' }}
      aria-hidden="true"
    >
      {Array.from({ length: ringCount }).map((_, i) => (
        <motion.circle
          key={i}
          cx="100%"
          cy="0%"
          r={40 + i * 45}
          fill="none"
          stroke={isHovered ? 'var(--color-disp-accent-orange)' : 'var(--color-disp-border-faint)'}
          strokeWidth={isHovered ? 1.5 : 1}
          opacity={isHovered ? 0.6 : 0.25}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4
          }}
        />
      ))}
      <motion.circle
        cx="100%"
        cy="0%"
        r={12}
        fill={isHovered ? 'var(--color-disp-accent-orange)' : 'var(--color-disp-border-warm)'}
        opacity={0.4}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.25, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </svg>
  );
};

// ─── AMBIENT ILLUSTRATION 2: CONNECTED CONSTELLATION (CARD 02 - STRATEGY) ───
const StrategyIllustration = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const nodes = [
    { id: 1, x: 40, y: 50 },
    { id: 2, x: 100, y: 30 },
    { id: 3, x: 150, y: 60 },
    { id: 4, x: 170, y: 110 },
    { id: 5, x: 130, y: 160 },
    { id: 6, x: 60, y: 150 },
    { id: 7, x: 30, y: 100 },
    { id: 8, x: 90, y: 90 },
    { id: 9, x: 130, y: 110 },
    { id: 10, x: 70, y: 50 },
    { id: 11, x: 120, y: 70 },
    { id: 12, x: 100, y: 130 }
  ];
  
  const connections = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1],
    [8, 1], [8, 2], [8, 6], [8, 7], [9, 3], [9, 4], [9, 5],
    [10, 1], [10, 2], [10, 8], [11, 2], [11, 3], [11, 9],
    [12, 5], [12, 6], [12, 8], [12, 9]
  ];

  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

  useEffect(() => {
    if (!isHovered) {
      setActiveNodeIndex(-1);
      return;
    }
    
    let index = 0;
    const interval = setInterval(() => {
      setActiveNodeIndex(index % nodes.length);
      index++;
    }, 250);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.svg 
      className="absolute top-4 right-4 w-52 h-52 pointer-events-none z-0"
      style={{ originX: '50%', originY: '50%' }}
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{
        duration: 45,
        repeat: Infinity,
        ease: 'linear'
      }}
      aria-hidden="true"
    >
      {connections.map(([aId, bId], i) => {
        const a = nodes.find(n => n.id === aId)!;
        const b = nodes.find(n => n.id === bId)!;
        const isLineActive = isHovered && (activeNodeIndex === aId - 1 || activeNodeIndex === bId - 1);
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isLineActive ? 'var(--color-disp-accent-orange)' : 'var(--color-disp-border-faint)'}
            strokeWidth={isLineActive ? 1.2 : 0.8}
            opacity={isLineActive ? 0.6 : 0.15}
            className="transition-colors duration-300"
          />
        );
      })}
      
      {nodes.map((node, i) => {
        const isActive = activeNodeIndex === i;
        return (
          <g key={node.id}>
            {isActive && (
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill="var(--color-disp-accent-orange)"
                opacity={0.4}
                className="animate-ping"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 3.5 : 2}
              fill={isActive ? 'var(--color-disp-accent-orange)' : isHovered ? 'var(--color-disp-text-primary)' : 'var(--color-disp-text-muted)'}
              className="transition-all duration-300"
              opacity={isHovered ? 0.9 : 0.4}
            />
          </g>
        );
      })}
    </motion.svg>
  );
};

// ─── AMBIENT ILLUSTRATION 3: 3D ISOMETRIC CUBES (CARD 03 - INFRASTRUCTURE) ───
const InfrastructureIllustration = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const cubes = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 0, y: 1, z: 1 }
  ];

  const project = (x: number, y: number, z: number) => {
    const scale = 24;
    const originX = 110;
    const originY = 120;
    const px = originX + (x - y) * scale * 0.866;
    const py = originY + (x + y) * scale * 0.5 - z * scale;
    return { x: px, y: py };
  };

  const renderCube = (cx: number, cy: number, cz: number, index: number) => {
    const scale = 24;
    const topPt = project(cx, cy, cz + 1);
    const rightPt = project(cx + 1, cy, cz);
    const leftPt = project(cx, cy + 1, cz);
    const topRightPt = project(cx + 1, cy, cz + 1);
    const topLeftPt = project(cx, cy + 1, cz + 1);
    const frontPt = project(cx + 1, cy + 1, cz);
    const centerPt = project(cx + 1, cy + 1, cz + 1);

    const topPath = `M ${topPt.x} ${topPt.y} L ${topRightPt.x} ${topRightPt.y} L ${centerPt.x} ${centerPt.y} L ${topLeftPt.x} ${topLeftPt.y} Z`;
    const leftPath = `M ${topLeftPt.x} ${topLeftPt.y} L ${centerPt.x} ${centerPt.y} L ${frontPt.x} ${frontPt.y} L ${leftPt.x} ${leftPt.y} Z`;
    const rightPath = `M ${topRightPt.x} ${topRightPt.y} L ${centerPt.x} ${centerPt.y} L ${frontPt.x} ${frontPt.y} L ${rightPt.x} ${rightPt.y} Z`;

    return (
      <g key={index} opacity={isHovered ? 0.7 : 0.3} className="transition-opacity duration-300">
        <path d={topPath} fill="none" stroke="url(#cube-shimmer-grad)" strokeWidth={1.2} />
        <path d={leftPath} fill="none" stroke="url(#cube-shimmer-grad)" strokeWidth={1.2} />
        <path d={rightPath} fill="none" stroke="url(#cube-shimmer-grad)" strokeWidth={1.2} />
      </g>
    );
  };

  return (
    <svg className="absolute bottom-2 right-2 w-52 h-52 pointer-events-none z-0 overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="cube-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <motion.stop 
            offset="0%" 
            stopColor="var(--color-disp-border-faint)"
            animate={shouldReduceMotion ? {} : {
              stopColor: isHovered 
                ? ['var(--color-disp-border-faint)', 'var(--color-disp-accent-orange)', 'var(--color-disp-border-faint)']
                : 'var(--color-disp-border-faint)'
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0
            }}
          />
          <motion.stop 
            offset="50%" 
            stopColor="var(--color-disp-border-faint)" 
            animate={shouldReduceMotion ? {} : {
              stopColor: isHovered 
                ? ['var(--color-disp-border-faint)', 'var(--color-disp-accent-amber)', 'var(--color-disp-border-faint)']
                : 'var(--color-disp-border-faint)'
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4
            }}
          />
          <motion.stop 
            offset="100%" 
            stopColor="var(--color-disp-border-faint)" 
            animate={shouldReduceMotion ? {} : {
              stopColor: isHovered 
                ? ['var(--color-disp-border-faint)', 'var(--color-disp-accent-deep)', 'var(--color-disp-border-faint)']
                : 'var(--color-disp-border-faint)'
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8
            }}
          />
        </linearGradient>
      </defs>
      {cubes.map((cube, i) => renderCube(cube.x, cube.y, cube.z, i))}
    </svg>
  );
};

// ─── AMBIENT ILLUSTRATION 4: CAPITAL SYSTEMS DRAW LINE (CARD 04 - CAPITAL SYSTEMS) ───
const CapitalIllustration = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const pathPoints = "M 10,130 Q 35,90 60,110 T 110,40 T 160,80 T 210,20";
  const [redrawKey, setRedrawKey] = useState(0);

  useEffect(() => {
    if (isHovered) {
      setRedrawKey(prev => prev + 1);
    }
  }, [isHovered]);

  return (
    <svg className="absolute bottom-4 right-4 w-56 h-40 pointer-events-none z-0 overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="chart-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-disp-border-faint)" />
          <stop offset="50%" stopColor="var(--color-disp-accent-orange)" />
          <stop offset="100%" stopColor="var(--color-disp-accent-amber)" />
        </linearGradient>
        <radialGradient id="peak-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-disp-accent-orange)" stopOpacity={0.6} />
          <stop offset="100%" stopColor="var(--color-disp-accent-orange)" stopOpacity={0} />
        </radialGradient>
      </defs>

      <path
        d={pathPoints}
        fill="none"
        stroke="var(--color-disp-border-faint)"
        strokeWidth={1.5}
        opacity={0.3}
      />

      <motion.path
        key={redrawKey}
        d={pathPoints}
        fill="none"
        stroke="url(#chart-line-grad)"
        strokeWidth={2.5}
        opacity={isHovered ? 0.9 : 0.5}
        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }}
      />

      <motion.circle
        cx={110}
        cy={40}
        r={14}
        fill="url(#peak-glow)"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <circle
        cx={110}
        cy={40}
        r={4}
        fill="var(--color-disp-accent-orange)"
        stroke="#0E0D14"
        strokeWidth={1.5}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.g
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <rect
              x={60}
              y={2}
              width={100}
              height={22}
              rx={6}
              fill="var(--color-disp-bg-panel-hi)"
              stroke="var(--color-disp-border-warm)"
              strokeWidth={1}
            />
            <text
              x={110}
              y={16}
              textAnchor="middle"
              fill="var(--color-disp-accent-orange)"
              className="text-[9px] font-mono font-bold tracking-wider"
            >
              +247.3% YTD
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ─── AMBIENT ILLUSTRATION 5: INTEGRATED ENGINE (FEATURED CARD) ───
const IntegratedEngineIllustration = () => {
  const shouldReduceMotion = useReducedMotion();
  const particles = [
    { id: 1, rangeX: [40, 160], rangeY: [60, 240], duration: 9 },
    { id: 2, rangeX: [180, 80], rangeY: [100, 300], duration: 11 },
    { id: 3, rangeX: [120, 220], rangeY: [280, 140], duration: 13 }
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-visible" aria-hidden="true">
      <g opacity={0.12} stroke="var(--color-disp-accent-orange)" strokeWidth={1} fill="none">
        <path d="M 50,150 L 150,50 L 250,150 L 150,250 Z" />
        <path d="M 150,50 L 150,250" />
        <path d="M 50,150 L 250,150" />
        
        <circle cx={50} cy={150} r={4} fill="none" />
        <circle cx={250} cy={150} r={4} fill="none" />
        <circle cx={150} cy={50} r={4} fill="none" />
        <circle cx={150} cy={250} r={4} fill="none" />
        
        <path d="M 50,150 L 100,150 L 150,100 L 200,150 L 250,150" />
        <path d="M 150,50 L 150,100 L 100,150 L 150,200 L 150,250" />
        
        <path d="M 100,100 L 80,120" />
        <path d="M 200,100 L 220,120" />
        <path d="M 100,200 L 80,180" />
        <path d="M 200,200 L 220,180" />
      </g>

      <g transform="translate(150, 150)">
        <circle
          cx={0}
          cy={0}
          r={16}
          fill="var(--color-disp-accent-orange)"
          className="animate-heartbeat"
          style={{ transformOrigin: 'center' }}
        />
        <circle
          cx={0}
          cy={0}
          r={6}
          fill="var(--color-disp-accent-orange)"
          stroke="#0E0D14"
          strokeWidth={2}
        />
      </g>

      {!shouldReduceMotion && particles.map(p => (
        <motion.circle
          key={p.id}
          r={3}
          fill="var(--color-disp-accent-amber)"
          animate={{
            x: p.rangeX,
            y: p.rangeY,
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </svg>
  );
};

// ─── REUSABLE DISCIPLINE CARD COMPONENT ───
interface CardProps {
  num: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  variant: 1 | 2 | 3 | 4;
}

export function DisciplineCard({ num, title, desc, icon: Icon, variant }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const renderIllustration = () => {
    switch (variant) {
      case 1: return <SonarPulseIllustration isHovered={isHovered} />;
      case 2: return <StrategyIllustration isHovered={isHovered} />;
      case 3: return <InfrastructureIllustration isHovered={isHovered} />;
      case 4: return <CapitalIllustration isHovered={isHovered} />;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative rounded-[28px] bg-disp-bg-panel border border-disp-border-faint hover:border-disp-border-warm p-8 min-h-[280px] overflow-hidden flex flex-col justify-between group shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] cursor-pointer select-none transition-colors duration-300"
    >
      {renderIllustration()}

      <AnimatePresence>
        {isHovered && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at bottom, rgba(255,106,26,0.25), transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-between w-full">
        <motion.span
          animate={isHovered && !shouldReduceMotion ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-mono font-semibold text-disp-accent-orange tracking-widest block"
        >
          {num}
        </motion.span>
        
        <div className="w-10 h-10 rounded-xl bg-disp-bg-inset border border-disp-border-faint flex items-center justify-center text-disp-accent-orange group-hover:border-disp-accent-orange/30 transition-all duration-300">
          <Icon className="w-5 h-5 text-disp-accent-orange" />
        </div>
      </div>

      <div className="relative z-10 mt-12 space-y-3">
        <h3 className="text-xl font-bold tracking-wider uppercase text-disp-text-primary">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-disp-text-secondary max-w-[270px]">
          {desc}
        </p>
      </div>

      <div className="relative z-10 self-end h-4 flex items-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-disp-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
}

// ─── MAIN SCROLLMERGE DISCIPLINE GRID SECTION COMPONENT ───
export default function ScrollMergeSection({ images }: ScrollMergeProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={containerVariants}
      className="relative py-24 sm:py-32 px-6 bg-disp-bg-base overflow-hidden border-b border-disp-border-faint select-none w-full flex flex-col items-center"
      aria-label="Disciplines and Integrated Engineering Practice Overview"
    >
      {/* ─── LIVING CINEMATIC BACKGROUND ─── */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#2A1F4A] opacity-35 blur-[120px] pointer-events-none z-0 animate-mesh-drift-1" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6A1A]/15 blur-[140px] pointer-events-none z-0 animate-mesh-drift-2" />

      {/* Grid overlay with radial mask */}
      <div 
        className="absolute inset-0 grid-overlay opacity-[0.04] pointer-events-none z-0"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
        }}
      />

      {/* Vertical scanline sweep */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF6A1A]/8 to-transparent animate-scanline pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-20 sm:space-y-28">
        
        {/* ─── HEADLINE AREA ─── */}
        <div className="flex flex-col items-start text-left space-y-8 relative z-20">
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h2
                custom={0}
                variants={lineVariants}
                className="text-5xl sm:text-7xl lg:text-[96px] font-extrabold tracking-[-0.04em] text-disp-text-primary leading-[0.95] uppercase font-display"
              >
                FOUR DISCIPLINES,
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                custom={1}
                variants={lineVariants}
                className="text-5xl sm:text-7xl lg:text-[96px] font-extrabold tracking-[-0.04em] text-disp-text-primary leading-[0.95] uppercase font-display"
              >
                ONE INTEGRATED
              </motion.h2>
            </div>
            <div className="overflow-hidden relative">
              <motion.h2
                custom={2}
                variants={lineVariants}
                className="text-5xl sm:text-7xl lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.95] uppercase font-display relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1A] to-[#B5380A]"
              >
                PRACTICE.
                {/* 60px soft glowing blur bubble behind PRACTICE */}
                <span className="absolute inset-0 bg-disp-accent-orange/25 blur-[60px] pointer-events-none -z-10 rounded-full" />
              </motion.h2>
            </div>
          </div>

          {/* Intro paragraph with pulsing indicator bar */}
          <motion.div 
            custom={3}
            variants={lineVariants}
            className="space-y-6"
          >
            <motion.div 
              className="h-[2px] w-12 bg-disp-accent-orange"
              animate={{ opacity: [0.4, 1.0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-base sm:text-lg leading-relaxed text-disp-text-secondary max-w-[620px] font-medium">
              Enduring enterprises are built on the integration of intelligence, infrastructure, capital systems, and disciplined strategy. We deliver all four — under one roof.
            </p>
          </motion.div>
        </div>

        {/* ─── SECTION 2: THE DISCIPLINE GRID (3x2 Desktop Layout) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch relative z-10 w-full">
          {/* Column 1, Row 1 -> CARD 01 */}
          <div className="lg:col-start-1 lg:row-start-1">
            <DisciplineCard
              num="01"
              title="Intelligence"
              desc="Engineering data-centric intelligence pipelines for global enterprises. High-frequency streaming architectures across multi-region cloud ecosystems."
              icon={Brain}
              variant={1}
            />
          </div>

          {/* Column 2, Row 1 -> CARD 02 */}
          <div className="lg:col-start-2 lg:row-start-1">
            <DisciplineCard
              num="02"
              title="Strategy"
              desc="Calibrating commercial risk modeling for institutional stakeholders. Mathematical optimization algorithms across global operational matrices."
              icon={Target}
              variant={2}
            />
          </div>

          {/* Column 1, Row 2 -> CARD 03 */}
          <div className="lg:col-start-1 lg:row-start-2">
            <DisciplineCard
              num="03"
              title="Infrastructure"
              desc="Designing real-time secure communications for industrial operations. Hardware-accelerated relay frameworks across complex physical environments."
              icon={Cpu}
              variant={3}
            />
          </div>

          {/* Column 2, Row 2 -> CARD 04 */}
          <div className="lg:col-start-2 lg:row-start-2">
            <DisciplineCard
              num="04"
              title="Capital Systems"
              desc="Authoring clearing-engine architectures for tier-one financial institutions. Low-latency transactional ledger systems across international compliance frameworks."
              icon={Coins}
              variant={4}
            />
          </div>

          {/* Column 3, Spans Row 1 & 2 -> FEATURED CARD */}
          <motion.div 
            custom={4}
            variants={shouldReduceMotion ? {} : lineVariants}
            className="lg:col-start-3 lg:row-start-1 lg:row-span-2 relative p-[1px] rounded-[28px] overflow-hidden group/featured flex h-full min-h-[450px]"
          >
            {/* 1px conic border living edge gradient animation */}
            <div 
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,var(--color-disp-accent-orange),transparent,var(--color-disp-accent-deep),transparent,var(--color-disp-accent-orange))] animate-conic-rotate pointer-events-none z-0"
              style={{ transformOrigin: 'center' }}
            />
            
            <div className="relative z-10 w-full h-full rounded-[27px] bg-disp-bg-panel-hi p-9 flex flex-col justify-between overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              {/* Radial bottom glow blend */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-disp-accent-orange/15 blur-3xl pointer-events-none z-0" />

              {/* Circuit illustration inside featured card */}
              <IntegratedEngineIllustration />

              <div className="relative z-10">
                {/* Pulsing bullet tag */}
                <div className="flex items-center gap-2 mb-6">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-disp-accent-orange shadow-[0_0_8px_var(--color-disp-accent-orange)]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-disp-accent-orange uppercase">
                    INTEGRATED PRACTICE — ACTIVE
                  </span>
                </div>

                <h3 className="text-3xl font-extrabold uppercase text-disp-text-primary tracking-[-0.01em] mb-4">
                  CALDEV INTEGRATED ENGINE
                </h3>
                
                <p className="text-base leading-relaxed text-[#C8C5D5] max-w-sm font-medium">
                  Unifying frontier engineering disciplines with strict commercial oversight. We coordinate secure, high-throughput systems with institutional-grade risk models.
                </p>
              </div>

              <div className="relative z-10 mt-16 lg:mt-auto space-y-6 w-full">
                {/* Practice Principle detail block */}
                <div className="border-t border-disp-border-faint pt-6">
                  <span className="text-[10px] font-mono text-disp-text-muted uppercase tracking-widest block mb-1">
                    PRACTICE PRINCIPLE
                  </span>
                  <span className="text-sm font-semibold text-disp-text-primary leading-snug block">
                    INTEGRATED ENGINEERING. FOUR DISCIPLINES. UNCOMPROMISING FIDELITY.
                  </span>
                </div>

                <MagneticButton 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02, boxShadow: '0 0 50px rgba(255,106,26,0.65)' }}
                  className="w-full h-14 bg-gradient-to-r from-disp-accent-orange to-disp-accent-deep rounded-2xl flex items-center justify-between px-8 text-[13px] font-bold uppercase tracking-[0.15em] text-[#1A0A00] shadow-[0_0_40px_rgba(255,106,26,0.5)] group/btn relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-disp-accent-orange/60"
                >
                  Request an Advisory Briefing
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}
