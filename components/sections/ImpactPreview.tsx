"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Users, Calendar, Clock, Building2, ArrowRight } from "lucide-react";
import { alumniStories, type AlumniStory } from "@/content/alumniStories";
import { stats } from "@/content/stats";
import { EASE_EDITORIAL } from "@/lib/animations";

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Clock,
  Building2,
};

function DynamicGradientAlumniCard({
  story,
  prefersReducedMotion,
}: {
  story: AlumniStory;
  prefersReducedMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Avoid layout thrash by updating CSS variables directly via rAF (ZERO React re-renders on mousemove)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const card = cardRef.current;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x.toFixed(1)}%`);
        card.style.setProperty("--my", `${y.toFixed(1)}%`);
      });
    },
    [prefersReducedMotion]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between w-full h-full rounded-2xl transform-gpu hover:-translate-y-1.5 transition-all duration-400 overflow-hidden p-[1.5px] cursor-default"
      style={{
        boxShadow: "0 10px 30px -16px rgba(101, 56, 165, 0.14)",
      }}
    >
      {/* ── 1. Continuous Conic Border Layer ── */}
      <div
        className="absolute -inset-[150%] pointer-events-none transition-opacity duration-500 opacity-75 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #6538A5 0deg, #A78BDA 75deg, #F5D76E 150deg, #E8B94F 210deg, #A78BDA 285deg, #6538A5 360deg)",
          animation: prefersReducedMotion
            ? "none"
            : "cuicuiGradientRotate 10s linear infinite",
        }}
        aria-hidden="true"
      />

      {/* ── 2. Interactive Spotlight Layer (Driven by CSS variables, disabled on reduced motion) ── */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(245, 215, 110, 0.45) 0%, rgba(101, 56, 165, 0.22) 50%, transparent 80%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── 3. High-Contrast Inner Content Area ── */}
      <div
        className="relative flex flex-col justify-between w-full h-full rounded-[15px] z-10 overflow-hidden border border-[#E9E3FB] bg-white/90 backdrop-blur-md"
      >
        {/* Profile + Testimonial Body */}
        <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col">
          {/* Profile Header */}
          <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-[#F0ECF6]">
            <div className="relative size-13 sm:size-14 rounded-xl overflow-hidden bg-[#F2EFF7] border border-[#E5DFEF] shrink-0 shadow-2xs">
              <Image
                src={story.photograph}
                alt={`Portrait of ${story.name}`}
                fill
                sizes="56px"
                className="object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base sm:text-[17px] font-semibold text-[#1E1033] tracking-tight truncate group-hover:text-[#6538A5] transition-colors duration-200">
                {story.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-[#6B6385] tracking-tight truncate">
                {story.tenure}
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative flex-1 text-left">
            <p className="text-[13.5px] sm:text-[14px] leading-[1.7] text-[#2E2A40] font-normal">
              &ldquo;{story.testimonial}&rdquo;
            </p>
          </div>
        </div>

        {/* Card Footer Quote Icon */}
        <div className="px-6 sm:px-7 pb-5 pt-0 flex justify-end items-center pointer-events-none">
          <div className="flex items-center justify-center size-8 rounded-full bg-[#FAF8FD] border border-[#EFEBF6]">
            <Quote className="size-4 text-[#6538A5] stroke-[2] opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImpactPreview() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE_EDITORIAL,
      },
    },
  };

  return (
    <section
      id="impact"
      className="relative w-full bg-transparent overflow-hidden select-none section-padding"
      aria-label="Stories That Stay — Alumnae Testimonials"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center gap-2 mb-3">
            <span className="section-eyebrow">Enduring Community</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033]"
          >
            Stories That <span className="font-accent">Stay</span>.
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            className="mt-3 text-base sm:text-lg text-[#6B6385] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Voices and heartfelt reflections from alumnae, collegiate leaders, and members who built the chapter.
          </motion.p>
        </motion.div>

        {/* ── Compact Honest Stats Row (From content/stats.ts) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {stats.map((st) => {
            const Icon = STAT_ICONS[st.icon] || Users;
            return (
              <motion.div
                key={st.label}
                variants={fadeUpVariant}
                className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border border-[#E9E3FB] bg-white/75 backdrop-blur-md shadow-xs text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F2FC] text-[#6538A5] mb-2.5">
                  <Icon className="size-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1033]">
                  {st.value}
                  <span className="text-[#6538A5]">{st.suffix}</span>
                </div>
                <div className="mt-1 text-xs sm:text-[13px] text-[#6B6385] font-light">
                  {st.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Three-Column Card Grid with Dynamic Conic Border ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {alumniStories.map((story) => (
            <motion.div key={story.id} variants={fadeUpVariant}>
              <DynamicGradientAlumniCard
                story={story}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Link to Detailed Impact Page ── */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6538A5] hover:text-[#532D8A] transition-colors group px-4 py-2 rounded-full hover:bg-[#F6F2FC] border border-[#E9E3FB]"
          >
            <span>Explore Longitudinal Chapter Growth &amp; Annual Metrics</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ImpactPreview;
