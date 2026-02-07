"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const capabilities = [
  { icon: "⚡", text: "REST & GRAPHQL API DESIGN" },
  { icon: "🔧", text: "MICROSERVICES ARCHITECTURE" },
  { icon: "📊", text: "DATABASE OPTIMIZATION" },
  { icon: "🚀", text: "CI/CD PIPELINES" },
  { icon: "💪", text: "HIGH-LOAD SYSTEMS" },
];

const stats = [
  { value: 5, suffix: "+", label: "YEARS EXP" },
  { value: 30, suffix: "+", label: "PROJECTS" },
  { value: 99, suffix: ".9%", label: "UPTIME" },
];

function TypeWriter({
  text,
  onComplete,
  speed = 30
}: {
  text: string;
  onComplete?: () => void;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

function AnimatedStat({
  value,
  suffix,
  label,
  isActive,
  onComplete
}: {
  value: number;
  suffix: string;
  label: string;
  isActive: boolean;
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!isActive || complete) return;

    let current = 0;
    const duration = 1000;
    const steps = 20;
    const increment = value / steps;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        setComplete(true);
        clearInterval(interval);
        setTimeout(onComplete, 100);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isActive, value, complete, onComplete]);

  return (
    <motion.div
      className={`text-center p-4 border transition-all ${
        complete ? "border-[--green]" : isActive ? "border-[--green]" : "border-[--green-dim]"
      }`}
      animate={isActive && !complete ? { borderColor: ["var(--green)", "var(--green-dim)", "var(--green)"] } : {}}
      transition={{ duration: 0.5, repeat: isActive && !complete ? Infinity : 0 }}
    >
      <div className="text-4xl">
        <span className={complete ? "glow" : ""} style={{ color: complete ? "var(--green)" : "var(--green-dim)" }}>
          {count}{suffix}
        </span>
      </div>
      <div className="text-[--green-dim] text-sm mt-1">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState(0);
  // 0: idle, 1: loading, 2: greeting, 3: description, 4: capabilities, 5: stats, 6: complete
  const [loadProgress, setLoadProgress] = useState(0);
  const [capIndex, setCapIndex] = useState(-1);
  const [statIndex, setStatIndex] = useState(-1);
  const [headerStatus, setHeaderStatus] = useState("IDLE");

  // Start when in view
  useEffect(() => {
    if (isInView && phase === 0) {
      setPhase(1);
      setHeaderStatus("LOADING");
    }
  }, [isInView, phase]);

  // Phase 1: Loading
  useEffect(() => {
    if (phase !== 1) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress >= 100) {
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase(2);
          setHeaderStatus("READING");
        }, 200);
      } else {
        setLoadProgress(progress);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 3: After description, move to capabilities
  useEffect(() => {
    if (phase !== 3) return;
    const timer = setTimeout(() => {
      setPhase(4);
      setCapIndex(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Phase 4: Capabilities one by one
  useEffect(() => {
    if (phase !== 4 || capIndex < 0) return;

    if (capIndex >= capabilities.length) {
      setTimeout(() => {
        setPhase(5);
        setStatIndex(0);
      }, 300);
      return;
    }

    const timer = setTimeout(() => {
      setCapIndex(capIndex + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [phase, capIndex]);

  // Phase 5: Stats one by one
  useEffect(() => {
    if (phase !== 5) return;
    if (statIndex >= stats.length) {
      setTimeout(() => {
        setPhase(6);
        setHeaderStatus("COMPLETE");
      }, 300);
    }
  }, [phase, statIndex]);

  return (
    <section id="about" className="py-20 px-6 relative">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-[--green]"
            style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
            animate={{ scaleX: [0, 1, 0], originX: i % 2 === 0 ? 0 : 1 }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="border border-[--green] bg-black bg-opacity-80 relative overflow-hidden"
        >
          {/* HUD corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[--green]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[--green]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[--green]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[--green]" />

          {/* Scanning line */}
          {phase < 6 && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-30"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Header */}
          <div className="border-b border-[--green] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[--green-dim] text-sm">about_me.dat</span>
            </div>
            <motion.div
              className="flex items-center gap-2 text-sm"
              animate={phase < 6 ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: phase < 6 ? Infinity : 0 }}
            >
              <span className={`w-2 h-2 rounded-full ${phase === 6 ? "bg-[--green]" : "bg-[--green]"}`} />
              <span className="text-[--green-dim]">{headerStatus}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Command */}
            <div className="flex items-center gap-2 text-[--green-dim]">
              <span>$</span>
              <span>cat about_me.txt</span>
            </div>

            {/* Phase 1: Loading */}
            {phase === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
                <div className="text-[--green] glow mb-4">LOADING PROFILE DATA...</div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[--green-dim]">[</span>
                  <div className="flex-1 h-4 bg-[--green-dim] bg-opacity-20 overflow-hidden">
                    <motion.div
                      className="h-full bg-[--green]"
                      style={{ width: `${loadProgress}%`, boxShadow: "0 0 10px var(--green)" }}
                    />
                  </div>
                  <span className="text-[--green-dim]">]</span>
                  <span className="text-[--green] w-12">{Math.floor(loadProgress)}%</span>
                </div>
              </motion.div>
            )}

            {/* Phase 2+: Content */}
            {phase >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Greeting */}
                <div className="text-xl glow">
                  <TypeWriter
                    text="► GREETINGS, HUMAN."
                    onComplete={() => setTimeout(() => setPhase(3), 300)}
                  />
                </div>

                {/* Description */}
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg space-y-4 pl-4 border-l-2 border-[--green-dim]"
                  >
                    <p>
                      I AM A <span className="glow text-[--green]">BACKEND DEVELOPER</span> SPECIALIZING IN
                      BUILDING SCALABLE SYSTEMS AND HIGH-PERFORMANCE APIs.
                    </p>
                    <p>
                      PRIMARY WEAPON: <span className="glow neon-text">NODE.JS</span>
                    </p>
                  </motion.div>
                )}

                {/* Capabilities */}
                {phase >= 4 && (
                  <div className="space-y-3">
                    <div className="text-[--green-dim] text-sm">CAPABILITIES:</div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {capabilities.map((cap, i) => (
                        <motion.div
                          key={cap.text}
                          initial={{ opacity: 0.3, x: -20 }}
                          animate={{
                            opacity: i <= capIndex ? 1 : 0.3,
                            x: i <= capIndex ? 0 : -20
                          }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center gap-3 p-2 border transition-all ${
                            i < capIndex ? "border-[--green]" : i === capIndex ? "border-[--green]" : "border-[--green-dim]"
                          }`}
                        >
                          {i <= capIndex ? (
                            <>
                              <span className="text-xl">{cap.icon}</span>
                              <span className={i < capIndex ? "text-[--green]" : ""}>{cap.text}</span>
                              {i < capIndex && <span className="ml-auto text-[--green]">✓</span>}
                            </>
                          ) : (
                            <span className="text-[--green-dim]">...</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                {phase >= 5 && (
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[--green-dim]">
                    {stats.map((stat, i) => (
                      <AnimatedStat
                        key={stat.label}
                        {...stat}
                        isActive={i === statIndex}
                        onComplete={() => setStatIndex(statIndex + 1)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 6 ? 1 : 0.3 }}
              className="text-xs text-[--green-dim] flex justify-between border-t border-[--green-dim] pt-4"
            >
              <span>SYS.VERSION: 2.0.24</span>
              <span>KERNEL: NODE.JS v20.x</span>
              {phase >= 6 ? (
                <span className="text-[--green] glow">✓ PROFILE LOADED</span>
              ) : (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  █
                </motion.span>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
