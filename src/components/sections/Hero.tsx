"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Glitch text component
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`glitch-wrapper ${className}`}>
      <span className="glitch-text" data-text={text}>{text}</span>
    </span>
  );
}

// Typing effect with cursor
function TypeWriter({
  text,
  delay = 0,
  speed = 50,
  onComplete,
  showCursor = true
}: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started || done) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [displayed, text, speed, started, done, onComplete]);

  return (
    <span>
      {displayed}
      {showCursor && !done && started && <span className="cursor" />}
    </span>
  );
}

// Progress bar animation
function HackProgress({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(p + increment, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  const filled = Math.floor(progress / 5);
  const empty = 20 - filled;

  return (
    <div className="font-mono">
      <div className="flex items-center gap-2">
        <span className="text-[--green-dim]">[</span>
        <span className="glow">{"█".repeat(filled)}</span>
        <span className="text-[--green-dim] opacity-30">{"░".repeat(empty)}</span>
        <span className="text-[--green-dim]">]</span>
        <span className="text-[--green] glow w-16">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

// Random data stream
function DataStream() {
  const [lines, setLines] = useState<string[]>([]);
  const chars = "0123456789ABCDEF";

  useEffect(() => {
    const generateLine = () => {
      const addr = Array(8).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
      const data = Array(32).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(" ").match(/.{1,2}/g)?.join(" ");
      return `0x${addr}: ${data}`;
    };

    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, generateLine()];
        return newLines.slice(-6);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[--green-dim] text-xs opacity-60 font-mono overflow-hidden h-24">
      {lines.map((line, i) => (
        <div key={i} className="truncate">{line}</div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState(0);
  // 0: Initial - ACCESS DENIED
  // 1: Hacking started
  // 2: Progress bar
  // 3: ACCESS GRANTED
  // 4: Profile loading
  // 5: Profile revealed

  useEffect(() => {
    // Start sequence
    const timer = setTimeout(() => setPhase(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* HUD corners */}
      <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-[--green] opacity-50" />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-50"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {/* Phase 0: Access Denied */}
          {phase === 0 && (
            <motion.div
              key="denied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-4xl md:text-6xl font-bold text-red-500"
                style={{ textShadow: "0 0 20px rgba(255,0,0,0.8)" }}
              >
                ⚠ ACCESS DENIED ⚠
              </motion.div>
              <div className="mt-4 text-[--green-dim]">
                UNAUTHORIZED ACCESS ATTEMPT DETECTED
              </div>
            </motion.div>
          )}

          {/* Phase 1: Hacking initiated */}
          {phase === 1 && (
            <motion.div
              key="hacking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[--green-dim]">
                <span className="text-[--green]">[SYSTEM]</span> Initializing bypass protocol...
              </div>
              <DataStream />
              <div className="text-[--green]">
                <TypeWriter
                  text="► FIREWALL BREACH DETECTED..."
                  speed={30}
                  onComplete={() => setTimeout(() => setPhase(2), 500)}
                />
              </div>
            </motion.div>
          )}

          {/* Phase 2: Progress */}
          {phase === 2 && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[--green] glow text-xl">
                ► BYPASSING SECURITY...
              </div>
              <HackProgress onComplete={() => setPhase(3)} />
              <DataStream />
            </motion.div>
          )}

          {/* Phase 3: Access Granted */}
          {phase === 3 && (
            <motion.div
              key="granted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0.8, 1] }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-[--green] glow"
              >
                ✓ ACCESS GRANTED ✓
              </motion.div>
              <motion.div
                className="mt-4 text-[--green-dim]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypeWriter
                  text="Loading user profile..."
                  delay={500}
                  onComplete={() => setTimeout(() => setPhase(4), 800)}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Phase 4 & 5: Profile */}
          {phase >= 4 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Terminal header */}
              <div className="border border-[--green] rounded-sm overflow-hidden">
                <div className="bg-[--green] bg-opacity-20 px-4 py-2 flex items-center justify-between border-b border-[--green]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[--green] text-sm">root@artem-system:~</span>
                  <div className="w-16" />
                </div>

                <div className="p-4 md:p-6 space-y-4">
                  {/* Mobile: Simple text name */}
                  <motion.div
                    className="md:hidden text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl font-bold text-[--green] glow">ARTEM</h1>
                    <h1 className="text-3xl font-bold text-[--green] glow">SHKONDA</h1>
                  </motion.div>

                  {/* Desktop: ASCII Art Name */}
                  <motion.pre
                    className="hidden md:block text-[--green] glow text-xs lg:text-sm overflow-x-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
{`
 █████╗ ██████╗ ████████╗███████╗███╗   ███╗
██╔══██╗██╔══██╗╚══██╔══╝██╔════╝████╗ ████║
███████║██████╔╝   ██║   █████╗  ██╔████╔██║
██╔══██║██╔══██╗   ██║   ██╔══╝  ██║╚██╔╝██║
██║  ██║██║  ██║   ██║   ███████╗██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
        ███████╗██╗  ██╗██╗  ██╗ ██████╗ ███╗   ██╗██████╗  █████╗
        ██╔════╝██║  ██║██║ ██╔╝██╔═══██╗████╗  ██║██╔══██╗██╔══██╗
        ███████╗███████║█████╔╝ ██║   ██║██╔██╗ ██║██║  ██║███████║
        ╚════██║██╔══██║██╔═██╗ ██║   ██║██║╚██╗██║██║  ██║██╔══██║
        ███████║██║  ██║██║  ██╗╚██████╔╝██║ ╚████║██████╔╝██║  ██║
        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝
`}
                  </motion.pre>

                  {/* Profile data */}
                  <motion.div
                    className="space-y-2 text-sm md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[--green-dim]">$</span>
                      <span className="text-[--green-dim]">cat</span>
                      <span className="text-[--green]">profile.txt</span>
                    </div>

                    <div className="pl-3 md:pl-4 border-l-2 border-[--green-dim] space-y-1">
                      <div>
                        <span className="text-[--green-dim]">ROLE:</span>{" "}
                        <GlitchText text="BACKEND DEVELOPER" className="glow" />
                      </div>
                      <div>
                        <span className="text-[--green-dim]">STACK:</span>{" "}
                        <span className="glow text-xs md:text-lg">NODE.JS / TYPESCRIPT / POSTGRESQL</span>
                      </div>
                      <div>
                        <span className="text-[--green-dim]">EXP:</span>{" "}
                        <span className="glow">5+ YEARS</span>
                      </div>
                      <div>
                        <span className="text-[--green-dim]">LOCATION:</span>{" "}
                        <span className="glow">KYIV, UKRAINE</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Command prompt */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[--green-dim]">$</span>
                      <TypeWriter text="./explore_profile.sh" delay={1000} speed={50} />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center"
              >
                <a href="#contact" className="btn-cyber group text-sm md:text-base">
                  <span className="btn-cyber-glitch" data-text="[ CONTACT ]">[ CONTACT ]</span>
                </a>
                <a href="#projects" className="btn-cyber group text-sm md:text-base">
                  <span className="btn-cyber-glitch" data-text="[ PROJECTS ]">[ PROJECTS ]</span>
                </a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center pt-8"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[--green-dim]"
                >
                  <div className="text-sm mb-2">SCROLL TO EXPLORE</div>
                  <div className="text-2xl">▼</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
