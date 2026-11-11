import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow = "SWE MIT-WPU",
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`pt-8 sm:pt-12 pb-4 sm:pb-6 text-center max-w-4xl mx-auto px-4 select-none ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] font-medium text-[#6d28d9] mb-3">
          <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#a78bfa]" />
          <span>{eyebrow}</span>
          <span className="w-7 h-[1px] bg-gradient-to-l from-transparent to-[#a78bfa]" />
        </div>
      )}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1e1033] leading-tight"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base md:text-lg text-[#6b6385] font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
