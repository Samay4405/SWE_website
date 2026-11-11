import type { Variants, Transition } from "framer-motion";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   MOTION SYSTEM — SWE MIT-WPU
   Single Source of Truth for Durations, Easings, Springs & Variants
   ───────────────────────────────────────────────────────────── */

// 1. Semantic Durations (in seconds for Framer Motion, ms for CSS)
export const DURATION = {
  instant: 0.1,    // 100ms — micro toggles, button presses
  fast: 0.18,      // 180ms — hover sheens, tooltips, icon snaps
  base: 0.28,      // 280ms — standard card transitions, dropdowns
  slow: 0.48,      // 480ms — section reveals, modal entrances
  cinematic: 0.85, // 850ms — hero transitions, route cross-fades
} as const;

export const DURATIONS = DURATION;

export const DURATION_MS = {
  instant: 100,
  fast: 180,
  base: 280,
  slow: 480,
  cinematic: 850,
} as const;

// 2. Curated Bezier Easing Curves
export const EASING = {
  // Standard general transition (smooth both ways)
  standard: [0.2, 0.0, 0.0, 1.0] as const,
  // Emphasised out (fast start, gradual deceleration) — ideal for entrances
  emphasisedOut: [0.16, 1.0, 0.3, 1.0] as const,
  // Emphasised in (slow start, rapid exit) — ideal for departures
  emphasisedIn: [0.7, 0.0, 0.84, 0.0] as const,
  // Fluid liquid curve for theme/wave transitions
  liquid: [0.22, 1.0, 0.36, 1.0] as const,
} as const;

export const EASINGS = EASING;

// 3. Physical Spring Presets
export const SPRINGS = {
  // Snappy: Quick, minimal overshoot (button clicks, tags, toggles)
  snappy: { type: "spring", stiffness: 420, damping: 28, mass: 0.8 } as const,
  // Smooth: Balanced organic glide (cards, carousels, cursor follower)
  smooth: { type: "spring", stiffness: 220, damping: 24, mass: 1.0 } as const,
  // Bouncy: Expressive playful rebound (badges, sparkles, success moments)
  bouncy: { type: "spring", stiffness: 320, damping: 16, mass: 0.9 } as const,
} as const;

// 4. Reusable Framer Motion Variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.emphasisedOut,
      delay: customDelay,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.base,
      ease: EASING.standard,
      delay: customDelay,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      ...SPRINGS.snappy,
      delay: customDelay,
    },
  }),
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.emphasisedOut,
      delay: customDelay,
    },
  }),
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: 14 },
  visible: (customDelay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.emphasisedOut,
      delay: customDelay,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const hoverLift = {
  rest: { y: 0, scale: 1, transition: SPRINGS.smooth },
  hover: { y: -4, scale: 1.015, transition: SPRINGS.smooth },
};

export const pressDown = {
  rest: { scale: 1 },
  pressed: { scale: 0.97, transition: SPRINGS.snappy },
};

// 5. Global Hook: useMotionPreference
// Detects reduced motion & low-power hardware, providing an authoritative flag
export function useMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Check pointer type
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(touchQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Detect low-power devices (concurrency <= 4 or saveData)
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
    };
    const isSaveData = Boolean(nav.connection?.saveData);
    const lowCores = (nav.hardwareConcurrency || 4) <= 2;
    setIsLowPower(isSaveData || lowCores);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    isReduced: prefersReducedMotion,
    isLowPower,
    isTouch,
    // Whether rich motion (3D tilt, parallax, particle canvas) should run
    shouldAnimate: !prefersReducedMotion && !isLowPower,
  };
}

