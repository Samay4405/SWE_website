"use client";

import { Code2, Compass, HeartHandshake, Briefcase, Globe2, MapPin, Building2, ArrowRight } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/ScrollReveal";

const focusAreas = [
  {
    icon: Code2,
    title: "Technical Excellence",
    description:
      "Deep-dive workshops in AI, full-stack engineering, cloud architecture, and competitive hackathons built to cultivate industry-ready technical skills.",
    tag: "Workshops & Hackathons",
  },
  {
    icon: Compass,
    title: "Leadership Development",
    description:
      "Student-run committees, public speaking training, and project management roles empowering members to lead technical teams with confidence.",
    tag: "Initiatives & Management",
  },
  {
    icon: HeartHandshake,
    title: "Inclusive Community",
    description:
      "A supportive, peer-driven sisterhood of engineers sharing resources, academic mentorship, interview prep, and collaborative research.",
    tag: "Mentorship & Culture",
  },
  {
    icon: Briefcase,
    title: "Career Advancement",
    description:
      "Direct exposure to multinational tech sponsors, resume critiques, panel talks with senior women leaders, and exclusive hiring pipelines.",
    tag: "Networking & Placements",
  },
];

const tiers = [
  {
    level: "Global Footprint",
    name: "SWE Global",
    detail: "40,000+ members across 400+ collegiate & professional chapters worldwide since 1950.",
    icon: Globe2,
    badge: "Est. 1950",
  },
  {
    level: "National Network",
    name: "SWE India",
    detail: "Unifying premier technical institutions and Fortune 500 corporate partners across the country.",
    icon: Building2,
    badge: "All-India",
  },
  {
    level: "Local Impact",
    name: "MIT-WPU Chapter",
    detail: "Pune's active chapter fostering student engineering breakthroughs, hackathons, and outreach.",
    icon: MapPin,
    badge: "Pune, India",
    highlight: true,
  },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-background border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>01 // ABOUT THE CHAPTER</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            A global movement with a deeply personal collegiate home.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            The Society of Women Engineers (SWE) is the world’s largest advocate and catalyst for change for women in engineering and technology. 
            At MIT World Peace University, Pune, our student chapter transforms that global legacy into tangible student opportunities: 
            building real projects, publishing research, hosting flagship symposiums, and championing diversity in STEM.
          </p>
        </ScrollReveal>

        {/* Part 2: Global → India → MIT-WPU Connecting Tier Diagram */}
        <div className="mb-20 md:mb-28">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
            // Organizational Heritage
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <ScrollReveal
                  key={tier.name}
                  delay={idx * 0.1}
                  className={`relative p-6 sm:p-8 rounded-lg border transition-all duration-300 ${
                    tier.highlight
                      ? "border-primary bg-primary/[0.03] shadow-[0_0_24px_rgba(74,58,255,0.08)]"
                      : "border-border bg-card hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {tier.level}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium ${
                        tier.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-md ${
                        tier.highlight
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3
                      className="text-xl font-bold text-foreground tracking-tight"
                      style={{
                        fontFamily: "var(--font-display), system-ui, sans-serif",
                      }}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.detail}
                  </p>

                  {idx < tiers.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-background border border-border rounded-full p-1 text-muted-foreground">
                      <ArrowRight className="size-3" />
                    </div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Part 3: Four Focus Areas 2x2 Grid */}
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
            // Core Strategic Pillars
          </div>
          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <ScrollRevealItem key={area.title}>
                  <div className="h-full p-6 sm:p-8 rounded-lg border border-border bg-card hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 rounded-lg bg-muted/60 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                          <Icon className="size-6" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground bg-muted/40 px-2.5 py-1 rounded">
                          {area.tag}
                        </span>
                      </div>
                      <h4
                        className="text-xl font-bold text-foreground mb-3 tracking-tight"
                        style={{
                          fontFamily: "var(--font-display), system-ui, sans-serif",
                        }}
                      >
                        {area.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
