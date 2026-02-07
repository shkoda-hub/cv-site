"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

const COMMANDS: Record<string, { description: string; output: string | (() => string | React.ReactNode) }> = {
  help: {
    description: "Show available commands",
    output: () => `
AVAILABLE COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  help        - Show this help message
  about       - About me
  skills      - List my skills
  contact     - Contact information
  projects    - My projects
  whoami      - Who am I?
  date        - Current date
  uptime      - System uptime
  matrix      - Toggle matrix rain
  clear       - Clear terminal
  exit        - Close terminal
  sudo        - Try to get root access
  hack        - ???
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type a command and press Enter.
`,
  },
  about: {
    description: "About me",
    output: `
╔════════════════════════════════════════╗
║            ABOUT ARTEM                 ║
╠════════════════════════════════════════╣
║  Backend Developer with 5+ years of    ║
║  experience building scalable systems  ║
║  and high-performance APIs.            ║
║                                        ║
║  🔧 Primary Stack: Node.js/TypeScript  ║
║  📍 Location: Kyiv, Ukraine            ║
╚════════════════════════════════════════╝
`,
  },
  skills: {
    description: "List skills",
    output: `
SKILL MATRIX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[BACKEND]
  Node.js      ████████████████████░░ 90%
  TypeScript   ████████████████████░░ 90%
  NestJS       ████████████████░░░░░░ 80%
  GraphQL      ████████████░░░░░░░░░░ 60%

[DATABASE]
  PostgreSQL   ████████████████░░░░░░ 80%
  MongoDB      ██████████████░░░░░░░░ 70%
  Redis        ██████████████░░░░░░░░ 70%

[DEVOPS]
  Docker       ████████████████░░░░░░ 80%
  Kubernetes   ██████████░░░░░░░░░░░░ 50%
  AWS          ████████████░░░░░░░░░░ 60%
`,
  },
  contact: {
    description: "Contact info",
    output: `
CONTACT CHANNELS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📧 Email:     hello@artemshkonda.dev
  💬 Telegram:  @artem_shkonda
  🔗 GitHub:    github.com/artemshkonda
  💼 LinkedIn:  linkedin.com/in/artemshkonda
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUS: ● ONLINE
`,
  },
  projects: {
    description: "My projects",
    output: `
PROJECT DATABASE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[001] ECOMMERCE-API
      Scalable REST API with microservices
      Stack: Node.js, NestJS, PostgreSQL

[002] REALTIME-CHAT
      WebSocket chat with rooms
      Stack: Node.js, Socket.io, MongoDB

[003] TASK-MANAGER
      Kanban boards with time tracking
      Stack: Node.js, Express, PostgreSQL

[004] PAYMENT-GATEWAY
      Secure payment integration
      Stack: Node.js, TypeScript, Stripe

→ View all: github.com/artemshkonda
`,
  },
  whoami: {
    description: "Who am I?",
    output: "artem_shkonda (Backend Developer)",
  },
  date: {
    description: "Current date",
    output: () => new Date().toString(),
  },
  uptime: {
    description: "System uptime",
    output: () => {
      const days = Math.floor(Math.random() * 100) + 200;
      const hours = Math.floor(Math.random() * 24);
      const mins = Math.floor(Math.random() * 60);
      return `System uptime: ${days} days, ${hours} hours, ${mins} minutes\nUptime: 99.9%`;
    },
  },
  sudo: {
    description: "Try sudo",
    output: "Nice try! But you don't have root access here 😏",
  },
  hack: {
    description: "???",
    output: `
⚠️  INITIATING HACK SEQUENCE...

[■□□□□□□□□□] 10% - Bypassing firewall...
[■■■□□□□□□□] 30% - Injecting payload...
[■■■■■□□□□□] 50% - Accessing mainframe...
[■■■■■■■□□□] 70% - Decrypting data...
[■■■■■■■■■□] 90% - Almost there...
[■■■■■■■■■■] 100%

ACCESS GRANTED ✓

Just kidding! This is just a portfolio 😄
But thanks for exploring!
`,
  },
  matrix: {
    description: "Toggle matrix",
    output: "Matrix rain intensity changed! (just pretend it worked)",
  },
};

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "", output: 'Welcome to ArtemOS Terminal v2.0\nType "help" for available commands.\n' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Keyboard shortcut to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd === "exit") {
      setIsOpen(false);
      return;
    }

    const command = COMMANDS[trimmedCmd];
    if (command) {
      const output = typeof command.output === "function" ? command.output() : command.output;
      setHistory((prev) => [...prev, { command: cmd, output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Command not found: ${trimmedCmd}\nType "help" for available commands.`,
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
      // Auto-complete
      const matches = Object.keys(COMMANDS).filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black border-2 border-[--green] flex items-center justify-center hover:bg-[--green] hover:text-black transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Open Terminal (` or Ctrl+K)"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">{">"}_</span>
      </motion.button>

      {/* Terminal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-3xl h-[70vh] border-2 border-[--green] bg-black relative overflow-hidden"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-[--green] bg-[--green] bg-opacity-10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                    />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[--green-dim] text-sm">artem@portfolio:~</span>
                </div>
                <div className="text-[--green-dim] text-xs">Press ESC to close</div>
              </div>

              {/* Terminal content */}
              <div
                ref={containerRef}
                className="h-[calc(100%-50px)] overflow-y-auto p-4 font-mono text-sm"
              >
                {history.map((item, i) => (
                  <div key={i} className="mb-3">
                    {item.command && (
                      <div className="flex items-center gap-2 text-[--green-dim]">
                        <span className="text-[--green]">artem@portfolio</span>
                        <span>:</span>
                        <span className="text-blue-400">~</span>
                        <span>$</span>
                        <span className="text-[--green]">{item.command}</span>
                      </div>
                    )}
                    <pre
                      className={`whitespace-pre-wrap mt-1 ${
                        item.isError ? "text-red-400" : "text-[--green]"
                      }`}
                    >
                      {item.output}
                    </pre>
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center gap-2 text-[--green-dim]">
                  <span className="text-[--green]">artem@portfolio</span>
                  <span>:</span>
                  <span className="text-blue-400">~</span>
                  <span>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-[--green] caret-[--green]"
                    autoFocus
                    spellCheck={false}
                  />
                  <motion.span
                    className="w-2 h-5 bg-[--green]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
