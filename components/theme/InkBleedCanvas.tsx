"use client";

import { useEffect, useRef, useCallback } from "react";

interface Droplet {
  angle: number;
  distanceMult: number;
  baseRadius: number;
  growthMult: number;
  noiseOffset: number;
}

interface Harmonic {
  freq: number;
  amp: number;
  phase: number;
}

interface Capillary {
  angle: number;
  width: number;
  intensity: number;
}

export interface InkBleedTriggerOptions {
  x: number;
  y: number;
  targetTheme: "dark" | "light";
  onThemeSwap: () => void;
}

export function InkBleedCanvas({
  registerTrigger,
}: {
  registerTrigger: (
    fn: (options: InkBleedTriggerOptions) => void
  ) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startAnimation = useCallback(
    ({ x, y, targetTheme, onThemeSwap }: InkBleedTriggerOptions) => {
      // Check prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        onThemeSwap();
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) {
        onThemeSwap();
        return;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      if (!ctx) {
        onThemeSwap();
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.display = "block";
      canvas.style.opacity = "1";

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      // Calculate maximum distance to cover the screen
      const maxDist = Math.hypot(
        Math.max(x, width - x),
        Math.max(y, height - y)
      );

      // Pre-generate organic harmonic noise for the ink edge
      const harmonics: Harmonic[] = [
        { freq: 2, amp: 0.14, phase: Math.random() * Math.PI * 2 },
        { freq: 3, amp: 0.18, phase: Math.random() * Math.PI * 2 },
        { freq: 5, amp: 0.12, phase: Math.random() * Math.PI * 2 },
        { freq: 7, amp: 0.08, phase: Math.random() * Math.PI * 2 },
        { freq: 11, amp: 0.05, phase: Math.random() * Math.PI * 2 },
        { freq: 17, amp: 0.03, phase: Math.random() * Math.PI * 2 },
      ];

      // Capillary branches (directional ink seepage)
      const capillaries: Capillary[] = Array.from({ length: 8 }, () => ({
        angle: Math.random() * Math.PI * 2,
        width: 0.15 + Math.random() * 0.25,
        intensity: 0.2 + Math.random() * 0.35,
      }));

      // Satellite splatter droplets ahead of the ink wave
      const droplets: Droplet[] = Array.from({ length: 16 }, () => ({
        angle: Math.random() * Math.PI * 2,
        distanceMult: 1.15 + Math.random() * 0.45,
        baseRadius: 12 + Math.random() * 28,
        growthMult: 0.7 + Math.random() * 0.6,
        noiseOffset: Math.random() * Math.PI,
      }));

      // Color roles
      const isDarkTarget = targetTheme === "dark";
      const inkFillColor = isDarkTarget ? "#0F0D15" : "#FCFBFE";
      const edgeColor1 = isDarkTarget
        ? "rgba(167, 139, 218, 0.85)" // Violet bleed
        : "rgba(101, 56, 165, 0.65)"; // Purple bleed on paper
      const edgeColor2 = isDarkTarget
        ? "rgba(245, 215, 110, 0.65)" // Gold highlight
        : "rgba(232, 185, 79, 0.55)"; // Warm gold

      const startTime = performance.now();
      const DURATION = 820; // ms
      let hasSwappedTheme = false;

      // Easing functions
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const render = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / DURATION, 1);
        const expandProgress = easeOutQuart(rawProgress);

        // Swap theme halfway through when ink covers center & screen
        if (rawProgress >= 0.58 && !hasSwappedTheme) {
          onThemeSwap();
          hasSwappedTheme = true;
        }

        ctx.clearRect(0, 0, width, height);

        // Fade out canvas in the final 28% of animation
        let alpha = 1;
        if (rawProgress > 0.72) {
          alpha = 1 - (rawProgress - 0.72) / 0.28;
        }
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        const baseRadius = maxDist * expandProgress * 1.35;

        // Draw main organic ink blob
        const steps = 180;
        ctx.beginPath();

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;

          // Compute multi-frequency harmonic modulation
          let noise = 0;
          for (let h = 0; h < harmonics.length; h++) {
            noise +=
              Math.sin(theta * harmonics[h].freq + harmonics[h].phase) *
              harmonics[h].amp;
          }

          // Compute capillary spikes
          let capillaryBoost = 0;
          for (let c = 0; c < capillaries.length; c++) {
            const diff = Math.atan2(
              Math.sin(theta - capillaries[c].angle),
              Math.cos(theta - capillaries[c].angle)
            );
            const dist = Math.abs(diff);
            if (dist < capillaries[c].width) {
              const factor = 1 - dist / capillaries[c].width;
              capillaryBoost += factor * factor * capillaries[c].intensity;
            }
          }

          // Modulation increases towards outer radius
          const radialMod =
            1 +
            noise * (0.15 + 0.15 * (1 - expandProgress)) +
            capillaryBoost * (1 - expandProgress * 0.5);

          const r = Math.max(0, baseRadius * radialMod);
          const px = x + Math.cos(theta) * r;
          const py = y + Math.sin(theta) * r;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.fillStyle = inkFillColor;
        ctx.fill();

        // Ink Meniscus Edge Glow (only while expanding)
        if (rawProgress < 0.8) {
          ctx.save();
          ctx.lineWidth = Math.max(2, 6 * (1 - rawProgress));
          const edgeGrad = ctx.createRadialGradient(
            x,
            y,
            Math.max(0, baseRadius * 0.8),
            x,
            y,
            Math.max(0, baseRadius * 1.1)
          );
          edgeGrad.addColorStop(0, "transparent");
          edgeGrad.addColorStop(0.7, edgeColor1);
          edgeGrad.addColorStop(1, edgeColor2);
          ctx.strokeStyle = edgeGrad;
          ctx.stroke();
          ctx.restore();
        }

        // Draw satellite splatter droplets ahead of main stain
        if (rawProgress < 0.75) {
          const dropletAlpha = Math.max(0, 1 - rawProgress / 0.75);
          ctx.save();
          ctx.globalAlpha = alpha * dropletAlpha;
          ctx.fillStyle = inkFillColor;

          for (let d = 0; d < droplets.length; d++) {
            const drop = droplets[d];
            const dropDist = baseRadius * drop.distanceMult;
            if (dropDist > maxDist * 1.4) continue;

            const dx = x + Math.cos(drop.angle) * dropDist;
            const dy = y + Math.sin(drop.angle) * dropDist;

            // Droplet grows and distorts
            const dropRadius =
              drop.baseRadius *
              (0.3 + 0.7 * easeInOutCubic(Math.min(rawProgress * 1.5, 1))) *
              drop.growthMult;

            ctx.beginPath();
            ctx.arc(dx, dy, Math.max(1, dropRadius), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          // Cleanup
          ctx.clearRect(0, 0, width, height);
          canvas.style.display = "none";
          canvas.style.opacity = "0";
        }
      };

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(render);
    },
    []
  );

  useEffect(() => {
    registerTrigger(startAnimation);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [registerTrigger, startAnimation]);

  return (
    <canvas
      ref={canvasRef}
      id="ink-bleed-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        display: "none",
        willChange: "opacity",
        transition: "opacity 0.2s ease-out",
      }}
    />
  );
}
