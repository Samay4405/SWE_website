"use client";

import { useEffect, useRef, useCallback } from "react";

interface Droplet {
  angle: number;
  offset: number;
  radius: number;
  speed: number;
}

export interface PaintSplashTriggerOptions {
  x: number;
  y: number;
  duration?: number;
}

export function PaintSplashWave({
  registerTrigger,
}: {
  registerTrigger: (fn: (opts: PaintSplashTriggerOptions) => void) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  const startWave = useCallback(
    ({ x, y, duration = 720 }: PaintSplashTriggerOptions) => {
      // Check prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.display = "block";
      canvas.style.opacity = "1";

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      const maxDist = Math.hypot(
        Math.max(x, width - x),
        Math.max(y, height - y)
      );

      // Pre-generate satellite paint splash droplets
      const droplets: Droplet[] = Array.from({ length: 18 }, () => ({
        angle: Math.random() * Math.PI * 2,
        offset: (Math.random() - 0.5) * 40,
        radius: 3 + Math.random() * 6,
        speed: 0.95 + Math.random() * 0.15,
      }));

      const startTime = performance.now();

      // Fluid bezier easing: cubic-bezier(0.22, 1, 0.36, 1)
      const easeOutFluid = (t: number) => {
        return 1 - Math.pow(1 - t, 3.2);
      };

      const render = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const waveProgress = easeOutFluid(progress);

        ctx.clearRect(0, 0, width, height);

        // Current wave radius
        const currentRadius = maxDist * waveProgress;

        // Wave crest fades out smoothly near completion
        const alpha = Math.max(0, 1 - Math.pow(progress, 2.5));
        ctx.globalAlpha = alpha;

        const steps = 120;
        ctx.beginPath();

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;

          // Multi-frequency harmonic wave displacement
          const waveDisplacement =
            Math.sin(theta * 4 + progress * 5) * 14 +
            Math.cos(theta * 7 - progress * 4) * 8 +
            Math.sin(theta * 11 + progress * 3) * 4;

          const r = Math.max(0, currentRadius + waveDisplacement);
          const px = x + Math.cos(theta) * r;
          const py = y + Math.sin(theta) * r;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();

        // Luminous Paint Splash Crest Gradient
        ctx.lineWidth = Math.max(3, 10 * (1 - progress));
        const grad = ctx.createLinearGradient(
          x - currentRadius,
          y - currentRadius,
          x + currentRadius,
          y + currentRadius
        );
        grad.addColorStop(0, "rgba(167, 139, 218, 0.95)"); // Royal Amethyst
        grad.addColorStop(0.5, "rgba(245, 215, 110, 0.95)"); // SWE Gold
        grad.addColorStop(1, "rgba(101, 56, 165, 0.95)"); // Deep Purple

        ctx.strokeStyle = grad;
        ctx.shadowColor = "rgba(167, 139, 218, 0.75)";
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Secondary subtle inner glow ring
        ctx.lineWidth = Math.max(1, 4 * (1 - progress));
        ctx.strokeStyle = "rgba(245, 215, 110, 0.6)";
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Satellite paint splash droplets
        if (progress < 0.85) {
          ctx.shadowBlur = 4;
          for (let d = 0; d < droplets.length; d++) {
            const drop = droplets[d];
            const r = Math.max(0, currentRadius * drop.speed + drop.offset);
            const dx = x + Math.cos(drop.angle) * r;
            const dy = y + Math.sin(drop.angle) * r;

            ctx.beginPath();
            ctx.arc(dx, dy, drop.radius * (1 - progress * 0.7), 0, Math.PI * 2);
            ctx.fillStyle =
              d % 2 === 0
                ? "rgba(167, 139, 218, 0.85)"
                : "rgba(245, 215, 110, 0.85)";
            ctx.fill();
          }
        }

        if (progress < 1) {
          animRef.current = requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, width, height);
          canvas.style.display = "none";
        }
      };

      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
      animRef.current = requestAnimationFrame(render);
    },
    []
  );

  useEffect(() => {
    registerTrigger(startWave);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [registerTrigger, startWave]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 999999,
        display: "none",
      }}
    />
  );
}
