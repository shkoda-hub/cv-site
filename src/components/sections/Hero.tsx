"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== TYPING COMPONENTS ====================

function TypeWriter({
  text,
  delay = 0,
  speed = 50,
  onComplete,
  showCursor = true
}: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
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
      {showCursor && !done && started && <span className="animate-pulse">_</span>}
    </span>
  );
}

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`glitch-wrapper ${className}`}>
      <span className="glitch-text" data-text={text}>{text}</span>
    </span>
  );
}

function HackProgress({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(p + increment, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
        }
        return newProgress;
      });
    }, 150);

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
      setLines(prev => [...prev.slice(-6), generateLine()]);
    }, 100);

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

// ==================== TERMINAL MODAL ====================

interface HistoryItem {
  command: string;
  output: string;
  isError?: boolean;
  isTyping?: boolean;
}

// Typing output for terminal
function TypingTerminalOutput({
  text,
  onUpdate,
  onComplete
}: {
  text: string;
  onUpdate?: () => void;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (displayed.length < text.length) {
      const charsToAdd = Math.min(4, text.length - displayed.length);
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + charsToAdd));
        onUpdate?.();
      }, 5);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [displayed, text, onUpdate, onComplete]);

  return <>{displayed}</>;
}

const COMMANDS: Record<string, string> = {
  help: `
AVAILABLE COMMANDS:
-------------------------------------------
  help      - Show this help message
  whoami    - Who am I?
  skills    - List my technical skills
  projects  - View my projects
  contact   - Contact information
  clear     - Clear terminal
  sudo      - Try to get root access ;)
  hack      - ???
  exit      - Close terminal
-------------------------------------------
`,
  whoami: `
ARTEM SHKONDA
-------------------------------------------
  ROLE:      Backend Developer
  STACK:     Node.js / TypeScript / PostgreSQL
  EXP:       5+ years
  LOCATION:  Kyiv, Ukraine
  STATUS:    Open to opportunities
`,
  skills: `
SKILL MATRIX:
-------------------------------------------
[BACKEND]
  Node.js      ████████████████████░░ 90%
  TypeScript   ████████████████████░░ 90%

[DATABASE]
  PostgreSQL   ████████████████░░░░░░ 80%
  MongoDB      ██████████████░░░░░░░░ 70%

[DEVOPS]
  Docker       ████████████████░░░░░░ 80%
  Kubernetes   ██████████░░░░░░░░░░░░ 50%
`,
  projects: `
PROJECTS:
-------------------------------------------
[001] ECOMMERCE-API
      Scalable REST API with microservices

[002] REALTIME-CHAT
      WebSocket chat with rooms

[003] TASK-MANAGER
      Kanban boards with time tracking

[004] PAYMENT-GATEWAY
      Secure payment integration

> github.com/shkoda-hub
`,
  contact: `
CONTACT:
-------------------------------------------
  Email:     artemskonda@gmail.com
  Telegram:  @artem_qaa
  GitHub:    github.com/shkoda-hub
  LinkedIn:  linkedin.com/in/artem-shkonda
`,
  sudo: `Nice try! But you don't have root access here 😏`,
  hack: `
> INITIATING HACK SEQUENCE...
[##########] 100% - ACCESS GRANTED
Just kidding! This is just a portfolio 😄
`,
  neofetch: `
    .--.       artem@portfolio
   |o_o |      OS: ArtemOS v2.0
   |:_/ |      Shell: React Terminal
  //   \\ \\     Theme: Cyberpunk
 (|     | )    CPU: Node.js Runtime
`,
  matrix: `Wake up, Neo... The Matrix has you...`,
  ls: `about_me.txt  skills.dat  projects/  secrets/`,
  "rm -rf /": `Nice try! System protected 😄`,
};

