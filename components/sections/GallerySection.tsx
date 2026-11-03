"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";
import Masonry from "@/components/Masonry";

export interface GalleryMasonryItem {
  id: string;
  img: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  description?: string;
  url?: string;
}

export const galleryMasonryItems: GalleryMasonryItem[] = [
  {
    id: "20250919_171313",
    img: "/images/gallery/community/20250919_171313.jpg",
    width: 4000,
    height: 2252,
    title: "SWE Community Moment 01",
    alt: "SWE MIT-WPU community photo, September 2025, moment 1",
  },
  {
    id: "20250919_172551",
    img: "/images/gallery/community/20250919_172551.jpg",
    width: 2252,
    height: 4000,
    title: "SWE Community Moment 02",
    alt: "SWE MIT-WPU community photo, September 2025, moment 2",
  },
  {
    id: "20250919_172605",
    img: "/images/gallery/community/20250919_172605.jpg",
    width: 2252,
    height: 4000,
    title: "SWE Community Moment 03",
    alt: "SWE MIT-WPU community photo, September 2025, moment 3",
  },
  {
    id: "20250919_172728",
    img: "/images/gallery/community/20250919_172728.jpg",
    width: 4000,
    height: 2252,
    title: "SWE Community Moment 04",
    alt: "SWE MIT-WPU community photo, September 2025, moment 4",
  },
  {
    id: "20260117_115651",
    img: "/images/gallery/community/20260117_115651.jpg",
    width: 3000,
    height: 4000,
    title: "SWE Community Moment 05",
    alt: "SWE MIT-WPU community photo, January 2026, moment 1",
  },
  {
    id: "20260929_163749",
    img: "/images/gallery/community/20260929_163749.jpg",
    width: 4080,
    height: 3060,
    title: "SWE Community Moment 06",
    alt: "SWE MIT-WPU community photo, September 2026, moment 1",
  },
  {
    id: "GMC17012026_091857",
    img: "/images/gallery/community/GMC17012026_091857.jpg",
    width: 4080,
    height: 3060,
    title: "SWE Community Moment 08",
    alt: "SWE MIT-WPU community photo, January 2026, moment 2",
  },
  {
    id: "IMG-20250801-WA0006",
    img: "/images/gallery/community/IMG-20250801-WA0006.jpg",
    width: 1233,
    height: 1280,
    title: "SWE Community Moment 09",
    alt: "SWE MIT-WPU community photo, August 2025, moment 1",
  },
  {
    id: "IMG-20250801-WA0017",
    img: "/images/gallery/community/IMG-20250801-WA0017.jpg",
    width: 1600,
    height: 1200,
    title: "SWE Community Moment 10",
    alt: "SWE MIT-WPU community photo, August 2025, moment 2",
  },
  {
    id: "IMG-20250801-WA0089",
    img: "/images/gallery/community/IMG-20250801-WA0089.jpg",
    width: 3120,
    height: 4160,
    title: "SWE Community Moment 11",
    alt: "SWE MIT-WPU community photo, August 2025, moment 3",
  },
  {
    id: "IMG-20250807-WA0003",
    img: "/images/gallery/community/IMG-20250807-WA0003.jpg",
    width: 4160,
    height: 3120,
    title: "SWE Community Moment 12",
    alt: "SWE MIT-WPU community photo, August 2025, moment 4",
  },
  {
    id: "IMG_20260117_120339210_HDR_AE",
    img: "/images/gallery/community/IMG_20260117_120339210_HDR_AE.jpg",
    width: 2304,
    height: 4096,
    title: "SWE Community Moment 13",
    alt: "SWE MIT-WPU community photo, January 2026, moment 3",
  },
  {
    id: "IMG_2388",
    img: "/images/gallery/community/IMG_2388.JPG",
    width: 3666,
    height: 2062,
    title: "SWE Community Moment 14",
    alt: "SWE MIT-WPU community photo, moment 14",
  },
  {
    id: "IMG_2402",
    img: "/images/gallery/community/IMG_2402.jpg",
    width: 4032,
    height: 2268,
    title: "SWE Community Moment 15",
    alt: "SWE MIT-WPU community photo, moment 15",
  },
  {
    id: "IMG_4483",
    img: "/images/gallery/community/IMG_4483.jpg",
    width: 3024,
    height: 4032,
    title: "SWE Community Moment 16",
    alt: "SWE MIT-WPU community photo, moment 16",
  },
  {
    id: "IMG_4725",
    img: "/images/gallery/community/IMG_4725.jpg",
    width: 4284,
    height: 5712,
    title: "SWE Community Moment 17",
    alt: "SWE MIT-WPU community photo, moment 17",
  },
  {
    id: "IMG_9922",
    img: "/images/gallery/community/IMG_9922.jpg",
    width: 5712,
    height: 3213,
    title: "SWE Community Moment 18",
    alt: "SWE MIT-WPU community photo, moment 18",
  },
  {
    id: "IMG_9929",
    img: "/images/gallery/community/IMG_9929.jpg",
    width: 4032,
    height: 3024,
    title: "SWE Community Moment 19",
    alt: "SWE MIT-WPU community photo, moment 19",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding mt-8 sm:mt-10 bg-transparent border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <ScrollReveal className="max-w-2xl text-left">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-left font-semibold tracking-tight text-[#1e1033] lg:whitespace-nowrap"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Moments in{" "}
              <span className="font-accent text-[#6d28d9]">
                Motion
              </span>
            </h2>
            <p className="mt-4 text-left text-[1.05rem] text-[#6b6385] font-light leading-[1.75]">
              A collection of moments, memories and milestones that bring our
              SWE journey to life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="shrink-0">
            <Link href="/gallery">
              <Button variant="outline" className="gap-2 border-[#e9e3fb] text-[#1e1033] hover:bg-[#f3edff]">
                Explore Full Archive ({galleryMasonryItems.length})
                <ArrowRight className="size-4 text-[#6d28d9]" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* ── React Bits Masonry Grid ── */}
        <div className="w-full relative min-h-[400px]">
          <Masonry
            items={galleryMasonryItems}
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
    </section>
  );
}

export default GallerySection;
