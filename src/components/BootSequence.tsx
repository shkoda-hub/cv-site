"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    "BIOS v2.4.1 initializing...",
    "Memory test: 16384 KB OK",
    "CPU: Intel Core i9 @ 3.6GHz",
    "Detecting drives...",
    "Loading ArtemOS v1.0.0...",
    "Initializing neural interface...",
    "Connecting to mainframe...",
    "STATUS: ALL SYSTEMS OPERATIONAL",
    "",
    "Welcome, User.",
  ];

  useEffect(() => {
    // Stage 0: Black screen
    // Stage 1: CRT turn on effect
    // Stage 2: Boot text
    // Stage 3: Complete

    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (stage !== 2) return;

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootLines.length) {
        setLines((prev) => [...prev, bootLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStage(3), 800);
        setTimeout(onComplete, 1500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* CRT Turn on effect */}
          {stage >= 1 && (
            <motion.div
              initial={{ scaleY: 0.005, scaleX: 0, opacity: 1 }}
              animate={{
                scaleY: stage >= 2 ? 1 : 0.005,
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                scaleX: { duration: 0.3, ease: "easeOut" },
                scaleY: { duration: 0.4, delay: 0.3, ease: "easeOut" },
              }}
              className="w-full max-w-4xl mx-4 aspect-[4/3] bg-[#0a0a0a] rounded-lg overflow-hidden border-2 border-[#333] relative"
              style={{
                boxShadow: "0 0 100px rgba(51, 255, 51, 0.3), inset 0 0 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)",
                }}
              />

              {/* Content */}
              <div className="p-8 font-mono text-[#33ff33] text-sm md:text-base h-full overflow-hidden">
                {stage >= 2 && (
                  <div className="space-y-1">
                    {lines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{ textShadow: "0 0 10px rgba(51, 255, 51, 0.8)" }}
                      >
                        {line || "\u00A0"}
                      </motion.div>
                    ))}
                    {lines.length < bootLines.length && (
                      <span className="inline-block w-3 h-5 bg-[#33ff33] animate-pulse" />
                    )}
                  </div>
                )}
              </div>

              {/* CRT glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </motion.div>
          )}

          {/* Initial flash */}
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
