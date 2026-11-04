"use client";

import { AccessibleGallery } from "@/components/gallery/AccessibleGallery";
import type { GalleryMasonryItem } from "@/content/gallery";

interface GalleryClientProps {
  initialItems: GalleryMasonryItem[];
}

export function GalleryClient({ initialItems }: GalleryClientProps) {
  return (
    <div className="section-container py-12 md:py-16">
      <div className="max-w-3xl mb-10 sm:mb-14 text-left">
        <div className="flex items-center gap-2 mb-3">
          <span className="section-eyebrow">Visual Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033] mb-4">
          Life at <span className="font-accent">SWE MIT-WPU</span>
        </h1>
        <p className="text-base sm:text-lg text-[#6B6385] font-light leading-relaxed">
          A visual record of collegiate workshops, hackathons, outreach campaigns, and community milestones in Pune.
        </p>
      </div>

      <AccessibleGallery items={initialItems} />
    </div>
  );
}

export default GalleryClient;
