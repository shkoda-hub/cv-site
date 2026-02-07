"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const experience = [
  {
    period: "2022-NOW",
    role: "SENIOR BACKEND DEV",
    company: "TECH COMPANY",
    desc: "MICROSERVICES, API OPTIMIZATION, TEAM LEAD",
    achievements: ["99.9% UPTIME", "50% FASTER APIs", "TEAM OF 5"],
    status: "ACTIVE",
  },
  {
    period: "2020-2022",
    role: "BACKEND DEVELOPER",
    company: "STARTUP INC",
    desc: "REST API, DATABASE DESIGN, AUTH SYSTEMS",
    achievements: ["10K+ USERS", "JWT AUTH", "CI/CD SETUP"],
    status: "COMPLETED",
  },
  {
    period: "2018-2020",
    role: "JUNIOR DEVELOPER",
    company: "DIGITAL AGENCY",
    desc: "WEB APPS, CODE REVIEWS, TESTING",
    achievements: ["15+ PROJECTS", "TDD ADOPTION", "NODE.JS MIGRATION"],
    status: "COMPLETED",
  },
];

function TimelineNode({
  exp,
  isActive,
  isLoaded,
  onComplete
}: {
  exp: typeof experience[0];
  isActive: boolean;
  isLoaded: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0); // 0: hidden, 1: scanning, 2: revealed
  const [achievementIndex, setAchievementIndex] = useState(-1);

  useEffect(() => {
    if (!isActive || phase > 0) return;
    setPhase(1);

    // Scanning phase
    setTimeout(() => {
      setPhase(2);
      setAchievementIndex(0);
    }, 600);
  }, [isActive, phase]);

  // Reveal achievements one by one
  useEffect(() => {
    if (phase !== 2 || achievementIndex < 0) return;

    if (achievementIndex >= exp.achievements.length) {
      setTimeout(onComplete, 200);
      return;
    }

    const timer = setTimeout(() => {
      setAchievementIndex(achievementIndex + 1);
    }, 150);

    return () => clearTimeout(timer);
  }, [phase, achievementIndex, exp.achievements.length, onComplete]);

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[--green-dim]">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[--green]"
          initial={{ height: 0 }}
          animate={{ height: isLoaded ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: "0 0 10px var(--green)" }}
        />
      </div>

      {/* Node */}
      <motion.div
        className={`absolute left-0 top-0 w-6 h-6 border-2 bg-black flex items-center justify-center ${
          isLoaded ? "border-[--green]" : isActive ? "border-[--green]" : "border-[--green-dim]"
        }`}
        animate={isActive && !isLoaded ? { rotate: [0, 90, 180, 270, 360] } : {}}
        transition={{ duration: 1, repeat: isActive && !isLoaded ? Infinity : 0, ease: "linear" }}
      >
        {isLoaded ? (
          <span className="text-[--green] text-xs">✓</span>
        ) : isActive ? (
          <motion.div
            className="w-2 h-2 bg-[--green]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ) : (
          <div className="w-2 h-2 bg-[--green-dim]" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className={`border bg-black bg-opacity-50 p-4 transition-all ${
          isLoaded ? "border-[--green]" : isActive ? "border-[--green]" : "border-[--green-dim]"
        }`}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: phase >= 2 ? 1 : isActive ? 0.7 : 0.3 }}
      >
        {/* Scanning effect */}
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[--green] via-transparent to-transparent opacity-20"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-mono ${phase >= 2 ? "text-[--green]" : "text-[--green-dim]"}`}>
            [{exp.period}]
          </span>
          <motion.span
            className={`text-xs px-2 py-1 border ${
              exp.status === "ACTIVE" && phase >= 2
                ? "border-[--green] text-[--green]"
                : "border-[--green-dim] text-[--green-dim]"
            }`}
            animate={exp.status === "ACTIVE" && isLoaded ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {phase >= 2 ? exp.status : "..."}
          </motion.span>
        </div>

        {/* Role */}
        <div className={`text-xl mb-1 ${phase >= 2 ? "glow" : "text-[--green-dim]"}`}>
          {phase >= 2 ? exp.role : "LOADING..."}
        </div>
        <div className={`mb-2 ${phase >= 2 ? "text-[--green]" : "text-[--green-dim]"}`}>
          {phase >= 2 ? `@ ${exp.company}` : ""}
        </div>
        <div className="text-[--green-dim] text-sm mb-3">
          {phase >= 2 ? exp.desc : ""}
        </div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-2">
          {exp.achievements.map((achievement, i) => (
            <motion.span
              key={achievement}
              className={`text-xs px-2 py-1 border transition-all ${
                i < achievementIndex
                  ? "bg-[--green] bg-opacity-10 border-[--green]"
                  : "border-[--green-dim] opacity-30"
              }`}
              animate={i < achievementIndex ? { scale: [0.8, 1.1, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              {i < achievementIndex ? achievement : "..."}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function BinaryBackground() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const generated = Array(20).fill(0).map(() =>
      Array(100).fill(0).map(() => Math.round(Math.random())).join("")
    );
    setLines(generated);
  }, []);

  if (lines.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 font-mono text-xs">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap">{line}</div>
      ))}
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState<"idle" | "loading" | "reading" | "complete">("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loadedCount, setLoadedCount] = useState(0);

  // Start when in view
  useEffect(() => {
    if (isInView && phase === "idle") {
      setPhase("loading");
    }
  }, [isInView, phase]);

  // Loading phase
  useEffect(() => {
    if (phase !== "loading") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("reading");
          setCurrentIndex(0);
        }, 200);
      } else {
        setLoadProgress(progress);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  const handleNodeComplete = () => {
    setLoadedCount(loadedCount + 1);
    if (currentIndex < experience.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => setPhase("complete"), 300);
    }
  };

  return (
    <section id="experience" className="py-20 px-6 relative">
      <BinaryBackground />

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

          {/* Header */}
          <div className="border-b border-[--green] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[--green-dim] text-sm">career_timeline.log</span>
            </div>
            <motion.span
              className="text-[--green-dim] text-sm"
              animate={phase !== "complete" ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: phase !== "complete" ? Infinity : 0 }}
            >
              {phase === "complete" ? `✓ ${experience.length} ENTRIES LOADED` : `${loadedCount}/${experience.length} ENTRIES`}
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>git log --oneline career.git</span>
              </div>

              {/* Loading bar */}
              {phase === "loading" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="text-[--green] glow">FETCHING CAREER HISTORY...</div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[--green-dim]">[</span>
                    <div className="flex-1 h-3 bg-[--green-dim] bg-opacity-20 overflow-hidden">
                      <motion.div
                        className="h-full bg-[--green]"
                        style={{ width: `${loadProgress}%`, boxShadow: "0 0 10px var(--green)" }}
                      />
                    </div>
                    <span className="text-[--green-dim]">]</span>
                    <span className="text-[--green] w-12 text-sm">{Math.floor(loadProgress)}%</span>
                  </div>
                </motion.div>
              )}

              {phase !== "loading" && (
                <div className="text-[--green] glow text-xl">
                  ► {phase === "complete" ? "CAREER HISTORY LOADED" : "READING ENTRIES..."}
                </div>
              )}
            </div>

            {/* Timeline */}
            {phase !== "loading" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                {experience.map((exp, index) => (
                  <TimelineNode
                    key={exp.period}
                    exp={exp}
                    isActive={index === currentIndex}
                    isLoaded={index < loadedCount}
                    onComplete={handleNodeComplete}
                  />
                ))}
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "complete" ? 1 : 0.3 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>TOTAL EXPERIENCE: 5+ YEARS</span>
              {phase === "complete" ? (
                <span className="text-[--green] glow">✓ END OF LOG</span>
              ) : (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  READING █
                </motion.span>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
