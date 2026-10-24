"use client";

import Image from "next/image";
import { Users, BookOpen, Star, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const pillars = [
  {
    title: "Connecting",
    description:
      "Building a supportive community where ideas, experiences, and opportunities come together.",
    icon: Users,
    iconBg: "bg-[#EDE6FA]",
    iconColor: "text-[#7254A8]",
  },
  {
    title: "Learning",
    description:
      "Gaining hands-on experience, building technical skills, and exploring new possibilities.",
    icon: BookOpen,
    iconBg: "bg-[#FFF0B3]",
    iconColor: "text-[#A67C00]",
  },
  {
    title: "Leading",
    description:
      "Empowering women to take initiative, create change, and shape a more inclusive tech future.",
    icon: Star,
    iconBg: "bg-[#EDE6FA]",
    iconColor: "text-[#7254A8]",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="section-container">
        {/* ── Top Part: Two-Column Introduction ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center mb-20 md:mb-28">
          {/* Left Column: Heading & Mission */}
          <ScrollReveal className="lg:col-span-6 xl:col-span-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7254A8]">
                ABOUT SWE
              </span>
              <span className="h-[1.5px] w-7 bg-[#C4B5E6]" />
            </div>

            {/* Main Two-Line Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.12] mb-6 sm:mb-7"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              <span className="block text-[#24164F]">
                More than a society.
              </span>
              <span className="block text-[#8B6BC2] mt-1 sm:mt-1.5">
                A space to build.
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#5E5B70] leading-relaxed max-w-xl font-normal">
              The Society of Women Engineers (SWE) at MIT-WPU is a community of
              curious minds, aspiring engineers, and future innovators. We bring
              together women who want to explore technology, develop practical
              skills, collaborate on meaningful projects, and create opportunities
              for one another.
            </p>
          </ScrollReveal>

          {/* Right Column: Event Photograph */}
          <ScrollReveal delay={0.15} className="lg:col-span-6 xl:col-span-6">
            <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
              {/* Subtle restrained soft lavender backdrop shape behind top-right corner */}
              <div
                className="pointer-events-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-3/4 h-3/4 rounded-[32px] bg-[#EDE6FA]/70 -z-10"
                aria-hidden="true"
              />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl md:rounded-[22px] overflow-hidden shadow-[0_14px_38px_rgba(36,22,79,0.08)] border border-[#E5E2EC]/80 bg-white">
                <Image
                  src="/images/about/workshop-audience.jpg"
                  alt="SWE MIT-WPU students and members collaborating in a technical workshop"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/11]"
                  priority={false}
                />
              </div>

              {/* Editorial Floating Badge (Bottom Right) */}
              <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-5 z-10 bg-[#EDE6FA]/95 backdrop-blur-md border border-[#D5CBEA] rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_10px_25px_rgba(36,22,79,0.08)] flex items-center gap-3">
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-bold text-[#24164F] leading-tight">
                    Real People.
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#24164F] leading-tight">
                    Real Projects.
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-[#7254A8] leading-tight">
                    Lasting Impact.
                  </p>
                </div>
                <ArrowRight className="size-4 text-[#7254A8] ml-1" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bottom Part: Three SWE Pillars ── */}
        <div className="border-t border-[#E5E2EC] pt-14 md:pt-18">
          <h2
            className="mb-10 text-center text-2xl font-bold tracking-tight text-[#24164F] sm:text-3xl md:mb-14"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Three Pillars of SWE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E2EC]">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal
                  key={pillar.title}
                  delay={idx * 0.1}
                  className="group flex flex-col items-center px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 md:px-8 md:py-0 lg:px-12 first:pt-0 first:md:pl-0 last:pb-0 last:md:pr-0"
                >
                  <div className="mb-4 flex flex-col items-center gap-3">
                    <div
                      className={`size-12 shrink-0 rounded-full ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3
                      className="text-2xl font-bold tracking-tight text-[#24164F]"
                      style={{
                        fontFamily: "var(--font-display), system-ui, sans-serif",
                      }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="max-w-sm text-sm font-normal leading-relaxed text-[#74738A] sm:text-[15px]">
                    {pillar.description}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
