'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  magneticRange?: number;
  magneticStrength?: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function MagneticButton({
  children,
  className = '',
  magneticRange = 60,
  magneticStrength = 0.35,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Motion values for x/y translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Relative coordinates from center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < magneticRange) {
      // Pull strength increases the closer you get, up to magneticStrength multiplier
      const force = (magneticRange - distance) / magneticRange;
      x.set(distanceX * force * magneticStrength);
      y.set(distanceY * force * magneticStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const { left, top } = ref.current.getBoundingClientRect();
    const clickX = e.clientX - left;
    const clickY = e.clientY - top;

    const newRipple = {
      x: clickX,
      y: clickY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(e);
    }
  };

  // Clean up ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden cursor-pointer select-none transition-colors duration-300 will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
