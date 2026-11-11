"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASING, DURATION, useMotionPreference } from "@/lib/motion";

interface MaskedRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export function MaskedReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: MaskedRevealProps) {
  const { shouldAnimate } = useMotionPreference();
  const Tag = motion[as] || motion.div;

  if (!shouldAnimate) {
    const RawTag = as;
    return <RawTag className={className}>{children}</RawTag>;
  }

  return (
    <div className="overflow-hidden">
      <Tag
        initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{
          duration: DURATION.slow,
          ease: EASING.emphasisedOut,
          delay,
        }}
        className={className}
      >
        {children}
      </Tag>
    </div>
  );
}
