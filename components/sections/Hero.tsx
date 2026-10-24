"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { HeroConstellation } from "@/components/sections/HeroConstellation";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative -mt-16 md:-mt-18 min-h-screen w-full flex items-center justify-center overflow-x-clip select-none"
      style={{
        background: `
          radial-gradient(circle at 86% 26%, rgba(165, 44, 145, 0.65) 0%, rgba(130, 36, 125, 0.3) 38%, transparent 68%),
          radial-gradient(circle at 14% 38%, rgba(36, 20, 92, 0.85) 0%, rgba(23, 16, 68, 0.98) 55%, transparent 82%),
          radial-gradient(circle at 50% 48%, rgba(86, 43, 145, 0.35) 0%, transparent 65%),
          linear-gradient(135deg, #171044 0%, #24145C 25%, #562B91 55%, #8A267E 80%, #A52C91 100%)
        `,
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.038] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <HeroConstellation />

      <div className="section-container relative z-20 flex flex-col items-center px-4 pt-28 pb-24 md:pt-36 md:pb-28">
        <motion.div
          variants={staggerContainer}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="flex max-w-3xl flex-col items-center text-center xl:max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#DCD0F5]/85 sm:text-[11px]">
              SOCIETY OF WOMEN ENGINEERS · MIT-WPU CHAPTER
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-extrabold tracking-tight"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
            }}
          >
            <span className="block text-3xl leading-[1.08] text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.35rem]">
              Empowering Women.
            </span>
            <span className="mt-1.5 block bg-gradient-to-r from-[#DCD0F5] via-[#E9D5FF] to-[#F472B6] bg-clip-text text-3xl leading-[1.08] text-transparent drop-shadow-[0_0_24px_rgba(244,114,182,0.25)] sm:mt-2.5 sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.35rem]">
              Engineering Tomorrow.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-9 max-w-xl text-balance text-sm font-normal leading-relaxed text-[#E4DBF5]/90 sm:mb-10 sm:max-w-2xl sm:text-base md:text-lg"
          >
            A community of curious minds, bold ideas and future builders —
            where women in STEM connect, learn and create real impact.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-6 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link href="/events" className="w-full sm:w-auto">
              <button
                type="button"
                className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#DCD0F5] px-7 text-sm font-semibold text-[#171044] shadow-[0_8px_24px_rgba(220,208,245,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EAE0FC] hover:shadow-[0_12px_28px_rgba(220,208,245,0.42)] sm:w-auto sm:text-base"
              >
                Explore Events
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <button
                type="button"
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/5 px-7 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/12 sm:w-auto sm:text-base"
              >
                Join the Community
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="hidden items-center gap-1.5 text-[11px] tracking-wide text-[#DCD0F5]/70 sm:text-xs md:flex"
          >
            <Sparkles className="size-3 animate-pulse text-[#F472B6]" />
            <span>Hover over the nodes for STEM facts</span>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 transition-transform duration-200 hover:translate-y-0.5"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DCD0F5]/80 transition-colors duration-200 group-hover:text-white">
          SCROLL
        </span>
        <span className="relative h-10 w-px bg-gradient-to-b from-[#DCD0F5]/70 to-transparent">
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 animate-bounce rounded-full bg-[#DCD0F5] shadow-[0_0_8px_#DCD0F5]" />
        </span>
      </a>
    </section>
  );
}
