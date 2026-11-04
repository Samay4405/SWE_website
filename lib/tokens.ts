/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM TOKENS — SWE MIT-WPU
   Canonical constants for color roles, geometry, typography & z-index
   ───────────────────────────────────────────────────────────── */

export const BRAND_COLORS = {
  purple: "#6538A5",
  purpleDeep: "#532D8A",
  purpleSoft: "#A78BDA",
  purpleTint: "rgba(101, 56, 165, 0.08)",
  purpleBorder: "#E9E3FB",

  gold: "#F5D76E",
  goldWarm: "#E8B94F",
  goldTint: "rgba(245, 215, 110, 0.15)",

  ink: "#1E1033",
  muted: "#6B6385",
  line: "#E9E3FB",
  surface: "#FFFFFF",
  surfaceCard: "rgba(255, 255, 255, 0.85)",
} as const;

export const Z_INDEX = {
  ambient: -10,
  base: 0,
  canvas: 1,
  content: 2,
  interactive: 6,
  overlay: 10,
  sticky: 20,
  dropdown: 30,
  navbar: 50,
  modal: 100,
  tooltip: 110,
  skipLink: 120,
} as const;

export const RADII = {
  sm: "0.375rem",   // 6px
  md: "0.5rem",     // 8px
  lg: "0.75rem",    // 12px
  xl: "1rem",       // 16px (Card default)
  xxl: "1.5rem",    // 24px
  pill: "9999px",
} as const;

