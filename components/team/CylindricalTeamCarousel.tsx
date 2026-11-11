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

interface CylindricalTeamCarouselProps {
  members: EditorialTeamMember[];
  size?: "default" | "compact" | "heads";
  perspectiveReferenceCount?: number;
  className?: string;
}

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

  // Responsive dimensions for card and cylinder:
  // - "default": Large hero scale (Core Team full width)
  // - "compact" and "heads": Shared dimensions for the two-column team sections
  const [cardDim, setCardDim] = useState(() => {
    if (usesCompactDimensions) {
      return { width: 245, height: 370, gap: 24 };
    }
    return { width: 280, height: 420, gap: 32 };
  });

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

  // Exact cylinder radius formula ensuring adjacent cards have sufficient horizontal separation with ZERO overlap:
  // radius = (cardWidth + gap) / (2 * Math.sin(Math.PI / faceCount))
  const radius = Math.round(
    (cardDim.width + cardDim.gap) / (2 * Math.sin(Math.PI / faceCount))
  );

  // Match the Heads' front-card projection to Core Team while retaining its own cylinder radius.
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

  // Dynamic vertical stage calculation:
  // In 3D perspective, when a card rotates to the front (translateZ = +radius),
  // its apparent on-screen scale is: perspective / (perspective - radius).
  // Account for perspective projection so the stage fits the rendered front card.
  const maxPerspectiveScale = perspective / Math.max(perspective - radius, 250);
  const projectedCardHeight = Math.ceil(cardDim.height * maxPerspectiveScale);
  const stageHeight = Math.max(
    projectedCardHeight + 40,
    cardDim.height + 60
  );

  // Motion value for continuous rotation in degrees
  const rotation = useMotionValue(0);

  // Drag interaction tracking
  const startRotation = useRef(0);
  const isDragging = useRef(false);

  const handlePanStart = () => {
    isDragging.current = true;
    startRotation.current = rotation.get();
  };

  const handlePan = (_: unknown, info: PanInfo) => {
    // Convert horizontal pixel drag to rotation angle based on cylinder circumference
    const circumference = 2 * Math.PI * radius;
    const degreesPerPixel = 360 / circumference;
    rotation.set(startRotation.current + info.offset.x * degreesPerPixel);
  };

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    isDragging.current = false;
    const circumference = 2 * Math.PI * radius;
    const degreesPerPixel = 360 / circumference;

    // Add momentum with smooth spring deceleration
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
      const current = rotation.get();
      const delta = direction === "next" ? -stepAngle : stepAngle;
      // Round to nearest slot step for clean alignment
      const currentSlot = Math.round(current / stepAngle);
      const target = (currentSlot + (direction === "next" ? -1 : 1)) * stepAngle;

      animate(rotation, target, {
        type: "spring",
        stiffness: 85,
        damping: 22,
        mass: 0.2,
      });
    },
    [rotation, stepAngle]
  );

  // 65% photo height, 35% white info panel
  const photoHeight = Math.round(cardDim.height * 0.65);
  const infoPanelHeight = cardDim.height - photoHeight;

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* ── 3D Cylindrical Stage ── */}
      <div
        className="relative w-full overflow-visible py-2 sm:py-3"
        style={{
          minHeight: `${stageHeight}px`,
          height: `${stageHeight}px`,
        }}
      >
        {/* Left & Right Editorial Vignette Overlays (Softly frames the carousel within its column width without hiding neighbours) */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 ${
            isHeads ? "w-4 sm:w-6" : "w-8 sm:w-14 md:w-16"
          } bg-gradient-to-r from-[#FCFBFE] to-transparent z-10`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 ${
            isHeads ? "w-4 sm:w-6" : "w-8 sm:w-14 md:w-16"
          } bg-gradient-to-l from-[#FCFBFE] to-transparent z-10`}
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
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            style={{
              rotateY: prefersReducedMotion ? 0 : rotation,
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
                >
                  {/* ── Profile Card: 65% Photo + 35% Information Panel ── */}
                  <div
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#e9e3fb] shadow-[0_14px_36px_-16px_rgba(109,40,217,0.14)] transition-all duration-300 hover:border-[#6d28d9]/40 hover:shadow-[0_20px_48px_-12px_rgba(109,40,217,0.22)]"
                    style={{
                      background: "rgba(255, 255, 255, 0.85)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      transformStyle: "flat",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                      textRendering: "optimizeLegibility",
                    }}
                  >
                    {/* UPPER SECTION — Member Photograph (At least 65% of total card height) */}
                    <div
                      className="relative w-full overflow-hidden bg-[#F4F1F8] flex-shrink-0"
                      style={{
                        height: `${photoHeight}px`,
                      }}
                    >
                      <Image
                        src={member.photo}
                        alt={`Portrait of ${member.name}`}
                        fill
                        draggable={false}
                        sizes={
                          usesCompactDimensions
                            ? "(max-width: 768px) 210px, 250px"
                            : "(max-width: 768px) 240px, 280px"
                        }
                        className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                          objectPosition: `${member.photoPosition?.x ?? 50}% ${member.photoPosition?.y ?? 0}%`,
                          transform: `scale(${member.photoScale ?? 1})`,
                        }}
                        priority={index < 4}
                      />

                      {/* Subtle editorial vignette & bottom boundary blend */}
                      <div
                        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70"
                        aria-hidden="true"
                      />
                    </div>

                    {/* LOWER SECTION — Dedicated Information Panel (35% of total card height with crisp typography) */}
                    <div
                      className={`relative flex flex-none flex-col justify-center bg-transparent ${
                        usesCompactDimensions
                          ? "px-3.5 py-2.5 sm:px-4 sm:py-3"
                          : "px-4 py-3 sm:px-5 sm:py-3.5"
                      } text-left border-t border-[#e9e3fb]`}
                      style={{
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                        textRendering: "optimizeLegibility",
                        height: `${infoPanelHeight}px`,
                      }}
                    >
                      {/* Member Full Name (High contrast, bold, sharp) */}
                      <h4
                        className={`${
                          usesCompactDimensions
                            ? "text-[15px] sm:text-[16px]"
                            : "text-[16px] sm:text-[17.5px]"
                        } font-semibold tracking-tight text-[#1e1033] leading-tight truncate`}
                        style={{
                          fontFamily: "var(--font-display), system-ui, sans-serif",
                        }}
                      >
                        {member.name}
                      </h4>

                      {/* Designation (Refined, crisp uppercase) */}
                      <p
                        className={`mt-0.5 sm:mt-1 ${
                          usesCompactDimensions
                            ? "text-[9.5px] sm:text-[10px] tracking-[0.14em]"
                            : "text-[10.5px] sm:text-[11px] tracking-[0.14em]"
                        } font-normal uppercase text-[#6b6385] line-clamp-1`}
                      >
                        {member.designation}
                      </p>

                      {/* Personal Quote (Clear medium weight italic, high contrast charcoal) */}
                      <div className="mt-1 sm:mt-1.5 flex items-start gap-1">
                        <Quote className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#6d28d9] flex-shrink-0 mt-0.5 stroke-[2.2]" />
                        <p
                          className={`${
                            usesCompactDimensions
                              ? "text-[11px] sm:text-[11.5px]"
                              : "text-[11.5px] sm:text-[12px]"
                          } leading-tight sm:leading-snug text-[#2E2A40] italic font-medium line-clamp-2`}
                          style={{
                            fontFamily: "var(--font-sans), system-ui, sans-serif",
                          }}
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

      {/* ── Centered Carousel Navigation ── */}
      <div className="relative z-20 mt-3 flex justify-center sm:mt-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => rotateToStep("prev")}
            aria-label="Rotate carousel to previous member"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e3fb] bg-white/80 backdrop-blur-xs text-[#6d28d9] shadow-sm transition-all duration-200 hover:border-[#6d28d9] hover:bg-[#f3edff] hover:text-[#1e1033] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => rotateToStep("next")}
            aria-label="Rotate carousel to next member"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e3fb] bg-white/80 backdrop-blur-xs text-[#6d28d9] shadow-sm transition-all duration-200 hover:border-[#6d28d9] hover:bg-[#f3edff] hover:text-[#1e1033] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]"
          >
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
