import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { HeroConstellationCanvas } from "@/components/hero/HeroConstellationCanvas";
import { HeroTypewriter } from "@/components/hero/HeroTypewriter";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Welcome to Society of Women Engineers MIT-WPU"
      className="relative w-full min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-4.5rem)] flex flex-col items-center justify-between overflow-hidden pt-12 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center"
    >
      {/* ── Progressive Constellation Canvas (Hydrates in background without blocking LCP) ── */}
      <HeroConstellationCanvas />

      {/* ── Soft Radial Scrim (Ensures text contrast satisfies WCAG AA against constellation lines) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[720px] h-[480px] max-w-full rounded-full opacity-65 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(252, 251, 254, 0.95) 0%, rgba(252, 251, 254, 0.7) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* ── Top Spacer ── */}
      <div className="w-full h-2 sm:h-6" aria-hidden="true" />

      {/* ── Center Content: Server-Rendered for Immediate Sub-Second LCP ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E9E3FB] bg-white/80 backdrop-blur-xs text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#6538A5] shadow-2xs mb-5 sm:mb-6">
          <Sparkles className="size-3 text-[#E8B94F]" />
          <span>Society of Women Engineers · MIT-WPU Chapter</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold tracking-tight text-[#1E1033] leading-[1.04]">
          Society of{" "}
          <em className="font-serif italic font-normal text-[#6538A5] tracking-normal">
            Women
          </em>{" "}
          Engineers
        </h1>

        {/* Value Proposition with Stabilized Typewriter */}
        <HeroTypewriter />

        {/* CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full text-sm font-medium tracking-wide bg-[#1E1033] text-white hover:bg-[#6538A5] shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2"
          >
            Join SWE MIT-WPU
          </Link>
          <Link
            href="#events"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full text-sm font-medium tracking-wide bg-white/80 hover:bg-[#F6F2FC] text-[#1E1033] hover:text-[#6538A5] border border-[#E9E3FB] hover:border-[#6538A5]/40 backdrop-blur-xs transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2"
          >
            Explore Our Work
          </Link>
        </div>

        {/* Subtle Trust Strip (Real chapter data only — 0 invented numbers) */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-[#6B6385] font-light">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#1E1033]">500+</span>
            <span>Active Collegiate Members</span>
          </div>
          <span className="text-[#E9E3FB] hidden sm:inline" aria-hidden="true">•</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#1E1033]">35+</span>
            <span>Technical Events &amp; Workshops</span>
          </div>
          <span className="text-[#E9E3FB] hidden sm:inline" aria-hidden="true">•</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#1E1033]">Est. 2021</span>
            <span>Pune, India</span>
          </div>
        </div>
      </div>

      {/* ── Refined Scroll Cue linking to #about ── */}
      <div className="relative z-10 pt-6 pb-2">
        <Link
          href="#about"
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#6B6385] hover:text-[#6538A5] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] rounded-lg px-2 py-1"
        >
          <span className="uppercase text-[10px] tracking-widest opacity-80 group-hover:opacity-100">
            Discover Our Story
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E9E3FB] bg-white/70 backdrop-blur-xs transition-transform duration-300 group-hover:translate-y-0.5 shadow-2xs">
            <ArrowDown className="size-3 text-[#6538A5]" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
