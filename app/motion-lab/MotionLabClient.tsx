"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MousePointer,
  RotateCcw,
  Zap,
  Layers,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/shared/TiltCard";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { useSparkleBurst } from "@/components/shared/SparkleBurst";
import { MaskedReveal } from "@/components/shared/MaskedReveal";
import {
  DURATION,
  EASING,
  useMotionPreference,
} from "@/lib/motion";

export function MotionLabClient() {
  const { isReduced, isTouch, isLowPower } = useMotionPreference();
  const { triggerSparkle, SparklePortal } = useSparkleBurst();

  const [activeEasing, setActiveEasing] = useState<keyof typeof EASING>("emphasisedOut");
  const [motionTrigger, setMotionTrigger] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  const durationItems = [
    { name: "Instant", value: DURATION.instant, token: "100ms", usage: "Toggles, micro-ticks, active presses" },
    { name: "Fast", value: DURATION.fast, token: "180ms", usage: "Hover states, pill switches, tooltips" },
    { name: "Base", value: DURATION.base, token: "280ms", usage: "Card lifts, drawer slides, accordion panels" },
    { name: "Slow", value: DURATION.slow, token: "480ms", usage: "Modal entries, masked reveals, tab cross-fades" },
    { name: "Cinematic", value: DURATION.cinematic, token: "850ms", usage: "Editorial section reveals, constellation flow" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#FCFBFE] dark:bg-[#0F0D15] text-[#1E1033] dark:text-[#F3F0FA] pt-28 pb-24 select-none">
      <SparklePortal />

      <div className="section-container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E9E3FB] dark:border-white/10">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-[#6538A5] dark:text-[#D1BEFC] hover:underline"
            >
              ← Back to Homepage
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B6385] dark:text-[#A79EC4]">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Motion Sandbox</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="mb-12">
          <span className="section-eyebrow">Design System · Motion Lab</span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033] dark:text-[#F3F0FA]">
            Luminous{" "}
            <span className="font-accent italic font-normal text-[#6538A5] dark:text-[#CBB7F7]">
              Interactions
            </span>{" "}
            &amp; Motion Tokens
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#6B6385] dark:text-[#A79EC4] font-light max-w-2xl">
            Live interactive laboratory verifying SWE MIT-WPU&apos;s physical timing tokens, magnetic affordances, 3D cursor spotlights, and masked reveals.
          </p>

          {/* Device & Preference Indicators */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[#E9E3FB] dark:border-white/10 bg-white/70 dark:bg-[#140E24]">
              <span className="text-[#6538A5] dark:text-[#D1BEFC]">prefers-reduced-motion:</span>
              <span className={isReduced ? "text-amber-500 font-semibold" : "text-emerald-500 font-semibold"}>
                {isReduced ? "ACTIVE" : "OFF"}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[#E9E3FB] dark:border-white/10 bg-white/70 dark:bg-[#140E24]">
              <span className="text-[#6538A5] dark:text-[#D1BEFC]">pointer:</span>
              <span className="text-[#1E1033] dark:text-white font-semibold">
                {isTouch ? "TOUCH" : "MOUSE / DESKTOP"}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[#E9E3FB] dark:border-white/10 bg-white/70 dark:bg-[#140E24]">
              <span className="text-[#6538A5] dark:text-[#D1BEFC]">power-mode:</span>
              <span className="text-[#1E1033] dark:text-white font-semibold">
                {isLowPower ? "LOW-POWER" : "STANDARD"}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            LAB SECTION 1: TIMING TOKENS & EASING PLAYGROUND
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl border border-[#E9E3FB] dark:border-white/10 bg-white/80 dark:bg-[#140E24]/80 backdrop-blur-md shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-[#6538A5] dark:text-[#D1BEFC]" />
                <h2 className="text-xl font-semibold tracking-tight">1. Timing Tokens &amp; Physical Easing</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B6385] dark:text-[#A79EC4] mt-0.5">
                Inspect duration tokens and test cubic-bezier physics on demand.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMotionTrigger((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6538A5] text-white text-xs font-medium hover:bg-[#532D8A] active:scale-95 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="size-3.5" />
              <span>Trigger Test Run</span>
            </button>
          </div>

          {/* Duration scale cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {durationItems.map((d) => (
              <div
                key={d.name}
                className="p-3.5 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-[#FAF8FD] dark:bg-[#1A1230]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1E1033] dark:text-white">{d.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#6538A5]/10 text-[#6538A5] dark:text-[#D1BEFC]">
                    {d.token}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-[#6B6385] dark:text-[#A79EC4] leading-snug">
                  {d.usage}
                </p>
              </div>
            ))}
          </div>

          {/* Easing selector pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-mono text-[#6B6385] dark:text-[#A79EC4] mr-2">Cubic Easing:</span>
            {(Object.keys(EASING) as Array<keyof typeof EASING>).map((k) => (
              <button
                key={String(k)}
                type="button"
                onClick={() => setActiveEasing(k)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeEasing === k
                    ? "bg-[#6538A5] text-white shadow-xs"
                    : "border border-[#E9E3FB] dark:border-white/10 hover:border-[#6538A5] text-[#1E1033] dark:text-[#F3F0FA]"
                }`}
              >
                {String(k)}
              </button>
            ))}
          </div>

          {/* Interactive track */}
          <div className="relative w-full h-24 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-[#F6F2FC]/50 dark:bg-[#0F0D15]/60 p-4 flex flex-col justify-center overflow-hidden">
            <div className="w-full h-1 bg-[#E9E3FB] dark:bg-white/10 rounded-full relative">
              <motion.div
                key={`${String(activeEasing)}-${motionTrigger}`}
                initial={{ left: "0%" }}
                animate={{ left: "calc(100% - 32px)" }}
                transition={{
                  duration: DURATION.slow,
                  ease: EASING[activeEasing],
                }}
                className="absolute -top-3.5 size-8 rounded-full bg-gradient-to-tr from-[#6538A5] to-[#E8B94F] shadow-md flex items-center justify-center text-white"
              >
                <Zap className="size-3.5 fill-white" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[#6B6385] dark:text-[#A79EC4] mt-4">
              <span>0% Start</span>
              <span>Curve: {String(activeEasing)} ({DURATION.slow}s)</span>
              <span>100% Target</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LAB SECTION 2: MAGNETIC BUTTONS & RIPPLE AFFORDANCES
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl border border-[#E9E3FB] dark:border-white/10 bg-white/80 dark:bg-[#140E24]/80 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer className="size-4 text-[#6538A5] dark:text-[#D1BEFC]" />
            <h2 className="text-xl font-semibold tracking-tight">2. Magnetic Affordance &amp; Sheen Buttons</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6385] dark:text-[#A79EC4] mb-6">
            Hover with cursor to experience the &le; 8px magnetic pull, sweeping light sheen, and click for a radial ripple shockwave.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Primary Magnetic CTA */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-[#FAF8FD] dark:bg-[#1A1230] text-center">
              <span className="text-xs font-mono text-[#6B6385] dark:text-[#A79EC4] mb-4">Variant: primary (sheen + gradient)</span>
              <MagneticButton
                variant="primary"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  triggerSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
                }}
              >
                <span>Primary Action</span>
                <ArrowRight className="size-4" />
              </MagneticButton>
            </div>

            {/* Secondary Magnetic Button */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-[#FAF8FD] dark:bg-[#1A1230] text-center">
              <span className="text-xs font-mono text-[#6B6385] dark:text-[#A79EC4] mb-4">Variant: secondary (lavender fill)</span>
              <MagneticButton variant="secondary">
                <span>Secondary Button</span>
              </MagneticButton>
            </div>

            {/* Gold Magnetic Button */}
            <div className="flex flex-col items-center p-6 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-[#FAF8FD] dark:bg-[#1A1230] text-center">
              <span className="text-xs font-mono text-[#6B6385] dark:text-[#A79EC4] mb-4">Variant: gold (chapter accent)</span>
              <MagneticButton variant="gold">
                <span>Explore Directory</span>
              </MagneticButton>
            </div>
          </div>

          {/* Animated links showcase */}
          <div className="mt-8 pt-6 border-t border-[#E9E3FB] dark:border-white/10 flex flex-wrap items-center justify-around gap-4">
            <span className="text-xs font-mono text-[#6B6385] dark:text-[#A79EC4]">Animated Underline Links:</span>
            <AnimatedLink href="/events" underlineColor="#6538A5">
              Events &amp; Workshops
            </AnimatedLink>
            <AnimatedLink href="/team" underlineColor="#A78BDA">
              Leadership &amp; Committees
            </AnimatedLink>
            <AnimatedLink href="/impact" underlineColor="#E8B94F">
              Impact &amp; Annual Metrics
            </AnimatedLink>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LAB SECTION 3: 3D TILT CARD & SPOTLIGHT
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl border border-[#E9E3FB] dark:border-white/10 bg-white/80 dark:bg-[#140E24]/80 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="size-4 text-[#6538A5] dark:text-[#D1BEFC]" />
            <h2 className="text-xl font-semibold tracking-tight">3. 3D Tilt Card &amp; Pointer Spotlight</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6385] dark:text-[#A79EC4] mb-6">
            Move mouse over the card. The card calculates true 3D pitch/roll (&le; 6°) with transform-style preserve-3d, tracking a radial spotlight and lifted purple shadow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard maxTilt={7} spotlight={true} className="h-full">
              <div className="p-7 flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#6538A5]/10 text-[#6538A5] dark:text-[#D1BEFC]">
                    Interactive 3D Stage
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1E1033] dark:text-white">
                    Collegiate Innovation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B6385] dark:text-[#A79EC4]">
                    Engineered with lerped pointer tracking to avoid layout reflows and strictly respecting reduced-motion preferences.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#6538A5] dark:text-[#D1BEFC] font-medium">
                  <span>Hover to test spotlight</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={7} spotlight={true} className="h-full">
              <div className="p-7 flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8B94F]/15 text-[#E8B94F]">
                    Gold Accent Glow
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1E1033] dark:text-white">
                    Community Mentorship
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B6385] dark:text-[#A79EC4]">
                    Pairing collegiate leaders with secondary school engineering candidates across Maharashtra.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#E8B94F] font-medium">
                  <span>Hover to test spotlight</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LAB SECTION 4: CUSTOM CURSOR HOVER ZONES & SPARKLES
           ══════════════════════════════════════════════════════════════ */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl border border-[#E9E3FB] dark:border-white/10 bg-white/80 dark:bg-[#140E24]/80 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-[#6538A5] dark:text-[#D1BEFC]" />
            <h2 className="text-xl font-semibold tracking-tight">4. Contextual Cursor States &amp; Sparkle Burst</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6385] dark:text-[#A79EC4] mb-6">
            Move cursor into each testing zone below to see the custom spring cursor transform dynamically.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Zone 1: Drag indicator */}
            <div
              data-cursor="drag"
              className="h-32 rounded-2xl border-2 border-dashed border-[#6538A5]/30 dark:border-white/20 bg-[#FAF8FD] dark:bg-[#1A1230] flex flex-col items-center justify-center p-4 text-center cursor-grab"
            >
              <span className="text-xs font-semibold text-[#6538A5] dark:text-[#D1BEFC]">Zone A: &quot;Drag&quot; Cursor</span>
              <p className="text-[11px] text-[#6B6385] dark:text-[#A79EC4] mt-1">Used on Events &amp; 3D Team Carousels</p>
            </div>

            {/* Zone 2: View indicator */}
            <div
              data-cursor="view"
              className="h-32 rounded-2xl border-2 border-dashed border-[#E8B94F]/40 dark:border-white/20 bg-[#FAF8FD] dark:bg-[#1A1230] flex flex-col items-center justify-center p-4 text-center cursor-pointer"
            >
              <span className="text-xs font-semibold text-[#E8B94F]">Zone B: &quot;View&quot; Cursor</span>
              <p className="text-[11px] text-[#6B6385] dark:text-[#A79EC4] mt-1">Used on Gallery Photo Lightboxes</p>
            </div>

            {/* Zone 3: Sparkle Trigger */}
            <div
              onClick={(e) => {
                triggerSparkle(e.clientX, e.clientY, 26);
              }}
              className="h-32 rounded-2xl border border-[#E9E3FB] dark:border-white/10 bg-gradient-to-br from-[#6538A5]/10 to-[#F5D76E]/15 hover:border-[#6538A5] flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="size-5 text-[#6538A5] dark:text-[#D1BEFC] mb-1" />
              <span className="text-xs font-semibold text-[#1E1033] dark:text-white">Zone C: Sparkle Burst</span>
              <p className="text-[11px] text-[#6B6385] dark:text-[#A79EC4] mt-1">Click anywhere in this box!</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LAB SECTION 5: MASKED REVEALS
           ══════════════════════════════════════════════════════════════ */}
        <section className="p-6 sm:p-8 rounded-3xl border border-[#E9E3FB] dark:border-white/10 bg-white/80 dark:bg-[#140E24]/80 backdrop-blur-md shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#6538A5] dark:text-[#D1BEFC]" />
                <h2 className="text-xl font-semibold tracking-tight">5. Line-by-Line Masked Reveal</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B6385] dark:text-[#A79EC4] mt-0.5">
                Editorial clip-path and blur-to-sharp text entry.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRevealKey((k) => k + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E9E3FB] dark:border-white/10 bg-white dark:bg-[#181126] text-xs font-medium hover:border-[#6538A5] active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="size-3.5" />
              <span>Replay Text Reveal</span>
            </button>
          </div>

          <div key={revealKey} className="p-8 rounded-2xl bg-[#FAF8FD] dark:bg-[#1A1230] border border-[#E9E3FB] dark:border-white/10 text-center">
            <MaskedReveal delay={0.1}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E1033] dark:text-white">
                Engineering with{" "}
                <span className="font-accent italic font-normal text-[#6538A5] dark:text-[#CBB7F7]">
                  Purpose
                </span>
                .
              </h3>
            </MaskedReveal>
            <MaskedReveal delay={0.25}>
              <p className="mt-3 text-sm sm:text-base text-[#6B6385] dark:text-[#A79EC4] max-w-lg mx-auto font-light leading-relaxed">
                Empowering collegiate women in STEM through world-class technical workshops, industry leadership, and lifelong mentorship.
              </p>
            </MaskedReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
