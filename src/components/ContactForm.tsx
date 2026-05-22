"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCalculator from "./ProjectCalculator";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center items-center flex-col">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-7xl md:text-[12rem] font-black text-white tracking-tighter leading-none mb-16 uppercase">
              Ready to <br />
              <span className="text-primary-orange italic">Engage?</span>
            </h2>
            <p className="text-white/70 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-medium">
              Partner with an elite engineering practice to build high-performance capital systems, secure industrial IoT infrastructure, and deterministic corporate strategies.
            </p>
            <motion.button
              key="trigger"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-6 bg-primary-orange text-white px-16 py-8 rounded-full text-2xl font-black uppercase tracking-widest hover:scale-105 hover:bg-white hover:text-black transition-all duration-500 shadow-[0_40px_80px_rgba(255,95,31,0.2)]"
            >
              INITIATE DIRECT CORRESPONDENCE
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="w-full"
          >
            <ProjectCalculator onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

