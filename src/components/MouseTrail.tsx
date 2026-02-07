"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const chars = "01アイウエオカキクケコ<>{}[];=+-*/&@#$";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastSpawnTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const spawnParticle = () => {
      const { x, y } = mouseRef.current;
      if (x === 0 && y === 0) return;

      const particle: Particle = {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        maxLife: 30 + Math.random() * 30,
        char: chars[Math.floor(Math.random() * chars.length)],
      };

      particlesRef.current.push(particle);

      // Limit particles
      if (particlesRef.current.length > 50) {
        particlesRef.current.shift();
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles based on time
      if (time - lastSpawnTime > 50) {
        spawnParticle();
        lastSpawnTime = time;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) return false;

        const alpha = p.life;
        const size = 12 + (1 - p.life) * 8;

        ctx.font = `${size}px monospace`;
        ctx.fillStyle = `rgba(51, 255, 51, ${alpha * 0.8})`;
        ctx.shadowColor = "#33ff33";
        ctx.shadowBlur = 10 * alpha;
        ctx.fillText(p.char, p.x, p.y);
        ctx.shadowBlur = 0;

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none"
    />
  );
}
