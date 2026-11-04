"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryMasonryItem } from "@/components/sections/GallerySection";
import { EASE_EDITORIAL } from "@/lib/animations";

interface AccessibleGalleryProps {
  items: GalleryMasonryItem[];
  limit?: number;
}

export function AccessibleGallery({ items, limit }: AccessibleGalleryProps) {
  const displayItems = limit ? items.slice(0, limit) : items;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = selectedIndex !== null;
  const currentItem = selectedIndex !== null ? displayItems[selectedIndex] : null;

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    // Return focus to triggering button
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % displayItems.length : null
    );
  }, [displayItems.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + displayItems.length) % displayItems.length
        : null
    );
  }, [displayItems.length]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "Tab") {
        // Simple focus trap between close, prev, and next
        const modal = document.getElementById("gallery-lightbox-modal");
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Prevent background scrolling while open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox, showNext, showPrev]);

  return (
    <>
      {/* ── Masonry Grid Layout ── */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className="break-inside-avoid overflow-hidden rounded-2xl border border-[#E9E3FB] bg-white/80 shadow-xs hover:shadow-md hover:border-[#6538A5]/40 transition-all duration-300 group"
          >
            <button
              type="button"
              onClick={(e) => openLightbox(index, e.currentTarget)}
              aria-label={`View enlarged photo: ${item.title}`}
              className="relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2 rounded-2xl overflow-hidden"
            >
              <div
                className="relative w-full overflow-hidden bg-[#F2EFF7]"
                style={{
                  aspectRatio: `${item.width} / ${item.height}`,
                }}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading={index < 8 ? "eager" : "lazy"}
                />

                {/* Hover overlay hint */}
                <div
                  className="absolute inset-0 bg-[#1E1033]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-xs font-medium text-[#1E1033] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="size-3.5 text-[#6538A5]" />
                    <span>View</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3 bg-white/90 backdrop-blur-xs border-t border-[#F0ECF6]">
                <p className="text-xs font-medium text-[#1E1033] truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#6B6385] truncate font-light mt-0.5">
                  {item.alt}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* ── Accessible Lightbox Modal ── */}
      <AnimatePresence>
        {isOpen && currentItem && (
          <motion.div
            id="gallery-lightbox-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${currentItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-60 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs sm:text-sm font-mono tracking-wider opacity-80">
                {selectedIndex + 1} / {displayItems.length}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close photo viewer (Escape)"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Left / Right Navigation Buttons (WCAG 44x44px target) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo (Left Arrow)"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 z-60 outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo (Right Arrow)"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 z-60 outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Center Enlarged Image Frame */}
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={currentItem.img}
                  alt={currentItem.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Bottom Caption Pill */}
              <div className="mt-3 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm text-center text-white max-w-xl">
                <p className="text-sm font-semibold">{currentItem.title}</p>
                <p className="text-xs text-white/75 font-light mt-0.5">
                  {currentItem.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AccessibleGallery;

