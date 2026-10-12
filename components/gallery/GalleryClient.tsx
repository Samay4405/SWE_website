"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Maximize2, Sparkles, FilterX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterPills, type FilterOption } from "@/components/shared/FilterPills";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { GalleryItem } from "@/content/types";
import { Button } from "@/components/ui/button";

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

const galleryCategories: { label: string; value: string }[] = [
  { label: "All Photos", value: "all" },
  { label: "Hackathons & Events", value: "events" },
  { label: "Workshops", value: "workshops" },
  { label: "Team & Leadership", value: "team" },
  { label: "Community Outreach", value: "outreach" },
];

export function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Compute category options with counts
  const filterOptions: FilterOption[] = useMemo(() => {
    return galleryCategories.map((cat) => {
      const count =
        cat.value === "all"
          ? initialItems.length
          : initialItems.filter((item) => item.category === cat.value).length;
      return {
        label: cat.label,
        value: cat.value,
        count,
      };
    });
  }, [initialItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [initialItems, activeCategory]);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="section-container py-12 md:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
          <span>CHAPTER MOMENTS</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Life at SWE MIT-WPU
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Glimpses into our late-night hackathons, technical code labs, campus symposiums, 
          and community outreach drives across Pune.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
        <FilterPills
          options={filterOptions}
          activeValue={activeCategory}
          onChange={setActiveCategory}
        />
        <span className="hidden sm:inline text-xs font-mono text-muted-foreground">
          {filteredItems.length} photos
        </span>
      </div>

      {/* Masonry Layout Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid group relative rounded-xl border border-border bg-card overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-300"
                onClick={() => handleOpenLightbox(index)}
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Expand icon on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md">
                      <Maximize2 className="size-5" />
                    </div>
                  </div>
                </div>

                {/* Caption text */}
                <div className="p-4 bg-card">
                  <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-xl border border-dashed border-border bg-card/50 max-w-md mx-auto p-8">
          <div className="inline-flex p-3 rounded-full bg-muted mb-4 text-muted-foreground">
            <FilterX className="size-6" />
          </div>
          <h3
            className="text-lg font-bold text-foreground mb-2"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            No photos found
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            No media matching this specific category right now.
          </p>
          <Button variant="outline" size="sm" onClick={() => setActiveCategory("all")}>
            Show all photos
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={activeImageIndex}
        items={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setActiveImageIndex}
      />
    </div>
  );
}
