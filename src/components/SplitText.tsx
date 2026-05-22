'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  type?: 'chars' | 'words';
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export default function SplitText({
  text,
  className = '',
  type = 'chars',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.03,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  // Base containers
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      filter: 'blur(12px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const, // Expo-out curve
      },
    },
  };

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={`inline-block ${className}`}
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              variants={itemVariants}
              className="inline-block will-change-[transform,opacity,filter]"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Split by characters
  // Preserves spaces between words
  const characters = text.split('');
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-block ${className}`}
    >
      {characters.map((char, idx) => (
        <span
          key={idx}
          className={`inline-block will-change-[transform,opacity,filter] ${
            char === ' ' ? 'mr-[0.25em]' : ''
          }`}
        >
          <motion.span variants={itemVariants} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
