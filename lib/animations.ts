import type { Variants, Transition } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM MOTION TOKENS — SWE MIT-WPU
   Consolidated easings, durations, and spring presets
   ───────────────────────────────────────────────────────────── */

export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const SPRING_GLIDE = { stiffness: 130, damping: 25, mass: 0.9 };
export const SPRING_SNAP = { stiffness: 85, damping: 22, mass: 0.2 };
export const SPRING_GENTLE = { stiffness: 120, damping: 18, mass: 0.8 };
export const SPRING_POP = { stiffness: 300, damping: 20 };

export const DURATION_FAST = 0.2;
export const DURATION_NORMAL = 0.4;
export const DURATION_SLOW = 0.75;
export const DURATION_EDITORIAL = 0.9;

/**
 * Editorial fade up variant for headings and section openers
 */
export const fadeUpEditorial: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EDITORIAL,
    },
  },
};

/**
 * Fade in from below — default scroll-reveal animation
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_EDITORIAL,
    },
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EDITORIAL,
    },
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EDITORIAL,
    },
  },
};

/**
 * Simple fade in (no translate)
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Container that staggers its children's animations
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

/**
 * Slower stagger for larger grids
 */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

/**
 * Scale up on hover — for interactive cards/buttons
 */
export const scaleOnHover: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.25,
      ease: EASE_EDITORIAL,
    },
  },
};

/**
 * Line draw animation for SVG paths
 */
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: EASE_EDITORIAL },
      opacity: { duration: 0.3 },
    },
  },
};
