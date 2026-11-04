"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PixelImageProps {
  /** The image source URL */
  src: string;
  /** Accessible alt description */
  alt?: string;
  /** Predefined grid layout (default: "8x8") */
  grid?: "6x4" | "8x8" | "8x3" | "4x6" | "3x8";
  /** Custom grid configuration (overrides grid prop) */
  customGrid?: {
    rows: number;
    cols: number;
  };
  /** Whether the image animates from grayscale to full color (default: true) */
  grayscaleAnimation?: boolean;
  /** Duration in ms for each individual pixel's fade-in animation (default: 1000) */
  pixelFadeInDuration?: number;
  /** Maximum random delay in ms applied to stagger pixel animations (default: 1200) */
  maxAnimationDelay?: number;
  /** Delay in ms before revealing color (default: 1500) */
  colorRevealDelay?: number;
  /** Additional class names */
  className?: string;
}

export function PixelImage({
  src,
  alt = "Pixel image",
  grid = "8x8",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1500,
  className,
}: PixelImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const [isColorRevealed, setIsColorRevealed] = useState(!grayscaleAnimation || !!prefersReducedMotion);

  // Compute row and column count
  const { rows, cols } = useMemo(() => {
    if (customGrid?.rows && customGrid?.cols) {
      return {
        rows: Math.max(1, customGrid.rows),
        cols: Math.max(1, customGrid.cols),
      };
    }
    const [cStr, rStr] = grid.split("x");
    return {
      cols: Math.max(1, parseInt(cStr, 10) || 8),
      rows: Math.max(1, parseInt(rStr, 10) || 8),
    };
  }, [customGrid, grid]);

  const totalPixels = rows * cols;

  // Generate deterministic pseudo-random animation delays per pixel based on index
  const pixelDelays = useMemo(() => {
    return Array.from({ length: totalPixels }, (_, i) => {
      const pseudoRand = ((i * 9301 + 49297) % 233280) / 233280;
      return (pseudoRand * maxAnimationDelay) / 1000;
    });
  }, [totalPixels, maxAnimationDelay]);

  // Color reveal timing triggered when container enters view
  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (prefersReducedMotion) setIsColorRevealed(true);
      return;
    }

    if (grayscaleAnimation) {
      const timer = setTimeout(() => {
        setIsColorRevealed(true);
      }, colorRevealDelay);
      return () => clearTimeout(timer);
    }
  }, [isInView, grayscaleAnimation, colorRevealDelay, prefersReducedMotion]);

  // Toggle reveal state on touch/click or keyboard activation
  const handleToggle = useCallback(() => {
    setIsColorRevealed((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsColorRevealed((prev) => !prev);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`${alt}. Click or press Enter to toggle color pixelation effect.`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full h-full overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2 rounded-[inherit]",
        className
      )}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: totalPixels }).map((_, index) => {
        const rowIndex = Math.floor(index / cols);
        const colIndex = index % cols;

        const xPercent = cols > 1 ? (colIndex / (cols - 1)) * 100 : 0;
        const yPercent = rows > 1 ? (rowIndex / (rows - 1)) * 100 : 0;

        const delay = prefersReducedMotion ? 0 : pixelDelays[index];
        const duration = prefersReducedMotion ? 0 : pixelFadeInDuration / 1000;

        return (
          <motion.div
            key={index}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration,
              delay,
              ease: "easeOut",
            }}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${xPercent}% ${yPercent}%`,
              backgroundRepeat: "no-repeat",
              filter: isColorRevealed ? "grayscale(0%)" : "grayscale(100%)",
              transition: prefersReducedMotion
                ? "none"
                : "filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: "scale(1.006)",
            }}
            className="w-full h-full pointer-events-none"
          />
        );
      })}
    </div>
  );
}

export default PixelImage;
