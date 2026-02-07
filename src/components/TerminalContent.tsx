"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TypeWriter({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [displayed, text, speed, onComplete]);

  return <span>{displayed}</span>;
}

const sections = {
  home: {
    title: "HOME",
    content: `
╔══════════════════════════════════════════════════════╗
║                                                      ║
║     █████╗ ██████╗ ████████╗███████╗███╗   ███╗     ║
║    ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝████╗ ████║     ║
║    ███████║██████╔╝   ██║   █████╗  ██╔████╔██║     ║
║    ██╔══██║██╔══██╗   ██║   ██╔══╝  ██║╚██╔╝██║     ║
║    ██║  ██║██║  ██║   ██║   ███████╗██║ ╚═╝ ██║     ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝     ║
║                                                      ║
║            BACKEND DEVELOPER • NODE.JS               ║
║                                                      ║
╚══════════════════════════════════════════════════════╝

> LOCATION: KYIV, UKRAINE
> EXPERIENCE: 5+ YEARS

Type 'help' for available commands.
`,
  },
  help: {
    title: "HELP",
    content: `
AVAILABLE COMMANDS:
───────────────────
  about      - Display information about me
  skills     - Show technical skills
  experience - View work history
  projects   - List my projects
  contact    - Get contact information
  clear      - Clear terminal
  home       - Return to home screen
`,
  },
  about: {
    title: "ABOUT",
    content: `
╭─────────────────────────────────────────╮
│             ABOUT ME                     │
╰─────────────────────────────────────────╯

Hello! I'm Artem Shkonda, a Backend Developer
specializing in building scalable systems.

WHAT I DO:
  ├── REST & GraphQL API Design
  ├── Microservices Architecture
  ├── Database Optimization
  ├── CI/CD Implementation
  └── High-Load Systems

STATS:
  • 5+ years of experience
  • 30+ completed projects
  • 99.9% system uptime achieved
`,
  },
  skills: {
    title: "SKILLS",
    content: `
╭─────────────────────────────────────────╮
│           TECHNICAL SKILLS               │
╰─────────────────────────────────────────╯

BACKEND:
  Node.js      [████████████████████░░] 90%
  TypeScript   [████████████████████░░] 90%
  NestJS       [████████████████░░░░░░] 80%
  Express      [████████████████████░░] 90%
  GraphQL      [████████████░░░░░░░░░░] 60%

DATABASES:
  PostgreSQL   [████████████████░░░░░░] 80%
  MongoDB      [██████████████░░░░░░░░] 70%
  Redis        [██████████████░░░░░░░░] 70%

DEVOPS:
  Docker       [████████████████░░░░░░] 80%
  Kubernetes   [██████████░░░░░░░░░░░░] 50%
  AWS          [████████████░░░░░░░░░░] 60%
`,
  },
  experience: {
    title: "EXPERIENCE",
    content: `
╭─────────────────────────────────────────╮
│          WORK EXPERIENCE                 │
╰─────────────────────────────────────────╯

[2022 - PRESENT]
┃ SENIOR BACKEND DEVELOPER
┃ Tech Company
┃ • Microservices architecture
┃ • API optimization & team leadership
┃ • Achieved 99.9% uptime

[2020 - 2022]
┃ BACKEND DEVELOPER
┃ Startup Inc
┃ • Built REST API from scratch
┃ • Database design & auth systems

[2018 - 2020]
┃ JUNIOR DEVELOPER
┃ Digital Agency
┃ • Web applications development
┃ • Code reviews & testing
`,
  },
  projects: {
    title: "PROJECTS",
    content: `
╭─────────────────────────────────────────╮
│             MY PROJECTS                  │
╰─────────────────────────────────────────╯

[01] ECOMMERCE-API
     Scalable REST API with microservices
     Stack: Node.js, NestJS, PostgreSQL, Redis

[02] REALTIME-CHAT
     WebSocket chat with rooms & file sharing
     Stack: Node.js, Socket.io, MongoDB

[03] TASK-MANAGER
     Kanban boards with time tracking
     Stack: Node.js, Express, PostgreSQL

[04] PAYMENT-GATEWAY
     Payment integration with webhooks
     Stack: Node.js, TypeScript, Stripe

→ View all on GitHub: github.com/artemshkonda
`,
  },
  contact: {
    title: "CONTACT",
    content: `
╭─────────────────────────────────────────╮
│          GET IN TOUCH                    │
╰─────────────────────────────────────────╯

Let's work together!

EMAIL:     hello@artemshkonda.dev
TELEGRAM:  @artem_shkonda
GITHUB:    github.com/artemshkonda
LINKEDIN:  linkedin.com/in/artemshkonda

╭─────────────────────────────────────────╮
│  ● CURRENTLY OPEN FOR NEW PROJECTS      │
╰─────────────────────────────────────────╯
`,
  },
};

export default function TerminalContent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [currentSection, setCurrentSection] = useState<keyof typeof sections>("home");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output = "";

    if (command === "clear") {
      setHistory([]);
      setCurrentSection("home");
      return;
    }

    if (command === "" ) {
      return;
    }

    if (command in sections) {
      setCurrentSection(command as keyof typeof sections);
      output = sections[command as keyof typeof sections].content;
    } else {
      output = `Command not found: ${command}\nType 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full p-4 font-mono text-[#33ff33] text-xs cursor-text overflow-auto"
      style={{ textShadow: "0 0 5px rgba(51, 255, 51, 0.5)" }}
    >
      {/* Initial content */}
      {history.length === 0 && (
        <pre className="whitespace-pre-wrap">{sections[currentSection].content}</pre>
      )}

      {/* Command history */}
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          <div className="text-[#888]">
            <span className="text-[#33ff33]">guest@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-[#5555ff]">~</span>
            <span className="text-white">$ </span>
            <span className="text-[#33ff33]">{item.command}</span>
          </div>
          <pre className="whitespace-pre-wrap mt-1">{item.output}</pre>
        </div>
      ))}

      {/* Input line */}
      <div className="flex items-center">
        <span className="text-[#33ff33]">guest@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-[#5555ff]">~</span>
        <span className="text-white">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-[#33ff33] caret-[#33ff33]"
          autoFocus
          spellCheck={false}
        />
        <span className="w-2 h-4 bg-[#33ff33] animate-pulse ml-1" />
      </div>
    </div>
  );
}
