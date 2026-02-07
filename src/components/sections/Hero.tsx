"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

// Easter egg: Matrix effect
function MatrixBurst({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const chars = "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF";
    let count = 0;
    const interval = setInterval(() => {
      const line = Array(60).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
      setLines(prev => [...prev.slice(-15), line]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="text-[#50fa7b] text-xs font-mono opacity-80 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="truncate" style={{ opacity: 1 - (lines.length - i) * 0.05 }}>{line}</div>
      ))}
    </div>
  );
}

// Hacking animation easter egg
function HackSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "[■□□□□□□□□□] 10% - Bypassing firewall...",
    "[■■■□□□□□□□] 30% - Injecting payload...",
    "[■■■■■□□□□□] 50% - Accessing mainframe...",
    "[■■■■■■■□□□] 70% - Decrypting data...",
    "[■■■■■■■■■□] 90% - Almost there...",
    "[■■■■■■■■■■] 100% - ACCESS GRANTED ✓",
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => setStep(step + 1), 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 800);
    }
  }, [step, steps.length, onComplete]);

  return (
    <div className="space-y-1">
      <div className="text-red-500 glow">⚠️ INITIATING HACK SEQUENCE...</div>
      {steps.slice(0, step).map((s, i) => (
        <div key={i} className={i === step - 1 ? "text-[#50fa7b] glow" : "text-[#50fa7b]"}>{s}</div>
      ))}
      {step >= steps.length && (
        <div className="mt-2 text-[--green-dim]">Just kidding! This is just a portfolio 😄</div>
      )}
    </div>
  );
}

