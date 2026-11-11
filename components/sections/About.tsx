"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PixelImage } from "@/registry/magicui/pixel-image";

/* ─────────────────────────────────────────────────────────────
   ABOUT US SECTION — SWE MIT-WPU
   Editorial two-column layout:
   - 45% LEFT: expressive editorial heading and refined description.
   - 55% RIGHT: high-resolution SWE group photograph in a refined
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
      className="relative w-full bg-transparent overflow-hidden select-none scroll-mt-20 py-20 sm:py-24 md:py-28 lg:py-32"
      aria-label="About SWE MIT-WPU"
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
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
            {/* 1. Expressive Editorial Heading */}
            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-semibold tracking-tight text-[#1e1033] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              <span>More Than Just </span>
              <span
                className="font-accent"
                style={{
                  fontFamily: "var(--font-accent), Georgia, serif",
                }}
              >
                Engineering
              </span>
            </motion.h2>

            {/* 3. Editorial Description */}
            <motion.div variants={fadeUpVariant} className="mt-6 sm:mt-7 space-y-4 text-left">
              <p
                className="text-[15px] sm:text-base lg:text-[16.5px] leading-[1.75] text-[#6b6385] font-light"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                <span className="font-semibold text-[#1e1033]">
                  The Society of Women Engineers (SWE), MIT-WPU,
                </span>{" "}
                is a student-led chapter encouraging learning, collaboration
                and innovation while empowering women to explore opportunities
                in STEM.
              </p>

              <p
                className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.75] text-[#6b6385] font-light"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                Open to students of all genders, SWE is a space to grow, build
                confidence, develop leadership and create a more inclusive
                engineering community.
              </p>
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
                className="group relative w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#e9e3fb] shadow-[0_20px_50px_-20px_rgba(109,40,217,0.18)] transition-shadow duration-500 hover:shadow-[0_28px_65px_-18px_rgba(109,40,217,0.24)] p-2 sm:p-2.5"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {/* Responsive Aspect Ratio Container with PixelImage */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] lg:aspect-[16/10.2] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-transparent">
                  <PixelImage
                    src="/images/about/swe-expo.png"
                    alt="Students visiting Society of Women Engineers displays at an engineering event"
                    customGrid={{ rows: 4, cols: 6 }}
                    grayscaleAnimation
                    className="w-full h-full"
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
