'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

export default function VideoPlayer({ isOpen, onClose, videoUrl }: { isOpen: boolean; onClose: () => void; videoUrl: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 sm:p-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110]"
          >
            <X className="w-10 h-10" strokeWidth={1} />
          </button>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-obsidian"
          >
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={isOpen}
              controls
            />
          </motion.div>

          {/* Cinematic Flourish */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-[0.05]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
