"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

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
  const prefersReducedMotion = useReducedMotion();
  const [currentText, setCurrentText] = useState("lead");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (prefersReducedMotion) {
      setCurrentText("lead");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    let wordIdx = 0;
    let deleting = false;

    function step() {
      if (!isMounted.current) return;
      const targetWord = WORDS[wordIdx];

      if (!deleting) {
        charIndex++;
        setCurrentText(targetWord.slice(0, charIndex));

        if (charIndex === targetWord.length) {
          deleting = true;
          timer = setTimeout(step, 1800);
          return;
        }
        timer = setTimeout(step, 75);
      } else {
        charIndex--;
        setCurrentText(targetWord.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % WORDS.length;
          setWordIndex(wordIdx);
          timer = setTimeout(step, 350);
          return;
        }
        timer = setTimeout(step, 45);
      }
    }

    timer = setTimeout(step, 800);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#6B6385] font-light max-w-2xl mx-auto leading-relaxed">
      {/* Screen-reader full static text for zero-stutter comprehension */}
      <span className="sr-only">
        Empowering collegiate women in STEM to collaborate, network, learn, grow, lead, innovate, and inspire.
      </span>

      {/* Visual typewriter with stable layout bounds preventing CLS */}
      <span aria-hidden="true" className="inline-flex items-baseline justify-center">
        <span>Empowering collegiate women in STEM to&nbsp;</span>
        <span className="relative inline-block w-[6.8rem] sm:w-[8rem] md:w-[9rem] text-left font-serif italic font-normal text-[#6538A5]">
          <span>{currentText}</span>
          {!prefersReducedMotion && (
            <span
              className="inline-block w-[1.5px] h-[1.1em] ml-0.5 align-middle bg-[#6538A5] animate-pulse"
              style={{ animationDuration: "1s" }}
            />
          )}
        </span>
      </span>
    </p>
  );
}
