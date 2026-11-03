"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { alumniStories, type AlumniStory } from "@/content/alumniStories";

/* ─────────────────────────────────────────────────────────────
   IMPACT SECTION — "STORIES THAT STAY" (Alumnae Testimonials)
   Enhanced with CuiCui-inspired animated dynamic gradient card effect:
   - Continuously rotating & mouse-interactive PURPLE & YELLOW gradient
     border (#6538A5, #A78BDA, #F5D76E, #E8B94F).
   - Crisp white inner card background to maintain optimal readability.
   - Smooth transform-gpu hover lift (-translate-y-2) with enhanced glow.
   - Preserves all existing profile, copy, typography and quote styling.
   - Respects prefers-reduced-motion accessibility settings.
   ───────────────────────────────────────────────────────────── */

function DynamicGradientAlumniCard({
  story,
  prefersReducedMotion,
}: {
  story: AlumniStory;
  prefersReducedMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between w-full h-full rounded-2xl transform-gpu hover:-translate-y-2 transition-all duration-500 overflow-hidden p-[1.5px] cursor-default"
      style={{
        boxShadow: isHovered
          ? "0 22px 48px -14px rgba(101, 56, 165, 0.28), 0 0 24px -4px rgba(245, 215, 110, 0.2)"
          : "0 10px 30px -16px rgba(91, 84, 120, 0.12)",
      }}
    >
      {/* ── 1. Animated Continuous Rotating Conic Gradient Layer (Outer Border) ── */}
      <div
        className={`absolute -inset-[150%] pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-75"
        }`}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #6538A5 0deg, #A78BDA 75deg, #F5D76E 150deg, #E8B94F 210deg, #A78BDA 285deg, #6538A5 360deg)",
          animation: prefersReducedMotion
            ? "none"
            : "cuicuiGradientRotate 9s linear infinite",
        }}
        aria-hidden="true"
      />

      {/* ── 2. Interactive Spotlight Gradient Layer (Follows cursor on hover) ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, rgba(245, 215, 110, 0.45) 0%, rgba(101, 56, 165, 0.25) 50%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* ── 3. Semi-transparent Inner Content Area ── */}
      <div
        className="relative flex flex-col justify-between w-full h-full rounded-[15px] z-10 overflow-hidden border border-[#e9e3fb]"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >

        {/* Top Profile Row + Testimonial Body */}
        <div className="p-7 sm:p-8 md:p-9 flex-1 flex flex-col">
          {/* Top Profile Row: Headshot + Name & SWE Tenure */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#F0ECF6]">
            <div className="relative size-14 sm:size-16 rounded-xl overflow-hidden bg-[#F2EFF7] border border-[#E5DFEF] shrink-0 shadow-xs">
              <Image
                src={story.photograph}
                alt={`Portrait of ${story.name}`}
                fill
                sizes="64px"
                className="object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="text-left min-w-0">
              <h3
                className="text-lg sm:text-[19px] font-semibold text-[#1e1033] tracking-tight truncate group-hover:text-[#6d28d9] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                }}
              >
                {story.name}
              </h3>
              <p
                className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#7A7490] tracking-tight truncate"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {story.tenure}
              </p>
            </div>
          </div>

          {/* Testimonial Content: Left-aligned, authentic reflection */}
          <div className="relative flex-1 text-left">
            <p
              className="text-sm sm:text-[14.5px] leading-[1.75] text-[#4A4560] font-normal"
              style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
              }}
            >
              &ldquo;{story.testimonial}&rdquo;
            </p>
          </div>
        </div>

        {/* Card Bottom Decorative Element: Large Subtle Quotation Icon in Bottom-Right Corner */}
        <div className="px-7 sm:px-8 pb-6 pt-0 flex justify-end items-center pointer-events-none">
          <div className="relative flex items-center justify-center size-10 rounded-full bg-[#FAF8FD] border border-[#EFEBF6] transition-colors duration-300 group-hover:border-[#A78BDA]/40 group-hover:bg-[#F6F2FC]">
            <Quote className="size-5 text-[#6538A5] stroke-[2] opacity-80 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImpactPreview() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="impact"
      className="relative w-full bg-transparent overflow-hidden select-none pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-36"
      aria-label="Stories That Stay — Alumnae Testimonials"
    >
      {/* ── Keyframes for Continuous Smooth Conic Border Rotation ── */}
      <style>{`
        @keyframes cuicuiGradientRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* ── Soft Ambient Atmospheric Glow ── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full blur-3xl opacity-25 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(101,56,165,0.12) 0%, rgba(245,215,110,0.06) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(101,56,165,0.09) 0%, rgba(167,139,218,0.05) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1320px]">
        {/* ── Section Heading: Centered with Generous Breathing Space ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUpVariant}
            className="mb-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[#1e1033] leading-[1.08]"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              letterSpacing: "-0.025em",
            }}
          >
            Stories That{" "}
            <span className="font-accent text-[#6d28d9]">Stay</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg lg:text-xl text-[#6b6385] tracking-tight font-light leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
          A collection of voices, experiences and heartfelt words from the people who make SWE special.
          </motion.p>
        </motion.div>

        {/* ── Three-Column Card Grid with Dynamic Purple-Yellow Gradient Border ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap -m-4 sm:-m-6"
        >
          {alumniStories.map((story) => (
            <div
              key={story.id}
              className="w-full md:w-1/2 lg:w-1/3 p-4 sm:p-6 flex"
            >
              <DynamicGradientAlumniCard
                story={story}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
