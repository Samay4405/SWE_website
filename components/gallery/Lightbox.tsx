"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/content/types";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 text-white/90">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">
              {currentItem.category}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close lightbox"
            className="text-white hover:bg-white/20 rounded-full h-9 w-9"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Prev / Next navigation buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 cursor-pointer"
        >
          <ChevronLeft className="size-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 cursor-pointer"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Central Display */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <Image
              src={currentItem.image}
              alt={currentItem.caption}
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Caption */}
          <p className="mt-4 text-center text-sm sm:text-base text-white/80 max-w-2xl px-4">
            {currentItem.caption}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