const COMMANDS: Record<string, { output: string | ((setSpecial: (v: string | null) => void) => string | React.ReactNode) }> = {
  help: {
    output: `
╔═══════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                      ║
╠═══════════════════════════════════════════════════════════╣
║  help       - Show this help message                       ║
║  whoami     - Who am I?                                    ║
║  skills     - List my technical skills                     ║
║  projects   - View my projects                             ║
║  contact    - Contact information                          ║
║  experience - Work experience                              ║
║  clear      - Clear terminal                               ║
║  sudo       - Try to get root access ;)                    ║
║  hack       - ???                                          ║
║  matrix     - ???                                          ║
╚═══════════════════════════════════════════════════════════╝

TIP: You can also scroll down to explore the page.
`,
  },
  whoami: {
    output: `
╔═══════════════════════════════════════════════════════════╗
║                      ARTEM SHKONDA                         ║
╠═══════════════════════════════════════════════════════════╣
║  ROLE:      Backend Developer                              ║
║  STACK:     Node.js / TypeScript / PostgreSQL              ║
║  EXP:       5+ years                                       ║
║  LOCATION:  Kyiv, Ukraine                                  ║
║  STATUS:    Open to opportunities                          ║
╚═══════════════════════════════════════════════════════════╝
`,
  },
  skills: {
    output: `
SKILL MATRIX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[BACKEND]
  Node.js      [████████████████████░░] 90%
  TypeScript   [████████████████████░░] 90%
  NestJS       [████████████████░░░░░░] 80%
  GraphQL      [████████████░░░░░░░░░░] 60%

[DATABASE]
  PostgreSQL   [████████████████░░░░░░] 80%
  MongoDB      [██████████████░░░░░░░░] 70%
  Redis        [██████████████░░░░░░░░] 70%

[DEVOPS]
  Docker       [████████████████░░░░░░] 80%
  Kubernetes   [██████████░░░░░░░░░░░░] 50%
  AWS          [████████████░░░░░░░░░░] 60%

→ Scroll to #skills for animated view
`,
  },
  projects: {
    output: `
PROJECT DATABASE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[001] ECOMMERCE-API         [PRODUCTION]
      Scalable REST API with microservices architecture
      Stack: Node.js, NestJS, PostgreSQL, Redis
      Metrics: 1M+ requests/day | 99.9% uptime

[002] REALTIME-CHAT         [PRODUCTION]
      WebSocket chat with rooms and file sharing
      Stack: Node.js, Socket.io, MongoDB, S3
      Metrics: 10K+ users | 500K+ messages

[003] TASK-MANAGER          [PRODUCTION]
      Kanban boards with time tracking and analytics
      Stack: Node.js, Express, PostgreSQL, React
      Metrics: 50K+ tasks | 100+ teams

[004] PAYMENT-GATEWAY       [PRODUCTION]
      Secure payment integration with webhooks
      Stack: Node.js, TypeScript, Stripe, Redis
      Metrics: 100K+ transactions | $1M+ volume

→ View all: github.com/shkoda-hub
→ Scroll to #projects for details
`,
  },
  contact: {
    output: `
CONTACT CHANNELS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📧 Email:     artemskonda@gmail.com
  💬 Telegram:  @artem_qaa
  🔗 GitHub:    github.com/shkoda-hub
  💼 LinkedIn:  linkedin.com/in/artem-shkonda-4a9051298/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUS: ● ONLINE | TIMEZONE: EET (UTC+2)

→ Scroll to #contact for quick links
`,
  },
  experience: {
    output: `
CAREER TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2022-NOW]  SENIOR BACKEND DEVELOPER @ TECH COMPANY
            ├─ Microservices, API optimization, Team Lead
            ├─ Achievements: 99.9% uptime, 50% faster APIs
            └─ Team of 5 developers

[2020-2022] BACKEND DEVELOPER @ STARTUP INC
            ├─ REST API, Database design, Auth systems
            ├─ Achievements: 10K+ users, JWT auth, CI/CD
            └─ Full-stack contributions

[2018-2020] JUNIOR DEVELOPER @ DIGITAL AGENCY
            ├─ Web apps, Code reviews, Testing
            ├─ Achievements: 15+ projects, TDD adoption
            └─ Node.js migration from PHP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: 5+ years of experience
`,
  },
  sudo: {
    output: `
[sudo] password for visitor: ********
Sorry, try again.
[sudo] password for visitor: ********
Sorry, try again.
[sudo] password for visitor: ********

sudo: 3 incorrect password attempts

Nice try! But you don't have root access here 😏
This system is protected by ArtemOS Security™
`,
  },
  hack: {
    output: (setSpecial) => {
      setSpecial("hack");
      return "";
    },
  },
  matrix: {
    output: (setSpecial) => {
      setSpecial("matrix");
      return "";
    },
  },
  ls: {
    output: `
about_me.txt    skills.dat      projects/
experience.log  contact.sh      secrets/
`,
  },
  "cat about_me.txt": {
    output: `
> Reading about_me.txt...

Hi! I'm Artem, a backend developer who loves building
scalable systems and solving complex problems.

When I'm not coding, I'm probably:
- Learning new technologies
- Contributing to open source
- Drinking too much coffee ☕

Type 'whoami' for more details.
`,
  },
  "ls secrets": {
    output: `
Permission denied: /secrets/
Just kidding, there's nothing here... or is there? 👀
`,
  },
  "rm -rf /": {
    output: `
Nice try! System protected.
Besides, this is a static website - what did you expect? 😄
`,
  },
  neofetch: {
    output: `
        .--.         artem@portfolio
       |o_o |        ----------------
       |:_/ |        OS: ArtemOS v2.0
      //   \\ \\       Host: Portfolio Website
     (|     | )      Kernel: Next.js 14
    /'\\_   _/\`\\      Shell: React Terminal
    \\___)=(___/      Theme: Cyberpunk Green
                     Terminal: Interactive
                     CPU: Node.js Runtime
                     Memory: Unlimited Dreams
`,
  },
  exit: {
    output: `
You can't exit! This is your destiny now.
Just kidding, scroll down to explore more.
`,
  },
};

// Scroll commands
const scrollCommands: Record<string, string> = {
  "goto about": "about",
  "goto skills": "skills",
  "goto projects": "projects",
  "goto experience": "experience",
  "goto contact": "contact",
  "cd about": "about",
  "cd skills": "skills",
  "cd projects": "projects",
  "cd experience": "experience",
  "cd contact": "contact",
};

