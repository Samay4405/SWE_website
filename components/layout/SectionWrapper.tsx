"use client";

import { cn } from "cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Use full-bleed background (no max-width container) */
  fullBleed?: boolean;
  /** Remove default vertical padding */
  noPadding?: boolean;
}

/**
 * Consistent section wrapper with:
 * - Max-width container (1280px)
 * - Responsive horizontal padding
 * - Generous vertical padding (96–160px desktop)
 * - Optional full-bleed mode for hero/CTA sections
 * - Scroll target ID for navbar
 */
export function SectionWrapper({
  children,
  id,
  className,
  fullBleed = false,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && "section-padding",
        className
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <div className="section-container">{children}</div>
      )}
    </section>
  );
}
