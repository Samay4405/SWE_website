"use client";

import { motion } from "framer-motion";
import { Milestone, Flag, Calendar, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { timeline } from "@/content/timeline";

export function Timeline() {
  return (
    <section id="journey" className="section-padding bg-muted/20 border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>06 // CHAPTER TRAJECTORY</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
            }}
          >
            A trajectory of continuous momentum.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From 25 founding members in 2020 to a nationally celebrated collegiate chapter with 500+ active engineers.
          </p>
        </ScrollReveal>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central guide line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((entry, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={entry.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center size-8 rounded-full bg-background border-2 border-primary shadow-sm">
                    <div className="size-2.5 rounded-full bg-primary" />
                  </div>

                  {/* Content Card (Left or Right) */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12 md:text-right"
                    }`}
                  >
                    <ScrollReveal delay={idx * 0.08}>
                      <div className="p-6 sm:p-8 rounded-xl border border-border bg-card hover:border-foreground/30 transition-all duration-300">
                        <div
                          className={`flex items-center gap-2 mb-2 ${
                            isEven ? "" : "md:justify-end"
                          }`}
                        >
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {entry.year}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-bold text-foreground mb-2 tracking-tight"
                          style={{
                            fontFamily: "var(--font-display), system-ui, sans-serif",
                          }}
                        >
                          {entry.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
