import type { Metadata } from "next";
import { teamMembers } from "@/content/team";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { Users, Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Team Directory",
  description:
    "Meet the student leaders, core committee members, and faculty mentors driving the SWE MIT-WPU Chapter in Pune.",
};

export default function TeamPage() {
  const leadership = teamMembers.filter((m) => m.team === "Leadership");
  const core = teamMembers.filter((m) => m.team === "Core");
  const advisory = teamMembers.filter((m) => m.team === "Advisory");

  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
            <span>CHAPTER LEADERSHIP</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            The Team Behind the Chapter
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A diverse collective of passionate undergraduate engineers, department chairs, and industry alumnae 
            committed to building technical excellence, equal opportunity, and lasting community impact.
          </p>
        </div>

        {/* Section 1: Executive Leadership */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Executive Leadership
              </h2>
              <p className="text-xs text-muted-foreground">
                Presidency, operations, financial stewardship, and strategic vision
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Section 2: Core Committee */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Core Committee
              </h2>
              <p className="text-xs text-muted-foreground">
                Technical tracks, event execution, brand design, and corporate outreach
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {core.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Section 3: Advisory Board */}
        <section>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Faculty Advisory &amp; Industry Mentors
              </h2>
              <p className="text-xs text-muted-foreground">
                Academic governance, research mentorship, and SWE India section alignment
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisory.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
