"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const hasStarted = useRef(false);

  const [phase, setPhase] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [greetingText, setGreetingText] = useState("");
  const [capIndex, setCapIndex] = useState(-1);
  const [statValues, setStatValues] = useState([0, 0, 0]);
  const [statIndex, setStatIndex] = useState(-1);

  const fullGreeting = "► GREETINGS, HUMAN.";

  // Main animation controller
  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    // Phase 1: Loading (slower)
    setPhase(1);
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 8 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(() => startGreeting(), 500);
      }
      setLoadProgress(progress);
    }, 120);

    // Phase 2: Greeting typewriter (slower)
    function startGreeting() {
      setPhase(2);
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        charIndex++;
        setGreetingText(fullGreeting.slice(0, charIndex));
        if (charIndex >= fullGreeting.length) {
          clearInterval(typeInterval);
          setTimeout(() => startDescription(), 800);
        }
      }, 70);
    }

    // Phase 3: Description
    function startDescription() {
      setPhase(3);
      setTimeout(() => startCapabilities(), 1200);
    }

    // Phase 4: Capabilities (slower)
    function startCapabilities() {
      setPhase(4);
      let idx = 0;
      const capInterval = setInterval(() => {
        setCapIndex(idx);
        idx++;
        if (idx >= capabilities.length) {
          clearInterval(capInterval);
          setTimeout(() => startStats(), 600);
        }
      }, 400);
    }

    // Phase 5: Stats (slower)
    function startStats() {
      setPhase(5);

      function animateStat(statIdx: number) {
        if (statIdx >= stats.length) {
          setPhase(6);
          return;
        }

        setStatIndex(statIdx);
        const target = stats[statIdx].value;
        let current = 0;
        const increment = target / 25;

        const statInterval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(statInterval);
            setStatValues(prev => {
              const newVals = [...prev];
              newVals[statIdx] = target;
              return newVals;
            });
            setTimeout(() => animateStat(statIdx + 1), 400);
          } else {
            setStatValues(prev => {
              const newVals = [...prev];
              newVals[statIdx] = Math.floor(current);
              return newVals;
            });
          }
        }, 60);
      }

      animateStat(0);
    }

    return () => {
      // Cleanup if needed
    };
  }, [isInView]);

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
          {phase > 0 && phase < 6 && (
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
              <span className="w-2 h-2 rounded-full bg-[--green]" />
              <span className="text-[--green-dim]">
                {phase === 0 ? "IDLE" : phase < 6 ? "LOADING" : "COMPLETE"}
              </span>
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
              <div className="py-4">
                <div className="text-[--green] glow mb-4">LOADING PROFILE DATA...</div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[--green-dim]">[</span>
                  <div className="flex-1 h-4 bg-[--green-dim] bg-opacity-20 overflow-hidden">
                    <div
                      className="h-full bg-[--green] transition-all"
                      style={{ width: `${loadProgress}%`, boxShadow: "0 0 10px var(--green)" }}
                    />
                  </div>
                  <span className="text-[--green-dim]">]</span>
                  <span className="text-[--green] w-12">{Math.floor(loadProgress)}%</span>
                </div>
              </div>
            )}

            {/* Phase 2+: Content */}
            {phase >= 2 && (
              <div className="space-y-6">
                {/* Greeting */}
                <div className="text-xl glow">
                  {greetingText}
                  {phase === 2 && <span className="animate-pulse">_</span>}
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
                        <div
                          key={cap.text}
                          className={`flex items-center gap-3 p-2 border transition-all duration-300 ${
                            i <= capIndex ? "border-[--green] opacity-100" : "border-[--green-dim] opacity-30"
                          }`}
                        >
                          {i <= capIndex ? (
                            <>
                              <span className="text-xl">{cap.icon}</span>
                              <span className="text-[--green]">{cap.text}</span>
                              <span className="ml-auto text-[--green]">✓</span>
                            </>
                          ) : (
                            <span className="text-[--green-dim]">...</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                {phase >= 5 && (
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[--green-dim]">
                    {stats.map((stat, i) => (
                      <div
                        key={stat.label}
                        className={`text-center p-4 border transition-all ${
                          i <= statIndex ? "border-[--green]" : "border-[--green-dim]"
                        }`}
                      >
                        <div className="text-4xl">
                          <span
                            className={i <= statIndex ? "glow" : ""}
                            style={{ color: i <= statIndex ? "var(--green)" : "var(--green-dim)" }}
                          >
                            {statValues[i]}{stat.suffix}
                          </span>
                        </div>
                        <div className="text-[--green-dim] text-sm mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div
              className={`text-xs text-[--green-dim] flex justify-between border-t border-[--green-dim] pt-4 transition-opacity ${
                phase >= 6 ? "opacity-100" : "opacity-30"
              }`}
            >
              <span>SYS.VERSION: 2.0.24</span>
              <span>KERNEL: NODE.JS v20.x</span>
              {phase >= 6 ? (
                <span className="text-[--green] glow">✓ PROFILE LOADED</span>
              ) : (
                <span className="animate-pulse">█</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
