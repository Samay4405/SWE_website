"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { EditorialTeamMember } from "@/content/teamData";
import { SPRING_SNAP, EASE_EDITORIAL } from "@/lib/animations";

interface CylindricalTeamCarouselProps {
  members: EditorialTeamMember[];
  size?: "default" | "compact" | "heads";
  perspectiveReferenceCount?: number;
  className?: string;
}

// Minimal shimmer placeholder data URL to eliminate image pop-in
const BLUR_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23F2EFF7'/%3E%3C/svg%3E";

export function CylindricalTeamCarousel({
  members,
  size = "default",
  perspectiveReferenceCount,
  className = "",
}: CylindricalTeamCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const faceCount = members.length;
  const isHeads = size === "heads";
  const isCompact = size === "compact";
  const usesCompactDimensions = isHeads || isCompact;

  const [activeSlot, setActiveSlot] = useState(0);

  // Responsive dimensions for card and cylinder:
  const [cardDim, setCardDim] = useState(() => {
    if (usesCompactDimensions) {
      return { width: 245, height: 370, gap: 24 };
    }
    return { width: 280, height: 420, gap: 32 };
  });

  const flatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (usesCompactDimensions) {
        if (w < 640) {
          setCardDim({ width: 210, height: 330, gap: 18 });
        } else if (w < 1024) {
          setCardDim({ width: 225, height: 345, gap: 20 });
        } else {
          setCardDim({ width: 245, height: 370, gap: 24 });
        }
      } else {
        if (w < 640) {
          setCardDim({ width: 230, height: 370, gap: 24 });
        } else if (w < 1024) {
          setCardDim({ width: 255, height: 395, gap: 28 });
        } else {
          setCardDim({ width: 280, height: 420, gap: 32 });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [usesCompactDimensions]);

  const stepAngle = 360 / faceCount;

  const radius = Math.round(
    (cardDim.width + cardDim.gap) / (2 * Math.sin(Math.PI / faceCount))
  );

  const referenceRadius = perspectiveReferenceCount
    ? Math.round(
        (cardDim.width + cardDim.gap) /
          (2 * Math.sin(Math.PI / perspectiveReferenceCount))
      )
    : radius;
  const perspective =
    isHeads && perspectiveReferenceCount
      ? (1400 * radius) / referenceRadius
      : 1400;

  const maxPerspectiveScale = perspective / Math.max(perspective - radius, 250);
  const projectedCardHeight = Math.ceil(cardDim.height * maxPerspectiveScale);
  const stageHeight = Math.max(
    projectedCardHeight + 40,
    cardDim.height + 60
  );

  // Motion value for continuous rotation in degrees
  const rotation = useMotionValue(0);

  // Update active slot index for accessibility live region
  useEffect(() => {
    return rotation.on("change", (v) => {
      const currentSlot = Math.round(-v / stepAngle);
      const normalizedSlot = ((currentSlot % faceCount) + faceCount) % faceCount;
      setActiveSlot(normalizedSlot);
    });
  }, [rotation, stepAngle, faceCount]);

  // Drag interaction tracking
  const startRotation = useRef(0);
  const isDragging = useRef(false);

  const handlePanStart = () => {
    isDragging.current = true;
    startRotation.current = rotation.get();
  };

  const handlePan = (_: unknown, info: PanInfo) => {
    const circumference = 2 * Math.PI * radius;
    const degreesPerPixel = 360 / circumference;
    rotation.set(startRotation.current + info.offset.x * degreesPerPixel);
  };

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false;
    const circumference = 2 * Math.PI * radius;
    const degreesPerPixel = 360 / circumference;

    const velocityFactor = 0.28;
    const target = rotation.get() + info.velocity.x * degreesPerPixel * velocityFactor;

    animate(rotation, target, {
      type: "spring",
      stiffness: 75,
      damping: 24,
      mass: 0.25,
    });
  };

  const rotateToStep = useCallback(
    (direction: "next" | "prev") => {
      if (prefersReducedMotion) {
        if (flatScrollRef.current) {
          const delta = (direction === "next" ? 1 : -1) * (cardDim.width + 16);
          flatScrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
        }
        return;
      }

      const current = rotation.get();
      const currentSlot = Math.round(current / stepAngle);
      const target = (currentSlot + (direction === "next" ? -1 : 1)) * stepAngle;

      animate(rotation, target, {
        type: "spring",
        ...SPRING_SNAP,
      });
    },
    [rotation, stepAngle, prefersReducedMotion, cardDim.width]
  );

  const photoHeight = Math.round(cardDim.height * 0.65);
  const infoPanelHeight = cardDim.height - photoHeight;

  // Active member for accessibility announcement
  const activeMember = members[activeSlot] || members[0];

  return (
    <div
      className={`relative w-full select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="SWE Team Members Carousel"
    >
      {/* ── Accessible Live Region Announcer ── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current member slide: {activeMember.name}, {activeMember.designation}.
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          A. REDUCED-MOTION MODE (Flat Horizontal Snap Scroller)
         ═══════════════════════════════════════════════════════════════ */}
      {prefersReducedMotion ? (
        <div
          ref={flatScrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory gap-5 py-4 px-2 scroll-smooth no-scrollbar"
        >
          {members.map((member, i) => (
            <div
              key={member.id}
              className="snap-center shrink-0"
              style={{ width: `${cardDim.width}px` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${members.length}`}
            >
              <div
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E9E3FB] dark:border-white/10 shadow-[0_14px_36px_-16px_rgba(101,56,165,0.14)] bg-white/85 dark:bg-[#140E24]/85 backdrop-blur-md"
                style={{ height: `${cardDim.height}px` }}
              >
                <div
                  className="relative w-full overflow-hidden bg-[#F4F1F8] dark:bg-[#1A1230] shrink-0"
                  style={{ height: `${photoHeight}px` }}
                >
                  <Image
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 240px, 280px"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    className="object-cover object-top select-none"
                  />
                </div>
                <div
                  className="p-4 flex flex-col justify-center border-t border-[#E9E3FB] dark:border-white/10"
                  style={{ height: `${infoPanelHeight}px` }}
                >
                  <h4 className="font-semibold text-[16px] text-[#1E1033] dark:text-[#F3F0FA] truncate">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-[#6B6385] dark:text-[#A79EC4] truncate font-medium">
                    {member.designation}
                  </p>
                  <div className="mt-1.5 flex items-start gap-1">
                    <Quote className="h-3 w-3 text-[#E8B94F] shrink-0 mt-0.5" />
                    <p className="text-[11.5px] italic text-[#2E2A40] dark:text-[#D1BEFC] line-clamp-2">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════
            B. FULL 3D CYLINDRICAL STAGE
           ═══════════════════════════════════════════════════════════════ */
        <div
          className="relative w-full overflow-visible py-2 sm:py-3"
          style={{
            minHeight: `${stageHeight}px`,
            height: `${stageHeight}px`,
          }}
        >
          {/* Edge Vignettes */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 ${
              isHeads ? "w-4 sm:w-6" : "w-8 sm:w-14 md:w-16"
            } bg-gradient-to-r from-[#FCFBFE] dark:from-[#0F0D15] to-transparent z-10`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 ${
              isHeads ? "w-4 sm:w-6" : "w-8 sm:w-14 md:w-16"
            } bg-gradient-to-l from-[#FCFBFE] dark:from-[#0F0D15] to-transparent z-10`}
            aria-hidden="true"
          />

          <div
            className="relative mx-auto flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
            style={{
              perspective: `${perspective}px`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Rotatable Cylinder Hub */}
            <motion.div
              data-cursor="drag"
              onPanStart={handlePanStart}
              onPan={handlePan}
              onPanEnd={handlePanEnd}
              style={{
                rotateY: rotation,
                transformStyle: "preserve-3d",
                position: "relative",
                width: `${cardDim.width}px`,
                height: `${cardDim.height}px`,
              }}
              className="flex items-center justify-center origin-center"
              tabIndex={0}
              role="region"
              aria-label="3D Cylindrical Team Carousel. Use arrow buttons or keyboard arrow keys to rotate."
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") rotateToStep("prev");
                if (e.key === "ArrowRight") rotateToStep("next");
              }}
            >
              {members.map((member, index) => {
                const cardAngle = index * stepAngle;

                return (
                  <div
                    key={member.id}
                    style={{
                      position: "absolute",
                      width: `${cardDim.width}px`,
                      height: `${cardDim.height}px`,
                      transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "flat",
                    }}
                    className="origin-center transition-shadow duration-300 pointer-events-auto"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${members.length}: ${member.name}, ${member.designation}`}
                  >
                    {/* Profile Card: 65% Photo + 35% Information Panel */}
                    <div
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#E9E3FB] dark:border-white/10 shadow-[0_14px_36px_-16px_rgba(101,56,165,0.14)] transition-all duration-300 hover:border-[#6538A5]/40 dark:hover:border-[#A78BDA]/50 hover:shadow-[0_20px_48px_-12px_rgba(101,56,165,0.22)] bg-white/90 dark:bg-[#140E24]/90 backdrop-blur-md"
                      style={{
                        transformStyle: "flat",
                      }}
                    >
                      {/* Member Photograph */}
                      <div
                        className="relative w-full overflow-hidden bg-[#F4F1F8] dark:bg-[#1A1230] shrink-0"
                        style={{ height: `${photoHeight}px` }}
                      >
                        <Image
                          src={member.photo}
                          alt={`Portrait of ${member.name}`}
                          fill
                          sizes={
                            usesCompactDimensions
                              ? "(max-width: 768px) 210px, 250px"
                              : "(max-width: 768px) 240px, 280px"
                          }
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                          className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-105"
                          priority={index < 4}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Information Panel */}
                      <div
                        className={`relative flex flex-none flex-col justify-center bg-transparent ${
                          usesCompactDimensions
                            ? "px-3.5 py-2.5 sm:px-4 sm:py-3"
                            : "px-4 py-3 sm:px-5 sm:py-3.5"
                        } text-left border-t border-[#E9E3FB] dark:border-white/10`}
                        style={{ height: `${infoPanelHeight}px` }}
                      >
                        <h4
                          className={`${
                            usesCompactDimensions
                              ? "text-[15px] sm:text-[16px]"
                              : "text-[16px] sm:text-[17.5px]"
                          } font-semibold tracking-tight text-[#1E1033] dark:text-[#F3F0FA] leading-tight truncate`}
                        >
                          {member.name}
                        </h4>

                        <p
                          className={`mt-0.5 sm:mt-1 ${
                            usesCompactDimensions
                              ? "text-[9.5px] sm:text-[10px] tracking-[0.14em]"
                              : "text-[10.5px] sm:text-[11px] tracking-[0.14em]"
                          } font-medium uppercase text-[#6B6385] dark:text-[#A79EC4] line-clamp-1`}
                        >
                          {member.designation}
                        </p>

                        <div className="mt-1 sm:mt-1.5 flex items-start gap-1">
                          <Quote className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#E8B94F] shrink-0 mt-0.5 stroke-[2.2]" />
                          <p
                            className={`${
                              usesCompactDimensions
                                ? "text-[11px] sm:text-[11.5px]"
                                : "text-[11.5px] sm:text-[12px]"
                            } leading-tight sm:leading-snug text-[#2E2A40] dark:text-[#D1BEFC] italic font-medium line-clamp-2`}
                          >
                            &ldquo;{member.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Carousel Controls (WCAG 44x44px Tap Targets) ── */}
      <div className="relative z-20 mt-4 flex justify-center sm:mt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => rotateToStep("prev")}
            aria-label="Rotate carousel to previous member"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E3FB] dark:border-white/10 bg-white/90 dark:bg-[#181126] backdrop-blur-xs text-[#6538A5] dark:text-[#D1BEFC] shadow-sm transition-all duration-200 hover:border-[#6538A5] hover:bg-[#F6F2FC] dark:hover:bg-[#251A3C] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => rotateToStep("next")}
            aria-label="Rotate carousel to next member"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E3FB] dark:border-white/10 bg-white/90 dark:bg-[#181126] backdrop-blur-xs text-[#6538A5] dark:text-[#D1BEFC] shadow-sm transition-all duration-200 hover:border-[#6538A5] hover:bg-[#F6F2FC] dark:hover:bg-[#251A3C] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CylindricalTeamCarousel;
