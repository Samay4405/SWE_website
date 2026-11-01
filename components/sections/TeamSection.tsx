"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CylindricalTeamCarousel } from "@/components/team/CylindricalTeamCarousel";
import { coreTeamMembers, headsTeamMembers } from "@/content/teamData";

export function TeamSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="team"
      className="relative w-full bg-[#FCFBFE] text-[#1F1D2B] overflow-x-clip py-16 sm:py-24 md:py-28"
      aria-label="SWE MIT-WPU Team Showcase"
    >
      {/* Soft Ambient Background Highlights */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-3xl opacity-25 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,84,120,0.12) 0%, rgba(220,197,84,0.06) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-3xl opacity-20 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,84,120,0.1) 0%, rgba(220,197,84,0.05) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — CORE TEAM (Premium Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-120px)] flex flex-col justify-center py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-left max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              {/* Core Team Heading */}
              <h2
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-bold tracking-tight text-[#1F1D2B] leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                CORE TEAM
              </h2>

              {/* Directly Underneath: Introductory Description */}
              <p
                className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-[#5E5875] font-normal"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                Meet the team driving strategic vision, technical excellence, and
                opportunities for collegiate women engineers across MIT-WPU.
              </p>
            </motion.div>

            {/* ── RIGHT SIDE — 3D CAROUSEL (~65% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-8 xl:col-span-8 w-full relative flex items-center justify-center overflow-x-clip overflow-y-visible"
            >
              <CylindricalTeamCarousel
                members={coreTeamMembers}
                size="compact"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Editorial Chapter Divider ── */}
        <div className="my-16 sm:my-24 md:my-28 flex items-center justify-center">
          <div className="w-full max-w-2xl flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCED] to-transparent" />
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A9A9AA] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DCC554]" />
              <span>SWE MIT-WPU DIRECTORY</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#5B5478]" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E2DCED] to-transparent" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — THE HEADS (Premium Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-140px)] flex flex-col justify-center py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-left max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              {/* The Heads Heading */}
              <h2
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-bold tracking-tight text-[#1F1D2B] leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                THE HEADS
              </h2>

              {/* Directly Underneath: Introductory Description */}
              <p
                className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-[#5E5875] font-normal"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                Dedicated committee directors leading technical workshops, project
                initiatives, corporate partnerships, creative media, and impactful
                student outreach across MIT-WPU.
              </p>

            </motion.div>

            {/* ── RIGHT SIDE — 3D CAROUSEL (~65% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-8 xl:col-span-8 w-full relative flex items-center justify-center overflow-x-clip overflow-y-visible"
            >
              <CylindricalTeamCarousel
                members={headsTeamMembers}
                size="heads"
                perspectiveReferenceCount={coreTeamMembers.length}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
