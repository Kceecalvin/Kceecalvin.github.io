'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Coins, Cpu, Target, ArrowRight, Activity, Settings, TrendingUp } from 'lucide-react';
import MagneticButton from './MagneticButton';

// ─── CAPABILITY 1 INTERACTIVE COMPONENT: CAPITAL SYSTEMS LEDGER ───
const CapitalLedgerSimulator = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const [throughput, setThroughput] = useState(2); // 1 to 5 scale
  const [activePulse, setActivePulse] = useState(0);

  // Auto cycling pulse animation
  useEffect(() => {
    if (shouldReduceMotion) return;
    const intervalTime = Math.max(200, 1000 - throughput * 180);
    const interval = setInterval(() => {
      setActivePulse(prev => (prev + 1) % 4);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [throughput, shouldReduceMotion]);

  const ledgerNodes = [
    { id: 1, label: 'ORDER_INBOUND', x: 20, y: 70 },
    { id: 2, label: 'LEDGER_DISPATCH', x: 110, y: 70 },
    { id: 3, label: 'RISK_VAL', x: 110, y: 20 },
    { id: 4, label: 'SETTLED', x: 200, y: 70 },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Area */}
      <div className="relative h-28 w-full bg-disp-bg-inset rounded-2xl border border-disp-border-faint flex items-center justify-center p-4 overflow-hidden">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 220 90" aria-hidden="true">
          <defs>
            <linearGradient id="ledger-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-disp-accent-orange)" stopOpacity={0.1} />
              <stop offset="50%" stopColor="var(--color-disp-accent-orange)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="var(--color-disp-accent-amber)" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          <line x1={20} y1={70} x2={110} y2={70} stroke="url(#ledger-line-grad)" strokeWidth={1.5} />
          <line x1={110} y1={70} x2={110} y2={20} stroke="url(#ledger-line-grad)" strokeWidth={1.5} />
          <line x1={110} y1={70} x2={200} y2={70} stroke="url(#ledger-line-grad)" strokeWidth={1.5} />

          {/* Glowing Pulses */}
          {!shouldReduceMotion && (
            <>
              {activePulse === 0 && (
                <motion.circle
                  cx={20}
                  cy={70}
                  r={3.5}
                  fill="var(--color-disp-accent-orange)"
                  animate={{ cx: [20, 110] }}
                  transition={{ duration: 0.6, ease: 'linear' }}
                />
              )}
              {activePulse === 1 && (
                <motion.circle
                  cx={110}
                  cy={70}
                  r={3.5}
                  fill="var(--color-disp-accent-amber)"
                  animate={{ cy: [70, 20] }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              )}
              {activePulse === 2 && (
                <motion.circle
                  cx={110}
                  cy={70}
                  r={3.5}
                  fill="var(--color-disp-accent-orange)"
                  animate={{ cx: [110, 200] }}
                  transition={{ duration: 0.6, ease: 'linear' }}
                />
              )}
            </>
          )}

          {/* Render Nodes */}
          {ledgerNodes.map(node => {
            const isActive = 
              (node.id === 1 && activePulse === 0) ||
              (node.id === 3 && activePulse === 1) ||
              (node.id === 2 && activePulse === 1) ||
              (node.id === 4 && activePulse === 2);

            return (
              <g key={node.id}>
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={7}
                    fill="var(--color-disp-accent-orange)"
                    opacity={0.3}
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={4}
                  fill={isActive ? 'var(--color-disp-accent-orange)' : 'var(--color-disp-border-warm)'}
                  stroke="#0E0D14"
                  strokeWidth={1}
                  className="transition-colors duration-300"
                />
                <text
                  x={node.x}
                  y={node.y + 12}
                  textAnchor="middle"
                  fill={isActive ? 'var(--color-disp-text-primary)' : 'var(--color-disp-text-muted)'}
                  className="text-[6px] font-mono tracking-wider transition-colors duration-300 uppercase"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Metrics overlay */}
        <div className="absolute top-2 right-3 font-mono text-[8px] text-right space-y-0.5 text-disp-text-muted bg-disp-bg-panel-hi/90 border border-disp-border-faint px-2 py-1 rounded-md backdrop-blur-sm">
          <div>TPS: <span className="text-disp-accent-orange font-bold">{(throughput * 28.4).toFixed(1)}k/s</span></div>
          <div>DELAY: <span className="text-disp-text-primary">{(12 / throughput).toFixed(2)}μs</span></div>
        </div>
      </div>

      {/* Micro Cockpit Control Panel */}
      <div className="bg-disp-bg-panel-hi rounded-xl p-3 border border-disp-border-faint flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 min-w-[70px]">
          <span className="text-[7px] font-mono text-disp-text-muted uppercase tracking-widest">THROUGHPUT</span>
          <span className="text-[10px] font-bold text-disp-text-primary uppercase tracking-wide">
            RATE — 0{throughput}
          </span>
        </div>
        <input 
          type="range"
          min="1"
          max="5"
          value={throughput}
          onChange={(e) => setThroughput(Number(e.target.value))}
          className="flex-1 h-[3px] bg-disp-bg-inset rounded-lg appearance-none cursor-pointer accent-disp-accent-orange outline-none focus:ring-1 focus:ring-disp-accent-orange/40"
          aria-label="Adjust Throughput Ratio"
        />
      </div>
    </div>
  );
};

// ─── CAPABILITY 2 INTERACTIVE COMPONENT: EMBEDDED REGISTER sweeps ───
const EmbeddedRegistrySimulator = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const [clockSpeed, setClockSpeed] = useState(2); // 1 to 4 scale
  const [hexVal, setHexVal] = useState('0x8F9F');

  // Random HEX sweep logic
  useEffect(() => {
    if (shouldReduceMotion) return;
    const intervalTime = Math.max(150, 800 - clockSpeed * 180);
    const hexChars = '0123456789ABCDEF';
    
    const interval = setInterval(() => {
      let result = '0x';
      for (let i = 0; i < 4; i++) {
        result += hexChars[Math.floor(Math.random() * 16)];
      }
      setHexVal(result);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [clockSpeed, shouldReduceMotion]);

  return (
    <div className="w-full space-y-4">
      {/* Circuit & Memory Sweep Board */}
      <div className="relative h-28 w-full bg-disp-bg-inset rounded-2xl border border-disp-border-faint p-4 flex items-center justify-between overflow-hidden">
        
        {/* Vector Microchip Graphics */}
        <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 80 80" aria-hidden="true">
            <rect x={20} y={20} width={40} height={40} rx={4} fill="none" stroke="var(--color-disp-border-warm)" strokeWidth={1} />
            <rect x={25} y={25} width={30} height={30} rx={2} fill="none" stroke="var(--color-disp-border-faint)" strokeWidth={1} />
            
            {/* Pins */}
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={i}>
                {/* Left pins */}
                <line x1={10} y1={28 + i * 8} x2={20} y2={28 + i * 8} stroke="var(--color-disp-border-faint)" strokeWidth={1} />
                {/* Right pins */}
                <line x1={60} y1={28 + i * 8} x2={70} y2={28 + i * 8} stroke="var(--color-disp-border-faint)" strokeWidth={1} />
                {/* Top pins */}
                <line x1={28 + i * 8} y1={10} x2={28 + i * 8} y2={20} stroke="var(--color-disp-border-faint)" strokeWidth={1} />
                {/* Bottom pins */}
                <line x1={28 + i * 8} y1={60} x2={28 + i * 8} y2={70} stroke="var(--color-disp-border-faint)" strokeWidth={1} />
              </g>
            ))}

            {/* Glowing heartbeat pulse inside chip */}
            {!shouldReduceMotion && (
              <motion.rect
                x={26}
                y={26}
                width={28}
                height={28}
                rx={1}
                fill="var(--color-disp-accent-orange)"
                opacity={0.04}
                animate={{ opacity: [0.02, 0.12, 0.02] }}
                transition={{ duration: 1.5 / clockSpeed, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </svg>
          <Cpu className="w-5 h-5 text-disp-accent-orange z-10" />
        </div>

        {/* Real-time memory registry cascade */}
        <div className="flex-1 font-mono text-[9px] pl-4 space-y-1.5 flex flex-col justify-center border-l border-disp-border-faint h-full">
          <div className="flex justify-between items-center text-disp-text-muted">
            <span>REG_ADDR</span>
            <span className="text-disp-accent-orange font-bold">{hexVal}</span>
          </div>
          <div className="flex justify-between items-center text-disp-text-muted">
            <span>SYS_FREQ</span>
            <span className="text-disp-text-primary">{(clockSpeed * 100).toFixed(0)} MHz</span>
          </div>
          <div className="flex justify-between items-center text-disp-text-muted">
            <span>EDGE_CRYPTO</span>
            <span className="text-[#2BD673] font-bold text-[8px] tracking-wide">SECURE_OK</span>
          </div>
        </div>
      </div>

      {/* Micro Cockpit Control Panel */}
      <div className="bg-disp-bg-panel-hi rounded-xl p-3 border border-disp-border-faint flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 min-w-[70px]">
          <span className="text-[7px] font-mono text-disp-text-muted uppercase tracking-widest">CLOCK FREQ</span>
          <span className="text-[10px] font-bold text-disp-text-primary uppercase tracking-wide">
            {clockSpeed}.00x SPEED
          </span>
        </div>
        <input 
          type="range"
          min="1"
          max="4"
          value={clockSpeed}
          onChange={(e) => setClockSpeed(Number(e.target.value))}
          className="flex-1 h-[3px] bg-disp-bg-inset rounded-lg appearance-none cursor-pointer accent-disp-accent-orange outline-none focus:ring-1 focus:ring-disp-accent-orange/40"
          aria-label="Adjust Clock Speed"
        />
      </div>
    </div>
  );
};

// ─── CAPABILITY 3 INTERACTIVE COMPONENT: COMMERCIAL STRATEGY REGRESSION ───
const StrategyRegressionSimulator = ({ isHovered }: { isHovered: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const [leverage, setLeverage] = useState(2); // 1 to 4 scale
  const [activeCoord, setActiveCoord] = useState({ x: 110, y: 45 });

  // Interpolate optimized coordinate point coordinates
  useEffect(() => {
    const scaleFactors = [
      { x: 60, y: 70 },
      { x: 105, y: 40 },
      { x: 145, y: 25 },
      { x: 190, y: 15 }
    ];
    const index = Math.min(leverage - 1, 3);
    setActiveCoord(scaleFactors[index]);
  }, [leverage]);

  const regressionPoints = [
    { x: 30, y: 80 },
    { x: 60, y: 68 },
    { x: 90, y: 55 },
    { x: 120, y: 38 },
    { x: 150, y: 30 },
    { x: 180, y: 18 }
  ];

  return (
    <div className="w-full space-y-4">
      {/* Regression Coordinates Board */}
      <div className="relative h-28 w-full bg-disp-bg-inset rounded-2xl border border-disp-border-faint p-4 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 220 90" aria-hidden="true">
          
          {/* Axis indicators */}
          <line x1={15} y1={85} x2={210} y2={85} stroke="var(--color-disp-border-faint)" strokeWidth={1} />
          <line x1={15} y1={5} x2={15} y2={85} stroke="var(--color-disp-border-faint)" strokeWidth={1} />

          {/* Dynamic regression path line */}
          <motion.path
            d={`M 15,85 Q 90,50 ${activeCoord.x},${activeCoord.y} T 210,10`}
            fill="none"
            stroke="var(--color-disp-accent-orange)"
            strokeWidth={1.5}
            animate={{ d: `M 15,85 Q 85,55 ${activeCoord.x},${activeCoord.y} T 210,12` }}
            transition={{ type: 'spring', stiffness: 70, damping: 12 }}
            opacity={0.6}
          />

          {/* Scatter nodes */}
          {regressionPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={1.8}
              fill="var(--color-disp-text-muted)"
              opacity={0.3}
            />
          ))}

          {/* Primary target optimization node */}
          <motion.g
            animate={{ x: activeCoord.x, y: activeCoord.y }}
            transition={{ type: 'spring', stiffness: 85, damping: 10 }}
          >
            {!shouldReduceMotion && (
              <circle cx={0} cy={0} r={6} fill="var(--color-disp-accent-orange)" opacity={0.25} className="animate-pulse" />
            )}
            <circle cx={0} cy={0} r={3} fill="var(--color-disp-accent-orange)" stroke="#0E0D14" strokeWidth={1} />
          </motion.g>
        </svg>

        {/* Live Metrics overlay */}
        <div className="absolute top-2 right-3 font-mono text-[8px] text-right space-y-0.5 text-disp-text-muted bg-disp-bg-panel-hi/90 border border-disp-border-faint px-2 py-1 rounded-md backdrop-blur-sm">
          <div>YIELD_COEFF: <span className="text-disp-accent-orange font-bold">{(leverage * 1.42).toFixed(2)}x</span></div>
          <div>RISK_DELTA: <span className="text-disp-text-primary">{(0.08 / leverage).toFixed(4)}%</span></div>
        </div>
      </div>

      {/* Micro Cockpit Control Panel */}
      <div className="bg-disp-bg-panel-hi rounded-xl p-3 border border-disp-border-faint flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 min-w-[70px]">
          <span className="text-[7px] font-mono text-disp-text-muted uppercase tracking-widest">RISK LEVERAGE</span>
          <span className="text-[10px] font-bold text-disp-text-primary uppercase tracking-wide">
            INDEX — 0{leverage}
          </span>
        </div>
        <input 
          type="range"
          min="1"
          max="4"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="flex-1 h-[3px] bg-disp-bg-inset rounded-lg appearance-none cursor-pointer accent-disp-accent-orange outline-none focus:ring-1 focus:ring-disp-accent-orange/40"
          aria-label="Adjust Risk Leverage"
        />
      </div>
    </div>
  );
};

// ─── REUSABLE CAPABILITY CARD COMPONENT ───
interface CapabilityCardProps {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  icon: React.ComponentType<any>;
  variant: 1 | 2 | 3;
}

function CapabilityCard({ num, title, desc, tags, icon: Icon, variant }: CapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const renderSimulator = () => {
    switch (variant) {
      case 1: return <CapitalLedgerSimulator isHovered={isHovered} />;
      case 2: return <EmbeddedRegistrySimulator isHovered={isHovered} />;
      case 3: return <StrategyRegressionSimulator isHovered={isHovered} />;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative rounded-[36px] bg-disp-bg-panel border border-disp-border-faint hover:border-disp-border-warm p-8 sm:p-10 min-h-[380px] overflow-hidden flex flex-col justify-between group shadow-[0_45px_90px_-35px_rgba(0,0,0,0.75)] cursor-pointer select-none transition-colors duration-300 w-full"
    >
      {/* Custom hover bottom bloom glow */}
      <AnimatePresence>
        {isHovered && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at bottom, rgba(255,106,26,0.18), transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Top Section */}
      <div className="relative z-10 space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-mono font-bold text-disp-accent-orange tracking-widest block">
            CAP-{num}
          </span>
          <div className="w-10 h-10 rounded-xl bg-disp-bg-inset border border-disp-border-faint flex items-center justify-center text-disp-accent-orange group-hover:border-disp-accent-orange/30 transition-all duration-300">
            <Icon className="w-5 h-5 text-disp-accent-orange" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-disp-text-primary uppercase font-display">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-disp-text-secondary">
            {desc}
          </p>
        </div>
      </div>

      {/* Central Visual Simulator Component */}
      <div className="relative z-10 my-8 w-full">
        {renderSimulator()}
      </div>

      {/* Bottom Tags */}
      <div className="relative z-10 w-full pt-4 border-t border-disp-border-faint">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] font-mono font-bold uppercase tracking-wider text-disp-accent-orange bg-disp-accent-orange/5 hover:bg-disp-accent-orange/15 px-2.5 py-1 rounded-full border border-disp-accent-orange/10 hover:border-disp-accent-orange/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN ENGINEERING CAPABILITIES SECTION ───
export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.section 
      id="services" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={containerVariants}
      className="relative py-24 sm:py-32 px-6 bg-disp-bg-base overflow-hidden border-b border-disp-border-faint select-none w-full flex flex-col items-center"
      aria-label="Caldev Engineering Capabilities Overview"
    >
      {/* ─── ATMOSPHERIC BACKGROUND BLOBS ─── */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-[#0B0A0F] opacity-40 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#FF6A1A]/6 blur-[150px] pointer-events-none z-0" />

      {/* Radical masked micro-grid */}
      <div 
        className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none z-0"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
          maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16 sm:space-y-24">
        
        {/* ─── HEADER AREA ─── */}
        <div className="flex flex-col items-start text-left space-y-6">
          <motion.div 
            variants={textVariants}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-disp-accent-orange animate-pulse" />
            <span className="text-disp-accent-orange font-mono font-bold text-xs uppercase tracking-[0.3em] block">
              Capabilities
            </span>
          </motion.div>
          
          <motion.h2 
            variants={textVariants}
            className="text-5xl sm:text-7xl md:text-[88px] font-extrabold text-disp-text-primary tracking-[-0.04em] leading-[0.9] uppercase font-display"
          >
            Engineering <br />
            Capabilities
          </motion.h2>
        </div>

        {/* ─── BENTO GRID 3x1 ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
          
          {/* Capability Card 1 */}
          <CapabilityCard
            num="01"
            title="Capital Systems Architecture"
            desc="Designing sovereign algorithmic clearing environments and automated asset processing matrices."
            tags={['LIQUIDITY', 'QUANTITATIVE', 'HFT PROTOCOLS', 'SYSTEMIC SCALE']}
            icon={Coins}
            variant={1}
          />

          {/* Capability Card 2 */}
          <CapabilityCard
            num="02"
            title="Embedded Engineering"
            desc="Engineering secure, hardware-abstracted transaction networks for distributed edge environments."
            tags={['EDGE NODES', 'TLS PROTOCOLS', 'CRYPTOGRAPHIC SoC', 'REAL-TIME TELEMETRY']}
            icon={Cpu}
            variant={2}
          />

          {/* Capability Card 3 */}
          <CapabilityCard
            num="03"
            title="Commercial Strategy"
            desc="Formulating deterministic optimization logic to coordinate complex corporate resource networks."
            tags={['OPERATIONAL LEVERAGE', 'DECISION LOGIC', 'SCALE MATRIX', 'MAXIMUM YIELD']}
            icon={Target}
            variant={3}
          />

        </div>
      </div>
    </motion.section>
  );
}
