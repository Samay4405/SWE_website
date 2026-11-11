"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionPreference, EASING } from "@/lib/motion";

const WORDS = [
  "collaborate",
  "network",
  "learn",
  "grow",
  "lead",
  "innovate",
  "inspire",
];

export function HeroTypewriter() {
  const { shouldAnimate } = useMotionPreference();
  const [index, setIndex] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      if (isMounted.current) {
        setIndex((prev) => (prev + 1) % WORDS.length);
      }
    }, 2400);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [shouldAnimate]);

  const currentWord = WORDS[index];

  return (
    <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#6B6385] dark:text-[#C1B9D8] font-light max-w-2xl mx-auto leading-relaxed">
      {/* Screen-reader full static text for zero-stutter comprehension */}
      <span className="sr-only">
        Empowering collegiate women in STEM to collaborate, network, learn, grow, lead, innovate, and inspire.
      </span>

      {/* Visual rotating words with reserved fixed bounds preventing CLS */}
      <span aria-hidden="true" className="inline-flex items-baseline justify-center">
        <span>Empowering collegiate women in STEM to&nbsp;</span>
        <span
          className="relative inline-block w-[6.8rem] sm:w-[8rem] md:w-[9rem] text-left font-serif italic font-normal text-[#6538A5] dark:text-[#A78BDA]"
          style={{ perspective: 600 }}
        >
          {shouldAnimate ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentWord}
                initial={{ y: 16, opacity: 0, rotateX: -45, filter: "blur(3px)" }}
                animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                exit={{ y: -16, opacity: 0, rotateX: 45, filter: "blur(3px)" }}
                transition={{
                  duration: 0.45,
                  ease: EASING.emphasisedOut,
                }}
                className="inline-block"
              >
                {currentWord}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="inline-block">{currentWord}</span>
          )}
        </span>
      </span>
    </p>
  );
}
