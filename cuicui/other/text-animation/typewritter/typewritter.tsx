"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useReducedMotion } from "framer-motion";

export interface TypewriterProps {
  /** Array of strings to cycle through */
  text: string[];
  /** Typing speed in ms per character (default: 70) */
  speed?: number;
  /** Deletion speed in ms per character (default: 40) */
  deleteSpeed?: number;
  /** Wait time in ms once a phrase is fully typed before deleting (default: 1500) */
  waitTime?: number;
  /** Cursor character or element (default: "_") */
  cursorChar?: string | React.ReactNode;
  /** Additional class for cursor */
  cursorClassName?: string;
  /** Additional class for the animated text */
  className?: string;
  /** Whether to continuously loop through phrases (default: true) */
  loop?: boolean;
}

export default function Typewriter({
  text,
  speed = 70,
  deleteSpeed = 40,
  waitTime = 1500,
  cursorChar = "_",
  cursorClassName = "",
  className = "",
  loop = true,
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, startTransition] = useTransition();

  // If user prefers reduced motion, simply cycle full words slowly without typing animation
  useEffect(() => {
    if (!text || text.length === 0) return;

    if (prefersReducedMotion) {
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % text.length);
      }, waitTime + 1000);
      return () => clearInterval(interval);
    }

    const currentWord = text[wordIndex] || "";

    if (!isDeleting && subIndex === currentWord.length) {
      // Completed typing full word, pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, waitTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      // Completed deleting word, advance to next word
      setIsDeleting(false);
      startTransition(() => {
        setWordIndex((prev) => {
          if (!loop && prev + 1 >= text.length) return prev;
          return (prev + 1) % text.length;
        });
      });
      return;
    }

    const delay = isDeleting ? deleteSpeed : speed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    subIndex,
    isDeleting,
    wordIndex,
    text,
    speed,
    deleteSpeed,
    waitTime,
    loop,
    prefersReducedMotion,
  ]);

  if (!text || text.length === 0) return null;

  const currentWord = text[wordIndex] || "";
  const displayedText = prefersReducedMotion
    ? currentWord
    : currentWord.substring(0, subIndex);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{displayedText}</span>
      <span
        aria-hidden="true"
        className={`inline-block animate-pulse font-mono font-normal ml-0.5 select-none ${cursorClassName}`}
      >
        {cursorChar}
      </span>
    </span>
  );
}
