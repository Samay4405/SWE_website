"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface AuroraFlowProps {
  className?: string;
  height?: number | string;
}

interface RibbonConfig {
  baseYPercent: number; // 0 to 1
  thickness: number; // in px
  freq1: number;
  freq2: number;
  speed1: number;
  speed2: number;
  amp1: number;
  amp2: number;
  phaseOffset: number;
  // Color stops: [offset, color]
  colorStops: [number, string][];
  opacity: number;
}

export function AuroraFlow({
  className = "",
  height = "340px",
}: AuroraFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Mouse / cursor position with smooth lerp
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovered: false,
    lastActive: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let heightPx = (canvas.height = container.clientHeight);

    // Initial center position for mouse
    mouseRef.current.targetX = width * 0.5;
    mouseRef.current.targetY = heightPx * 0.5;
    mouseRef.current.currentX = width * 0.5;
    mouseRef.current.currentY = heightPx * 0.5;

    // ── Ribbon Configurations with Purple & Yellow Palette ──
    // Rich royal purple, deep violet, lavender, warm amber, and golden yellow
    const ribbons: RibbonConfig[] = [
      {
        baseYPercent: 0.44,
        thickness: 95,
        freq1: 0.0018,
        freq2: 0.0035,
        speed1: 0.0007,
        speed2: 0.0009,
        amp1: 32,
        amp2: 18,
        phaseOffset: 0,
        opacity: 0.55,
        colorStops: [
          [0.0, "rgba(109, 40, 217, 0.52)"], // Rich royal violet
          [0.35, "rgba(126, 34, 206, 0.48)"], // Deep purple
          [0.7, "rgba(168, 85, 247, 0.42)"], // Electric purple
          [1.0, "rgba(216, 180, 254, 0.15)"], // Lavender mist
        ],
      },
      {
        baseYPercent: 0.52,
        thickness: 80,
        freq1: 0.0022,
        freq2: 0.0042,
        speed1: 0.0008,
        speed2: 0.0011,
        amp1: 28,
        amp2: 22,
        phaseOffset: 1.4,
        opacity: 0.58,
        colorStops: [
          [0.0, "rgba(245, 158, 11, 0.48)"], // Warm amber
          [0.4, "rgba(234, 179, 8, 0.55)"], // Luminous golden yellow
          [0.8, "rgba(253, 224, 71, 0.38)"], // Soft sunny yellow
          [1.0, "rgba(254, 240, 138, 0.12)"], // Cream yellow fade
        ],
      },
      {
        baseYPercent: 0.48,
        thickness: 110,
        freq1: 0.0015,
        freq2: 0.0028,
        speed1: 0.0006,
        speed2: 0.0008,
        amp1: 35,
        amp2: 24,
        phaseOffset: 2.8,
        opacity: 0.52,
        colorStops: [
          [0.0, "rgba(139, 92, 246, 0.5)"], // Vibrant violet
          [0.45, "rgba(167, 139, 250, 0.45)"], // Radiant lavender
          [0.75, "rgba(245, 158, 11, 0.35)"], // Intersecting warm gold
          [1.0, "rgba(124, 58, 237, 0.1)"], // Violet fade
        ],
      },
      {
        baseYPercent: 0.58,
        thickness: 70,
        freq1: 0.0026,
        freq2: 0.0051,
        speed1: 0.0009,
        speed2: 0.0013,
        amp1: 24,
        amp2: 16,
        phaseOffset: 4.1,
        opacity: 0.46,
        colorStops: [
          [0.0, "rgba(217, 119, 6, 0.38)"], // Golden amber
          [0.5, "rgba(250, 204, 21, 0.45)"], // Warm bright yellow
          [0.85, "rgba(192, 132, 252, 0.32)"], // Soft lilac
          [1.0, "rgba(147, 51, 234, 0.1)"], // Purple trail
        ],
      },
      {
        baseYPercent: 0.40,
        thickness: 65,
        freq1: 0.002,
        freq2: 0.0038,
        speed1: 0.0007,
        speed2: 0.001,
        amp1: 20,
        amp2: 15,
        phaseOffset: 5.2,
        opacity: 0.42,
        colorStops: [
          [0.0, "rgba(88, 28, 135, 0.42)"], // Deep indigo purple
          [0.5, "rgba(147, 51, 234, 0.46)"], // Violet shimmer
          [0.9, "rgba(253, 224, 71, 0.28)"], // Yellow highlight
          [1.0, "rgba(255, 255, 255, 0.0)"],
        ],
      },
    ];

    // ── Resize Observer & DPR Handling ──
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      heightPx = rect.height;

      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${heightPx}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // If motion is reduced, render once upon resize
      if (prefersReducedMotion) {
        renderFrame(0);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // ── Mouse & Pointer Tracking ──
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.isHovered = true;
      mouseRef.current.lastActive = performance.now();
    };

    const handlePointerLeave = () => {
      mouseRef.current.isHovered = false;
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    // ── Drawing Function ──
    const renderFrame = (timestamp: number) => {
      ctx.clearRect(0, 0, width, heightPx);

      // Lerp mouse towards target with organic easing
      const m = mouseRef.current;
      const now = timestamp;

      // When cursor is idle or on touch devices, softly float target in gentle lissajous figure
      if (!m.isHovered || now - m.lastActive > 2400) {
        const idleTime = now * 0.0006;
        m.targetX = width * 0.5 + Math.sin(idleTime) * (width * 0.28);
        m.targetY = heightPx * 0.5 + Math.cos(idleTime * 0.8) * (heightPx * 0.22);
      }

      m.currentX += (m.targetX - m.currentX) * 0.055;
      m.currentY += (m.targetY - m.currentY) * 0.055;

      // Draw each flowing aurora ribbon
      ribbons.forEach((ribbon) => {
        const baseY = heightPx * ribbon.baseYPercent;
        const halfThick = ribbon.thickness * 0.5;

        // Create linear horizontal gradient with beautiful multi-color stops
        const grad = ctx.createLinearGradient(0, baseY - halfThick, width, baseY + halfThick);
        ribbon.colorStops.forEach(([stop, color]) => {
          grad.addColorStop(stop, color);
        });

        ctx.fillStyle = grad;
        ctx.globalAlpha = ribbon.opacity;

        // Step size for smooth curves across width
        const step = 14;
        const totalSteps = Math.ceil(width / step) + 1;

        // Calculate top and bottom points
        const topPoints: { x: number; y: number }[] = [];
        const bottomPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= totalSteps; i++) {
          const x = i * step;

          // Harmonic wave calculation
          const wave1 =
            Math.sin(x * ribbon.freq1 + timestamp * ribbon.speed1 + ribbon.phaseOffset) *
            ribbon.amp1;
          const wave2 =
            Math.cos(x * ribbon.freq2 - timestamp * ribbon.speed2 + ribbon.phaseOffset * 1.5) *
            ribbon.amp2;
          const breathing = Math.sin(timestamp * 0.0005 + ribbon.phaseOffset) * 6;

          // Interactive cursor responsiveness: displacement field
          const dx = x - m.currentX;
          const dy = baseY - m.currentY;
          const distSq = dx * dx + dy * dy;
          const radius = Math.max(160, width * 0.22);
          const influence = Math.exp(-distSq / (radius * radius));

          // Soft cursor pull and ripples
          const mouseDisplace = (m.currentY - baseY) * 0.25 * influence;
          const mouseRipple = Math.sin(Math.sqrt(distSq) * 0.018 - timestamp * 0.003) * influence * 12;

          const centerCurve = baseY + wave1 + wave2 + breathing + mouseDisplace + mouseRipple;

          // Variable ribbon thickness modulation
          const thicknessMod =
            halfThick *
            (1 + Math.sin(x * 0.003 + timestamp * 0.001 + ribbon.phaseOffset) * 0.28);

          topPoints.push({ x, y: centerCurve - thicknessMod });
          bottomPoints.push({ x, y: centerCurve + thicknessMod });
        }

        // Draw smooth closed ribbon path
        ctx.beginPath();
        if (topPoints.length > 0) {
          ctx.moveTo(topPoints[0].x, topPoints[0].y);

          // Top boundary curve
          for (let i = 1; i < topPoints.length - 1; i++) {
            const xc = (topPoints[i].x + topPoints[i + 1].x) / 2;
            const yc = (topPoints[i].y + topPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(topPoints[i].x, topPoints[i].y, xc, yc);
          }
          ctx.lineTo(topPoints[topPoints.length - 1].x, topPoints[topPoints.length - 1].y);

          // Right edge to bottom curve
          ctx.lineTo(
            bottomPoints[bottomPoints.length - 1].x,
            bottomPoints[bottomPoints.length - 1].y
          );

          // Bottom boundary curve (backwards)
          for (let i = bottomPoints.length - 2; i > 0; i--) {
            const xc = (bottomPoints[i].x + bottomPoints[i - 1].x) / 2;
            const yc = (bottomPoints[i].y + bottomPoints[i - 1].y) / 2;
            ctx.quadraticCurveTo(bottomPoints[i].x, bottomPoints[i].y, xc, yc);
          }
          ctx.lineTo(bottomPoints[0].x, bottomPoints[0].y);
          ctx.closePath();
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
    };

    // ── Animation Loop with Visibility & Reduced-Motion Guard ──
    const animate = (time: number) => {
      if (!isVisible) return;
      renderFrame(time);
      animationFrameId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      renderFrame(1000);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }

    // Pause when offscreen to conserve CPU
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isVisible, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* ── Flowing Aurora Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* ── Soft Edge Blending Layers (Feathering seamlessly into pure white) ── */}
      {/* Top feather fade into white */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-white via-white/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Bottom feather fade into white */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-white via-white/85 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Subtle side vignettes to ensure ribbon vanishes gently at window borders */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/70 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/70 to-transparent z-10"
        aria-hidden="true"
      />
    </div>
  );
}

export default AuroraFlow;
