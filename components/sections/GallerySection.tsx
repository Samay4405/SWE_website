"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/content/gallery";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/button";

export function GallerySection() {
  const featuredItems = galleryItems.slice(0, 6);

  return (
    <section id="gallery" className="section-padding bg-white border-b border-border/60">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <ScrollReveal className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#7254A8]">
                PHOTO GALLERY
              </span>
              <span className="h-[1.5px] w-7 bg-[#C4B5E6]" />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#24164F]"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Moments from the Community
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5E5B70] leading-relaxed">
              Snapshots of collegiate hackathons, code bootcamps, executive keynotes, and STEM outreach drives.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="shrink-0">
            <Link href="/gallery">
              <Button variant="outline" className="gap-2 border-[#D5CBEA] text-[#24164F] hover:bg-[#EDE6FA]/50">
                Explore Full Gallery ({galleryItems.length})
                <ArrowRight className="size-4 text-[#7254A8]" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              delay={idx * 0.08}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-[#E5E2EC] aspect-[4/3] shadow-xs"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171044]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F472B6] mb-1">
                  {item.category}
                </span>
                <p className="text-xs text-white leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
