"use client";

import { motion } from "framer-motion";
import { cn } from "cn";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterPillsProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterPills({
  options,
  activeValue,
  onChange,
  className,
}: FilterPillsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none",
        className
      )}
      role="tablist"
      aria-label="Filter events by category"
    >
      {options.map((option) => {
        const isActive = activeValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none",
              isActive
                ? "text-primary-foreground border-primary bg-primary shadow-sm"
                : "text-muted-foreground border-border bg-card hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{option.label}</span>
            {typeof option.count === "number" && (
              <span
                className={cn(
                  "ml-2 text-xs font-mono px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
