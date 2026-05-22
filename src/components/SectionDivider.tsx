'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 overflow-hidden">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-orange/25 to-transparent origin-center"
      />
    </div>
  );
}
