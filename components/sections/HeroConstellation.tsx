"use client";

import { useState, useEffect, useRef } from "react";
import { stemFacts, StemFact } from "@/content/stemFacts";
import { cn } from "cn";
import { Sparkles } from "lucide-react";

interface NodePosition {
  id: string;
  xPercent: number;
  yPercent: number;
  size: number;
  tooltipSide: "left" | "right" | "bottom-right" | "bottom-left";
  pulseSpeed: "slow" | "medium" | "fast";
  isPrimary?: boolean;
}

const LEFT_INTERACTIVE_NODES: NodePosition[] = [
  {
    id: "ada-lovelace",
    xPercent: 70.6,
    yPercent: 18.3,
    size: 13,
    tooltipSide: "right",
    pulseSpeed: "slow",
    isPrimary: true,
  },
  {
    id: "grace-hopper",
    xPercent: 85.8,
    yPercent: 35.6,
    size: 12,
    tooltipSide: "bottom-right",
    pulseSpeed: "medium",
  },
  {
    id: "dr-a-lalitha",
    xPercent: 76.1,
    yPercent: 59.6,
    size: 13,
    tooltipSide: "right",
    pulseSpeed: "medium",
    isPrimary: true,
  },
  {
    id: "janaki-ammal",
    xPercent: 63.0,
    yPercent: 81.7,
    size: 11,
    tooltipSide: "right",
    pulseSpeed: "fast",
  },
];

const RIGHT_INTERACTIVE_NODES: NodePosition[] = [
  {
    id: "katherine-johnson",
    xPercent: 82.6,
    yPercent: 24.0,
    size: 16,
    tooltipSide: "left",
    pulseSpeed: "slow",
    isPrimary: true,
  },
  {
    id: "kalpana-chawla",
    xPercent: 22.8,
    yPercent: 26.9,
    size: 14,
    tooltipSide: "left",
    pulseSpeed: "medium",
    isPrimary: true,
  },
  {
    id: "radia-perlman",
    xPercent: 38.0,
    yPercent: 49.0,
    size: 12,
    tooltipSide: "left",
    pulseSpeed: "fast",
  },
  {
    id: "fei-fei-li",
    xPercent: 27.2,
    yPercent: 70.2,
    size: 13,
    tooltipSide: "left",
    pulseSpeed: "medium",
  },
];

