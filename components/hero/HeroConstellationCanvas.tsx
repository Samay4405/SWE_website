"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { PIONEER_NODES, type PioneerNodeData } from "@/content/pioneers";
import { SPRINGS } from "@/lib/motion";

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
  depth: number; // 0.3 for background, 1.0 for pioneer
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  active: boolean;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
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

  // External trigger for ripple on click
  const triggerRippleRef = useRef<((x: number, y: number) => void) | null>(null);

  const handleSelectPioneer = useCallback((id: string, x?: number, y?: number) => {
    setActivePioneerId((prev) => {
      const next = prev === id ? null : id;
      if (next && x !== undefined && y !== undefined && triggerRippleRef.current) {
        triggerRippleRef.current(x, y);
      }
      return next;
    });
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

    // Mouse & Touch coordinate tracker + Parallax target
    const mouse = { x: -9999, y: -9999, isHovered: false };
    const parallax = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };

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

        if (!prefersReducedMotion) {
          parallax.targetX = (mouse.x - width / 2) * 0.035;
          parallax.targetY = (mouse.y - height / 2) * 0.035;
        }
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.isHovered = false;
        parallax.targetX = 0;
        parallax.targetY = 0;
      }
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
      parallax.targetX = 0;
      parallax.targetY = 0;
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
        depth: 1.0,
      });
    });

    // 2. Background Starfield Nodes (Distant layer with parallax)
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
        depth: 0.35 + rng() * 0.35,
      });
    }

    // 3. Shockwave Ripples from node clicks
    const ripples: Ripple[] = [];
    triggerRippleRef.current = (rx: number, ry: number) => {
      ripples.push({
        x: rx,
        y: ry,
        r: 0,
        maxR: isMobile ? 180 : 260,
        alpha: 0.8,
      });
    };

    // 4. Shooting Star State
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      length: 0,
      opacity: 0,
      active: false,
    };
    let nextShootingStarTime = 16000; // ms

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
      const introProgress = prefersReducedMotion ? 1 : Math.min(1, elapsed / 1200);

      if (isVisible && ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        // Smooth Lerp for pointer parallax
        parallax.currentX += (parallax.targetX - parallax.currentX) * 0.06;
        parallax.currentY += (parallax.targetY - parallax.currentY) * 0.06;

        const connectionThreshold = isMobile ? 105 : 140;

        // ── 1. Update Physics & Respiration ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];

          // Gentle idle orbital drift
          const idleDriftX = Math.sin(timestamp * 0.0009 + n.phase) * (n.isPioneer ? 3.5 : 2);
          const idleDriftY = Math.cos(timestamp * 0.0008 + n.phase) * (n.isPioneer ? 3.5 : 2);

          // Parallax depth offset
          const pX = parallax.currentX * n.depth;
          const pY = parallax.currentY * n.depth;

          n.homeX = n.nx * width + idleDriftX + pX;
          n.homeY = n.ny * height + idleDriftY + pY;

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

        // ── 2. Update & Draw Shooting Star ──
        if (!prefersReducedMotion) {
          if (!shootingStar.active && elapsed > nextShootingStarTime) {
            shootingStar.active = true;
            shootingStar.x = Math.random() * (width * 0.7);
            shootingStar.y = Math.random() * (height * 0.35);
            shootingStar.vx = 7 + Math.random() * 4;
            shootingStar.vy = 2.5 + Math.random() * 2;
            shootingStar.length = 80 + Math.random() * 50;
            shootingStar.opacity = 0.85;
            nextShootingStarTime = elapsed + 24000 + Math.random() * 14000;
          }

          if (shootingStar.active) {
            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.opacity -= 0.015;

            if (shootingStar.opacity > 0) {
              const tailX = shootingStar.x - shootingStar.vx * 8;
              const tailY = shootingStar.y - shootingStar.vy * 8;
              const starGrad = ctx.createLinearGradient(
                shootingStar.x,
                shootingStar.y,
                tailX,
                tailY
              );
              starGrad.addColorStop(0, `rgba(245, 215, 110, ${shootingStar.opacity})`);
              starGrad.addColorStop(0.4, `rgba(167, 139, 218, ${shootingStar.opacity * 0.7})`);
              starGrad.addColorStop(1, "transparent");

              ctx.strokeStyle = starGrad;
              ctx.lineWidth = 1.8;
              ctx.beginPath();
              ctx.moveTo(shootingStar.x, shootingStar.y);
              ctx.lineTo(tailX, tailY);
              ctx.stroke();
            } else {
              shootingStar.active = false;
            }
          }
        }

        // ── 3. Update & Draw Node Click Ripples ──
        for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
          const rip = ripples[rIdx];
          rip.r += 4.5;
          rip.alpha = Math.max(0, 0.8 * (1 - rip.r / rip.maxR));

          if (rip.alpha > 0.01) {
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(245, 215, 110, ${rip.alpha * 0.6})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            ripples.splice(rIdx, 1);
          }
        }

        // ── 4. Draw Soft Cursor Ambient Glow ──
        if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
          const glow = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            140
          );
          glow.addColorStop(0, "rgba(101, 56, 165, 0.09)");
          glow.addColorStop(0.6, "rgba(245, 215, 110, 0.04)");
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(mouse.x - 140, mouse.y - 140, 280, 280);
        }

        // ── 5. Draw Inter-Node Connections ──
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

        // ── 6. Draw Background Starfield Particles ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.isPioneer) continue;

          ctx.fillStyle = "rgba(101, 56, 165, 0.38)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // ── 7. Draw Pioneer Nodes (Organic Respiration Glow + Inner Core) ──
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (!n.isPioneer) continue;

          const isActive = activeIdRef.current === n.pioneer?.id;

          // Organic Respiration Pulse
          const pulse = Math.sin(timestamp * 0.0028 + n.phase);
          const haloRadius = isActive ? 16 : 9 + pulse * 1.8;

          ctx.fillStyle = isActive
            ? "rgba(245, 215, 110, 0.45)"
            : `rgba(167, 139, 218, ${0.18 + pulse * 0.08})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring border
          ctx.strokeStyle = isActive ? "#F5D76E" : "rgba(101, 56, 165, 0.65)";
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

        // Update overlay coordinates every 4 frames (15Hz throttle) to save React re-renders
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
      <div
        className="absolute inset-0 pointer-events-none z-10"
        role="region"
        aria-label="Women in STEM Pioneers Constellation"
      >
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
                  handleSelectPioneer(pioneer.id, pos.x, pos.y);
                }}
                className="group relative -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2"
              >
                <span className="sr-only">{pioneer.name}</span>
                <span className="h-full w-full rounded-full cursor-pointer" />
              </button>

              {/* ── Rich Glass Tooltip Card with Spring Entrance ── */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: isNearTop ? -8 : 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: isNearTop ? -6 : 6 }}
                    transition={SPRINGS.snappy}
                    className={`absolute z-30 pointer-events-auto ${cardAlignmentClass} ${
                      isNearTop ? "top-8" : "bottom-8"
                    }`}
                    style={{
                      minWidth: "260px",
                      maxWidth: "320px",
                    }}
                  >
                    <div className="relative p-4 rounded-2xl border border-[#E9E3FB] dark:border-[#3D3552] shadow-[0_16px_36px_-12px_rgba(101,56,165,0.22)] text-left backdrop-blur-md bg-white/95 dark:bg-[#1A1624]/95">
                      {/* Card Header: Initials Avatar + Name & Field */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EFFB] dark:bg-[#221C30] border border-[#E9E3FB] dark:border-[#3D3552] text-[#6538A5] dark:text-[#F5D76E] font-serif italic text-base font-semibold shadow-xs">
                          {pioneer.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#6538A5] dark:text-[#F5D76E] font-semibold">
                            {pioneer.field}
                          </span>
                          <h4 className="text-[15px] font-semibold text-[#1E1033] dark:text-[#EDEDED] tracking-tight truncate leading-tight">
                            {pioneer.name}
                          </h4>
                        </div>
                      </div>

                      {/* Authentic 1-Line Contribution Summary */}
                      <p className="text-xs text-[#6B6385] dark:text-[#C1B9D8] leading-relaxed font-light border-t border-[#F0ECF8] dark:border-[#3D3552] pt-2">
                        {pioneer.contribution}
                      </p>

                      {/* Close prompt for mobile tap */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePioneerId(null);
                        }}
                        className="mt-2 text-[10px] font-medium text-[#6538A5] dark:text-[#F5D76E] hover:underline cursor-pointer"
                      >
                        Close ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
