"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skills = [
  { name: "NODE.JS", level: 90 },
  { name: "TYPESCRIPT", level: 90 },
  { name: "NESTJS", level: 80 },
  { name: "POSTGRESQL", level: 80 },
  { name: "MONGODB", level: 70 },
  { name: "REDIS", level: 70 },
  { name: "DOCKER", level: 80 },
  { name: "KUBERNETES", level: 50 },
  { name: "AWS", level: 60 },
  { name: "GRAPHQL", level: 60 },
];

const SKILL_COLOR = "#50fa7b";

function SkillBar({
  name,
  level,
  isActive,
  onComplete
}: {
  name: string;
  level: number;
  isActive: boolean;
  onComplete: () => void;
}) {
  const [displayLevel, setDisplayLevel] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Animate percentage and bar (slower)
    let current = 0;
    const duration = 1200; // ms
    const steps = 40;
    const increment = level / steps;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= level) {
        setDisplayLevel(level);
        setBarWidth(level);
        setIsComplete(true);
        clearInterval(interval);
        setTimeout(onComplete, 400);
      } else {
        setDisplayLevel(Math.floor(current));
        setBarWidth(current);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isActive, level, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: isActive || isComplete ? 1 : 0.3, x: 0 }}
      className="relative"
    >
      {/* Scanning effect */}
      {isActive && !isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-30"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}

      <div className="flex items-center gap-2 md:gap-3 py-2 px-2 -mx-2">
        {/* Status indicator */}
        <span className="w-4 text-center">
          {isComplete ? (
            <span className="text-[--green]">✓</span>
          ) : isActive ? (
            <motion.span
              className="text-[--green]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ▶
            </motion.span>
          ) : (
            <span className="text-[--green-dim]">○</span>
          )}
        </span>

        {/* Skill name */}
        <span className={`w-24 md:w-28 text-xs md:text-sm shrink-0 transition-colors ${
          isActive || isComplete ? "text-[--green]" : "text-[--green-dim]"
        }`}>
          {name}
        </span>

        {/* Progress bar */}
        <div className="flex items-center flex-1 gap-1">
          <span className="text-[--green-dim] text-xs md:text-sm">[</span>
          <div className="flex-1 h-3 md:h-4 bg-[--green-dim] bg-opacity-20 relative overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                backgroundColor: SKILL_COLOR,
                boxShadow: isActive ? `0 0 15px ${SKILL_COLOR}` : `0 0 5px ${SKILL_COLOR}`,
                width: `${barWidth}%`
              }}
            />
          </div>
          <span className="text-[--green-dim] text-xs md:text-sm">]</span>
        </div>

        {/* Percentage */}
        <span
          className="w-12 text-right text-xs md:text-sm shrink-0 font-mono"
          style={{
            color: isActive || isComplete ? SKILL_COLOR : "var(--green-dim)",
            textShadow: isActive ? `0 0 10px ${SKILL_COLOR}` : "none"
          }}
        >
          {displayLevel}%
        </span>
      </div>
    </motion.div>
  );
}

function ScanProgress({ progress }: { progress: number }) {
  const filled = Math.floor(progress / 5);
  const empty = 20 - filled;

  return (
    <div className="font-mono text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-[--green-dim]">[</span>
        <span className="text-[--green] glow">{"█".repeat(filled)}</span>
        <span className="text-[--green-dim] opacity-30">{"░".repeat(empty)}</span>
        <span className="text-[--green-dim]">]</span>
        <span className="text-[--green] glow w-12">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState<"idle" | "init" | "scanning" | "complete">("idle");
  const [initProgress, setInitProgress] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(-1);
  const [headerStatus, setHeaderStatus] = useState("IDLE");

  // Start animation when in view
  useEffect(() => {
    if (isInView && phase === "idle") {
      setPhase("init");
      setHeaderStatus("INITIALIZING");
    }
  }, [isInView, phase]);

  // Phase 1: Initialization progress
  useEffect(() => {
    if (phase !== "init") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 3;
      if (progress >= 100) {
        setInitProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("scanning");
          setHeaderStatus("SCANNING");
          setCurrentSkillIndex(0);
        }, 600);
      } else {
        setInitProgress(progress);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [phase]);

  // Handle skill completion
  const handleSkillComplete = () => {
    if (currentSkillIndex < skills.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1);
    } else {
      setPhase("complete");
      setHeaderStatus("COMPLETE");
    }
  };

  return (
    <section id="skills" className="py-20 px-6 relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(var(--green) 1px, transparent 1px),
            linear-gradient(90deg, var(--green) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="max-w-4xl mx-auto relative" ref={sectionRef}>
        {/* Terminal window */}
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
              <span className="text-[--green-dim] text-sm">skills_scanner.exe</span>
            </div>
            <motion.span
              className={`text-sm ${phase === "complete" ? "text-[--green]" : "text-[--green]"}`}
              animate={phase !== "complete" ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: phase !== "complete" ? Infinity : 0 }}
            >
              ● {headerStatus}
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>./scan_skills.sh --verbose --animate</span>
              </div>
            </motion.div>

            {/* Phase 1: Initialization */}
            {phase === "init" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 space-y-4"
              >
                <div className="text-[--green] glow text-center text-lg">
                  INITIALIZING SKILL SCANNER...
                </div>
                <ScanProgress progress={initProgress} />
                <div className="text-[--green-dim] text-center text-sm">
                  Loading skill database...
                </div>
              </motion.div>
            )}

            {/* Phase 2 & 3: Scanning & Complete */}
            {(phase === "scanning" || phase === "complete") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-[--green] glow text-xl mb-4">
                  ► SCANNING {skills.length} SKILLS...
                </div>

                {/* Skills list */}
                <div className="space-y-1 font-mono">
                  {skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      isActive={index === currentSkillIndex}
                      onComplete={handleSkillComplete}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Footer stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "complete" ? 1 : 0.3 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-sm text-[--green-dim]"
            >
              <span>TOTAL SKILLS: {skills.length}</span>
              <span>AVG PROFICIENCY: {Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%</span>
              {phase === "complete" ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[--green] glow"
                >
                  ✓ SCAN COMPLETE
                </motion.span>
              ) : (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
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
