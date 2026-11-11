"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function BrandedIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    try {
      const hasShown = sessionStorage.getItem("swe-intro-shown");
      if (!hasShown) {
        setShow(true);
        sessionStorage.setItem("swe-intro-shown", "true");
        const timer = setTimeout(() => {
          setShow(false);
        }, 1100);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore in private modes
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#FCFBFE] dark:bg-[#0F0D15] cursor-pointer select-none"
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="relative size-16 mb-4 flex items-center justify-center">
              <Image
                src="/images/hero/swe-logo.png"
                alt="SWE Logo"
                width={80}
                height={40}
                className="w-auto h-10 object-contain brightness-0 dark:filter-none"
                priority
              />
            </div>
            <motion.h2
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#6538A5] dark:text-[#F5D76E] font-semibold"
            >
              Society of Women Engineers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="text-[11px] font-sans tracking-widest text-[#6B6385] dark:text-[#C1B9D8] uppercase mt-1"
            >
              MIT-WPU Student Chapter
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
