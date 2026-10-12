"use client";

import Link from "next/link";
import { BookOpen, Cpu, Network, Crown, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/ScrollReveal";

const pillars = [
  {
    step: "01",
    title: "Learn",
    subtitle: "Cutting-Edge Technical Upskilling",
    description:
      "Master high-demand tech stacks through intensive workshops, code sprints, and interactive bootcamps led by senior student mentors and industry guests.",
    icon: BookOpen,
    highlights: ["AI & Full-Stack tracks", "Peer study circles", "Git & Systems fundamentals"],
  },
  {
    step: "02",
    title: "Build",
    subtitle: "Production-Grade Projects",
    description:
      "Transform ideas into production software and hardware prototypes. Compete in national hackathons with chapter teams and publish impactful engineering solutions.",
    icon: Cpu,
    highlights: ["Hackathon squad matching", "Open-source contributions", "Portfolio project reviews"],
  },
  {
    step: "03",
    title: "Connect",
    subtitle: "Lifelong Professional Sisterhood",
    description:
      "Join an empowering community of like-minded collegiate engineers and tap into the global SWE directory spanning Fortune 500 enterprises and research labs.",
    icon: Network,
    highlights: ["1-on-1 Alumni mentorship", "Industry mixer nights", "Global SWE conference access"],
  },
  {
    step: "04",
    title: "Lead",
    subtitle: "Executive & Team Management",
    description:
      "Step up into leadership roles. Manage budgets, direct technical operations, host campus symposiums, and hone executive communication skills.",
    icon: Crown,
    highlights: ["Event director roles", "Technical committee chairs", "Public speaking practice"],
  },
  {
    step: "05",
    title: "Grow",
    subtitle: "Career & Placement Acceleration",
    description:
      "Gain direct advantages during campus recruitment and internships with tailored resume audits, mock algorithmic interviews, and referral networks.",
    icon: TrendingUp,
    highlights: ["Tech interview prep", "Resume breakdown labs", "Exclusive hiring partner talks"],
  },
];

export function WhyJoin() {
  return (
    <section id="why-join" className="section-padding bg-muted/20 border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>02 // VALUE PROPOSITION</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Five pillars designed to accelerate your engineering journey.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Engineering education isn’t just lectures. It’s what you build, who you build with, and how you lead. 
            Here is how SWE MIT-WPU equips you to thrive from Day 1 to graduation and beyond.
          </p>
        </ScrollReveal>

        {/* 5 Pillars Grid */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isLastSpan = idx === 4; // 5th item can look balanced across remaining width
            return (
              <ScrollRevealItem
                key={pillar.title}
                className={isLastSpan ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className="h-full p-6 sm:p-8 rounded-lg border border-border bg-card hover:border-foreground/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-sm font-bold text-primary">
                        {pillar.step}
                      </span>
                      <div className="p-2.5 rounded-lg bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                        <Icon className="size-5" />
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold text-foreground mb-1 tracking-tight"
                      style={{
                        fontFamily: "var(--font-display), system-ui, sans-serif",
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-primary font-medium mb-4">
                      {pillar.subtitle}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <ul className="space-y-2">
                      {pillar.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>

        {/* Action Callout Banner */}
        <ScrollReveal>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-xl text-center md:text-left z-10">
              <h3
                className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight"
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                }}
              >
                Ready to take your engineering career to the next level?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Join our active student chapter, attend upcoming workshops, and connect with peers today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 z-10 w-full md:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Join the Chapter
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/events" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
