"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Terminal, Users, Calendar, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

import { HeroCanvas } from "@/components/three/HeroCanvas";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const keyStats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Flagship Events", value: "35+", icon: Calendar },
    { label: "Student Chapters", value: "Global", icon: Award },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-border/60"
    >
      {/* Background Graphic: Three.js Interactive Network with SVG Fallback */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <HeroCanvas />
        {/* Soft radial vignette to keep text ultra-legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:via-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      <div className="section-container relative z-10 py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="max-w-3xl"
        >
          {/* Chapter badge */}
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/80 backdrop-blur-sm text-xs font-mono font-medium text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>Society of Women Engineers</span>
              <span className="text-border">•</span>
              <span className="text-foreground font-semibold">MIT-WPU Chapter</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Engineering the Future,{" "}
            <span className="text-primary relative inline-block">
              Together.
              <svg
                aria-hidden="true"
                viewBox="0 0 280 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full text-primary/30 h-2"
              >
                <path
                  d="M2 9.5C65 2.5 180 2 278 8.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-normal"
          >
            A premier collegiate engineering society at MIT World Peace University, Pune. 
            We empower women in STEM through cutting-edge technical workshops, competitive hackathons, 
            industry mentorship, and a lifelong global professional network.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16"
          >
            <Link href="/events">
              <Button size="lg" className="gap-2 w-full sm:w-auto text-base px-6">
                Explore Events
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-6 hover:bg-muted"
              >
                Join the Community
              </Button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={fadeInUp}
            className="pt-8 border-t border-border grid grid-cols-3 gap-6 sm:gap-10 max-w-xl"
          >
            {keyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
