"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroSpotlightReveal } from "@/components/sections/HeroSpotlightReveal";
import { HeroLogo } from "@/components/sections/HeroLogo";

// ── EDITABLE TAGLINE ──
const TAGLINE = "Where Her Potential Becomes Power.";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [taglineVisible, setTaglineVisible] = useState(
    Boolean(prefersReducedMotion)
  );

  const handleAnimationComplete = useCallback(() => {
    setTaglineVisible(true);
  }, []);

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative -mt-16 md:-mt-18 h-[100svh] min-h-[560px] max-h-[1080px] w-full flex flex-col justify-between overflow-hidden select-none"
      aria-label="Hero Section"
    >
      {/* ── INTERACTIVE CURSOR-REVEAL BACKGROUND ── */}
      {/* Layer 1: Supplied Purple-Pink Grainy Gradient */}
      {/* Layer 2: Vintage Sepia Collage of Influential Women in STEM revealed via spotlight */}
      <HeroSpotlightReveal />

      {/* Top spacer to ensure title never crowds the navbar */}
      <div className="h-16 md:h-18 flex-shrink-0" aria-hidden="true" />

      {/* ── BALANCED CENTRED COMPOSITION ── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 text-center my-auto w-full max-w-5xl mx-auto">
        {/* 1. SWE MIT-WPU Centerpiece Logo with Floating Sequence Animation */}
        <HeroLogo
          onAnimationComplete={handleAnimationComplete}
          className="w-full flex justify-center"
        />

        {/* 2. Directly beneath: Clean, confident modern sans-serif tagline */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
          }
          animate={
            taglineVisible || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-7 md:mt-8 px-4"
        >
          <h2
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-[0.16em] text-white/95 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            }}
          >
            {TAGLINE}
          </h2>
        </motion.div>
      </div>

      {/* ── 3. SUBTLE SCROLL INDICATOR ── */}
      <div className="relative z-20 pb-7 sm:pb-8 flex justify-center flex-shrink-0">
        <a
          href="#about"
          onClick={handleScrollToAbout}
          className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:translate-y-0.5 cursor-pointer"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 group-hover:text-white transition-colors">
            SCROLL
          </span>
          <span className="relative h-7 w-px bg-gradient-to-b from-white/60 to-transparent">
            <span className="absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-white animate-bounce shadow-[0_0_6px_#fff]" />
          </span>
        </a>
      </div>
    </section>
  );
}
