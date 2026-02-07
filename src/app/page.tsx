"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[--bg]/90 border-b border-[--green-dim] backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <a href="/" className="glow">~/ARTEM</a>
          <div className="flex items-center gap-4 text-[--green-dim]">
            <a href="#about" className="hover:text-[--green] hover:glow transition-colors">/ABOUT</a>
            <a href="#skills" className="hover:text-[--green] hover:glow transition-colors">/SKILLS</a>
            <a href="#experience" className="hover:text-[--green] hover:glow transition-colors">/EXP</a>
            <a href="#projects" className="hover:text-[--green] hover:glow transition-colors">/PROJECTS</a>
            <a href="/blog" className="hover:text-[--green] hover:glow transition-colors">/BLOG</a>
            <a href="#contact" className="hover:text-[--green] hover:glow transition-colors">/CONTACT</a>
          </div>
        </div>
      </nav>

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
