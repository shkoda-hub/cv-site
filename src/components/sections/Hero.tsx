"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
  isTyping?: boolean;
}

// Typing output effect
function TypingOutput({
  text,
  speed = 5,
  onComplete
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    if (displayed.length < text.length) {
      // Type multiple characters at once for speed
      const charsToAdd = Math.min(3, text.length - displayed.length);
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + charsToAdd));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [displayed, text, speed, done, onComplete]);

  return <>{displayed}</>;
}

// ==================== INTRO ANIMATION COMPONENTS ====================

// Typing effect with cursor
function TypeWriter({
  text,
  delay = 0,
  speed = 50,
  onComplete,
}: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started || done) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [displayed, text, speed, started, done, onComplete]);

  return (
    <span>
      {displayed}
      {!done && started && <span className="animate-pulse">_</span>}
    </span>
  );
}

// Progress bar animation
function HackProgress({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const increment = Math.random() * 12 + 4;
        const newProgress = Math.min(p + increment, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
        }
        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  const filled = Math.floor(progress / 5);
  const empty = 20 - filled;

  return (
    <div className="font-mono">
      <div className="flex items-center gap-2">
        <span className="text-[--green-dim]">[</span>
        <span className="glow" style={{ color: "#50fa7b" }}>{"█".repeat(filled)}</span>
        <span className="text-[--green-dim] opacity-30">{"░".repeat(empty)}</span>
        <span className="text-[--green-dim]">]</span>
        <span className="glow w-16" style={{ color: "#50fa7b" }}>{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

// Random data stream
function DataStream() {
  const [lines, setLines] = useState<string[]>([]);
  const chars = "0123456789ABCDEF";

  useEffect(() => {
    const generateLine = () => {
      const addr = Array(8).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
      const data = Array(32).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(" ").match(/.{1,2}/g)?.join(" ");
      return `0x${addr}: ${data}`;
    };

    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, generateLine()];
        return newLines.slice(-6);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[--green-dim] text-xs opacity-60 font-mono overflow-hidden h-24">
      {lines.map((line, i) => (
        <div key={i} className="truncate">{line}</div>
      ))}
    </div>
  );
}

// ==================== TERMINAL EASTER EGGS ====================

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

// ==================== TERMINAL COMMANDS ====================

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

[002] REALTIME-CHAT         [PRODUCTION]
      WebSocket chat with rooms and file sharing
      Stack: Node.js, Socket.io, MongoDB, S3

[003] TASK-MANAGER          [PRODUCTION]
      Kanban boards with time tracking and analytics
      Stack: Node.js, Express, PostgreSQL, React

[004] PAYMENT-GATEWAY       [PRODUCTION]
      Secure payment integration with webhooks
      Stack: Node.js, TypeScript, Stripe, Redis

→ View all: github.com/shkoda-hub
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
`,
  },
  experience: {
    output: `
CAREER TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2022-NOW]  SENIOR BACKEND DEVELOPER @ TECH COMPANY
            Microservices, API optimization, Team Lead

[2020-2022] BACKEND DEVELOPER @ STARTUP INC
            REST API, Database design, Auth systems

[2018-2020] JUNIOR DEVELOPER @ DIGITAL AGENCY
            Web apps, Code reviews, Testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: 5+ years of experience
`,
  },
  sudo: {
    output: `
[sudo] password for visitor: ********
Sorry, try again.
[sudo] password for visitor: ********
sudo: 3 incorrect password attempts

Nice try! But you don't have root access here 😏
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
    output: `about_me.txt  skills.dat  projects/  experience.log  contact.sh  secrets/`,
  },
  "cat about_me.txt": {
    output: `Hi! I'm Artem, a backend developer who loves building scalable systems.`,
  },
  "ls secrets": {
    output: `Permission denied: /secrets/ — Just kidding, nothing here... or is there? 👀`,
  },
  "rm -rf /": {
    output: `Nice try! System protected. This is a static website 😄`,
  },
  neofetch: {
    output: `
        .--.         artem@portfolio
       |o_o |        OS: ArtemOS v2.0
       |:_/ |        Kernel: Next.js 14
      //   \\ \\       Shell: React Terminal
     (|     | )      Theme: Cyberpunk Green
    /'\\_   _/\`\\      CPU: Node.js Runtime
    \\___)=(___/      Memory: Unlimited Dreams
`,
  },
  exit: {
    output: `You can't exit! Scroll down to explore more.`,
  },
};

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

// ==================== MAIN COMPONENT ====================

export default function Hero() {
  // Intro animation phases
  const [introPhase, setIntroPhase] = useState(0);
  // 0: ACCESS DENIED
  // 1: Hacking started
  // 2: Progress bar
  // 3: ACCESS GRANTED
  // 4: Terminal ready

  // Terminal state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [specialEffect, setSpecialEffect] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start intro sequence
  useEffect(() => {
    const timer = setTimeout(() => setIntroPhase(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize terminal after intro
  useEffect(() => {
    if (introPhase === 4) {
      setHistory([{
        command: "",
        output: `
╔═══════════════════════════════════════════════════════════╗
║     Welcome to ArtemOS Terminal v2.0                       ║
║     Type 'help' for commands or scroll down to explore     ║
╚═══════════════════════════════════════════════════════════╝
`,
        isTyping: true
      }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [introPhase]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === "") return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (scrollCommands[trimmedCmd]) {
      const section = scrollCommands[trimmedCmd];
      setHistory(prev => [...prev, { command: cmd, output: `Navigating to #${section}...`, isTyping: true }]);
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
      return;
    }

    const command = COMMANDS[trimmedCmd];
    if (command) {
      const output = typeof command.output === "function"
        ? command.output(setSpecialEffect)
        : command.output;
      setHistory(prev => [...prev, { command: cmd, output: output || "", isTyping: true }]);
    } else {
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`,
        isError: true,
        isTyping: true,
      }]);
    }
  }, []);

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
        <AnimatePresence mode="wait">
          {/* ==================== INTRO PHASES ==================== */}

          {/* Phase 0: Access Denied */}
          {introPhase === 0 && (
            <motion.div
              key="denied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-4xl md:text-6xl font-bold text-red-500"
                style={{ textShadow: "0 0 20px rgba(255,0,0,0.8)" }}
              >
                ⚠ ACCESS DENIED ⚠
              </motion.div>
              <div className="mt-4 text-[--green-dim]">
                UNAUTHORIZED ACCESS ATTEMPT DETECTED
              </div>
            </motion.div>
          )}

          {/* Phase 1: Hacking initiated */}
          {introPhase === 1 && (
            <motion.div
              key="hacking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[--green-dim]">
                <span style={{ color: "#50fa7b" }}>[SYSTEM]</span> Initializing bypass protocol...
              </div>
              <DataStream />
              <div style={{ color: "#50fa7b" }}>
                <TypeWriter
                  text="► FIREWALL BREACH DETECTED..."
                  speed={30}
                  onComplete={() => setTimeout(() => setIntroPhase(2), 500)}
                />
              </div>
            </motion.div>
          )}

          {/* Phase 2: Progress */}
          {introPhase === 2 && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="glow text-xl" style={{ color: "#50fa7b" }}>
                ► BYPASSING SECURITY...
              </div>
              <HackProgress onComplete={() => setIntroPhase(3)} />
              <DataStream />
            </motion.div>
          )}

          {/* Phase 3: Access Granted */}
          {introPhase === 3 && (
            <motion.div
              key="granted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0.8, 1] }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold glow"
                style={{ color: "#50fa7b" }}
              >
                ✓ ACCESS GRANTED ✓
              </motion.div>
              <motion.div
                className="mt-4 text-[--green-dim]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypeWriter
                  text="Loading terminal interface..."
                  delay={500}
                  onComplete={() => setTimeout(() => setIntroPhase(4), 800)}
                />
              </motion.div>
            </motion.div>
          )}

          {/* ==================== INTERACTIVE TERMINAL ==================== */}

          {introPhase === 4 && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Terminal window */}
              <div
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
                    <span className="text-sm font-mono" style={{ color: "#50fa7b" }}>root@artem-system:~</span>
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
                          <span style={{ color: "#50fa7b" }}>root@artem-system</span>
                          <span>:</span>
                          <span className="text-blue-400">~</span>
                          <span>#</span>
                          <span style={{ color: "#50fa7b" }}>{item.command}</span>
                        </div>
                      )}
                      <pre
                        className={`whitespace-pre-wrap mt-1 ${item.isError ? "text-red-400" : ""}`}
                        style={{ color: item.isError ? undefined : "#50fa7b" }}
                      >
                        {item.isTyping && typeof item.output === "string" ? (
                          <TypingOutput
                            text={item.output}
                            speed={3}
                            onComplete={() => {
                              setHistory(prev => prev.map((h, idx) =>
                                idx === i ? { ...h, isTyping: false } : h
                              ));
                            }}
                          />
                        ) : (
                          item.output
                        )}
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
                    <span style={{ color: "#50fa7b" }}>root@artem-system</span>
                    <span>:</span>
                    <span className="text-blue-400">~</span>
                    <span>#</span>
                    <div className="flex-1 flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none w-auto min-w-[1ch]"
                        style={{ color: "#50fa7b", caretColor: "transparent", width: `${Math.max(input.length, 1)}ch` }}
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
                      <motion.span
                        className="w-2 h-5 inline-block"
                        style={{ backgroundColor: "#50fa7b" }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6"
              >
                <div className="text-[--green-dim] text-sm mb-4">
                  [ TYPE <span style={{ color: "#50fa7b" }}>'help'</span> FOR COMMANDS OR <span style={{ color: "#50fa7b" }}>SCROLL DOWN</span> TO EXPLORE ]
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[--green-dim]"
                >
                  <div className="text-2xl">▼</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
