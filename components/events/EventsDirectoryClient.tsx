"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, FilterX } from "lucide-react";
import { FilterPills, type FilterOption } from "@/components/shared/FilterPills";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Event } from "@/content/types";

interface EventsDirectoryClientProps {
  initialEvents: Event[];
}

const categoryTabs: { label: string; value: string }[] = [
  { label: "All Events", value: "all" },
  { label: "Hackathons", value: "hackathon" },
  { label: "Workshops", value: "workshop" },
  { label: "Talks & Panels", value: "talk" },
  { label: "Networking", value: "networking" },
  { label: "Competitions", value: "competition" },
  { label: "Outreach", value: "outreach" },
];

export function EventsDirectoryClient({
  initialEvents,
}: EventsDirectoryClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute category counts
  const filterOptions: FilterOption[] = useMemo(() => {
    return categoryTabs.map((tab) => {
      const count =
        tab.value === "all"
          ? initialEvents.length
          : initialEvents.filter((e) => e.category === tab.value).length;
      return {
        label: tab.label,
        value: tab.value,
        count,
      };
    });
  }, [initialEvents]);

  // Filter events by category and search
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchesCategory =
        activeCategory === "all" || event.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialEvents, activeCategory, searchQuery]);

  const handleReset = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="section-container py-12 md:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-mono font-medium text-muted-foreground mb-4">
          <span>CHAPTER ACTIVITIES</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Events &amp; Workshops
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          From hands-on technical bootcamps to national hackathons and mentorship mixers. 
          Discover opportunities to learn, build, and connect with SWE MIT-WPU.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
        {/* Category Pills */}
        <FilterPills
          options={filterOptions}
          activeValue={activeCategory}
          onChange={setActiveCategory}
          className="flex-1"
        />

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search events or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-card text-sm"
          />
        </div>
      </div>

      {/* Events Results Count */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs font-mono text-muted-foreground">
          Showing {filteredEvents.length} of {initialEvents.length} total events
        </p>
        {(activeCategory !== "all" || searchQuery !== "") && (
          <button
            onClick={handleReset}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Events Grid with Framer Motion Layout Reflow */}
      {filteredEvents.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
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
            No events found
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            We couldn&apos;t find any events matching your selected category or search query.
          </p>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