function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "", output: 'Welcome to ArtemOS Terminal v2.0\nType "help" for available commands.', isTyping: true }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd === "exit") {
      onClose();
      return;
    }

    const output = COMMANDS[trimmedCmd];
    if (output) {
      setHistory(prev => [...prev, { command: cmd, output, isTyping: true }]);
    } else {
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${trimmedCmd}\nType "help" for available commands.`,
        isError: true,
        isTyping: true
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-3xl border-2 border-[--green] bg-black relative overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[--green]" style={{ backgroundColor: "rgba(80, 250, 123, 0.1)" }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-mono" style={{ color: "#50fa7b" }}>root@artem-system:~</span>
          </div>
          <span className="text-[--green-dim] text-xs">ESC to close</span>
        </div>

        {/* Content */}
        <div ref={containerRef} className="h-[60vh] overflow-y-auto p-4 font-mono text-sm">
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
              <pre className={`whitespace-pre-wrap mt-1 ${item.isError ? "text-red-400" : ""}`}
                style={{ color: item.isError ? undefined : "#50fa7b" }}>
                {item.isTyping ? (
                  <TypingTerminalOutput
                    text={item.output}
                    onUpdate={scrollToBottom}
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

          {/* Input */}
          <div className="flex items-center gap-2 text-[--green-dim]">
            <span style={{ color: "#50fa7b" }}>root@artem-system</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              style={{ color: "#50fa7b", caretColor: "#50fa7b" }}
              spellCheck={false}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ==================== MAIN HERO COMPONENT ====================

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* HUD corners */}
      <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r-2 border-t-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-[--green] opacity-50" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-[--green] opacity-50" />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#50fa7b] to-transparent opacity-50"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {/* Phase 0: Access Denied */}
          {phase === 0 && (
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

          {/* Phase 1: Hacking */}
          {phase === 1 && (
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
                  onComplete={() => setTimeout(() => setPhase(2), 500)}
                />
              </div>
            </motion.div>
          )}

          {/* Phase 2: Progress */}
          {phase === 2 && (
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
              <HackProgress onComplete={() => setPhase(3)} />
              <DataStream />
            </motion.div>
          )}

          {/* Phase 3: Access Granted */}
          {phase === 3 && (
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
                  text="Loading user profile..."
                  delay={500}
                  onComplete={() => setTimeout(() => setPhase(4), 800)}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Phase 4: Profile */}
          {phase >= 4 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Terminal window */}
              <div className="border border-[--green] rounded-sm overflow-hidden">
                <div className="px-4 py-2 flex items-center justify-between border-b border-[--green]" style={{ backgroundColor: "rgba(80, 250, 123, 0.1)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm" style={{ color: "#50fa7b" }}>root@artem-system:~</span>
                  <div className="w-16" />
                </div>

                <div className="p-4 md:p-6 space-y-4">
                  {/* Mobile: Simple text */}
                  <motion.div
                    className="md:hidden text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl font-bold glow" style={{ color: "#50fa7b" }}>ARTEM</h1>
                    <h1 className="text-3xl font-bold glow" style={{ color: "#50fa7b" }}>SHKONDA</h1>
                  </motion.div>

                  {/* Desktop: ASCII Art */}
                  <motion.pre
                    className="hidden md:block glow text-xs lg:text-sm overflow-x-auto"
                    style={{ color: "#50fa7b" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
{`
 █████╗ ██████╗ ████████╗███████╗███╗   ███╗
██╔══██╗██╔══██╗╚══██╔══╝██╔════╝████╗ ████║
███████║██████╔╝   ██║   █████╗  ██╔████╔██║
██╔══██║██╔══██╗   ██║   ██╔══╝  ██║╚██╔╝██║
██║  ██║██║  ██║   ██║   ███████╗██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
        ███████╗██╗  ██╗██╗  ██╗ ██████╗ ███╗   ██╗██████╗  █████╗
        ██╔════╝██║  ██║██║ ██╔╝██╔═══██╗████╗  ██║██╔══██╗██╔══██╗
        ███████╗███████║█████╔╝ ██║   ██║██╔██╗ ██║██║  ██║███████║
        ╚════██║██╔══██║██╔═██╗ ██║   ██║██║╚██╗██║██║  ██║██╔══██║
        ███████║██║  ██║██║  ██╗╚██████╔╝██║ ╚████║██████╔╝██║  ██║
        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝
`}
                  </motion.pre>

                  {/* Profile info */}
                  <motion.div
                    className="space-y-2 text-sm md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[--green-dim]">$</span>
                      <span className="text-[--green-dim]">cat</span>
                      <span style={{ color: "#50fa7b" }}>profile.txt</span>
                    </div>

                    <div className="pl-3 md:pl-4 border-l-2 border-[--green-dim] space-y-1">
                      <div>
                        <span className="text-[--green-dim]">ROLE:</span>{" "}
                        <GlitchText text="BACKEND DEVELOPER" className="glow" />
                      </div>
                      <div>
                        <span className="text-[--green-dim]">STACK:</span>{" "}
                        <span className="glow text-xs md:text-lg" style={{ color: "#50fa7b" }}>NODE.JS / TYPESCRIPT / POSTGRESQL</span>
                      </div>
                      <div>
                        <span className="text-[--green-dim]">EXP:</span>{" "}
                        <span className="glow" style={{ color: "#50fa7b" }}>5+ YEARS</span>
                      </div>
                      <div>
                        <span className="text-[--green-dim]">LOCATION:</span>{" "}
                        <span className="glow" style={{ color: "#50fa7b" }}>KYIV, UKRAINE</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Command prompt */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[--green-dim]">$</span>
                      <TypeWriter text="./explore_profile.sh" delay={1000} speed={50} />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center"
              >
                <a href="#contact" className="btn-cyber group text-sm md:text-base">
                  <span className="btn-cyber-glitch" data-text="[ CONTACT ]">[ CONTACT ]</span>
                </a>
                <a href="#projects" className="btn-cyber group text-sm md:text-base">
                  <span className="btn-cyber-glitch" data-text="[ PROJECTS ]">[ PROJECTS ]</span>
                </a>
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="btn-cyber group text-sm md:text-base"
                >
                  <span className="btn-cyber-glitch" data-text="[ TERMINAL ]">[ TERMINAL ]</span>
                </button>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center pt-8"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[--green-dim]"
                >
                  <div className="text-sm mb-2">SCROLL TO EXPLORE</div>
                  <div className="text-2xl">▼</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {terminalOpen && (
          <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
