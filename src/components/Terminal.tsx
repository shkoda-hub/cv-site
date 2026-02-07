"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OutputLine {
  id: number;
  type: "input" | "output" | "error" | "ascii";
  content: string;
}

const ASCII_LOGO = `
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║     █████╗ ██████╗ ████████╗███████╗███╗   ███╗      ║
  ║    ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝████╗ ████║      ║
  ║    ███████║██████╔╝   ██║   █████╗  ██╔████╔██║      ║
  ║    ██╔══██║██╔══██╗   ██║   ██╔══╝  ██║╚██╔╝██║      ║
  ║    ██║  ██║██║  ██║   ██║   ███████╗██║ ╚═╝ ██║      ║
  ║    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝      ║
  ║                                                       ║
  ║           Backend Developer  •  Node.js               ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
`;

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "",
    "  Available commands:",
    "",
    "    about        Who am I",
    "    skills       Technical skills",
    "    experience   Work history",
    "    projects     My projects",
    "    contact      Get in touch",
    "    clear        Clear terminal",
    "",
  ],
  about: () => [
    "",
    "  ── ABOUT ME ──────────────────────────────────────────",
    "",
    "  Hey! I'm Artem Shkonda",
    "  Backend Developer with 5+ years of experience",
    "",
    "  I build scalable systems with Node.js, design APIs,",
    "  and architect microservices that handle millions",
    "  of requests.",
    "",
    "  Based in Moscow • Working globally",
    "",
  ],
  skills: () => [
    "",
    "  ── TECH STACK ────────────────────────────────────────",
    "",
    "  Backend",
    "    Node.js        ██████████████████░░  90%",
    "    TypeScript     ██████████████████░░  90%",
    "    NestJS         ████████████████░░░░  80%",
    "    Express        ██████████████████░░  90%",
    "    GraphQL        ████████████░░░░░░░░  60%",
    "",
    "  Databases",
    "    PostgreSQL     ████████████████░░░░  80%",
    "    MongoDB        ██████████████░░░░░░  70%",
    "    Redis          ██████████████░░░░░░  70%",
    "",
    "  DevOps",
    "    Docker         ████████████████░░░░  80%",
    "    Kubernetes     ██████████░░░░░░░░░░  50%",
    "    AWS            ████████████░░░░░░░░  60%",
    "",
  ],
  experience: () => [
    "",
    "  ── EXPERIENCE ────────────────────────────────────────",
    "",
    "  2022 - Present",
    "  Senior Backend Developer @ Tech Company",
    "  Microservices, API optimization, team lead",
    "",
    "  2020 - 2022",
    "  Backend Developer @ Startup Inc",
    "  REST API, database design, auth systems",
    "",
    "  2018 - 2020",
    "  Junior Developer @ Digital Agency",
    "  Web apps, code reviews, testing",
    "",
  ],
  projects: () => [
    "",
    "  ── PROJECTS ──────────────────────────────────────────",
    "",
    "  E-Commerce API",
    "  Scalable REST API with microservices",
    "  → Node.js, NestJS, PostgreSQL, Redis",
    "",
    "  Real-time Chat",
    "  WebSocket chat with rooms",
    "  → Node.js, Socket.io, MongoDB",
    "",
    "  Task Management",
    "  Kanban boards with time tracking",
    "  → Node.js, Express, PostgreSQL",
    "",
  ],
  contact: () => [
    "",
    "  ── CONTACT ───────────────────────────────────────────",
    "",
    "  Email      hello@artemshkonda.dev",
    "  Telegram   @artem_shkonda",
    "  GitHub     github.com/artemshkonda",
    "  LinkedIn   linkedin.com/in/artemshkonda",
    "",
    "  Open for new opportunities!",
    "",
  ],
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(0);

  const addOutput = useCallback((lines: string[], type: OutputLine["type"] = "output") => {
    const newLines = lines.map((content) => ({
      id: lineIdRef.current++,
      type,
      content,
    }));
    setOutput((prev) => [...prev, ...newLines]);
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      await new Promise((r) => setTimeout(r, 300));
      addOutput([ASCII_LOGO], "ascii");
      await new Promise((r) => setTimeout(r, 400));
      addOutput([
        "",
        "  Welcome! Type 'help' for available commands.",
        "",
      ]);
      setIsBooting(false);
    };
    bootSequence();
  }, [addOutput]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    addOutput([`$ ${cmd}`], "input");

    if (trimmed === "") {
      return;
    }

    if (trimmed === "clear") {
      setOutput([]);
      return;
    }

    if (COMMANDS[trimmed]) {
      addOutput(COMMANDS[trimmed]());
    } else {
      addOutput([
        "",
        `Command not found: ${trimmed}`,
        'Type "help" for available commands.',
        "",
      ], "error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8">
      {/* CRT Monitor Frame */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Monitor bezel */}
        <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-3xl p-3 md:p-4 shadow-2xl">
          {/* Screen bezel */}
          <div className="bg-[#111] rounded-2xl p-2 md:p-3">
            {/* CRT Screen */}
            <div
              ref={terminalRef}
              onClick={focusInput}
              className="relative bg-[#0d1117] rounded-xl h-[70vh] md:h-[75vh] overflow-auto cursor-text crt-screen"
            >
              {/* Scanlines overlay */}
              <div className="pointer-events-none absolute inset-0 scanlines rounded-xl" />

              {/* Screen flicker */}
              <div className="pointer-events-none absolute inset-0 screen-flicker rounded-xl" />

              {/* Content */}
              <div className="p-4 md:p-6 font-mono text-sm md:text-base relative z-10">
                <AnimatePresence>
                  {output.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.05 }}
                      className={`whitespace-pre-wrap ${
                        line.type === "input"
                          ? "text-[#79c0ff]"
                          : line.type === "error"
                          ? "text-[#ff7b72]"
                          : line.type === "ascii"
                          ? "text-[#7ee787]"
                          : "text-[#e6edf3]"
                      }`}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Input line */}
                {!isBooting && (
                  <div className="flex items-center text-[#e6edf3]">
                    <span className="text-[#7ee787]">❯</span>
                    <span className="ml-2">{input}</span>
                    <span
                      className={`ml-0.5 w-2 h-5 bg-[#7ee787] ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="absolute opacity-0 w-0 h-0"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="flex justify-center">
          <div className="w-32 h-4 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg" />
        </div>
        <div className="flex justify-center">
          <div className="w-48 h-2 bg-gradient-to-b from-[#222] to-[#1a1a1a] rounded-b-xl" />
        </div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center text-[#666] text-sm mt-6"
        >
          Click on screen and type commands • Try: help, about, skills, projects, contact
        </motion.p>
      </motion.div>
    </div>
  );
}