function InteractiveNode({
  node,
  fact,
  activeId,
  onToggle,
  onClose,
}: {
  node: NodePosition;
  fact?: StemFact;
  activeId: string | null;
  onToggle: (id: string) => void;
  onClose: () => void;
}) {
  const isOpen = activeId === node.id;
  const nodeRef = useRef<HTMLButtonElement>(null);

  if (!fact) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
    >
      <button
        ref={nodeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(node.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-expanded={isOpen}
        aria-describedby={`fact-${node.id}`}
        aria-label={`STEM Pioneer: ${fact.name}`}
        className="group/node relative flex items-center justify-center p-3 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#171044] rounded-full"
      >
        {/* Outer pulsating halo for primary focal nodes */}
        {node.isPrimary && (
          <span
            className={cn(
              "absolute rounded-full pointer-events-none transition-opacity duration-300",
              node.pulseSpeed === "slow" && "animate-halo-ring",
              node.pulseSpeed === "medium" && "animate-halo-ring [animation-delay:1s]",
              node.pulseSpeed === "fast" && "animate-halo-ring [animation-delay:2s]"
            )}
            style={{
              width: node.size * 2.8,
              height: node.size * 2.8,
              background:
                "radial-gradient(circle, rgba(244, 114, 182, 0.45) 0%, rgba(220, 208, 245, 0.15) 60%, transparent 80%)",
            }}
          />
        )}

        {/* Ambient glow backing */}
        <span
          className="absolute rounded-full transition-transform duration-300 group-hover/node:scale-150 group-focus-visible/node:scale-150"
          style={{
            width: node.size * 1.8,
            height: node.size * 1.8,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(220, 208, 245, 0.3) 70%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />

        {/* Core Node Circle */}
        <span
          className={cn(
            "relative rounded-full transition-all duration-300 shadow-md group-hover/node:scale-125 group-focus-visible/node:scale-125",
            isOpen ? "ring-2 ring-white scale-125" : ""
          )}
          style={{
            width: node.size,
            height: node.size,
            backgroundColor: node.isPrimary ? "#FFFFFF" : "#E9D5FF",
            boxShadow: node.isPrimary
              ? "0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(232, 121, 249, 0.7)"
              : "0 0 8px rgba(220, 208, 245, 0.8), 0 0 16px rgba(168, 85, 247, 0.5)",
          }}
        />

        {/* Outer fine ring indicator */}
        <span
          className="absolute rounded-full border border-white/40 transition-all duration-300 group-hover/node:scale-140 group-hover/node:border-white/80 group-focus-visible/node:scale-140"
          style={{
            width: node.size + 10,
            height: node.size + 10,
          }}
        />

        {/* STEM Fact Tooltip */}
        <div
          id={`fact-${node.id}`}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 w-72 sm:w-80 rounded-2xl p-4 text-left shadow-[0_20px_50px_rgba(10,5,25,0.7)] backdrop-blur-xl border border-[#9D6DD8]/40 transition-all duration-300",
            "bg-[#150D2E]/95 text-white",
            // Orientation
            node.tooltipSide === "right" &&
              "left-[calc(100%+12px)] top-1/2 -translate-y-1/2 origin-left",
            node.tooltipSide === "bottom-right" &&
              "left-[calc(100%+12px)] top-0 origin-top-left",
            node.tooltipSide === "left" &&
              "right-[calc(100%+12px)] top-1/2 -translate-y-1/2 origin-right",
            node.tooltipSide === "bottom-left" &&
              "right-[calc(100%+12px)] top-0 origin-top-right",
            // Visibility
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 group-hover/node:opacity-100 group-hover/node:scale-100 group-focus-visible/node:opacity-100 group-focus-visible/node:scale-100"
          )}
        >
          {/* Header row with tag & category */}
          <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F472B6]">
              <Sparkles className="size-3" />
              {fact.tag}
            </span>
            <span className="text-[10px] font-medium text-[#DCD0F5]/70">
              STEM Pioneer
            </span>
          </div>

          {/* Name & Title */}
          <div className="mb-1.5">
            <h4
              className="text-base font-bold text-white tracking-tight leading-tight"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              {fact.name}
            </h4>
            <p className="text-[11px] font-medium text-[#DCD0F5]/85">
              {fact.role}
            </p>
          </div>

          {/* Fact Body */}
          <p className="text-xs leading-relaxed text-white/90 font-normal">
            {fact.fact}
          </p>

          {/* Ambient inner sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        </div>
      </button>
    </div>
  );
}

function LeftNetworkSVG() {
  return (
    <svg
      viewBox="0 0 460 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full select-none"
    >
      <defs>
        {/* Linear & Radial Gradients for Faceted Prism */}
        <linearGradient id="facet-tl" x1="180" y1="140" x2="100" y2="235" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient id="facet-tr" x1="180" y1="140" x2="260" y2="205" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#C084FC" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#9333EA" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="facet-ml" x1="100" y1="235" x2="180" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="facet-mr" x1="180" y1="260" x2="260" y2="205" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="facet-bl" x1="125" y1="345" x2="180" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#581C87" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3B0764" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="facet-br" x1="180" y1="260" x2="180" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B21A8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.5" />
        </linearGradient>

        {/* Glow filter for Traveling Light */}
        <filter id="data-glow-left" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbital Rings */}
      <circle cx="180" cy="260" r="145" stroke="rgba(220, 208, 245, 0.16)" strokeWidth="1" />
      <circle cx="180" cy="260" r="210" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
      <ellipse
        cx="180"
        cy="260"
        rx="195"
        ry="125"
        transform="rotate(-28 180 260)"
        stroke="rgba(220, 208, 245, 0.14)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {/* Outer Constellation Mesh / Delaunay Lines (Image 2 style) */}
      <g stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1">
        {/* Core to peripheral nodes */}
        <line x1="180" y1="140" x2="325" y2="95" />
        <line x1="260" y1="205" x2="395" y2="185" />
        <line x1="260" y1="205" x2="350" y2="310" />
        <line x1="180" y1="260" x2="350" y2="310" />
        <line x1="235" y1="335" x2="350" y2="310" />
        <line x1="235" y1="335" x2="290" y2="425" />
        <line x1="180" y1="380" x2="290" y2="425" />

        {/* Inter-node perimeter connections */}
        <line x1="325" y1="95" x2="395" y2="185" />
        <line x1="395" y1="185" x2="350" y2="310" />
        <line x1="350" y1="310" x2="290" y2="425" />
        <line x1="325" y1="95" x2="260" y2="205" />

        {/* Left-side radiating geometry into the border */}
        <line x1="100" y1="235" x2="45" y2="155" />
        <line x1="180" y1="140" x2="75" y2="75" />
        <line x1="45" y1="155" x2="75" y2="75" />
        <line x1="100" y1="235" x2="50" y2="320" />
        <line x1="125" y1="345" x2="50" y2="320" />
        <line x1="125" y1="345" x2="85" y2="435" />
        <line x1="180" y1="380" x2="85" y2="435" />
        <line x1="50" y1="320" x2="85" y2="435" />
      </g>

      {/* Animated Traveling Light Pulses along network chords */}
      <path
        d="M 180 140 L 325 95 L 395 185 L 350 310"
        fill="none"
        stroke="rgba(255, 255, 255, 0.75)"
        strokeWidth="1.5"
        strokeDasharray="12 160"
        filter="url(#data-glow-left)"
        className="animate-data-stream-1"
      />
      <path
        d="M 260 205 L 350 310 L 290 425"
        fill="none"
        stroke="rgba(244, 114, 182, 0.8)"
        strokeWidth="1.5"
        strokeDasharray="14 180"
        filter="url(#data-glow-left)"
        className="animate-data-stream-2"
      />

      {/* Central 3D Faceted Crystal Prism */}
      <g>
        {/* Facet Polygons */}
        <polygon points="180,140 100,235 180,260" fill="url(#facet-tl)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.1" />
        <polygon points="180,140 180,260 260,205" fill="url(#facet-tr)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" />
        <polygon points="100,235 125,345 180,260" fill="url(#facet-ml)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" />
        <polygon points="180,260 235,335 260,205" fill="url(#facet-mr)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.1" />
        <polygon points="125,345 180,380 180,260" fill="url(#facet-bl)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
        <polygon points="180,260 180,380 235,335" fill="url(#facet-br)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" />

        {/* Specular Glints on Prism Vertices */}
        <circle cx="180" cy="140" r="3.5" fill="#FFFFFF" />
        <circle cx="180" cy="140" r="7" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        <circle cx="260" cy="205" r="3" fill="#FFFFFF" />
        <circle cx="180" cy="260" r="3" fill="#FFFFFF" />
        <circle cx="100" cy="235" r="2.5" fill="#E9D5FF" />
        <circle cx="235" cy="335" r="2.5" fill="#E9D5FF" />
        <circle cx="180" cy="380" r="2.5" fill="#E9D5FF" />
      </g>

      {/* Decorative Non-interactive Points (Image 2 aesthetic) */}
      <circle cx="75" cy="75" r="2.5" fill="#DCD0F5" opacity="0.6" />
      <circle cx="45" cy="155" r="2.5" fill="#DCD0F5" opacity="0.6" />
      <circle cx="50" cy="320" r="2.5" fill="#DCD0F5" opacity="0.6" />
      <circle cx="85" cy="435" r="3" fill="#DCD0F5" opacity="0.7" />
      <circle cx="210" cy="65" r="2" fill="#FFFFFF" opacity="0.5" />
      <circle cx="150" cy="470" r="2.5" fill="#DCD0F5" opacity="0.5" />
    </svg>
  );
}

