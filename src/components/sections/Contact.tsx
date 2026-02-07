"use client";

import { useRef } from "react";
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

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-[--green] rounded-full" />
              <span className="text-[--green-dim] text-sm">ONLINE</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Command */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-[--green-dim] mb-2">
                <span>$</span>
                <span>./list_contact_channels.sh</span>
              </div>
              <div className="text-[--green] glow text-xl">
                ► {socialLinks.length} CHANNELS AVAILABLE
              </div>
            </motion.div>

            {/* Contact links grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group border border-[--green-dim] hover:border-[--green] p-4 transition-all relative overflow-hidden"
                >
                  {/* Hover scan effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[--green] to-transparent opacity-0 group-hover:opacity-10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Command line style */}
                  <div className="text-[--green-dim] text-xs mb-2 font-mono">
                    $ {link.cmd} {link.value.toLowerCase()}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <div className="flex-1">
                      <div className="text-[--green-dim] text-xs">{link.name}</div>
                      <div className="text-[--green] glow group-hover:tracking-wider transition-all">
                        {link.value}
                      </div>
                    </div>
                    <motion.div
                      className="text-[--green] text-2xl"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[--green-dim] border-opacity-30">
                    <motion.span
                      className="w-2 h-2 bg-[--green] rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                    <span className="text-[--green-dim] text-xs">CHANNEL ACTIVE</span>
                  </div>
                </motion.a>
              ))}
            </div>

            
            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 pt-4 border-t border-[--green-dim] flex justify-between text-xs text-[--green-dim]"
            >
              <span>LOCATION: KYIV, UA</span>
              <span>TIMEZONE: EET (UTC+2)</span>
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
