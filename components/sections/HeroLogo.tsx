"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface HeroLogoProps {
  onAnimationComplete?: () => void;
  className?: string;
}

export function HeroLogo({ onAnimationComplete, className = "" }: HeroLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    if (prefersReducedMotion) return;
    setReplayKey((k) => k + 1);
  };

  return (
    <div
      key={replayKey}
      onClick={handleReplay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleReplay();
      }}
      title="Click to replay logo floating animation"
      aria-label="Society of Womens Engineers MIT-WPU, PUNE Logo"
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* ── Outer Continuous Floating Levitation Wrapper ── */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 5.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[740px] xl:max-w-[820px] aspect-[888/144]"
      >
        {/* Ambient subtle luminous glow behind logo */}
        <div
          className="pointer-events-none absolute inset-x-8 inset-y-0 -z-10 blur-3xl opacity-25 bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300"
          aria-hidden="true"
        />

        {/* ── Layer 1: "Society of Womens Engineers" (Floats in first) ── */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 26 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 1.25,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/hero/swe-hero-logo-line1.png"
            alt="Society of Womens Engineers"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 820px"
            className="object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.28)] select-none"
          />
        </motion.div>

        {/* ── Layer 2: "— MIT-WPU, PUNE —" (Appears underneath with slight delay) ── */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 1.1,
                  delay: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          onAnimationComplete={onAnimationComplete}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/hero/swe-hero-logo-line2.png"
            alt="MIT-WPU, PUNE"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 820px"
            className="object-contain drop-shadow-[0_2px_16px_rgba(255,255,255,0.22)] select-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