function RightNetworkSVG() {
  return (
    <svg
      viewBox="0 0 460 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full select-none"
    >
      <defs>
        <filter id="data-glow-right" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbital Concentric and Tilted Rings */}
      <circle cx="270" cy="255" r="160" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1" />
      <circle cx="270" cy="255" r="110" stroke="rgba(220, 208, 245, 0.12)" strokeWidth="1" strokeDasharray="4 5" />
      <ellipse
        cx="270"
        cy="255"
        rx="205"
        ry="135"
        transform="rotate(32 270 255)"
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="1"
      />
      <circle cx="270" cy="255" r="230" stroke="rgba(220, 208, 245, 0.06)" strokeWidth="1" />

      {/* Organic Polygonal Network Lines (Image 2 Delaunay Mesh) */}
      <g stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1">
        {/* Upper triangulation */}
        <line x1="105" y1="140" x2="240" y2="85" />
        <line x1="240" y1="85" x2="380" y2="125" />
        <line x1="380" y1="125" x2="425" y2="235" />
        <line x1="240" y1="85" x2="300" y2="215" />
        <line x1="380" y1="125" x2="300" y2="215" />

        {/* Central web */}
        <line x1="105" y1="140" x2="175" y2="255" />
        <line x1="105" y1="140" x2="50" y2="215" />
        <line x1="50" y1="215" x2="125" y2="365" />
        <line x1="175" y1="255" x2="300" y2="215" />
        <line x1="300" y1="215" x2="425" y2="235" />

        {/* Lower triangulation */}
        <line x1="175" y1="255" x2="125" y2="365" />
        <line x1="175" y1="255" x2="245" y2="385" />
        <line x1="300" y1="215" x2="375" y2="350" />
        <line x1="425" y1="235" x2="375" y2="350" />
        <line x1="125" y1="365" x2="245" y2="385" />
        <line x1="245" y1="385" x2="375" y2="350" />
        <line x1="240" y1="85" x2="175" y2="255" />
      </g>

      {/* Animated Traveling Light Pulses along network chords */}
      <path
        d="M 105 140 L 240 85 L 380 125 L 425 235"
        fill="none"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1.5"
        strokeDasharray="14 180"
        filter="url(#data-glow-right)"
        className="animate-data-stream-3"
      />
      <path
        d="M 175 255 L 245 385 L 375 350"
        fill="none"
        stroke="rgba(232, 121, 249, 0.85)"
        strokeWidth="1.5"
        strokeDasharray="12 160"
        filter="url(#data-glow-right)"
        className="animate-data-stream-1"
      />

      {/* Non-interactive Focal Nodes with soft halos (Image 1 style) */}
      <g>
        {/* Node at (240, 85) */}
        <circle cx="240" cy="85" r="4.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="240" cy="85" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* Node at (300, 215) */}
        <circle cx="300" cy="215" r="4" fill="#E9D5FF" opacity="0.75" />

        {/* Node at (425, 235) */}
        <circle cx="425" cy="235" r="6" fill="#F472B6" opacity="0.8" />
        <circle cx="425" cy="235" r="11" stroke="rgba(244,114,182,0.35)" strokeWidth="1" />

        {/* Node at (245, 385) */}
        <circle cx="245" cy="385" r="4.5" fill="#DCD0F5" opacity="0.7" />

        {/* Node at (375, 350) */}
        <circle cx="375" cy="350" r="5" fill="#E9D5FF" opacity="0.8" />
        <circle cx="375" cy="350" r="10" stroke="rgba(220,208,245,0.3)" strokeWidth="1" />

        {/* Peripheral subtle dots */}
        <circle cx="50" cy="215" r="2.5" fill="#FFFFFF" opacity="0.5" />
        <circle cx="310" cy="45" r="2" fill="#DCD0F5" opacity="0.4" />
        <circle cx="445" cy="170" r="2.5" fill="#FFFFFF" opacity="0.4" />
      </g>
    </svg>
  );
}

