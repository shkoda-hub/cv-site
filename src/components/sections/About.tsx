"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="glow">
      {count}{suffix}
    </span>
  );
}

function GlitchText({ text }: { text: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${isGlitching ? 'animate-glitch' : ''}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-[#ff00ff] opacity-70" style={{ transform: 'translateX(-2px)' }}>
            {text}
          </span>
          <span className="absolute top-0 left-0 text-[#00ffff] opacity-70" style={{ transform: 'translateX(2px)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const capabilities = [
    { icon: "⚡", text: "REST & GRAPHQL API DESIGN" },
    { icon: "🔧", text: "MICROSERVICES ARCHITECTURE" },
    { icon: "📊", text: "DATABASE OPTIMIZATION" },
    { icon: "🚀", text: "CI/CD PIPELINES" },
    { icon: "💪", text: "HIGH-LOAD SYSTEMS" },
  ];

  return (
    <section id="about" className="py-20 px-6 relative">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-[--green]"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              scaleX: [0, 1, 0],
              originX: i % 2 === 0 ? 0 : 1,
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
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
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-30"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

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
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-[--green] rounded-full" />
              <span className="text-[--green-dim]">ONLINE</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>cat about_me.txt</span>
              </div>
              <div className="text-xl glow">
                <GlitchText text="► GREETINGS, HUMAN." />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
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

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <div className="text-[--green-dim] text-sm">CAPABILITIES:</div>
              <div className="grid md:grid-cols-2 gap-2">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-3 p-2 border border-[--green-dim] hover:border-[--green] hover:bg-[--green] hover:bg-opacity-5 transition-all group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{cap.icon}</span>
                    <span className="group-hover:glow transition-all">{cap.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[--green-dim]"
            >
              <div className="text-center p-4 border border-[--green-dim] hover:border-[--green] transition-colors group">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  <AnimatedCounter value={5} suffix="+" />
                </div>
                <div className="text-[--green-dim] text-sm mt-1">YEARS EXP</div>
              </div>
              <div className="text-center p-4 border border-[--green-dim] hover:border-[--green] transition-colors group">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  <AnimatedCounter value={30} suffix="+" />
                </div>
                <div className="text-[--green-dim] text-sm mt-1">PROJECTS</div>
              </div>
              <div className="text-center p-4 border border-[--green-dim] hover:border-[--green] transition-colors group">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  <AnimatedCounter value={99} suffix=".9%" duration={1500} />
                </div>
                <div className="text-[--green-dim] text-sm mt-1">UPTIME</div>
              </div>
            </motion.div>

            {/* System info footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="text-xs text-[--green-dim] flex justify-between border-t border-[--green-dim] pt-4"
            >
              <span>SYS.VERSION: 2.0.24</span>
              <span>KERNEL: NODE.JS v20.x</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                █
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
