"use client";

import { BookOpen, Code, Trophy, Rocket, ExternalLink, ArrowRight } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/ScrollReveal";
import { resourceGroups, showResources } from "@/content/resources";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Code,
  Trophy,
  Rocket,
};

export function Resources() {
  if (!showResources) return null;

  return (
    <section id="resources" className="section-padding bg-background border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>07 // TOOLKITS &amp; REPOSITORIES</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
            }}
          >
            Curated engineering toolkits.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Resources, code repositories, mentorship portals, and career guides gathered to accelerate your collegiate journey.
          </p>
        </ScrollReveal>

        {/* 4 Groups Grid */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceGroups.map((group) => {
            const Icon = iconMap[group.icon] || BookOpen;
            return (
              <ScrollRevealItem key={group.category}>
                <div className="h-full p-6 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-foreground/30 transition-all duration-300">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3
                        className="text-xl font-bold text-foreground tracking-tight"
                        style={{
                          fontFamily: "var(--font-display), system-ui, sans-serif",
                        }}
                      >
                        {group.category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {group.links.map((link) => (
                        <a
                          key={link.title}
                          href={link.url}
                          target={link.url.startsWith("http") ? "_blank" : undefined}
                          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group/link block p-3 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/70 hover:border-primary/40 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground group-hover/link:text-primary transition-colors">
                              {link.title}
                            </span>
                            <ExternalLink className="size-3 text-muted-foreground group-hover/link:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {link.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
