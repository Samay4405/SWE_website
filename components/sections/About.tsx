"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   ABOUT US SECTION — SWE MIT-WPU
   Editorial two-column layout:
   - 45% LEFT: "WHO WE ARE" eyebrow, expressive editorial heading,
     refined description with purple highlights, decorative accent.
   - 55% RIGHT: High-resolution SWE group photograph in a refined
     asymmetric editorial frame with subtle lavender backdrop.
   ───────────────────────────────────────────────────────────── */

export function About() {
  const prefersReducedMotion = useReducedMotion();

  // Left Column Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const dividerVariant = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.4,
      },
    },
  };

  // Right Column Image Frame Animation Variants
  const photoRevealVariant = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 32,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.15,
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
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.05,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#FCFBFE] overflow-hidden select-none scroll-mt-20 py-20 sm:py-24 md:py-28 lg:py-32"
      aria-label="About SWE MIT-WPU"
    >
      {/* ── Soft Ambient Editorial Highlights (Atmospheric Depth) ── */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[620px] h-[480px] rounded-full blur-3xl opacity-35 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,84,120,0.12) 0%, rgba(220,197,84,0.05) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[550px] h-[420px] rounded-full blur-3xl opacity-25 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(91,84,120,0.08) 0%, rgba(138,130,166,0.06) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12">
        {/* ── 45 / 55 Two-Column Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-12 xl:gap-16 items-center">
          
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
            {/* 1. Small Uppercase Eyebrow Label */}
            <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5B5478]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#5B5478]">
                WHO WE ARE
              </span>
              <span className="h-px w-6 bg-[#C4B5E6]" />
            </motion.div>

            {/* 2. Expressive Editorial Heading */}
            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-tight text-[#1F1D2B] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              <span>About </span>
              <span
                className="italic font-serif text-[#5B5478]"
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                }}
              >
                Us
              </span>
            </motion.h2>

            {/* 3. Editorial Description with Subtle Purple Accents */}
            <motion.div variants={fadeUpVariant} className="mt-6 sm:mt-7 space-y-4 text-left">
              <p
                className="text-[15px] sm:text-base lg:text-[16.5px] leading-[1.75] text-[#4A4560] font-normal"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                The{" "}
                <span className="font-semibold text-[#1F1D2B]">
                  Society of Women Engineers
                </span>{" "}
                empowers women to thrive in engineering and technology. Through{" "}
                <span className="text-[#5B5478] font-medium">mentorship</span>,{" "}
                <span className="text-[#5B5478] font-medium">technical initiatives</span>, and an inclusive collegiate community, we inspire, support, and connect the next generation of women engineers.
              </p>

              <p
                className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.75] text-[#5E5875] font-normal"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                At{" "}
                <span className="font-semibold text-[#1F1D2B]">
                  MIT World Peace University, Pune
                </span>
                , our student chapter creates an open environment where collegiate engineers explore their potential, cultivate industry-ready technical skills, and lead technical innovation with purpose.
              </p>
            </motion.div>

            {/* 4. Subtle Decorative Accent Divider */}
            <motion.div
              variants={dividerVariant}
              className="mt-8 pt-7 border-t border-[#ECE7F4] flex items-center justify-between origin-left"
            >
              <div className="flex items-center gap-3 text-xs font-mono text-[#8E8A9F]">
                <span className="font-semibold text-[#5B5478]">MIT-WPU CHAPTER</span>
                <span>&bull;</span>
                <span>EST. PUNE, INDIA</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5B5478] hover:text-[#2E2A40] transition-colors">
                <Sparkles className="h-3.5 w-3.5 text-[#DCC554]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">Chapter 01</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN — SWE PHOTOGRAPH (~55% on desktop)
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px] lg:max-w-none">
              
              {/* Optional Subtle Offset Background Backdrop in Muted Lavender */}
              <motion.div
                variants={backdropShapeVariant}
                className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-[28px] sm:rounded-[34px] bg-gradient-to-tr from-[#EBE6F5] via-[#F4F1FA] to-[#FAF8FD] border border-[#E6E0F1]/70 -z-10 shadow-[0_12px_36px_-18px_rgba(91,84,120,0.14)]"
                aria-hidden="true"
              />

              {/* Editorial Frame with Asymmetric Softly Rounded Corners */}
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
                className="group relative w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#E2DCEE] bg-white shadow-[0_20px_50px_-20px_rgba(91,84,120,0.22)] transition-shadow duration-500 hover:shadow-[0_28px_65px_-18px_rgba(91,84,120,0.28)]"
              >
                {/* Responsive Aspect Ratio Container preserving original SWE photograph */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] lg:aspect-[16/10.2] overflow-hidden bg-[#F2EFF7]">
                  <Image
                    src="/images/team/ananya-deshmukh.jpg"
                    alt="Society of Women Engineers (SWE) MIT-WPU Chapter members and leadership"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
                    className="object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    priority
                  />

                  {/* Soft Editorial Edge Vignette Overlay */}
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
      </div>
    </section>
  );
}
