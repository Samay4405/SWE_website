"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function JourneyCTA() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-card via-primary/[0.04] to-background border-b border-border/60 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-6">
            <Sparkles className="size-3.5 text-primary" />
            <span>JOIN THE SWE COMMUNITY</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
            }}
          >
            Ready to Engineer the Future,{" "}
            <span className="text-primary">Together?</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you&apos;re a first-year student eager to learn your first programming language or a senior building your thesis project — SWE MIT-WPU is your launchpad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-12">
                Join the Chapter
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/events" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 h-12"
              >
                Explore Events
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
