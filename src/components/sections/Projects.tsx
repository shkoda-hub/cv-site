"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  isActive,
  isLoaded,
  onComplete
}: {
  project: typeof projects[0];
  isActive: boolean;
  isLoaded: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0); // 0: hidden, 1: scanning, 2: revealed
  const [techIndex, setTechIndex] = useState(-1);

  useEffect(() => {
    if (!isActive || phase > 0) return;
    setPhase(1);

    setTimeout(() => {
      setPhase(2);
      setTechIndex(0);
    }, 800);
  }, [isActive, phase]);

  // Reveal tech stack one by one (slower)
  useEffect(() => {
    if (phase !== 2 || techIndex < 0) return;

    if (techIndex >= project.tech.length) {
      setTimeout(onComplete, 400);
      return;
    }

    const timer = setTimeout(() => {
      setTechIndex(techIndex + 1);
    }, 200);

    return () => clearTimeout(timer);
  }, [phase, techIndex, project.tech.length, onComplete]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0.3, scale: 0.95 }}
      animate={{
        opacity: isLoaded ? 1 : isActive ? 0.8 : 0.3,
        scale: isLoaded ? 1 : isActive ? 1 : 0.95
      }}
    >
      <div
        className={`border bg-black bg-opacity-80 p-5 h-full relative overflow-hidden transition-all ${
          isLoaded ? "border-[--green]" : isActive ? "border-[--green]" : "border-[--green-dim]"
        }`}
      >
        {/* Scanning effect */}
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[--green] via-transparent to-transparent opacity-30"
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Corner decorations */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-l border-t ${isLoaded ? "border-[--green]" : "border-[--green-dim]"} opacity-50`} />
        <div className={`absolute top-0 right-0 w-4 h-4 border-r border-t ${isLoaded ? "border-[--green]" : "border-[--green-dim]"} opacity-50`} />
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-l border-b ${isLoaded ? "border-[--green]" : "border-[--green-dim]"} opacity-50`} />
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-r border-b ${isLoaded ? "border-[--green]" : "border-[--green-dim]"} opacity-50`} />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-mono ${phase >= 2 ? "text-[--green]" : "text-[--green-dim]"}`}>
            PROJECT_{project.id}
          </span>
          {phase >= 2 ? (
            <motion.span
              className="text-xs px-2 py-0.5 border border-[--green] text-[--green]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {project.status}
            </motion.span>
          ) : (
            <span className="text-xs px-2 py-0.5 border border-[--green-dim] text-[--green-dim]">...</span>
          )}
        </div>

        {/* Project name */}
        <div className={`text-xl mb-2 ${phase >= 2 ? "glow" : "text-[--green-dim]"}`}>
          {phase >= 2 ? `/${project.name}` : "/LOADING..."}
        </div>

        {/* Description */}
        <p className="text-[--green-dim] text-sm mb-4">
          {phase >= 2 ? project.desc : "..."}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4 min-h-[28px]">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              className={`text-xs px-2 py-0.5 transition-all ${
                i < techIndex
                  ? "bg-[--green] bg-opacity-20 text-[--green] border border-[--green]"
                  : "bg-[--green-dim] bg-opacity-10 text-[--green-dim] border border-transparent"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: i < techIndex ? 1 : 0.3,
                scale: i < techIndex ? 1 : 0.9
              }}
            >
              {i < techIndex ? tech : "..."}
            </motion.span>
          ))}
        </div>

        {/* Metrics - show on complete */}
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-[--green-dim] pt-3 mt-3 grid grid-cols-3 gap-2 text-center"
          >
            {Object.entries(project.metrics).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[--green] glow text-sm">{value}</div>
                <div className="text-[--green-dim] text-xs uppercase">{key}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Loading indicator */}
        {isActive && !isLoaded && (
          <div className="absolute bottom-2 right-2 text-xs text-[--green]">
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              LOADING...
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  const [phase, setPhase] = useState<"idle" | "connecting" | "querying" | "fetching" | "complete">("idle");
  const [queryProgress, setQueryProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loadedCount, setLoadedCount] = useState(0);

  // Start when in view
  useEffect(() => {
    if (isInView && phase === "idle") {
      setPhase("connecting");
    }
  }, [isInView, phase]);

  // Connecting phase (slower)
  useEffect(() => {
    if (phase !== "connecting") return;
    setTimeout(() => setPhase("querying"), 800);
  }, [phase]);

  // Querying phase (slower)
  useEffect(() => {
    if (phase !== "querying") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 5;
      if (progress >= 100) {
        setQueryProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("fetching");
          setCurrentIndex(0);
        }, 500);
      } else {
        setQueryProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  const handleProjectComplete = () => {
    setLoadedCount(loadedCount + 1);
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => setPhase("complete"), 600);
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Hex grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2350fa7b' stroke-width='1'/%3E%3C/svg%3E")`,
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
            <motion.span
              className="text-sm"
              animate={phase !== "complete" ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: phase !== "complete" ? Infinity : 0 }}
            >
              {phase === "complete" ? (
                <span className="text-[--green]">✓ {projects.length} ROWS FETCHED</span>
              ) : (
                <span className="text-[--green-dim]">{loadedCount}/{projects.length} ROWS</span>
              )}
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>SELECT * FROM projects WHERE status = 'PRODUCTION';</span>
              </div>

              {/* Connection phase */}
              {phase === "connecting" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[--green]">
                  <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    CONNECTING TO DATABASE...
                  </motion.span>
                </motion.div>
              )}

              {/* Query phase */}
              {phase === "querying" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="text-[--green] glow">EXECUTING QUERY...</div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[--green-dim]">[</span>
                    <div className="flex-1 h-3 bg-[--green-dim] bg-opacity-20 overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{
                          width: `${queryProgress}%`,
                          backgroundColor: "#50fa7b",
                          boxShadow: "0 0 10px #50fa7b, 0 0 20px #50fa7b"
                        }}
                      />
                    </div>
                    <span className="text-[--green-dim]">]</span>
                    <span className="text-[--green] w-12 text-sm">{Math.floor(queryProgress)}%</span>
                  </div>
                </motion.div>
              )}

              {/* Fetching & Complete */}
              {(phase === "fetching" || phase === "complete") && (
                <div className="text-[--green] glow text-xl">
                  ► {phase === "complete" ? `${projects.length} ROWS RETURNED` : "FETCHING ROWS..."}
                </div>
              )}
            </div>

            {/* Project grid */}
            {(phase === "fetching" || phase === "complete") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={index === currentIndex}
                    isLoaded={index < loadedCount}
                    onComplete={handleProjectComplete}
                  />
                ))}
              </motion.div>
            )}

            {/* GitHub link */}
            {phase === "complete" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "complete" ? 1 : 0.3 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>QUERY TIME: 0.003s</span>
              <span>CACHE: {phase === "complete" ? "HIT" : "MISS"}</span>
              {phase === "complete" ? (
                <span className="text-[--green] glow">✓ QUERY COMPLETE</span>
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
