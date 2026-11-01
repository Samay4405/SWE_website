"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface HeroSpotlightRevealProps {
  /** Underlying collage image path. Defaults to /images/hero/influential-women-collage.jpg */
  collageSrc?: string;
  className?: string;
}

export function HeroSpotlightReveal({
  collageSrc = "/images/hero/influential-women-collage.jpg",
  className = "",
}: HeroSpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Pointer position and lerp state
  const targetPos = useRef({ x: 0, y: 0, active: false });
  const currentPos = useRef({ x: 0, y: 0, opacity: 0 });

  const [activeCollageSrc, setActiveCollageSrc] = useState(collageSrc);

  // ── Smooth Lerp Animation Loop (Direct DOM mutation for 60-120 FPS performance) ──
  useEffect(() => {
    if (prefersReducedMotion) {
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "0";
      }
      return;
    }

    let isRunning = true;
    let animFrameId: number;

    const animate = () => {
      if (!isRunning) return;

      const factor = 0.12;
      const opacityFactor = 0.08;

      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * factor;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * factor;

      // Soft max opacity (0.92) to reveal the authentic sepia collage with clear contrast
      const targetOpacity = targetPos.current.active ? 0.92 : 0;
      currentPos.current.opacity +=
        (targetOpacity - currentPos.current.opacity) * opacityFactor;

      const { x, y, opacity } = currentPos.current;
      const el = revealLayerRef.current;

      if (el) {
        // Spotlight radius: ~220px desktop, ~140px mobile
        const radius =
          typeof window !== "undefined" && window.innerWidth < 768 ? 140 : 220;

        if (opacity > 0.005) {
          // Soft feathered gradient stop for seamless blending into the purple-pink gradient
          const maskGradient = `radial-gradient(circle ${radius}px at ${x.toFixed(
            1
          )}px ${y.toFixed(1)}px, black 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.18) 72%, transparent 100%)`;

          el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
          el.style.webkitMaskImage = maskGradient;
          el.style.maskImage = maskGradient;
        } else {
          el.style.opacity = "0";
          el.style.webkitMaskImage = "none";
          el.style.maskImage = "none";
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion]);

  // Pointer event handlers attached to window/hero
  const handlePointerMove = useCallback((e: PointerEvent | MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (isInside) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPos.current = { x, y, active: true };
    } else {
      targetPos.current.active = false;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    targetPos.current.active = false;
  }, []);

  // Touch handlers for mobile
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    targetPos.current = { x, y, active: true };
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      targetPos.current.active = false;
    }, 450);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handlePointerMove, handlePointerLeave, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* ── LAYER 1: Purple-Pink Gradient Image (Dominant Background) ── */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero/hero-bg-gradient.jpg"
          alt="SWE MIT-WPU Gradient Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
          quality={95}
        />
        {/* Subtle authentic grain overlay filter to enhance atmospheric texture */}
        <div
          className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── LAYER 2: Supplied Collage of Influential Women in STEM (Revealed Strictly via Spotlight Mask) ── */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 w-full h-full opacity-0 will-change-[mask-image,opacity] pointer-events-none"
      >
        <Image
          src={activeCollageSrc}
          alt="Collage of Influential Women in STEM"
          fill
          sizes="100vw"
          quality={95}
          priority
          className="object-cover object-center select-none"
          onError={() => {
            if (activeCollageSrc !== "/images/hero/influential-women-collage.jpg") {
              setActiveCollageSrc("/images/hero/influential-women-collage.jpg");
            }
          }}
        />

        {/* Ambient vintage editorial vignette */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
      </div>
    </div>
  );
}
