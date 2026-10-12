"use client";

import Link from "next/link";
import { ArrowRight, Users, Calendar, Clock, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { stats } from "@/content/stats";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Clock,
  Building2,
};

export function ImpactPreview() {
  return (
    <section id="impact" className="section-padding bg-muted/20 border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-4">
              <span>04 // IMPACT BY NUMBERS</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              Measurable growth, real collegiate outcomes.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We track our success not just in numbers, but in hackathon wins, research papers, 
              skills gained, and career placements secured by our chapter engineers.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="shrink-0">
            <Link href="/impact">
              <Button className="gap-2">
                See Full Impact Report
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4 Animated Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || TrendingUp;
            return (
              <ScrollReveal
                key={stat.label}
                delay={idx * 0.1}
                className="p-6 sm:p-8 rounded-xl border border-border bg-card hover:border-foreground/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>

                <div className="mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight"
                  />
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
