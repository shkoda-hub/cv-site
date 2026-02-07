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
  index,
  isInView
}: {
  exp: typeof experience[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="relative pl-8 pb-8 last:pb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[--green-dim]">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[--green]"
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
        />
      </div>

      {/* Node */}
      <motion.div
        className="absolute left-0 top-0 w-6 h-6 border-2 border-[--green] bg-black flex items-center justify-center"
        animate={isHovered ? { scale: 1.2, rotate: 45 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-2 h-2 bg-[--green]"
          animate={{ opacity: exp.status === "ACTIVE" ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 1, repeat: exp.status === "ACTIVE" ? Infinity : 0 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="border border-[--green-dim] bg-black bg-opacity-50 p-4 hover:border-[--green] transition-all"
        animate={isHovered ? { x: 5 } : { x: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[--green-dim] text-sm font-mono">[{exp.period}]</span>
          <motion.span
            className={`text-xs px-2 py-1 border ${
              exp.status === "ACTIVE"
                ? "border-[--green] text-[--green]"
                : "border-[--green-dim] text-[--green-dim]"
            }`}
            animate={exp.status === "ACTIVE" ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {exp.status}
          </motion.span>
        </div>

        {/* Role */}
        <div className="text-xl glow mb-1">{exp.role}</div>
        <div className="text-[--green] mb-2">@ {exp.company}</div>
        <div className="text-[--green-dim] text-sm mb-3">{exp.desc}</div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-2">
          {exp.achievements.map((achievement, i) => (
            <motion.span
              key={achievement}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
              className="text-xs px-2 py-1 bg-[--green] bg-opacity-10 border border-[--green-dim] hover:border-[--green] hover:bg-opacity-20 transition-all"
            >
              {achievement}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

  return (
    <section id="experience" className="py-20 px-6 relative">
      {/* Binary background */}
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
            <span className="text-[--green-dim] text-sm">{experience.length} ENTRIES</span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>git log --oneline career.git</span>
              </div>
              <div className="text-[--green] glow text-xl">
                ► LOADING CAREER HISTORY...
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="mt-8">
              {experience.map((exp, index) => (
                <TimelineNode key={exp.period} exp={exp} index={index} isInView={isInView} />
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>TOTAL EXPERIENCE: 5+ YEARS</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                END OF LOG █
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
