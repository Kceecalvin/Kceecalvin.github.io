'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GlobalBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Drift animations for glowing radial blobs
  const blob1Variants = {
    animate: {
      x: ['-20%', '30%', '10%', '-20%'],
      y: ['-10%', '20%', '-30%', '-10%'],
      scale: [1, 1.2, 0.9, 1],
      transition: {
        duration: 80,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };

  const blob2Variants = {
    animate: {
      x: ['30%', '-10%', '20%', '30%'],
      y: ['40%', '-20%', '10%', '40%'],
      scale: [1, 0.8, 1.1, 1],
      transition: {
        duration: 95,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };

  const blob3Variants = {
    animate: {
      x: ['-10%', '20%', '-20%', '-10%'],
      y: ['60%', '30%', '40%', '60%'],
      scale: [0.9, 1.1, 0.95, 0.9],
      transition: {
        duration: 70,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black select-none pointer-events-none hardware-accelerated">
      {/* 1. Ambient Background Base Dark Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,20,1)_0%,rgba(0,0,0,1)_100%)]" />

      {/* 2. Drift Glowing Radial Blobs (Bypassed if reduced motion is preferred) */}
      {!shouldReduceMotion && (
        <>
          {/* Accent Orange Blob 1 (Top Left) */}
          <motion.div
            variants={blob1Variants}
            animate="animate"
            className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary-orange/[0.08] blur-[140px] mix-blend-screen will-change-transform"
          />

          {/* Accent Orange Blob 2 (Center Right) */}
          <motion.div
            variants={blob2Variants}
            animate="animate"
            className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-primary-orange/[0.07] blur-[150px] mix-blend-screen will-change-transform"
          />

          {/* Accent Orange Blob 3 (Bottom Left) */}
          <motion.div
            variants={blob3Variants}
            animate="animate"
            className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-primary-orange/[0.05] blur-[130px] mix-blend-screen will-change-transform"
          />
        </>
      )}

      {/* 3. Static Fine Noise Texture Overlay (Opacity ~5%) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="4" 
              stitchTiles="stitch" 
            />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* 4. Subtle Mesh Grid Backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 95, 31, 0.15) 1px, transparent 0), radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
    </div>
  );
}