export function HeroConstellation() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Close tooltip on global click outside or Esc key
  useEffect(() => {
    const handleGlobalClick = () => setActiveId(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      {/* ── Left Structure: Faceted Prism & Constellation Network ── */}
      <div className="hero-float pointer-events-auto absolute top-[10%] -left-24 sm:-left-16 md:-left-8 lg:left-[-6%] xl:left-[-3%] 2xl:left-[-1%] z-20 h-[480px] w-[380px] sm:h-[520px] sm:w-[420px] lg:h-[580px] lg:w-[460px] opacity-75 sm:opacity-90 lg:opacity-100 transition-opacity duration-300">
        <LeftNetworkSVG />
        {LEFT_INTERACTIVE_NODES.map((node) => {
          const fact = stemFacts.find((f) => f.id === node.id);
          return (
            <InteractiveNode
              key={node.id}
              node={node}
              fact={fact}
              activeId={activeId}
              onToggle={handleToggle}
              onClose={() => setActiveId(null)}
            />
          );
        })}
      </div>

      {/* ── Right Structure: Orbital Rings & Polygonal Data Mesh ── */}
      <div className="hero-float-delayed pointer-events-auto absolute top-[12%] -right-24 sm:-right-16 md:-right-8 lg:right-[-6%] xl:right-[-3%] 2xl:right-[-1%] z-20 h-[480px] w-[380px] sm:h-[520px] sm:w-[420px] lg:h-[580px] lg:w-[460px] opacity-75 sm:opacity-90 lg:opacity-100 transition-opacity duration-300">
        <RightNetworkSVG />
        {RIGHT_INTERACTIVE_NODES.map((node) => {
          const fact = stemFacts.find((f) => f.id === node.id);
          return (
            <InteractiveNode
              key={node.id}
              node={node}
              fact={fact}
              activeId={activeId}
              onToggle={handleToggle}
              onClose={() => setActiveId(null)}
            />
          );
        })}
      </div>
    </div>
  );
}