export default function Hero() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: `
╔═══════════════════════════════════════════════════════════╗
║     Welcome to ArtemOS Terminal v2.0                       ║
║     Backend Developer Portfolio System                     ║
╚═══════════════════════════════════════════════════════════╝

Type 'help' for available commands or scroll down to explore.
`
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [specialEffect, setSpecialEffect] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === "") return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    // Check for scroll commands
    if (scrollCommands[trimmedCmd]) {
      const section = scrollCommands[trimmedCmd];
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Navigating to #${section}...`
      }]);
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    const command = COMMANDS[trimmedCmd];
    if (command) {
      const output = typeof command.output === "function"
        ? command.output(setSpecialEffect)
        : command.output;
      if (output) {
        setHistory(prev => [...prev, { command: cmd, output }]);
      } else {
        setHistory(prev => [...prev, { command: cmd, output: "" }]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        {
          command: cmd,
          output: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`,
          isError: true,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-20 relative overflow-hidden">
      {/* HUD corners */}
      <div className="absolute top-20 left-4 md:left-6 w-16 md:w-20 h-16 md:h-20 border-l-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute top-20 right-4 md:right-6 w-16 md:w-20 h-16 md:h-20 border-r-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 left-4 md:left-6 w-16 md:w-20 h-16 md:h-20 border-l-2 border-b-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 right-4 md:right-6 w-16 md:w-20 h-16 md:h-20 border-r-2 border-b-2 border-[--green] opacity-50" />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#50fa7b] to-transparent opacity-30"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl w-full">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-[--green] bg-black bg-opacity-90 relative overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-10"
            style={{
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)",
            }}
          />

          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[--green]" style={{ backgroundColor: "rgba(80, 250, 123, 0.1)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[--green] text-sm font-mono">root@artem-system:~</span>
            </div>
            <div className="text-[--green-dim] text-xs hidden md:block">ArtemOS v2.0</div>
          </div>

          {/* Terminal content */}
          <div
            ref={containerRef}
            className="h-[50vh] md:h-[55vh] overflow-y-auto p-4 font-mono text-sm"
          >
            {history.map((item, i) => (
              <div key={i} className="mb-3">
                {item.command && (
                  <div className="flex items-center gap-2 text-[--green-dim]">
                    <span className="text-[#50fa7b]">root@artem-system</span>
                    <span>:</span>
                    <span className="text-blue-400">~</span>
                    <span>#</span>
                    <span className="text-[#50fa7b]">{item.command}</span>
                  </div>
                )}
                <pre
                  className={`whitespace-pre-wrap mt-1 ${
                    item.isError ? "text-red-400" : "text-[#50fa7b]"
                  }`}
                >
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Special effects */}
            {specialEffect === "hack" && (
              <div className="mb-3">
                <HackSequence onComplete={() => setSpecialEffect(null)} />
              </div>
            )}
            {specialEffect === "matrix" && (
              <div className="mb-3">
                <MatrixBurst onComplete={() => {
                  setSpecialEffect(null);
                  setHistory(prev => [...prev, { command: "", output: "Matrix mode deactivated. Reality restored." }]);
                }} />
              </div>
            )}

            {/* Input line */}
            <div className="flex items-center gap-2 text-[--green-dim]">
              <span className="text-[#50fa7b]">root@artem-system</span>
              <span>:</span>
              <span className="text-blue-400">~</span>
              <span>#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-[#50fa7b] caret-[#50fa7b]"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              <motion.span
                className="w-2 h-5"
                style={{ backgroundColor: "#50fa7b" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <div className="text-[--green-dim] text-sm mb-4">
            [ TYPE <span className="text-[#50fa7b]">'help'</span> FOR COMMANDS OR <span className="text-[#50fa7b]">SCROLL DOWN</span> TO EXPLORE ]
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[--green-dim]"
          >
            <div className="text-2xl">▼</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
