"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const socialLinks = [
  {
    name: "EMAIL",
    value: "ARTEMSKONDA@GMAIL.COM",
    href: "mailto:artemskonda@gmail.com",
    icon: "📧",
    cmd: "mail -s"
  },
  {
    name: "TELEGRAM",
    value: "@ARTEM_QAA",
    href: "https://t.me/artem_qaa",
    icon: "💬",
    cmd: "tg --connect"
  },
  {
    name: "GITHUB",
    value: "/SHKODA-HUB",
    href: "https://github.com/shkoda-hub",
    icon: "🔗",
    cmd: "git clone"
  },
  {
    name: "LINKEDIN",
    value: "/IN/ARTEM-SHKONDA",
    href: "https://linkedin.com/in/artem-shkonda-4a9051298/",
    icon: "💼",
    cmd: "curl -X GET"
  },
];

function ChannelCard({
  link,
  isActive,
  isOnline,
  onComplete
}: {
  link: typeof socialLinks[0];
  isActive: boolean;
  isOnline: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(0); // 0: offline, 1: pinging, 2: online

  useEffect(() => {
    if (!isActive || phase > 0) return;
    setPhase(1);

    // Pinging animation (slower)
    setTimeout(() => {
      setPhase(2);
      setTimeout(onComplete, 400);
    }, 900);
  }, [isActive, phase, onComplete]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: isOnline ? 1 : isActive ? 0.7 : 0.3 }}
    >
      <a
        href={isOnline ? link.href : undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={`block border p-4 transition-all relative overflow-hidden ${
          isOnline
            ? "border-[--green] hover:bg-[--green] hover:bg-opacity-5 cursor-pointer"
            : isActive
            ? "border-[--green] cursor-wait"
            : "border-[--green-dim] cursor-not-allowed"
        }`}
      >
        {/* Ping effect */}
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 bg-[--green] opacity-20"
            animate={{ opacity: [0.3, 0, 0.3, 0] }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Scanning line */}
        {phase === 1 && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-[--green]"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Command line style */}
        <div className={`text-xs mb-2 font-mono ${isOnline ? "text-[--green]" : "text-[--green-dim]"}`}>
          $ {isOnline ? link.cmd : "ping"} {isOnline ? link.value.toLowerCase() : "..."}
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-3xl transition-transform ${isOnline ? "scale-100" : "scale-75 opacity-50"}`}>
            {isOnline ? link.icon : "⏳"}
          </span>
          <div className="flex-1">
            <div className="text-[--green-dim] text-xs">{link.name}</div>
            <div className={`transition-all ${isOnline ? "text-[--green] glow" : "text-[--green-dim]"}`}>
              {isOnline ? link.value : "CONNECTING..."}
            </div>
          </div>
          {isOnline && (
            <motion.div
              className="text-[--green] text-2xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.div>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[--green-dim] border-opacity-30">
          {isOnline ? (
            <>
              <motion.span
                className="w-2 h-2 bg-[--green] rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[--green] text-xs">CHANNEL ACTIVE</span>
            </>
          ) : isActive ? (
            <>
              <motion.span
                className="w-2 h-2 bg-yellow-500 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
              <span className="text-yellow-500 text-xs">PINGING...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-[--green-dim] rounded-full" />
              <span className="text-[--green-dim] text-xs">WAITING...</span>
            </>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [phase, setPhase] = useState<"idle" | "init" | "pinging" | "complete">("idle");
  const [initProgress, setInitProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [onlineCount, setOnlineCount] = useState(0);

  // Start when in view
  useEffect(() => {
    if (isInView && phase === "idle") {
      setPhase("init");
    }
  }, [isInView, phase]);

  // Init phase (slower)
  useEffect(() => {
    if (phase !== "init") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 5;
      if (progress >= 100) {
        setInitProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("pinging");
          setCurrentIndex(0);
        }, 500);
      } else {
        setInitProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  const handleChannelComplete = () => {
    setOnlineCount(onlineCount + 1);
    if (currentIndex < socialLinks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => setPhase("complete"), 600);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
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
              <span className="text-[--green-dim] text-sm">contact_channels.sh</span>
            </div>
            <motion.div
              className="flex items-center gap-2"
              animate={phase !== "complete" ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: phase !== "complete" ? Infinity : 0 }}
            >
              <span className={`w-2 h-2 rounded-full ${phase === "complete" ? "bg-[--green]" : "bg-yellow-500"}`} />
              <span className="text-[--green-dim] text-sm">
                {phase === "complete" ? "ALL ONLINE" : `${onlineCount}/${socialLinks.length} ONLINE`}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>./list_contact_channels.sh --ping-all</span>
              </div>

              {/* Init phase */}
              {phase === "init" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="text-[--green] glow">INITIALIZING NETWORK SCAN...</div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[--green-dim]">[</span>
                    <div className="flex-1 h-3 bg-[--green-dim] bg-opacity-20 overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{
                          width: `${initProgress}%`,
                          backgroundColor: "#50fa7b",
                          boxShadow: "0 0 10px #50fa7b, 0 0 20px #50fa7b"
                        }}
                      />
                    </div>
                    <span className="text-[--green-dim]">]</span>
                    <span className="text-[--green] w-12 text-sm">{Math.floor(initProgress)}%</span>
                  </div>
                </motion.div>
              )}

              {/* Pinging & Complete */}
              {(phase === "pinging" || phase === "complete") && (
                <div className="text-[--green] glow text-xl">
                  ► {phase === "complete" ? `${socialLinks.length} CHANNELS ONLINE` : "PINGING CHANNELS..."}
                </div>
              )}
            </div>

            {/* Contact links grid */}
            {(phase === "pinging" || phase === "complete") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4">
                {socialLinks.map((link, i) => (
                  <ChannelCard
                    key={link.name}
                    link={link}
                    isActive={i === currentIndex}
                    isOnline={i < onlineCount}
                    onComplete={handleChannelComplete}
                  />
                ))}
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "complete" ? 1 : 0.3 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>LOCATION: KYIV, UA</span>
              <span>TIMEZONE: EET (UTC+2)</span>
              {phase === "complete" ? (
                <span className="text-[--green] glow">✓ ALL SYSTEMS ONLINE</span>
              ) : (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  SCANNING █
                </motion.span>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
