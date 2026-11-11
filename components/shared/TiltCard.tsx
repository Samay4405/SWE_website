"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SPRINGS, useMotionPreference } from "@/lib/motion";

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number; // degrees, default 6
  spotlight?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  maxTilt = 6,
  spotlight = true,
  className = "",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const { shouldAnimate } = useMotionPreference();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !shouldAnimate) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      setRotateX(-normY * maxTilt);
      setRotateY(normX * maxTilt);
      setSpotlightPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [maxTilt, shouldAnimate]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={
        shouldAnimate
          ? {
              rotateX,
              rotateY,
              scale: isHovered ? 1.015 : 1,
            }
          : {}
      }
      transition={SPRINGS.smooth}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
        isHovered
          ? "shadow-[0_12px_32px_-8px_rgba(101,56,165,0.18)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
          : "shadow-xs"
      } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Gradient */}
      {spotlight && isHovered && shouldAnimate && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(167, 139, 218, 0.15), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content with subtle 3D translation */}
      <div
        style={{
          transform: shouldAnimate && isHovered ? "translateZ(8px)" : "translateZ(0px)",
          transition: "transform 0.25s ease-out",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
