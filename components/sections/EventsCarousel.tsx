"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { events } from "@/content/events";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function EventsCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const carouselEvents = events.slice(0, 4);
  const total = carouselEvents.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation when section is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Touch Swipe Handling for Mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext(); // swipe left -> next
    if (distance < -50) handlePrev(); // swipe right -> prev
  };

  const currentEvent = carouselEvents[currentIndex];
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prevEvent = carouselEvents[prevIndex];
  const nextEvent = carouselEvents[nextIndex];
  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 120 : -120,
      opacity: prefersReducedMotion ? 1 : 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -120 : 120,
      opacity: prefersReducedMotion ? 1 : 0.8,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: [0.4, 0, 1, 1] as const,
      },
    }),
  };

  return (
    <section
      id="events"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative scroll-mt-[72px] overflow-x-clip bg-[#FBF9FE] pt-6 pb-10 outline-none select-none md:scroll-mt-[80px] md:pt-8 md:pb-12"
      aria-roledescription="carousel"
      aria-label="SWE MIT-WPU Events Showcase"
    >
      {/* ── Section Header (Understated, Minimal) ── */}
      <ScrollReveal className="section-container mb-5 md:mb-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7254A8]">
            OUR EVENTS
          </span>
          <span className="h-[2px] w-8 rounded-full bg-[#D4A017]" />
        </div>

        {/* Heading */}
        <h2
          className="text-3xl font-extrabold tracking-tight text-[#24164F] sm:text-4xl lg:text-[2.75rem]"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Events
        </h2>
      </ScrollReveal>

      {/* ── Carousel Stage with Central Card and Partial Previews ── */}
      <ScrollReveal className="w-full">
        <div
          className="relative w-full overflow-visible py-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
        <div className="relative mx-auto w-full max-w-[1040px] px-4 sm:px-6 md:px-0 xl:max-w-[1120px]">
          {/* ── Minimal Navigation Arrows (Positioned Outside Featured Card) ── */}
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous event"
            className="group absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 cursor-pointer rounded-full border border-[#E7DFF3] bg-white/95 p-2.5 text-[#4D347A] shadow-lg shadow-[#24164F]/10 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-[#F4EFFB] hover:text-[#7254A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7254A8] md:flex"
          >
            <ChevronLeft className="size-5 stroke-[1.8] transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next event"
            className="group absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 cursor-pointer rounded-full border border-[#E7DFF3] bg-white/95 p-2.5 text-[#4D347A] shadow-lg shadow-[#24164F]/10 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-[#F4EFFB] hover:text-[#7254A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7254A8] md:flex"
          >
            <ChevronRight className="size-5 stroke-[1.8] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* ── Left Previous Card Preview (Partially visible on desktop) ── */}
          <div
            onClick={handlePrev}
            aria-hidden="true"
            className="pointer-events-auto absolute right-[calc(100%-5rem)] top-0 z-10 hidden h-[440px] w-full scale-[0.96] cursor-pointer overflow-hidden rounded-3xl border border-[#DCD0F0] bg-white opacity-40 shadow-xl shadow-[#24164F]/10 blur-[2px] transition-[filter,opacity] duration-300 hover:opacity-65 hover:blur-0 md:flex lg:h-[460px]"
          >
            <div className="relative w-1/2 h-full overflow-hidden bg-slate-100">
              <Image
                src={prevEvent.coverImage}
                alt={prevEvent.title}
                fill
                sizes="480px"
                className="object-cover"
              />
            </div>
            <div className="flex w-1/2 flex-col justify-between border-l border-[#EBE5F7] bg-gradient-to-br from-white to-[#F3EEFA] p-8 lg:p-12">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#7254A8] mb-3">
                  {prevEvent.displayCategory || prevEvent.category.toUpperCase()}
                </span>
                <h4
                  className="text-2xl font-bold text-[#24164F] tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {prevEvent.title}
                </h4>
              </div>
            </div>
          </div>

          {/* ── Active Featured Central Card ── */}
          <div className="relative z-20 min-h-[440px] w-full overflow-hidden rounded-2xl md:h-[440px] md:min-h-0 md:rounded-3xl lg:h-[460px]">
            <AnimatePresence custom={direction} mode="sync">
              <motion.div
                key={currentEvent.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="group absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#D8C9EC] bg-white shadow-[0_24px_70px_rgba(65,43,105,0.16)] md:flex-row md:rounded-3xl"
              >
                {/* Left Side: Large Landscape Photograph */}
                <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-full overflow-hidden bg-slate-100">
                  <Image
                    src={currentEvent.coverImage}
                    alt={currentEvent.title}
                    fill
                    priority={currentIndex === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Right Side: Event Information */}
                <div className="flex w-full flex-col justify-between border-t border-[#E7DFF3] bg-gradient-to-br from-white via-[#FBF9FE] to-[#F0EAF8] p-6 sm:p-8 md:w-1/2 md:border-l md:border-t-0 md:p-8 lg:p-10">
                  <div>
                    {/* Category */}
                    <span className="mb-3 inline-flex w-fit items-center rounded-full border border-[#E4D8F2] bg-[#F3EDF9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#65458F] sm:text-xs">
                      {currentEvent.displayCategory || currentEvent.category.toUpperCase()}
                    </span>

                    {/* Title */}
                    <h3
                      className="mb-3 text-xl font-extrabold leading-[1.18] tracking-tight text-[#24164F] sm:text-2xl lg:text-[1.8rem]"
                      style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                    >
                      {currentEvent.title}
                    </h3>

                    {/* Date & Venue Metadata */}
                    <div className="mb-3 flex items-center gap-3 text-xs font-medium text-[#5E5B70] sm:text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-[#7254A8]" />
                        <span>{currentEvent.displayDate || currentEvent.date}</span>
                      </div>
                      <span className="text-[#D5D1E2]">|</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-[#7254A8]" />
                        <span>{currentEvent.displayLocation || currentEvent.location}</span>
                      </div>
                    </div>
                    {/* Concise Description */}
                    <p className="mb-4 line-clamp-3 text-sm font-normal leading-relaxed text-[#5E5B70] sm:text-base">
                      {currentEvent.shortDescription}
                    </p>
                  </div>

                  {/* Explore Event Link */}
                  <div>
                    <Link
                      href={`/events/${currentEvent.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#4F347B] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#4F347B]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3E2864] group/link sm:text-base"
                    >
                      <span>Explore event</span>
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Next Card Preview (Partially visible on desktop) ── */}
          <div
            onClick={handleNext}
            aria-hidden="true"
            className="pointer-events-auto absolute left-[calc(100%-5rem)] top-0 z-10 hidden h-[440px] w-full scale-[0.96] cursor-pointer overflow-hidden rounded-3xl border border-[#DCD0F0] bg-white opacity-40 shadow-xl shadow-[#24164F]/10 blur-[2px] transition-[filter,opacity] duration-300 hover:opacity-65 hover:blur-0 md:flex lg:h-[460px]"
          >
            <div className="relative w-1/2 h-full overflow-hidden bg-slate-100">
              <Image
                src={nextEvent.coverImage}
                alt={nextEvent.title}
                fill
                sizes="480px"
                className="object-cover"
              />
            </div>
            <div className="flex w-1/2 flex-col justify-between border-l border-[#EBE5F7] bg-gradient-to-br from-white to-[#F3EEFA] p-8 lg:p-12">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#7254A8] mb-3">
                  {nextEvent.displayCategory || nextEvent.category.toUpperCase()}
                </span>
                <h4
                  className="text-2xl font-bold text-[#24164F] tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {nextEvent.title}
                </h4>
              </div>
            </div>
          </div>
          </div>

        {/* ── Carousel Bottom Controls (Counter & Dash Indicators) ── */}
        <div className="mt-4 flex items-center justify-center gap-4">
          {/* Mobile Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous event"
            className="md:hidden p-2 text-[#24164F] hover:text-[#7254A8] transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Counter "01 / 04" */}
          <span className="text-xs sm:text-sm font-semibold font-mono text-[#5E5B70] tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Mobile Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next event"
            className="md:hidden p-2 text-[#24164F] hover:text-[#7254A8] transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
