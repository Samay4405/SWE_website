"use client";

import React, { useState } from "react";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/motion";

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export function AnimatedLink({
  children,
  className = "",
  underlineColor = "var(--purple)",
  href,
  ...props
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center text-inherit no-underline select-none group ${className}`}
      {...props}
    >
      <span>{children}</span>
      {/* Animated Left-to-Right Underline */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{
          duration: DURATION.fast,
          ease: EASING.emphasisedOut,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1.5px",
          backgroundColor: underlineColor,
          transformOrigin: isHovered ? "left" : "right",
        }}
      />
    </Link>
  );
}
