"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const links = [
    { href: "#about", label: "/ABOUT" },
    { href: "#skills", label: "/SKILLS" },
    { href: "#experience", label: "/EXP" },
    { href: "#projects", label: "/PROJECTS" },
    { href: "/blog", label: "/BLOG" },
    { href: "#contact", label: "/CONTACT" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          onClick={onClose}
        >
          <nav className="flex flex-col items-center gap-6 text-xl">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-[--green] hover:glow transition-all"
                onClick={onClose}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 text-[--green] text-3xl"
            onClick={onClose}
          >
            ✕
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[--bg]/90 border-b border-[--green-dim] backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between text-sm">
          <a href="/" className="glow">~/ARTEM</a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4 text-[--green-dim]">
            <a href="#about" className="hover:text-[--green] hover:glow transition-colors">/ABOUT</a>
            <a href="#skills" className="hover:text-[--green] hover:glow transition-colors">/SKILLS</a>
            <a href="#experience" className="hover:text-[--green] hover:glow transition-colors">/EXP</a>
            <a href="#projects" className="hover:text-[--green] hover:glow transition-colors">/PROJECTS</a>
            <a href="/blog" className="hover:text-[--green] hover:glow transition-colors">/BLOG</a>
            <a href="#contact" className="hover:text-[--green] hover:glow transition-colors">/CONTACT</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[--green] text-xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="pt-12">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[--green-dim] border-t border-[--green-dim]">
        <p>© {new Date().getFullYear()} ARTEM SHKONDA</p>
        <p className="text-xs mt-2 opacity-50">SYSTEM UPTIME: 99.9%</p>
        <p className="text-xs mt-4 opacity-70">
          <span className="text-[--green]">TIP:</span> Press <kbd className="px-2 py-1 border border-[--green-dim] mx-1">`</kbd> or <kbd className="px-2 py-1 border border-[--green-dim] mx-1">Ctrl+K</kbd> to open terminal
        </p>
      </footer>
    </div>
  );
}
