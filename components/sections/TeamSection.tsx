"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CylindricalTeamCarousel } from "@/components/team/CylindricalTeamCarousel";
import { coreTeamMembers, headsTeamMembers } from "@/content/teamData";
import { EASE_EDITORIAL } from "@/lib/animations";

export function TeamSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: EASE_EDITORIAL,
      },
    },
  };

  return (
    <section
      id="team"
      className="relative w-full bg-transparent text-[#1E1033] overflow-x-clip pt-16 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24"
      aria-label="SWE MIT-WPU Team Showcase"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="section-eyebrow">Leadership &amp; Committees</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033]">
            The <span className="font-accent">Minds</span> Behind SWE.
          </h2>

          <p className="mt-3 text-base sm:text-lg font-light leading-relaxed text-[#6B6385] max-w-2xl mx-auto">
            A dedicated team of collegiate leaders united by technical ambition, community mentorship, and a vision for women in STEM.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — CORE TEAM (Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-120px)] flex flex-col justify-center py-6 sm:py-10 md:py-12 border-b border-[#E9E3FB]/70">
          <div className="grid -translate-y-2 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-center lg:text-left max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              <span className="section-eyebrow mb-2">Executive Board</span>
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#1E1033] leading-[1.08]">
                The <span className="font-accent">Core</span>
              </h3>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-[#6B6385] font-light">
                The strategic backbone of SWE, defining chapter vision, institutional partnerships, and orchestrating flagship initiatives to build an enduring collegiate community.
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
            SECTION 2 — THE HEADS (Two-Column Editorial Layout)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative min-h-[calc(100svh-140px)] flex flex-col justify-center py-6 sm:py-10 md:py-12">
          <div className="grid -translate-y-2 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* ── LEFT SIDE — TEXT CONTENT (~35% Width) ── */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-center lg:text-left max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              <span className="section-eyebrow mb-2">Department Directors</span>
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#1E1033] leading-[1.08]">
                The <span className="font-accent">Heads</span>
              </h3>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-[#6B6385] font-light">
                Directing technical operations, design, logistics, sponsorship, and outreach. They turn high-level strategy into tangible programs and nurture collegiate talent.
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

        {/* ── Directory Link ── */}
        <div className="mt-8 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6538A5] hover:text-[#532D8A] transition-colors group px-4 py-2 rounded-full hover:bg-[#F6F2FC] border border-[#E9E3FB]"
          >
            <span>View Full Chapter Team Directory ({coreTeamMembers.length + headsTeamMembers.length} Leaders)</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
