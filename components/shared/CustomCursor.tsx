"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useMotionPreference } from "@/lib/motion";

export function CustomCursor() {
  const { shouldAnimate } = useMotionPreference();
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "drag" | "view" | "hidden">("default");
  const [badgeText, setBadgeText] = useState("");

  const mouseX = useSpring(0, { stiffness: 450, damping: 32 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 32 });
  const dotX = useSpring(0, { stiffness: 900, damping: 45 });
  const dotY = useSpring(0, { stiffness: 900, damping: 45 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine || !shouldAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Don't interfere with form inputs
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        setCursorType("hidden");
        return;
      }

      // Check for contextual cursor hints
      const dragEl = target.closest("[data-cursor='drag']");
      if (dragEl) {
        setCursorType("drag");
        setBadgeText("Drag");
        return;
      }

      const viewEl = target.closest("[data-cursor='view']");
      if (viewEl) {
        setCursorType("view");
        setBadgeText("View");
        return;
      }

      // Check standard interactive elements
      const interactive = target.closest("a, button, [role='button'], .cursor-pointer");
      if (interactive) {
        setCursorType("hover");
        setBadgeText("");
        return;
      }

      setCursorType("default");
      setBadgeText("");
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, dotX, dotY, shouldAnimate, visible]);

  if (!shouldAnimate || !visible || cursorType === "hidden") {
    return null;
  }

  const isBadge = cursorType === "drag" || cursorType === "view";
  const ringSize = isBadge ? 54 : cursorType === "hover" ? 44 : 26;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden"
    >
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: isBadge
            ? "rgba(245, 215, 110, 0.85)"
            : cursorType === "hover"
            ? "rgba(167, 139, 218, 0.85)"
            : "rgba(101, 56, 165, 0.4)",
          backgroundColor: isBadge
            ? "rgba(30, 16, 51, 0.85)"
            : cursorType === "hover"
            ? "rgba(167, 139, 218, 0.12)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed rounded-full border border-solid flex items-center justify-center backdrop-blur-[1px]"
      >
        <AnimatePresence>
          {isBadge && (
            <motion.span
              key={badgeText}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[10px] font-mono uppercase tracking-wider text-[#F5D76E] font-medium select-none"
            >
              {badgeText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Dot (hidden when badge is shown) */}
      {!isBadge && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed size-1.5 rounded-full bg-[#6538A5] dark:bg-[#F5D76E]"
        />
      )}
    </div>
  );
}
