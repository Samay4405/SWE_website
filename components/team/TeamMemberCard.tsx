"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { TeamMember } from "@/content/types";
import { cn } from "cn";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getInitials = (name: string) => {
    return name
      .replace(/Dr\.|Prof\./g, "")
      .trim()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${member.name}, ${member.role}. Press Enter to view biography.`}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      className={cn(
        "group relative rounded-xl border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[280px]",
        isFlipped
          ? "border-primary/40 bg-muted/30 shadow-md"
          : "hover:border-foreground/30 hover:shadow-sm"
      )}
    >
      {!isFlipped ? (
        /* Front View */
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-start justify-between mb-4">
              {/* Avatar circle with initials */}
              <div className="size-14 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                {getInitials(member.name)}
              </div>

              {/* LinkedIn Link */}
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name} LinkedIn Profile`}
                className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>

            <h3
              className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              {member.name}
            </h3>

            <p className="text-xs font-mono font-medium text-primary mt-0.5 mb-2">
              {member.role}
            </p>

            <p className="text-xs text-muted-foreground line-clamp-2">
              {member.department}
            </p>
          </div>

          <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-4">
            <span className="text-[11px] font-mono text-muted-foreground">
              {member.year || "SWE Advisory"}
            </span>
            <span className="text-[11px] font-medium text-primary group-hover:underline">
              Tap for bio →
            </span>
          </div>
        </div>
      ) : (
        /* Flipped / Bio View */
        <div className="flex flex-col justify-between h-full animate-in fade-in zoom-in-95 duration-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-primary font-semibold">
                Biography
              </span>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
              >
                <span>LinkedIn</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            <h4 className="text-sm font-bold text-foreground mb-2">
              {member.name}
            </h4>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground mt-4">
            <span>{member.role}</span>
            <span className="text-primary font-medium">← Back</span>
          </div>
        </div>
      )}
    </div>
  );
}
