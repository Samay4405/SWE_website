"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/content/events";

export function EventsPreview() {
  const featuredEvent = events[0]; // Technovate 2026
  const recentEvents = events.slice(1, 4); // next 3 events

  return (
    <section id="events" className="section-padding bg-background border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
              <span>03 // UPCOMING &amp; RECENT INITIATIVES</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              Where technical curiosity meets execution.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              From our flagship 36-hour national hackathon to intensive terminal-driven masterclasses 
              and executive roundtables — explore our scheduled chapter events.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="shrink-0">
            <Link href="/events">
              <Button variant="outline" className="gap-2">
                View All Events ({events.length})
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Featured Hero Event Card */}
        {featuredEvent && (
          <ScrollReveal className="mb-8">
            <EventCard event={featuredEvent} featured />
          </ScrollReveal>
        )}

        {/* 3-column Recent Events Grid */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {recentEvents.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </ScrollReveal>

        {/* Bottom CTA to browse all */}
        <div className="text-center pt-4">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Looking for past symposiums and outreach initiatives? Browse the full events archive
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
