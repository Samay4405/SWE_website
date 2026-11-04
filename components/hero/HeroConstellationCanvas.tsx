"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { PIONEER_NODES, type PioneerNodeData } from "@/content/pioneers";

interface SimulatedNode {
  pioneer?: PioneerNodeData;
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  nx: number;
  ny: number;
  phase: number;
  radius: number;
  isPioneer: boolean;
}

export function HeroConstellationCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activePioneerId, setActivePioneerId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Pioneer node positions stored in state for responsive HTML overlay buttons
  const [overlayPositions, setOverlayPositions] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  // Keep active id in ref for the animation loop
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activePioneerId;

  const handleSelectPioneer = useCallback((id: string) => {
    setActivePioneerId((prev) => (prev === id ? null : id));
  }, []);

  // Close card when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePioneerId(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".pioneer-interactive-node")) {
        setActivePioneerId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };
    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Mouse & Touch coordinate tracker
    const mouse = { x: -9999, y: -9999, isHovered: false };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.isHovered = true;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.isHovered = false;
      }
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Seeded pseudo-random generator
    let seed = 42;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Initialize simulation nodes
    const isMobile = width < 768;
    const backgroundCount = isMobile ? 35 : 75;
    const nodes: SimulatedNode[] = [];

    // 1. Pioneer Nodes (10 nodes)
    PIONEER_NODES.forEach((p, idx) => {
      const px = p.nx * width;
      const py = p.ny * height;
      nodes.push({
        pioneer: p,
        x: px,
        y: py,
        vx: 0,
        vy: 0,
        homeX: px,
        homeY: py,
        nx: p.nx,
        ny: p.ny,
        phase: idx * 0.9,
        radius: 5.5,
        isPioneer: true,
      });
    });

    // 2. Background Starfield Nodes
    let attempts = 0;
    while (nodes.length < 10 + backgroundCount && attempts < 400) {
      attempts++;
      const nx = rng();
      const ny = rng();

      // Clear center area to ensure headline & CTA contrast
      const dxCenter = (nx - 0.5) / 0.32;
      const dyCenter = (ny - 0.5) / 0.28;
      if (dxCenter * dxCenter + dyCenter * dyCenter < 1) continue;

      // Keep margins clean
      if (nx < 0.04 || nx > 0.96 || ny < 0.06 || ny > 0.94) continue;

      const px = nx * width;
      const py = ny * height;

      nodes.push({
        x: px,
        y: py,
        vx: 0,
        vy: 0,
        homeX: px,
        homeY: py,
        nx,
        ny,
        phase: rng() * Math.PI * 2,
        radius: 1 + rng() * 1.5,
        isPioneer: false,
      });
    }

    let animationFrameId: number;
    let isVisible = true;
    let startTime: number | null = null;
    let lastOverlayUpdate = 0;

    // IntersectionObserver to pause loop when hero is scrolled offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab visibility listener to pause loop when user switches tabs
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Render loop
    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Opening sequential connection drawing sequence (1.2 seconds)
      const introProgress = prefersReducedMotion
        ? 1
        : Math.min(1, elapsed / 1200);

      if (isVisible && ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const connectionThreshold = isMobile ? 100 : 135;

        // ── 1. Update Physics ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];

          // Gentle idle orbital drift
          const idleDriftX = Math.sin(timestamp * 0.0009 + n.phase) * (n.isPioneer ? 3.5 : 2);
          const idleDriftY = Math.cos(timestamp * 0.0008 + n.phase) * (n.isPioneer ? 3.5 : 2);

          n.homeX = n.nx * width + idleDriftX;
          n.homeY = n.ny * height + idleDriftY;

          // Mouse Repulsion Physics with Division-by-Zero Guard
          if (mouse.isHovered) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 160 && dist > 0.001) {
              const force = ((1 - dist / 160) * 10) / Math.max(dist, 15);
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }

          // Restoring spring force towards home orbit
          const springK = n.isPioneer ? 0.035 : 0.025;
          n.vx += (n.homeX - n.x) * springK;
          n.vy += (n.homeY - n.y) * springK;

          // Damping (friction)
          n.vx *= 0.88;
          n.vy *= 0.88;

          // Position integration
          n.x += n.vx;
          n.y += n.vy;
        }

        // ── 2. Draw Soft Cursor Glow ──
        if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
          const glow = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            140
          );
          glow.addColorStop(0, "rgba(101, 56, 165, 0.08)");
          glow.addColorStop(0.6, "rgba(245, 215, 110, 0.03)");
          glow.addColorStop(1, "rgba(101, 56, 165, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(mouse.x - 140, mouse.y - 140, 280, 280);
        }

        // ── 3. Draw Inter-Node Connections ──
        ctx.lineWidth = 0.75;

        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);

            if (dist < connectionThreshold) {
              const alpha =
                (1 - dist / connectionThreshold) *
                0.22 *
                introProgress *
                (a.isPioneer || b.isPioneer ? 1.3 : 0.7);

              const strokeGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
              strokeGrad.addColorStop(0, `rgba(101, 56, 165, ${alpha})`);
              strokeGrad.addColorStop(1, `rgba(245, 215, 110, ${alpha * 0.9})`);

              ctx.strokeStyle = strokeGrad;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }

          // Connection from cursor to nearby nodes
          if (mouse.isHovered) {
            const distMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
            if (distMouse < 150) {
              const alphaMouse = (1 - distMouse / 150) * 0.28;
              ctx.strokeStyle = `rgba(101, 56, 165, ${alphaMouse})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        // ── 4. Draw Background Starfield Particles ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.isPioneer) continue;

          ctx.fillStyle = "rgba(101, 56, 165, 0.38)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // ── 5. Draw Pioneer Nodes (Glow + Inner Core) ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (!n.isPioneer) continue;

          const isActive = activeIdRef.current === n.pioneer?.id;

          // Outer pulsing halo
          const haloRadius = isActive ? 14 : 9 + Math.sin(timestamp * 0.003 + n.phase) * 1.5;
          ctx.fillStyle = isActive
            ? "rgba(245, 215, 110, 0.45)"
            : "rgba(167, 139, 218, 0.22)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring border
          ctx.strokeStyle = isActive
            ? "#F5D76E"
            : "rgba(101, 56, 165, 0.65)";
          ctx.lineWidth = isActive ? 2 : 1.2;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6.5, 0, Math.PI * 2);
          ctx.stroke();

          // White center separator
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Vibrant center dot
          ctx.fillStyle = isActive ? "#E8B94F" : "#6538A5";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update overlay coordinates every 4 frames (60fps / 4 = 15Hz throttle) to save React re-renders
        if (timestamp - lastOverlayUpdate > 65) {
          lastOverlayUpdate = timestamp;
          const pioneerPositions = nodes
            .filter((n) => n.isPioneer && n.pioneer)
            .map((n) => ({
              id: n.pioneer!.id,
              x: Math.round(n.x),
              y: Math.round(n.y),
            }));
          setOverlayPositions(pioneerPositions);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-1 select-none"
      aria-hidden="false"
    >
      {/* ── Progressive 2D Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ── Static Inline SVG Fallback (Visible before hydration or if JS/Canvas fails) ── */}
      {!mounted && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          aria-hidden="true"
        >
          {PIONEER_NODES.map((node, i) => {
            const nextNode = PIONEER_NODES[(i + 1) % PIONEER_NODES.length];
            return (
              <g key={node.id}>
                <line
                  x1={`${node.nx * 100}%`}
                  y1={`${node.ny * 100}%`}
                  x2={`${nextNode.nx * 100}%`}
                  y2={`${nextNode.ny * 100}%`}
                  stroke="rgba(101, 56, 165, 0.2)"
                  strokeWidth="1"
                />
                <circle
                  cx={`${node.nx * 100}%`}
                  cy={`${node.ny * 100}%`}
                  r="5"
                  fill="#6538A5"
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* ── Accessible Keyboard & Touch Overlay Buttons for Pioneer Nodes ── */}
      <div className="absolute inset-0 pointer-events-none z-10" role="region" aria-label="Women in STEM Pioneers Constellation">
        <span className="sr-only">
          Constellation of 10 inspiring women in STEM. Tab to explore their achievements.
        </span>

        {overlayPositions.map((pos) => {
          const pioneer = PIONEER_NODES.find((p) => p.id === pos.id);
          if (!pioneer) return null;
          const isOpen = activePioneerId === pioneer.id;

          // Adjust card alignment so tooltips never clip off-screen edges
          const isNearLeft = pos.x < 160;
          const isNearRight = containerRef.current
            ? pos.x > containerRef.current.clientWidth - 160
            : false;
          const isNearTop = pos.y < 180;

          const cardAlignmentClass = isNearLeft
            ? "left-0 -translate-x-4"
            : isNearRight
              ? "right-0 translate-x-4"
              : "-translate-x-1/2";

          return (
            <div
              key={pioneer.id}
              className="pioneer-interactive-node absolute pointer-events-auto"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
            >
              {/* Accessible Interactive Target (WCAG 44x44px Tap Target) */}
              <button
                type="button"
                tabIndex={0}
                aria-label={`${pioneer.name}, known for ${pioneer.field}. Press to view details.`}
                aria-expanded={isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPioneer(pioneer.id);
                }}
                className="group relative -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2"
              >
                <span className="sr-only">{pioneer.name}</span>
                {/* Invisible hover hotspot */}
                <span className="h-full w-full rounded-full cursor-pointer" />
              </button>

              {/* ── Rich Glass Tooltip Card (Shown on Click/Tap or Hover) ── */}
              <div
                className={`absolute z-30 transition-all duration-300 pointer-events-auto ${cardAlignmentClass} ${
                  isNearTop ? "top-8" : "bottom-8"
                } ${
                  isOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                }`}
                style={{
                  minWidth: "260px",
                  maxWidth: "320px",
                }}
              >
                <div
                  className="relative p-4 rounded-2xl border border-[#E9E3FB] shadow-[0_16px_36px_-12px_rgba(101,56,165,0.22)] text-left backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.94)",
                  }}
                >
                  {/* Card Header: Initials Avatar + Name & Field */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EFFB] border border-[#E9E3FB] text-[#6538A5] font-serif italic text-base font-semibold shadow-xs">
                      {pioneer.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-[#6538A5] font-semibold">
                        {pioneer.field}
                      </span>
                      <h4 className="text-[15px] font-semibold text-[#1e1033] tracking-tight truncate leading-tight">
                        {pioneer.name}
                      </h4>
                    </div>
                  </div>

                  {/* Authentic 1-Line Contribution Summary */}
                  <p className="text-xs text-[#6B6385] leading-relaxed font-light border-t border-[#F0ECF8] pt-2">
                    {pioneer.contribution}
                  </p>

                  {/* Close prompt for mobile tap */}
                  {isOpen && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePioneerId(null);
                      }}
                      className="mt-2 text-[10px] font-medium text-[#6538A5] hover:underline"
                    >
                      Close ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

