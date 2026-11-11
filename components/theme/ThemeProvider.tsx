"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { InkBleedCanvas, InkBleedTriggerOptions } from "./InkBleedCanvas";

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
  const triggerRef = useRef<((options: InkBleedTriggerOptions) => void) | null>(null);

  // Sync state on client mount
  useEffect(() => {
    setMounted(true);
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setTheme(isCurrentlyDark ? "dark" : "light");
  }, []);

  const registerTrigger = useCallback(
    (fn: (options: InkBleedTriggerOptions) => void) => {
      triggerRef.current = fn;
    },
    []
  );

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | { clientX: number; clientY: number }) => {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";

      // Calculate origin coordinates for ink bleed
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

      // Trigger the fluid ink bleed animation
      if (triggerRef.current) {
        triggerRef.current({
          x,
          y,
          targetTheme: nextTheme,
          onThemeSwap: applyThemeToDOM,
        });
      } else {
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
      <InkBleedCanvas registerTrigger={registerTrigger} />
    </ThemeContext.Provider>
  );
}
