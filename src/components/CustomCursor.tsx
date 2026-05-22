'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse positions using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for the trailing ring (lerp effect)
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch devices or if reduced motion is requested
    if (shouldReduceMotion) return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';

      setIsHovered(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <>
      {/* 1. Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary-orange rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* 2. Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-primary-orange rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(255, 95, 31, 0.15)' : 'rgba(255, 95, 31, 0)',
          borderColor: isHovered ? '#FFFFFF' : '#FF5F1F',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
    </>
  );
}
