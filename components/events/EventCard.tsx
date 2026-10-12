"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "@/content/types";
import { formatDateShort } from "@/lib/utils";
import { cn } from "cn";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const categoryStyles: Record<
  Event["category"],
  { label: string; badgeClass: string }
> = {
  hackathon: {
    label: "Hackathon",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  talk: {
    label: "Talk & Panel",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  workshop: {
    label: "Workshop",
    badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  networking: {
    label: "Networking",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  competition: {
    label: "Competition",
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  outreach: {
    label: "Outreach",
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const categoryInfo = categoryStyles[event.category] || {
    label: event.category,
    badgeClass: "bg-muted text-muted-foreground border-border",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          "group h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all duration-300",
          featured && "md:grid md:grid-cols-2 md:gap-6"
        )}
      >
        {/* Cover Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            featured ? "aspect-[16/9] md:h-full md:aspect-auto" : "aspect-[16/9]"
          )}
        >
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-md",
                categoryInfo.badgeClass
              )}
            >
              {categoryInfo.label}
            </span>
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Meta info: Date & Location */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" />
                {formatDateShort(event.date)}
              </span>
              <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                <MapPin className="size-3.5 text-muted-foreground" />
                {event.location.split(",")[0]}
              </span>
            </div>

            <h3
              className={cn(
                "font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-3",
                featured ? "text-2xl md:text-3xl" : "text-lg sm:text-xl"
              )}
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              {event.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
              {event.shortDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
            <span className="text-xs font-medium text-foreground group-hover:text-primary flex items-center gap-1 transition-colors duration-200">
              View Event Details
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>

            {event.speakers.length > 0 && (
              <span className="text-xs text-muted-foreground font-mono">
                {event.speakers.length} {event.speakers.length === 1 ? "speaker" : "speakers"}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
