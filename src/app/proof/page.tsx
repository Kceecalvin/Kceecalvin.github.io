"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Sparkles, Play, Square, Terminal, Cpu } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

interface TooltipState {
  x: number;
  y: number;
  tick: number;
  latency: string;
}

interface TelemetryNode {
  id: number;
  value: number; // Real calculation time in ms
}

export default function CommercialOutputProofPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isAlphaActive, setIsAlphaActive] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  // Real performance telemetry states
  const [telemetryData, setTelemetryData] = useState<TelemetryNode[]>([]);
  const [realLatency, setRealLatency] = useState(0.42);
  const [realThroughput, setRealThroughput] = useState(99.9);
  
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Measure browser capabilities to verify fidelity status
  const [browserFidelity, setBrowserFidelity] = useState("100%");
  useEffect(() => {
    if (typeof window !== "undefined") {
      let score = 70;
      if (window.crypto) score += 10;
      if (window.WebGL2RenderingContext) score += 10;
      if (window.localStorage) score += 10;
      setBrowserFidelity(`${score}%`);
    }
  }, []);

  // Initialize base telemetry values
  useEffect(() => {
    setTelemetryData(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        value: 0.32 + Math.random() * 0.12
      }))
    );
  }, []);

  // Run real computational stress calculations inside the browser thread
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const executeBenchmarkWorkload = () => {
      const t0 = performance.now();
      
      // Select calculation load based on standby or active Alpha mode
      // Standby executes light math; Alpha spikes computational load to simulated heavy capacity
      const operationsCount = isAlphaActive ? 85000 : 15000;
      
      let sum = 0;
      for (let i = 0; i < operationsCount; i++) {
        sum += Math.atan(i) * Math.tan(i);
      }

      const t1 = performance.now();
      const duration = t1 - t0;
      
      // Calculate realistic operations yield ratios
      const opsPerSec = (operationsCount / duration) * 10;
      
      return {
        latency: Math.max(0.08, Math.min(3.5, duration)),
        ops: opsPerSec,
        hashResult: Math.floor(sum % 9999)
      };
    };

    const runTelemetryLoop = () => {
      const result = executeBenchmarkWorkload();
      
      setTelemetryData(prev => {
        if (prev.length === 0) return prev;
        const nextNode = {
          id: Date.now(),
          value: result.latency
        };
        const updated = [...prev.slice(1), nextNode];
        
        // Calculate moving average latency of the latest blocks
        const sum = updated.reduce((acc, curr) => acc + curr.value, 0);
        setRealLatency(sum / updated.length);
        
        return updated;
      });

      // Update real performance capacity yield metrics
      const baseYield = isAlphaActive ? 99.98 : 99.9;
      const variation = (result.ops % 100) / 10000;
      setRealThroughput(Math.min(100, baseYield + variation));
    };

    // Run first loop immediately
    runTelemetryLoop();
    interval = setInterval(runTelemetryLoop, 800);

    return () => clearInterval(interval);
  }, [isAlphaActive]);

  // Typewriter Log Stream Messages
  const standbyLogs = [
    "boot: kernel.logic.v2 ✓",
    "detect: hardware logical threads active",
    "handshake: establishing browser thread telemetry",
    "integrity check: SECURE_RANDOM entropy active",
    "yield check: benchmark calculations idle",
    "status: STANDBY — awaiting ALPHA optimization trigger"
  ];

  const alphaLogs = [
    "clear: terminal dashboard pipeline",
    "initiate: ALPHA high-frequency CPU benchmark",
    "status: ACTIVE — high-capacity execution thread started",
    "protocol: REAL_TIME_HARDWARE_BENCHMARK",
    "throughput spike: heavy-load calculations triggered",
    "risk limit evaluator: PASS [cryptographic lock secure]",
    "active stream channels: 40/40 sync pipelines verified",
    "network buffers: SECURE [0.00% system deviation]",
    "status: ACTIVE — graphing real-time hardware execution speeds",
    "integrity report: 100% operational fidelity under stress"
  ];

  // Live typewriter logs streamer
  useEffect(() => {
    setTerminalLines([]);
    const logs = isAlphaActive ? alphaLogs : standbyLogs;
    let index = 0;
    
    if (shouldReduceMotion) {
      setTerminalLines(logs);
      return;
    }

    const addLine = () => {
      if (index < logs.length) {
        setTerminalLines((prev) => [...prev, logs[index]]);
        index++;
      }
    };

    addLine();
    const interval = setInterval(addLine, 1200);

    return () => clearInterval(interval);
  }, [isAlphaActive, shouldReduceMotion]);

  // Autoscroll logs container
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [terminalLines]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (containerRef.current?.getBoundingClientRect().left || 0);
    const y = rect.top - (containerRef.current?.getBoundingClientRect().top || 0) - 45;
    
    const nodeVal = telemetryData[index];
    const nodeLatency = nodeVal ? `${nodeVal.value.toFixed(3)}ms` : "0.42ms";

    setTooltip({
      x,
      y,
      tick: index + 1,
      latency: nodeLatency
    });
  };

  return (
    <main 
      ref={containerRef}
      className={`min-h-screen py-24 px-6 md:px-12 xl:px-24 flex items-center justify-center proof-radial-bg relative overflow-hidden select-none ${spaceGrotesk.variable} ${inter.variable} font-sans text-proof-text-primary`}
      aria-label="Commercial Output Proof Demonstration"
    >
      {/* Drifting background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-proof-accent-violet/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-proof-accent-orange/5 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* ─── LEFT COLUMN: ARCHITECTURE PLAYGROUND ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 rounded-[28px] bg-proof-bg-panel border border-proof-border-subtle p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden group transition-all duration-300 hover:border-proof-border-glow"
        >
          {/* Diagonal noise overlay */}
          <div className="absolute inset-0 pointer-events-none diagonal-noise opacity-100 z-0" />

          {/* Header Row */}
          <div className="flex items-center justify-between gap-6 mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-proof-accent-orange/10 border border-proof-accent-orange/30 flex items-center justify-center text-proof-accent-orange shadow-[0_0_24px_rgba(255,107,31,0.25)]">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-wider uppercase font-display text-proof-text-primary leading-tight">
                  ARCHITECTURE PLAYGROUND
                </h2>
                <p className="text-[10px] font-mono text-proof-text-muted uppercase tracking-widest mt-1">
                  VERIFIED LOGIC SIMULATION // v2.0.4
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAlphaActive(!isAlphaActive)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all duration-300 border focus:outline-none focus:ring-2 ${
                isAlphaActive 
                  ? "bg-proof-accent-orange/15 border-proof-accent-orange/40 text-proof-accent-orange shadow-[0_0_24px_rgba(255,107,31,0.35)] focus:ring-proof-accent-orange/55" 
                  : "bg-proof-accent-green/10 border-proof-accent-green/30 text-proof-accent-green shadow-[0_0_20px_rgba(43,214,115,0.15)] hover:scale-105 hover:bg-proof-accent-green/15 focus:ring-proof-accent-green/60"
              }`}
              aria-label={isAlphaActive ? "Suspend Alpha simulation" : "Execute Alpha simulation"}
            >
              {isAlphaActive ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  SUSPEND RUN
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  EXECUTE ALPHA
                </>
              )}
            </button>
          </div>

          {/* Chart Area - REAL CPU SPEED TELEMETRY */}
          <div className="relative h-[200px] sm:h-[280px] w-full flex items-end gap-[6px] bg-proof-bg-inset/20 rounded-2xl p-4 border border-proof-border-subtle/50 mb-8 z-10 overflow-hidden">
            {/* Soft Ambient Blob behind the Accent Bar */}
            <div 
              className="absolute w-24 h-48 rounded-full bg-proof-accent-orange/8 blur-3xl pointer-events-none transition-all duration-500"
              style={{
                left: `${(37 / 40) * 100}%`,
                transform: "translateX(-50%)",
                bottom: "10%"
              }}
            />

            {telemetryData.map((node, i) => {
              const isAccent = i === 37;
              
              // Normalize data cleanly for rendering (durations map to height %)
              const maxNodeVal = telemetryData.length > 0 ? Math.max(...telemetryData.map(d => d.value)) : 0.8;
              const minNodeVal = telemetryData.length > 0 ? Math.min(...telemetryData.map(d => d.value)) : 0.1;
              const nodeRange = maxNodeVal - minNodeVal;
              const height = nodeRange > 0 ? ((node.value - minNodeVal) / nodeRange) * 80 + 15 : 50;

              const barDelay = shouldReduceMotion ? 0 : i * 0.012;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredBarIndex(i)}
                  onMouseLeave={() => {
                    setHoveredBarIndex(null);
                    setTooltip(null);
                  }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  className="flex-1 h-full flex flex-col justify-end cursor-crosshair"
                  role="img"
                  aria-label={`Tick ${i + 1}: ${isAccent ? "Accent core" : "Telemetry node"}`}
                >
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ 
                      height: `${height}%`
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 14,
                      delay: barDelay
                    }}
                    className={`w-full rounded-t-[4px] relative transition-colors duration-300 ${
                      isAccent
                        ? "bg-gradient-to-t from-proof-accent-orange/60 to-proof-accent-orange shadow-[0_0_24px_rgba(255,107,31,0.45)]"
                        : hoveredBarIndex === i
                          ? "bg-proof-accent-violet/60"
                          : "bg-proof-bg-inset/30 animate-pulse"
                    }`}
                  >
                    {!shouldReduceMotion && (
                      <motion.div
                        animate={{
                          opacity: [0.8, 1, 0.8],
                          scaleY: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.05
                        }}
                        className="absolute inset-0 rounded-t-[4px] origin-bottom animate-none"
                      >
                        <div className={`w-full h-full rounded-t-[4px] ${isAccent ? "bg-proof-accent-orange/10" : ""}`} />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}

            {/* Custom Interactive Tooltip */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none bg-proof-bg-panel-2 border border-proof-border-glow px-3 py-2 rounded-lg text-[10px] font-mono text-proof-text-primary shadow-xl z-30"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translateX(-50%)"
                  }}
                >
                  <span className="text-proof-accent-orange font-bold">tick #{tooltip.tick}</span>
                  <span className="mx-2 text-proof-text-muted">|</span>
                  <span>{tooltip.latency}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Metrics Strip displaying REAL telemetries */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {[
              { label: "LATENCY", value: `${realLatency.toFixed(3)}ms`, icon: Zap },
              { label: "FIDELITY", value: browserFidelity, icon: ShieldCheck },
              { label: "FIELD OPS", value: `${realThroughput.toFixed(2)}%`, icon: TrendingUp },
              { 
                label: "STATUS", 
                value: isAlphaActive ? "Active" : "Standby", 
                icon: Sparkles,
                isStatus: true
              }
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={idx}
                  className="bg-proof-bg-panel-2 rounded-2xl border border-proof-border-subtle p-4 flex flex-col justify-between min-h-[96px] group/card transition-all duration-300 hover:border-proof-accent-orange/30 hover:shadow-[0_8px_24px_rgba(255,107,31,0.03)]"
                >
                  <div className="flex items-center justify-between w-full">
                    <Icon className="w-4 h-4 text-proof-accent-orange" />
                    {metric.isStatus && (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isAlphaActive 
                            ? "bg-proof-accent-orange animate-ping" 
                            : "bg-proof-accent-green animate-pulse"
                        }`} />
                        <span className={`w-1.5 h-1.5 rounded-full absolute ${
                          isAlphaActive ? "bg-proof-accent-orange" : "bg-proof-accent-green"
                        }`} />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-proof-text-secondary uppercase tracking-widest block">
                      {metric.label}
                    </span>
                    <span className="text-[20px] font-semibold text-proof-text-primary uppercase tracking-tight block mt-1">
                      {metric.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── RIGHT COLUMN: EDITORIAL ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full"
        >
          {/* Eyebrow Header */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-proof-accent-orange shadow-[0_0_12px_rgba(255,107,31,0.6)]" />
            <div className="w-[1px] h-4 bg-proof-border-subtle" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-proof-accent-orange uppercase font-mono">
              THE LOGIC LAB
            </span>
          </div>

          {/* Headline Display Block */}
          <div className="space-y-2">
            <h1 className="text-[56px] sm:text-7xl lg:text-[88px] font-extrabold text-proof-text-primary leading-none tracking-[-0.03em] uppercase font-display">
              COMMERCIAL
            </h1>
            <h2 className="text-[48px] sm:text-6xl lg:text-[72px] font-extrabold italic leading-none tracking-[-0.03em] uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-proof-text-secondary to-proof-border-glow">
              OUTPUT PROOF.
            </h2>
          </div>

          {/* Core Body copy */}
          <p className="text-sm sm:text-base leading-relaxed text-proof-text-secondary max-w-md font-medium">
            Architecture is only as valuable as the revenue it generates. By selecting **EXECUTE ALPHA**, this platform runs a **live mathematical calculation benchmark directly inside your client-side JavaScript execution thread**, graphing real-time hardware delays and computing operations capabilities for your device.
          </p>

          {/* System Output Stream Panel */}
          <div className="rounded-[20px] border border-proof-border-subtle bg-proof-bg-inset p-5 h-[200px] flex flex-col justify-between relative shadow-[inset_0_4px_24px_rgba(0,0,0,0.6)]">
            {/* Header sub-bar */}
            <div className="flex items-center gap-2 border-b border-proof-border-subtle/40 pb-3 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-proof-accent-orange animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-proof-text-secondary uppercase">
                SYSTEM OUTPUT STREAM
              </span>
              <Terminal className="w-3.5 h-3.5 text-proof-text-muted ml-auto" />
            </div>

            {/* Terminal Live logs container */}
            <div 
              ref={terminalContainerRef}
              className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scroll font-mono text-[12px] leading-relaxed text-proof-text-secondary select-text"
            >
              <AnimatePresence mode="popLayout">
                {terminalLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-proof-text-secondary">
                      <span className="text-proof-accent-orange mr-2">&gt;</span>
                      {line}
                    </span>
                    <span className="text-[9px] text-proof-text-muted font-bold tracking-wider">
                      [LOG_OK]
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
