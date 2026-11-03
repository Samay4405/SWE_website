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
      className="relative w-full bg-transparent text-[#1e1033] overflow-x-clip pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20"
      aria-label="SWE MIT-WPU Team Showcase"
    >
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 sm:mb-12 text-center font-semibold tracking-tight text-[#1e1033]"
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          <h2 className="font-semibold tracking-tight text-[#1e1033]">
            The <span className="font-accent">Minds</span> Behind SWE.
          </h2>
          <p className="mt-3 text-base font-light leading-relaxed tracking-normal text-[#6b6385] sm:text-lg">
            A team driven by passion, united by purpose and inspired to make a
            difference.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — CORE TEAM (Premium Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-120px)] flex flex-col justify-center py-8 sm:py-12 md:py-16">
          <div className="grid -translate-y-2 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-center max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              {/* Core Team Heading */}
              <h2
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-semibold tracking-tight text-[#1e1033] leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                The <span className="font-accent">Core</span>
              </h2>

              {/* Directly Underneath: Introductory Description */}
              <p
                className="mt-6 sm:mt-7 text-sm sm:text-base leading-relaxed text-[#6b6385] font-light"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                The foundation of SWE, shaping its vision and bringing every
                initiative to life through thoughtful planning, collaboration
                and creativity. They work behind the scenes to build a
                community where ideas turn into actions.
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

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — THE HEADS (Premium Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-140px)] flex flex-col justify-center py-8 sm:py-12 md:py-16">
          <div className="grid -translate-y-2 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-center max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              {/* The Heads Heading */}
              <h2
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-semibold tracking-tight text-[#1e1033] leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                The <span className="font-accent">Heads</span>
              </h2>

              {/* Directly Underneath: Introductory Description */}
              <p
                className="mt-6 sm:mt-7 text-sm sm:text-base leading-relaxed text-[#6b6385] font-light"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                The leaders driving each department forward, turning ideas into
                meaningful initiatives. Through teamwork, mentorship and
                shared responsibility, they guide their teams, create
                opportunities and keep the SWE community growing.
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
