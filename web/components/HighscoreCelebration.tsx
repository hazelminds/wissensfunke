"use client";

import { useEffect, useRef, useState } from "react";

const TOKEN_COLORS = ["--nog-primary", "--nog-gold", "--nog-coral", "--nog-green"];
const FALLBACK_COLORS = ["#f4793a", "#f2c94c", "#f29a4c", "#3ecf8e"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

/** Feuerwerk + wachsender "HIGHSCORE"-Schriftzug für den einen Moment einer
 * echten neuen persönlichen Bestleistung -- zusätzlich zum normalen Konfetti,
 * das bei jeder gelösten Runde läuft (siehe Confetti.tsx). Mounten, sobald
 * `newBest` true wird; das Feuerwerk baut sich danach selbst ab (wie
 * Confetti), der Schriftzug bleibt stehen -- die Seite soll im Ruhezustand
 * vollständig aussehen, nicht nur während der Animation. Entwurf vorab als
 * Artifact abgestimmt. */
export function HighscoreCelebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showFireworks, setShowFireworks] = useState(true);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlay(true);
    const timer = setTimeout(() => setShowFireworks(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showFireworks) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const style = getComputedStyle(document.documentElement);
    const colors = TOKEN_COLORS.map((token, i) => style.getPropertyValue(token).trim() || FALLBACK_COLORS[i]);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];
    let rafId: number | null = null;
    const burstTimers: ReturnType<typeof setTimeout>[] = [];

    const burst = (x: number, y: number) => {
      const count = 26 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 1.6 + Math.random() * 2.4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 52 + Math.random() * 22,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.6 + Math.random() * 1.8,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.life++;
        p.vy += 0.045;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      particles = particles.filter((p) => p.life < p.maxLife);
      rafId = particles.length > 0 || burstTimers.length > 0 ? requestAnimationFrame(tick) : null;
    };

    const w = window.innerWidth;
    const h = window.innerHeight;
    const spots: [number, number][] = [
      [w * 0.28, h * 0.32],
      [w * 0.72, h * 0.26],
      [w * 0.5, h * 0.4],
      [w * 0.2, h * 0.5],
      [w * 0.8, h * 0.46],
    ];
    const delays = [0, 180, 420, 760, 1080];
    delays.forEach((delay, i) => {
      const id = setTimeout(() => {
        burst(spots[i][0], spots[i][1]);
        if (!rafId) rafId = requestAnimationFrame(tick);
        burstTimers.shift();
      }, delay);
      burstTimers.push(id);
    });

    return () => {
      burstTimers.forEach(clearTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [showFireworks]);

  return (
    <>
      {showFireworks && <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" />}
      <h2
        className="font-display text-center text-4xl font-extrabold tracking-tight md:text-[44px]"
        style={{
          background: "linear-gradient(135deg, hsl(45 95% 70%), hsl(var(--primary)) 55%, hsl(var(--psych)))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 0 18px hsl(45 95% 58% / 0.35))",
          animation: play ? "highscorePop 820ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : undefined,
          opacity: play ? undefined : 0,
          transform: play ? undefined : "scale(0.2)",
        }}
      >
        HIGHSCORE
      </h2>
    </>
  );
}
