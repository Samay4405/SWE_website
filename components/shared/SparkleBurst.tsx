"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  rotation: number;
}

const BRAND_SPARKLE_COLORS = [
  "#6538A5", // Purple
  "#A78BDA", // Soft Lavender
  "#F5D76E", // Gold
  "#E8B94F", // Warm Gold
  "#FFFFFF", // White
];

export function useSparkleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerSparkle = useCallback((clientX: number, clientY: number, count = 22) => {
    // Check reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 35 + Math.random() * 55;
      return {
        id: Date.now() + i,
        x: clientX,
        y: clientY,
        targetX: clientX + Math.cos(angle) * distance,
        targetY: clientY + Math.sin(angle) * distance + 10, // subtle gravity drop
        color: BRAND_SPARKLE_COLORS[Math.floor(Math.random() * BRAND_SPARKLE_COLORS.length)],
        size: 3 + Math.random() * 4,
        rotation: Math.random() * 360,
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 700);
  }, []);

  const SparklePortal = useCallback(() => {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999999,
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: p.x,
                y: p.y,
                scale: 0.5,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: p.targetX,
                y: p.targetY,
                scale: [0.5, 1.2, 0],
                opacity: [1, 0.9, 0],
                rotate: p.rotation,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: p.size > 5 ? "2px" : "50%",
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }, [particles]);

  return { triggerSparkle, SparklePortal };
}
