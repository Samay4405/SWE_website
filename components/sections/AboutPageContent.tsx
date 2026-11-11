"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PixelImage } from "@/registry/magicui/pixel-image";
import {
  BookOpen,
  Users,
  HeartHandshake,
  Laptop,
  Trophy,
  UserCheck,
  Globe,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   EXPANDED ABOUT US PAGE — SWE MIT-WPU
   Three distinct sections matching the Home page aesthetic:
   PART 1: Mission (Top editorial 45/55 split with framed photo)
   PART 2: Three Pillars (Learn & Grow, Connect & Collaborate, Lead & Include)
   PART 3: What We Do (Workshops, Events, Mentorship, Outreach)
   ───────────────────────────────────────────────────────────── */

export function AboutPageContent() {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants aligned with Home page About section
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const photoRevealVariant = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.1,
      },
    },
  };

  const backdropShapeVariant = {
    hidden: { opacity: 0, scale: 0.92, rotate: -1 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.05,
      },
    },
  };

  return (
    <div className="w-full bg-transparent overflow-hidden select-none py-14 sm:py-20 lg:py-24 space-y-24 sm:space-y-28 lg:space-y-36">
      {/* ═══════════════════════════════════════════════════════════════
          PART 1: MISSION (Top of Page)
          Two-column editorial composition with photo frame on right
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12"
        aria-label="Our Mission"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column — Mission Text (~45% on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUpVariant}
              className="inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] font-medium text-[#6d28d9] mb-4"
            >
              <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#a78bfa]" />
              <span>Our Purpose</span>
              <span className="w-7 h-[1px] bg-gradient-to-l from-transparent to-[#a78bfa]" />
            </motion.div>

            {/* Two-tone editorial heading */}
            <motion.h1
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-semibold tracking-tight text-[#1e1033] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              <span>Our </span>
              <span
                className="font-accent text-[#6d28d9]"
                style={{ fontFamily: "var(--font-accent), Georgia, serif" }}
              >
                Mission
              </span>
            </motion.h1>

            {/* Mission paragraph (3-4 sentences extended from Home page) */}
            <motion.div
              variants={fadeUpVariant}
              className="mt-6 sm:mt-7 space-y-4 text-left"
            >
              <p
                className="text-[15px] sm:text-base lg:text-[16.5px] leading-[1.8] text-[#6b6385] font-light"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                <span className="font-semibold text-[#1e1033]">
                  The Society of Women Engineers (SWE), MIT-WPU,
                </span>{" "}
                is a student-led chapter dedicated to empowering women to achieve their full potential in careers as engineers and leaders in STEM.
              </p>

              <p
                className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.8] text-[#6b6385] font-light"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                We encourage continuous learning, collaboration, and innovation through hands-on technical initiatives, peer engagement, and industry exposure.
              </p>

              <p
                className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.8] text-[#6b6385] font-light"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                Open to students of all genders, our community creates a welcoming environment to build confidence, foster leadership skills, and cultivate a more inclusive engineering culture across MIT-WPU.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column — Photo in same rounded framed card (~55% on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px] lg:max-w-none">
              {/* Subtle offset background backdrop in muted lavender */}
              <motion.div
                variants={backdropShapeVariant}
                className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-[28px] sm:rounded-[34px] bg-gradient-to-tr from-[#EBE6F5] via-[#F4F1FA] to-[#FAF8FD] border border-[#E6E0F1]/70 -z-10 shadow-[0_12px_36px_-18px_rgba(91,84,120,0.14)]"
                aria-hidden="true"
              />

              {/* Editorial frame with rounded corners & purple glow */}
              <motion.div
                variants={photoRevealVariant}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.015,
                        transition: { duration: 0.5, ease: "easeOut" },
                      }
                }
                className="group relative w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#e9e3fb] shadow-[0_20px_50px_-20px_rgba(109,40,217,0.18)] transition-shadow duration-500 hover:shadow-[0_28px_65px_-18px_rgba(109,40,217,0.24)] p-2 sm:p-2.5"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] lg:aspect-[16/10.2] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-transparent">
                  <PixelImage
                    src="/images/about/swe-expo.png"
                    alt="Students visiting Society of Women Engineers displays at an engineering event"
                    customGrid={{ rows: 4, cols: 6 }}
                    grayscaleAnimation
                    className="w-full h-full"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[22px] sm:rounded-[28px] ring-1 ring-inset ring-black/5"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PART 2: THREE PILLARS
          Three equal cards in a row with icons, titles, and descriptions
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12"
        aria-label="Three Pillars"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] font-medium text-[#6d28d9] mb-3">
            <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#a78bfa]" />
            <span>Core Principles</span>
            <span className="w-7 h-[1px] bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold tracking-tight text-[#1e1033] leading-tight"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              letterSpacing: "-0.025em",
            }}
          >
            <span>What We </span>
            <span
              className="font-accent text-[#6d28d9]"
              style={{ fontFamily: "var(--font-accent), Georgia, serif" }}
            >
              Stand For
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Pillar 1: Learn and Grow */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -6, transition: { duration: 0.25 } }
            }
            className="flex flex-col bg-white rounded-2xl border border-[#e9e3fb] p-7 sm:p-8 shadow-[0_10px_30px_-15px_rgba(109,40,217,0.08)] hover:shadow-[0_22px_45px_-12px_rgba(109,40,217,0.18)] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9] mb-6">
              <BookOpen className="size-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl sm:text-[1.3rem] font-semibold text-[#1e1033] mb-3">
              Learn and Grow
            </h3>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.75] text-[#6b6385] font-light">
              Deepening technical proficiency through practical workshops, technical labs, and continuous skill-building sessions designed to empower engineers with practical capabilities.
            </p>
          </motion.div>

          {/* Pillar 2: Connect and Collaborate */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -6, transition: { duration: 0.25 } }
            }
            className="flex flex-col bg-white rounded-2xl border border-[#e9e3fb] p-7 sm:p-8 shadow-[0_10px_30px_-15px_rgba(109,40,217,0.08)] hover:shadow-[0_22px_45px_-12px_rgba(109,40,217,0.18)] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9] mb-6">
              <Users className="size-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl sm:text-[1.3rem] font-semibold text-[#1e1033] mb-3">
              Connect and Collaborate
            </h3>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.75] text-[#6b6385] font-light">
              Building a collaborative community that bridges departments, connects students with inspiring peers and mentors, and fosters shared growth across multidisciplinary technical projects.
            </p>
          </motion.div>

          {/* Pillar 3: Lead and Include */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -6, transition: { duration: 0.25 } }
            }
            className="flex flex-col bg-white rounded-2xl border border-[#e9e3fb] p-7 sm:p-8 shadow-[0_10px_30px_-15px_rgba(109,40,217,0.08)] hover:shadow-[0_22px_45px_-12px_rgba(109,40,217,0.18)] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9] mb-6">
              <HeartHandshake className="size-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xl sm:text-[1.3rem] font-semibold text-[#1e1033] mb-3">
              Lead and Include
            </h3>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.75] text-[#6b6385] font-light">
              Fostering confidence and leadership capability in an inclusive community open to students of all genders, united in championing diversity and mutual support in engineering.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PART 3: WHAT WE DO
          4 distinct items in a 2x2 grid with icon, title, and one-line description
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12"
        aria-label="What We Do"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] font-medium text-[#6d28d9] mb-3">
            <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#a78bfa]" />
            <span>Our Initiatives</span>
            <span className="w-7 h-[1px] bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold tracking-tight text-[#1e1033] leading-tight"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              letterSpacing: "-0.025em",
            }}
          >
            <span>What We </span>
            <span
              className="font-accent text-[#6d28d9]"
              style={{ fontFamily: "var(--font-accent), Georgia, serif" }}
            >
              Do
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Item 1: Workshops and Sessions */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
            className="flex items-start gap-5 bg-white/95 rounded-2xl border border-[#e9e3fb] p-6 sm:p-7 shadow-[0_8px_25px_-12px_rgba(109,40,217,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(109,40,217,0.14)] transition-all duration-300"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9]">
              <Laptop className="size-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1e1033] mb-1.5">
                Workshops & Sessions
              </h3>
              {/* [DRAFT]: Adjust if technical workshop scope should be tailored */}
              <p className="text-[14.5px] leading-[1.65] text-[#6b6385] font-light">
                Interactive technical training, developer tool walkthroughs, and practical sessions led by experienced peers and specialists.
              </p>
            </div>
          </motion.div>

          {/* Item 2: Events and Competitions */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
            className="flex items-start gap-5 bg-white/95 rounded-2xl border border-[#e9e3fb] p-6 sm:p-7 shadow-[0_8px_25px_-12px_rgba(109,40,217,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(109,40,217,0.14)] transition-all duration-300"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9]">
              <Trophy className="size-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1e1033] mb-1.5">
                Events & Competitions
              </h3>
              {/* [DRAFT]: Adjust if hackathon/competition wording should be refined */}
              <p className="text-[14.5px] leading-[1.65] text-[#6b6385] font-light">
                Campus hackathons, technical problem-solving challenges, and project showcases that bring engineering concepts to life.
              </p>
            </div>
          </motion.div>

          {/* Item 3: Mentorship and Networking */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
            className="flex items-start gap-5 bg-white/95 rounded-2xl border border-[#e9e3fb] p-6 sm:p-7 shadow-[0_8px_25px_-12px_rgba(109,40,217,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(109,40,217,0.14)] transition-all duration-300"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9]">
              <UserCheck className="size-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1e1033] mb-1.5">
                Mentorship & Networking
              </h3>
              {/* [DRAFT]: Adjust if mentor circle description should be customized */}
              <p className="text-[14.5px] leading-[1.65] text-[#6b6385] font-light">
                Peer-to-peer mentoring circles, guest speaker interactions, and networking forums to help students navigate engineering pathways.
              </p>
            </div>
          </motion.div>

          {/* Item 4: Community Outreach */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={
              prefersReducedMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
            className="flex items-start gap-5 bg-white/95 rounded-2xl border border-[#e9e3fb] p-6 sm:p-7 shadow-[0_8px_25px_-12px_rgba(109,40,217,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(109,40,217,0.14)] transition-all duration-300"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f6f2ff] border border-[#e9e3fb]/80 flex items-center justify-center text-[#6d28d9]">
              <Globe className="size-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1e1033] mb-1.5">
                Community Outreach
              </h3>
              {/* [DRAFT]: Adjust if outreach scope should be tailored */}
              <p className="text-[14.5px] leading-[1.65] text-[#6b6385] font-light">
                Engaging campus and school initiatives that encourage young minds and aspiring students to discover the excitement of STEM.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
