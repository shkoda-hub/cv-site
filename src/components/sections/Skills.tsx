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

const SKILL_COLOR = "#4ade80";

function AnimatedSkillBar({
  name,
  level,
  index
}: {
  name: string;
  level: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayLevel, setDisplayLevel] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setIsScanning(true);
        // Animate the level counting up
        let current = 0;
        const increment = level / 30;
        const interval = setInterval(() => {
          current += increment;
          if (current >= level) {
            setDisplayLevel(level);
            clearInterval(interval);
          } else {
            setDisplayLevel(Math.floor(current));
          }
        }, 30);
      }, index * 100);
      return () => clearTimeout(timeout);
    }
  }, [isInView, level, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
    >
      {/* Scanning effect */}
      {isScanning && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-20"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />
      )}

      <div className="flex items-center gap-2 md:gap-3 py-2 hover:bg-[--green] hover:bg-opacity-5 transition-colors px-2 -mx-2">
        {/* Skill name */}
        <span className="w-20 md:w-28 text-right text-[--green-dim] group-hover:text-[--green] transition-colors text-xs md:text-sm shrink-0">
          {name}
        </span>

        {/* Progress bar - CSS based */}
        <div className="flex items-center flex-1 gap-1">
          <span className="text-[--green-dim] text-xs md:text-sm">[</span>
          <div className="flex-1 h-3 md:h-4 bg-[--green-dim] bg-opacity-20 relative overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                backgroundColor: SKILL_COLOR,
                boxShadow: `0 0 10px ${SKILL_COLOR}`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
            />
          </div>
          <span className="text-[--green-dim] text-xs md:text-sm">]</span>
        </div>

        {/* Percentage */}
        <span
          className="w-10 md:w-12 text-right text-xs md:text-sm shrink-0"
          style={{
            color: SKILL_COLOR,
            textShadow: `0 0 10px ${SKILL_COLOR}`
          }}
        >
          {displayLevel}%
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
              className="text-[--green] text-sm"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ● SCANNING
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Section title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>./scan_skills.sh --verbose</span>
              </div>
              <div className="text-[--green] glow text-xl">
                ► SKILL MATRIX LOADED
              </div>
            </motion.div>

            {/* Skills list */}
            <div className="space-y-1 font-mono">
              {skills.map((skill, index) => (
                <AnimatedSkillBar key={skill.name} {...skill} index={index} />
              ))}
            </div>

            {/* Footer stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-sm text-[--green-dim]"
            >
              <span>TOTAL SKILLS: {skills.length}</span>
              <span>AVG PROFICIENCY: {Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%</span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[--green]"
              >
                SCAN COMPLETE ✓
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
