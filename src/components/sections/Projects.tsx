"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: "001",
    name: "ECOMMERCE-API",
    desc: "SCALABLE REST API WITH MICROSERVICES ARCHITECTURE",
    tech: ["NODEJS", "NESTJS", "POSTGRESQL", "REDIS"],
    metrics: { requests: "1M+/day", uptime: "99.9%", latency: "< 50ms" },
    status: "PRODUCTION",
  },
  {
    id: "002",
    name: "REALTIME-CHAT",
    desc: "WEBSOCKET CHAT WITH ROOMS AND FILE SHARING",
    tech: ["NODEJS", "SOCKET.IO", "MONGODB", "S3"],
    metrics: { users: "10K+", messages: "500K+", rooms: "1K+" },
    status: "PRODUCTION",
  },
  {
    id: "003",
    name: "TASK-MANAGER",
    desc: "KANBAN BOARDS WITH TIME TRACKING AND ANALYTICS",
    tech: ["NODEJS", "EXPRESS", "POSTGRESQL", "REACT"],
    metrics: { tasks: "50K+", teams: "100+", automation: "200+" },
    status: "PRODUCTION",
  },
  {
    id: "004",
    name: "PAYMENT-GATEWAY",
    desc: "SECURE PAYMENT INTEGRATION WITH WEBHOOKS",
    tech: ["NODEJS", "TYPESCRIPT", "STRIPE", "REDIS"],
    metrics: { transactions: "100K+", volume: "$1M+", success: "99.8%" },
    status: "PRODUCTION",
  },
];

function ProjectCard({
  project,
  index,
  isInView
}: {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glitch effect on hover */}
      {isGlitching && (
        <>
          <div className="absolute inset-0 bg-[#ff00ff] opacity-20 translate-x-1" />
          <div className="absolute inset-0 bg-[#00ffff] opacity-20 -translate-x-1" />
        </>
      )}

      <motion.div
        className="border border-[--green-dim] bg-black bg-opacity-80 p-5 h-full relative overflow-hidden transition-colors"
        animate={isHovered ? { borderColor: "var(--green)" } : {}}
      >
        {/* Scanning line */}
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[--green] to-transparent"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[--green] opacity-50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[--green] opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[--green] opacity-50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[--green] opacity-50" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[--green-dim] text-sm font-mono">PROJECT_{project.id}</span>
          <motion.span
            className="text-xs px-2 py-0.5 border border-[--green] text-[--green]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {project.status}
          </motion.span>
        </div>

        {/* Project name */}
        <motion.div
          className="text-xl glow mb-2 relative"
          animate={isHovered ? { x: [0, 2, -2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          /{project.name}
        </motion.div>

        {/* Description */}
        <p className="text-[--green-dim] text-sm mb-4">{project.desc}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.05 }}
              className="text-xs px-2 py-0.5 bg-[--green] bg-opacity-10 text-[--green-dim] group-hover:text-[--green] group-hover:bg-opacity-20 transition-all"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="border-t border-[--green-dim] pt-3 mt-3 grid grid-cols-3 gap-2 text-center">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key}>
                <div className="text-[--green] glow text-sm">{value}</div>
                <div className="text-[--green-dim] text-xs uppercase">{key}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* View prompt */}
        <motion.div
          className="absolute bottom-2 right-2 text-xs text-[--green-dim]"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        >
          [ HOVER FOR METRICS ]
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Hex grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2333ff33' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto relative" ref={sectionRef}>
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
              <span className="text-[--green-dim] text-sm">project_database.db</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-[--green-dim]">{projects.length} PROJECTS</span>
              <motion.span
                className="text-[--green]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ● SYNCED
              </motion.span>
            </div>
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
                <span>SELECT * FROM projects WHERE status = 'PRODUCTION';</span>
              </div>
              <div className="text-[--green] glow text-xl">
                ► {projects.length} ROWS RETURNED
              </div>
            </motion.div>

            {/* Project grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
              ))}
            </div>

            {/* GitHub link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <a
                href="https://github.com/shkoda-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber inline-block"
              >
                <span className="btn-cyber-glitch" data-text="[ VIEW ALL ON GITHUB ]">
                  [ VIEW ALL ON GITHUB ]
                </span>
              </a>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>QUERY TIME: 0.003s</span>
              <span>CACHE: HIT</span>
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
