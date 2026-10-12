"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Custom animation variant (defaults to fadeInUp) */
  variant?: typeof fadeInUp;
  /** Stagger children animations */
  stagger?: boolean;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Viewport margin before triggering */
  viewportMargin?: string;
}

/**
 * Framer Motion wrapper that fades + translates children on scroll into view.
 * Respects prefers-reduced-motion.
 * Animates only once (viewport.once = true).
 */
export function ScrollReveal({
  children,
  className,
  variant = fadeInUp,
  stagger = false,
  delay = 0,
  viewportMargin = "-80px",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = stagger ? staggerContainer : variant;

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      transition={delay ? { delay } : undefined}
    >
      {stagger ? (
        children
      ) : (
        children
      )}
    </motion.div>
  );
}

/**
 * Individual item within a staggered ScrollReveal container.
 * Must be used as a direct child of <ScrollReveal stagger>.
 */
export function ScrollRevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeInUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}
