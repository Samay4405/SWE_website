import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Award,
  Users,
  Calendar,
  Clock,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { stats, achievements, partners } from "@/content/stats";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { GrowthChart } from "@/components/impact/GrowthChart";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Impact & Growth",
  description:
    "Explore the quantitative and qualitative impact of SWE MIT-WPU Chapter: membership trajectory, hackathon milestones, and industry partnerships.",
};

const statIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Clock,
  Building2,
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>ANNUAL REPORT &amp; ANALYTICS</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Empowerment at Scale
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Since our charter at MIT World Peace University, SWE has transformed from a small 
            interest group to one of Pune’s most vibrant collegiate technical societies.
          </p>
        </div>

        {/* 1. Core Impact Statistics Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = statIcons[stat.icon] || TrendingUp;
              return (
                <div
                  key={stat.label}
                  className="p-6 sm:p-8 rounded-xl border border-border bg-card hover:border-foreground/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      METRIC 0{idx + 1}
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
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Interactive Growth Chart */}
        <section className="mb-20">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-primary font-semibold block mb-1">
                  HISTORICAL TRAJECTORY
                </span>
                <h2
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  Five-Year Chapter Growth (2021 – 2025)
                </h2>
                <p className="text-sm text-muted-foreground">
                  Solid purple represents registered members; dashed trace tracks technical events held.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="size-3 rounded-full bg-primary" /> Active Members
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-3 rounded-full bg-slate-400" /> Events
                </span>
              </div>
            </div>

            <GrowthChart />
          </div>
        </section>

        {/* 3. Major Chapter Achievements */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Trophy className="size-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Key Honors &amp; Milestones
              </h2>
              <p className="text-xs text-muted-foreground">
                Recognitions bestowed by SWE India, university faculties, and technical bodies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card hover:border-foreground/30 transition-all flex items-start gap-4"
              >
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1 font-mono text-xs font-bold">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Corporate & Industry Collaborators */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Corporate &amp; Academic Partners
              </h2>
              <p className="text-xs text-muted-foreground">
                Leading organizations that support our symposiums, hackathons, and placement drives
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-muted/40 transition-all flex flex-col items-center justify-center text-center group"
              >
                <span
                  className="font-bold text-base text-muted-foreground group-hover:text-foreground transition-colors tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {partner.name}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Bottom Action Banner */}
        <section>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/50 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Partner with SWE MIT-WPU
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6">
              Interested in sponsoring Technovate 2026, hosting a technical workshop, or recruiting 
              talented engineers from our chapter? Let&apos;s build together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get in Touch with Corporate Relations
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
