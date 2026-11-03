"use client";

import Masonry from "@/components/Masonry";
import type { GalleryMasonryItem } from "@/content/gallery";

interface GalleryClientProps {
  initialItems: GalleryMasonryItem[];
}

export function GalleryClient({ initialItems }: GalleryClientProps) {
  return (
    <div className="section-container py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Life at SWE MIT-WPU
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          A collection of moments, memories and milestones from our SWE journey.
        </p>
      </div>

      <div className="w-full relative min-h-[400px]">
        <Masonry
          items={initialItems}
          columnWidth={240}
          gap={12}
          radius={12}
          animateFrom="bottom"
          hoverEffect="zoom"
          captions="hover"
          lightbox
          draggable
          columns="auto"
          stagger={0.05}
          duration={0.6}
          bounce={0.15}
          blurToFocus
          focusOnHover={false}
          parallax={0}
          revealOnScroll
        />
      </div>
    </div>
  );
}
