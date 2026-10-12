"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance timer (4.5s)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const current = testimonials[currentIndex];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-background border-b border-border/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Student and Alumnae Testimonials"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
              <span>05 // VOICES OF THE COMMUNITY</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              Real stories from engineers who lead.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hear directly from our student leaders, hackathon champions, and working alumnae on how SWE transformed their college experience.
            </p>
          </ScrollReveal>

          {/* Controls: Prev/Next Buttons */}
          <ScrollReveal delay={0.1} className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="size-4" />
            </Button>
          </ScrollReveal>
        </div>

        {/* Carousel Slide Card */}
        <div className="relative min-h-[320px] sm:min-h-[280px] rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Decorative background quote mark */}
          <Quote
            className="absolute right-6 bottom-6 size-32 text-muted/30 pointer-events-none select-none -rotate-12"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 flex flex-col justify-between h-full"
            >
              {/* Quote Text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground font-medium leading-relaxed tracking-tight mb-8">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                <div className="size-12 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  {getInitials(current.name)}
                </div>
                <div>
                  <h4
                    className="text-base font-bold text-foreground"
                    style={{
                      fontFamily: "var(--font-display), system-ui, sans-serif",
                    }}
                  >
                    {current.name}
                  </h4>
                  <p className="text-xs text-primary font-mono font-medium">
                    {current.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {current.courseYear}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-8 z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
