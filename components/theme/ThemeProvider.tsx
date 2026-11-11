"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { PaintSplashWave, PaintSplashTriggerOptions } from "./PaintSplashWave";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: (event?: React.MouseEvent | { clientX: number; clientY: number }) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const waveTriggerRef = useRef<((options: PaintSplashTriggerOptions) => void) | null>(null);

  // Sync state on client mount
  useEffect(() => {
    setMounted(true);
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setTheme(isCurrentlyDark ? "dark" : "light");
  }, []);

  const registerWaveTrigger = useCallback(
    (fn: (options: PaintSplashTriggerOptions) => void) => {
      waveTriggerRef.current = fn;
    },
    []
  );

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | { clientX: number; clientY: number }) => {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";

      // Calculate origin coordinates for the paint wave
      let x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
      let y = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

      if (event && "clientX" in event && typeof event.clientX === "number") {
        x = event.clientX;
        y = event.clientY;
      }

      const applyThemeToDOM = () => {
        setTheme(nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("swe-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("swe-theme", "light");
        }
      };

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Check for native View Transitions support (Chrome 111+, Edge 111+, Safari 18+)
      const hasViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        !prefersReducedMotion;

      if (hasViewTransition) {
        // Trigger the luminous paint splash wave along the boundary
        if (waveTriggerRef.current) {
          waveTriggerRef.current({ x, y, duration: 720 });
        }

        const maxDist = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        // Native View Transition: Takes a live snapshot of old theme and blooms new theme over it
        // CONTENT IS NEVER ERASED!
        const transition = (document as any).startViewTransition(() => {
          applyThemeToDOM();
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxDist * 1.05}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 720,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        // Fallback for older browsers
        if (!prefersReducedMotion && waveTriggerRef.current) {
          waveTriggerRef.current({ x, y, duration: 600 });
        }
        applyThemeToDOM();
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: mounted ? theme === "dark" : false,
        toggleTheme,
      }}
    >
      {children}
      <PaintSplashWave registerTrigger={registerWaveTrigger} />
    </ThemeContext.Provider>
  );
}
