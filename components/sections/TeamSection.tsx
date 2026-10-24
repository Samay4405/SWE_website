"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { teamMembers } from "@/content/team";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";

export function TeamSection() {
  const leadership = teamMembers.filter((m) => m.team === "Leadership").slice(0, 4);

  return (
    <section id="team" className="section-padding bg-[#FDFDFC] border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <ScrollReveal className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7254A8]">
                CHAPTER LEADERSHIP
              </span>
              <span className="h-[1.5px] w-7 bg-[#C4B5E6]" />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#24164F]"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              The Team Behind the Chapter
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5E5B70] leading-relaxed">
              Passionate undergraduate engineers, department mentors, and alumnae driving
              technical excellence and community impact at MIT-WPU.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="shrink-0">
            <Link href="/team">
              <Button variant="outline" className="gap-2 border-[#D5CBEA] text-[#24164F] hover:bg-[#EDE6FA]/50">
                View Full Team Directory ({teamMembers.length})
                <ArrowRight className="size-4 text-[#7254A8]" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.1}>
              <TeamMemberCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
