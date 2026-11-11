"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SPRINGS } from "@/lib/motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magneticStrength?: number; // max offset in px (default 8)
  variant?: "primary" | "secondary" | "ghost" | "gold";
  sheen?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MagneticButton({
  children,
  magneticStrength = 8,
  variant = "primary",
  sheen = true,
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setOffset({
        x: Math.max(-magneticStrength, Math.min(magneticStrength, deltaX * magneticStrength)),
        y: Math.max(-magneticStrength, Math.min(magneticStrength, deltaY * magneticStrength)),
      });
    },
    [magneticStrength]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rippleId = Date.now();
      setRipples((prev) => [...prev, { id: rippleId, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 600);
    }
    onClick?.(e);
  };

  // Variant classes
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#6538A5] to-[#532D8A] hover:from-[#532D8A] hover:to-[#6538A5] text-white shadow-sm hover:shadow-[0_4px_20px_rgba(101,56,165,0.35)]",
    gold: "bg-gradient-to-r from-[#F5D76E] to-[#E8B94F] text-[#1E1033] font-medium shadow-sm hover:shadow-[0_4px_20px_rgba(245,215,110,0.35)]",
    secondary:
      "bg-white/80 dark:bg-[#1A1624]/80 text-[#1E1033] dark:text-[#EDEDED] border border-[#E9E3FB] dark:border-[#3D3552] hover:border-[#6538A5]/40",
    ghost:
      "bg-transparent text-[#6B6385] dark:text-[#C1B9D8] hover:text-[#1E1033] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
  }[variant];

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: offset.x, y: offset.y }}
      whileTap={{ scale: 0.97 }}
      transition={SPRINGS.snappy}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans text-sm tracking-[0.02em] select-none transition-colors duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#6538A5] ${variantStyles} ${className}`}
      {...(props as any)}
    >
      {/* Sweeping Sheen Highlight on Hover */}
      {sheen && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent w-full h-full"
        />
      )}

      {/* Radial Click Ripple */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: variant === "gold" ? "rgba(255,255,255,0.7)" : "rgba(245,215,110,0.5)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Button Children */}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </motion.button>
  );
}
