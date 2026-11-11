"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, HeartHandshake, BookOpen, Compass, Sparkles } from "lucide-react";
import { PixelImage } from "@/registry/magicui/pixel-image";
import { TiltCard } from "@/components/shared/TiltCard";
import { EASE_EDITORIAL, DURATION_SLOW, DURATION_EDITORIAL } from "@/lib/animations";
import { SPRINGS } from "@/lib/motion";

const VALUE_PILLARS = [
  {
    icon: Users,
    title: "Community",
    description:
      "A vibrant collegiate network building technical depth, sharing opportunities, and collaborating across engineering disciplines.",
  },
  {
    icon: HeartHandshake,
    title: "Inclusion",
    description:
      "An open and supportive environment empowering collegiate women and allies to thrive without barriers.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    description:
      "Hands-on technical bootcamps, masterclasses, and project sprints that bridge academic study with real-world industry practice.",
  },
  {
    icon: Compass,
    title: "Leadership",
    description:
      "Fostering confidence, chapter governance, and communication skills to lead impactful STEM initiatives with purpose.",
  },
];

export function About() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION_SLOW,
        ease: EASE_EDITORIAL,
      },
    },
  };

  const photoRevealVariant = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: DURATION_EDITORIAL,
        ease: EASE_EDITORIAL,
        delay: 0.12,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full bg-transparent overflow-hidden select-none scroll-mt-20 section-padding"
      aria-label="About SWE MIT-WPU"
    >
      {/* ── Soft Atmospheric Background Glows ── */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 w-[460px] h-[460px] rounded-full blur-[80px] opacity-70 -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 218, 0.28) 0%, rgba(245, 215, 110, 0.08) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-[480px] h-[260px] rounded-[140px] blur-[80px] opacity-60 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(101, 56, 165, 0.18) 0%, rgba(167, 139, 218, 0.08) 50%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* ── Top Editorial Two-Column: Copy & Interactive Photo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN — TEXT CONTENT (~45% on desktop)
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mb-3">
              <span className="section-eyebrow">Who We Are</span>
            </motion.div>

            {/* Editorial Heading */}
            <motion.h2
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-tight text-[#1E1033] dark:text-[#EDEDED] leading-[1.08]"
            >
              More Than Just{" "}
              <span className="font-accent text-[#6538A5] dark:text-[#A78BDA]">Engineering</span>.
            </motion.h2>

            {/* Tightened Editorial Description */}
            <motion.div variants={fadeUpVariant} className="mt-5 space-y-4 text-left">
              <p className="text-[15px] sm:text-base leading-[1.75] text-[#6B6385] dark:text-[#C1B9D8] font-light">
                <span className="font-semibold text-[#1E1033] dark:text-[#EDEDED]">
                  The Society of Women Engineers (SWE), MIT-WPU Student Chapter,
                </span>{" "}
                is a student-led organization driving technical excellence, professional
                mentorship, and cross-disciplinary innovation for aspiring engineers in Pune.
              </p>

              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#6B6385] dark:text-[#C1B9D8] font-light">
                Open to students across every engineering track, SWE serves as a platform
                to develop foundational leadership, build career-defining projects, and champion
                an inclusive community where technical voices thrive.
              </p>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN — SWE GROUP PHOTOGRAPH (~55% on desktop)
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px] lg:max-w-none">
              {/* Subtle Offset Lavender Backdrop */}
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-[28px] bg-gradient-to-tr from-[#EBE6F5] via-[#F4F1FA] to-[#FAF8FD] dark:from-[#1E182A] dark:via-[#1A1624] dark:to-[#14101D] border border-[#E6E0F1]/70 dark:border-[#3D3552] -z-10 shadow-[0_12px_36px_-18px_rgba(101,56,165,0.12)]"
                aria-hidden="true"
              />

              {/* 3D Interactive Tilt Card Frame */}
              <TiltCard maxTilt={5} spotlight className="w-full">
                <motion.div
                  variants={photoRevealVariant}
                  className="group relative w-full overflow-hidden rounded-[22px] sm:rounded-[26px] border border-[#E9E3FB] dark:border-[#3D3552] shadow-[0_20px_50px_-20px_rgba(101,56,165,0.18)] p-2 sm:p-2.5 bg-white/80 dark:bg-[#1A1624]/85 backdrop-blur-md"
                >
                  {/* Floating Chapter Badge */}
                  <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#1E182A]/90 backdrop-blur-md border border-[#E9E3FB] dark:border-[#3D3552] shadow-sm text-[11px] font-mono tracking-wider text-[#6538A5] dark:text-[#F5D76E]">
                    <Sparkles className="size-3 text-[#F5D76E]" />
                    <span>MIT-WPU PUNE</span>
                  </div>

                  {/* Aspect Ratio Container with Accessible PixelImage */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] lg:aspect-[16/10] overflow-hidden rounded-[16px] sm:rounded-[20px]">
                    <PixelImage
                      src="/images/about/swe-expo.png"
                      alt="Students visiting the Society of Women Engineers interactive exhibition stall at MIT-WPU Pune"
                      customGrid={{ rows: 4, cols: 6 }}
                      grayscaleAnimation
                      className="w-full h-full"
                    />

                    {/* Interactive Hint Indicator */}
                    <div className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#1A1624]/90 backdrop-blur-xs text-[10px] font-mono tracking-wider text-[#6538A5] dark:text-[#F5D76E] shadow-xs">
                      <Sparkles className="size-2.5 text-[#E8B94F]" />
                      <span>TAP / HOVER TO REVEAL</span>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Section: 4 Core Value Pillars with 3D Tilt ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-[#E9E3FB]/70 dark:border-[#3D3552]/70"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <TiltCard key={pillar.title} maxTilt={4} spotlight>
                  <motion.div
                    variants={fadeUpVariant}
                    className="group relative flex flex-col p-6 rounded-2xl border border-[#E9E3FB] dark:border-[#3D3552] bg-white/70 dark:bg-[#1A1624]/70 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(101,56,165,0.1)] hover:border-[#6538A5]/40 dark:hover:border-[#F5D76E]/40 transition-all duration-300 h-full"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F2FC] dark:bg-[#221C30] border border-[#E9E3FB] dark:border-[#3D3552] text-[#6538A5] dark:text-[#F5D76E] mb-4 transition-transform duration-300 group-hover:scale-110 shadow-2xs">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1E1033] dark:text-[#EDEDED] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6B6385] dark:text-[#C1B9D8] font-light">
                      {pillar.description}
                    </p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
