"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-swe-purple/50 cursor-pointer group ${
        isDark
          ? "bg-[#1E182A] text-[#F5D76E] border border-[#3D3552] hover:border-[#F5D76E]/50 hover:shadow-[0_0_15px_rgba(245,215,110,0.25)]"
          : "bg-white/90 text-[#6538A5] border border-[#E9E3FB] hover:border-[#6538A5]/40 hover:shadow-[0_0_15px_rgba(101,56,165,0.15)]"
      } ${className}`}
      title={isDark ? "Ink Bleed: Switch to Light Mode" : "Ink Bleed: Switch to Dark Mode"}
    >
      <div className="relative size-4 sm:size-4.5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="size-4 sm:size-4.5 text-[#F5D76E] stroke-[2.2]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="size-4 sm:size-4.5 text-[#6538A5] stroke-[2.2]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}

