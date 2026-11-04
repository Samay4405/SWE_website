# SWE MIT-WPU Website Revamp — Comprehensive Audit
**Date:** November 2026  
**Stack:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS 4, Framer Motion, Canvas 2D, custom CSS  
**Target Branch:** `experimental_stuff` (switched from `HS-change`, commit `5c68dde`)  
**Objective:** Elevate the Society of Women Engineers (SWE) MIT-WPU Student Chapter website to award-quality standard through systematic refinement and engineering hardening while preserving its established brand identity.

---

## 1. Component Map & Architecture

### 1.1 Page Routes (`app/`)
| Route | File | Status & Role | Key Issues |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | **Active** — Single-page scroll assembling 7 main sections | Contains duplicate `h1` and nested `<main>` via child components |
| `/events` | `app/events/page.tsx` | **Broken** — Currently has only `redirect("/#events")` | Needs restoration as a full directory page with category filters |
| `/events/[slug]` | `app/events/[slug]/page.tsx` | **Active** — Dynamic event detail page | Homepage event cards do not link to it |
| `/team` | `app/team/page.tsx` | **Active** — Dedicated team directory page | Uses legacy grid layout, inconsistent with homepage 3D carousels |
| `/impact` | `app/impact/page.tsx` | **Active** — Impact metrics with Recharts GrowthChart | Disconnected styling from single-page aesthetic |
| `/gallery` | `app/gallery/page.tsx` | **Active** — Full gallery archive page | Large unoptimized images, heavy Masonry dependencies |
| `/contact` | `app/contact/page.tsx` | **Active** — Standalone contact page | Duplicates `ContactExact` without route differentiation |
| `/api/contact` | `app/api/contact/route.ts` | **Active** — Contact form POST route handler | Missing honeypot validation and in-memory rate limiting |

### 1.2 Section Components (`components/sections/`)
| Component | Lines | Role | State & Findings |
| :--- | :---: | :--- | :--- |
| `Hero.tsx` | 376 | Constellation canvas + typewriter headline | Client-rendered text delays LCP; uncapped DPR; un-throttled rAF loop; repulsion math snaps near zero; nodes lack keyboard accessibility; missing SVG fallback |
| `About.tsx` | 273 | Two-column editorial layout + MagicUI PixelImage | Uses `swe-expo.png`; missing 4 core value pillars; PixelImage is hover-only; missing touch/keyboard reveal; orbital blobs not optimized |
| `EventsCarousel.tsx` | 673 | Physics horizontal carousel using `timelineEventsData` | Active card lacks "View Details" link to `/events/[slug]`; lacks category filtering link; spring constants hardcoded; pagination dots lack labels |
| `TeamSection.tsx` | 161 | Dual cylinder showcase: Core (8) & Heads (14) | Hosts `CylindricalTeamCarousel`; lacks fallback list view and accessible announcements |
| `ImpactPreview.tsx` | 261 | "Stories That Stay" alumnae testimonials | Conic border + spotlight causes React re-renders on mousemove (`setMousePos`); missing compact stats row; contrast needs verification |
| `GallerySection.tsx` | 226 | React Bits Masonry with 18 community photos | Uses heavy `Masonry.jsx` (36.8 KB); images are raw JPEGs (up to 736 KB each); missing skeleton loading; lightbox accessibility incomplete |
| `ContactSection.tsx` / `ContactExact.tsx` | 376 | Chapter desk status, contact form, address | Renders invalid nested `<main>` and duplicate `<h1>`; fake success state on error catch; missing honeypot and aria-live copy feedback |

### 1.3 Layout & Shared Components
| Component | Role | Issues Identified |
| :--- | :--- | :--- |
| `Navbar.tsx` | Sticky navbar with blur & active scroll-spy | Active indicator color uses hardcoded rgba; logo lacks high-res SVG alternative |
| `MobileDrawer.tsx` | Mobile navigation drawer | Closes on click, but lacks explicit focus trap return ref |
| `Footer.tsx` | Chapter credentials, links, social icons | Social links still contain `__PLACEHOLDER__` URLs; missing Back-to-Top button |
| `BlobBackground.tsx` | Ambient animated background gradients | Uses heavy CSS filter blurs; needs GPU transform optimization and reduced-motion guard |
| `CylindricalTeamCarousel.tsx` | 3D CSS cylindrical carousel | Reduced-motion mode freezes 3D stack instead of rendering flat scroller; missing `aria-roledescription="carousel"` and live announcements; images lack blur placeholders |

### 1.4 Dead Code & Unreferenced Files (22 Identified)
The following files are not imported anywhere in the active application tree and can be safely archived or removed:
1. `components/sections/HeroConstellation.tsx` (21,220 bytes) — Old hero canvas implementation
2. `components/sections/HeroConstellation.css` (6,073 bytes) — Orphaned styles for old hero
3. `components/sections/HandwrittenTitle.tsx` (13,746 bytes) — Unused SVG path drawing title
4. `components/sections/HeroSpotlightReveal.tsx` (7,258 bytes) — Intermediate hero experiment
5. `components/sections/HeroLogo.tsx` (3,872 bytes) — Deprecated floating 3D logo
6. `components/sections/AuroraFlow.tsx` (12,886 bytes) — Unused aurora background shader
7. `components/sections/EventsPreview.tsx` (69 bytes) — Redundant stub
8. `components/sections/JourneyCTA.tsx` (2,430 bytes) — Unused CTA banner
9. `components/sections/Resources.tsx` (4,062 bytes) — Unused resources list
10. `components/sections/Testimonials.tsx` (6,410 bytes) — Previous static testimonials grid
11. `components/sections/Timeline.tsx` (3,902 bytes) — Previous vertical timeline
12. `components/sections/WhyJoin.tsx` (7,465 bytes) — Previous benefits section
13. `components/three/HeroCanvas.tsx` (7,887 bytes) — Unused Three.js canvas
14. `components/team/TeamMemberCard.tsx` (5,053 bytes) — Previous 2D team card
15. `components/layout/BackgroundGlow.tsx` (1,065 bytes) & `BackgroundGlow.css` — Redundant glow
16. `components/layout/SectionWrapper.tsx` (945 bytes) — Unused wrapper
17. `components/contact/ContactForm.tsx` (6,975 bytes) — Superseded by `ContactExact.tsx`
18. `components/gallery/Lightbox.tsx` (4,649 bytes) — Superseded by inline Masonry lightbox
19. `content/stemFacts.ts` (2,639 bytes) — Only referenced by dead `HeroConstellation.tsx`
20. `components/ui/Typewriter.tsx` (200 bytes) — Unused primitive
21. `components/ui/badge.tsx` (1,915 bytes) — Unused shadcn badge
22. `components/Masonry.d.ts` (1,126 bytes) — Redundant declaration

---

## 2. Design System & Token Inventory

### 2.1 Color Token Discrepancies
The project currently has **123 unique hardcoded color literals** scattered across components and inline styles. Key brand colors have diverged:

| Token Role | SWE Brand Specification | Current Codebase Values | Discrepancy & Impact |
| :--- | :--- | :--- | :--- |
| **Primary Brand Purple** | `#6538A5` | `#6d28d9` (Tailwind violet-700), `#5B5478`, `#4A3AFF` | Brand purple is diluted; sections alternate between dark violet and bright indigo |
| **Accent Gold** | `#F5D76E` / `#E8B94F` | `#DCC554` (olive-gold), `#F472B6` (pink) | Conic borders use `#F5D76E`, but team quotes and highlights use `#DCC554` |
| **Foreground / Ink** | `#1e1033` | `#1e1033`, `#0F0F0F`, `#171717`, `#2E2A40` | Inconsistent dark neutrals across cards and headings |
| **Muted Text** | `#6b6385` | `#6b6385`, `#7A7490`, `#94A3B8`, `#4A4560` | Low-contrast text in subheadings; varies by component |
| **Card Surface** | Semi-transparent frosted glass | `rgba(255, 255, 255, 0.85)` + blur(10px) vs `bg-white` | Inconsistent backdrop filter blurs and borders |
| **Border / Line** | `#e9e3fb` | `#e9e3fb`, `#F0ECF6`, `#E5DFEF`, `#2A2A2A` | Border tints diverge across sections |

### 2.2 Typography Inconsistencies
1. **Aggressive `!important` Heading Overrides in `app/globals.css` (lines 195–203):**
   ```css
   h1, h2 {
     font-family: var(--font-body), system-ui, sans-serif !important;
     font-size: clamp(2rem, 4.6vw, 3.8rem) !important;
     font-weight: 600 !important;
     line-height: 1.08 !important;
   }
   ```
   This rule forces `Inter` onto `h1` and `h2`, destroying editorial display usage of `Instrument Serif` unless wrapped in `<em>` or inline styling with `!important`.
2. **Font Loading Redundancy:**
   - `lib/fonts.ts` loads `Instrument_Serif` and `Inter` via `next/font/google` with CSS variables `--font-accent` and `--font-body`.
   - `app/layout.tsx` (lines 44–47) redundantly requests `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap` via an external `<link>`, causing an extra render-blocking network request.
3. **Fluid Type Scale Lacking:**
   - Font sizes jump arbitrarily between `text-3xl`, `text-4xl`, `text-5xl`, `text-[3.25rem]`, and `text-[3.8rem]`.
   - A disciplined fluid type scale using `clamp()` (Display, H1, H2, H3, Body, Small, Eyebrow) must be standardized.

### 2.3 Spacing, Radii & Elevation
- **Spacing:** Sections use disjointed vertical padding: `py-12 sm:py-16 md:py-20`, `py-20 sm:py-24 md:py-28 lg:py-32`, or `py-16 md:py-24 lg:py-32`. Must standardize on a consistent rhythm: `py-16 md:py-24 lg:py-32` (`section-padding`).
- **Radii:** Cards utilize `rounded-[15px]`, `rounded-2xl` (16px), `rounded-[22px]`, and `rounded-[28px]`. Must unify to tokens: `--radius-card: 16px`, `--radius-pill: 9999px`, `--radius-badge: 8px`.
- **Z-Index:** Arbitrary z-indices (`z-[1]`, `z-2`, `z-6`, `z-10`, `z-20`, `z-50`, `100 - Math.round(...)`) cause stacking context conflicts between fixed navbar, canvas, and modal overlays.

### 2.4 Motion Tokens
- Framer Motion cubic-bezier curves (`[0.16, 1, 0.3, 1]`) are re-declared across 6 separate files.
- Spring dynamics differ unnecessarily across carousels (stiffness 130 vs 75).
- Centralized presets (`MOTION_EASE_EDITORIAL`, `MOTION_SPRING_GENTLE`, `MOTION_SPRING_BOUNCE`) must be exposed in `lib/animations.ts`.

---

## 3. Performance Baseline & Asset Inventory

### 3.1 Repository Weight & Bloat
- **Raw Uncompressed Assets in Git Root:**
  - `Team_photos/`: **45.73 MB, 24 files** (Includes raw RAW/DNG file `Janhavi_Modak_Btech_Chemical_ThirdYear_.dng` at **26.95 MB** and `.HEIC` at **1.63 MB**).
  - `Gallery photo/`: **56.82 MB, 19 files** (Raw camera photos up to 10.08 MB per image).
  - Total raw bloat: **102.55 MB**.
- **Active Directory Assets (`public/images/`):**
  - **39.27 MB, 120 files**.
  - Top 10 largest images include uncompressed JPEGs ranging from 1.20 MB to 4.64 MB each (`ananya-deshmukh.jpg` = 4.64 MB, `krisha-oswal.jpg` = 2.80 MB, `head-mahin-shaikh.jpg` = 2.48 MB, `icebreaker-batch-ceremony-2025.jpg` = 2.23 MB).
  - Active gallery community images: 18 photos averaging 350–736 KB each (~7.5 MB total on one page).

### 3.2 Runtime & Rendering Performance
1. **LCP (Largest Contentful Paint):**
   - In `Hero.tsx`, the headline and CTAs are rendered inside `"use client"`. The canvas initialization and rAF loop run concurrently, delaying the visual paint of the critical display headline.
   - Text must be server-rendered for immediate LCP; canvas must mount progressively without layout shift.
2. **CLS (Cumulative Layout Shift):**
   - The typewriter span (`#tw`) changes length dynamically character-by-character without an allocated width container, causing the following cursor and punctuation to jitter horizontally.
3. **INP & Thread Blocking:**
   - Canvas loop in `Hero.tsx`:
     - Does not cap `window.devicePixelRatio` (renders at 3x+ on modern phones).
     - Does not check `IntersectionObserver` — tick continues executing at 60–120 FPS even when the user scrolls 4000px down to the footer.
     - Canvas resize logic executes inside the per-frame tick.
     - 120 nodes are simulated uniformly on low-powered mobile devices.
   - `ImpactPreview.tsx` mouse move handler invokes `setMousePos` React state setter on every pixel delta, triggering repeated component re-renders during cursor movement.
   - `components/Masonry.jsx` runs 36.8 KB of uncompiled layout code with heavyweight GSAP transitions.
4. **Heavy / Redundant Dependencies:**
   - `three` (`^0.186.1`) and `@types/three` are bundled in `package.json` despite Three.js canvas being decommissioned.
   - `@hugeicons/react` and `@hugeicons/core-free-icons` are installed solely for 3 icon instances in Masonry, when `lucide-react` is already used everywhere else.

---

## 4. Accessibility (WCAG 2.2 AA) Audit

| Category | Finding | Violation / Impact |
| :--- | :--- | :--- |
| **Heading Hierarchy** | Multiple `<h1>` tags on homepage (`Hero.tsx` + `ContactExact.tsx`) | Fails WCAG 1.3.1 (Info and Relationships). Each page must have exactly one H1. |
| **Semantic Landmarks** | `ContactExact.tsx` contains `<main className="page">` inside layout `<main>` | Invalid HTML: duplicate `<main>` landmarks confuse assistive navigation. |
| **Skip Links** | No skip-to-content link present in layout; `<main>` lacks `id="main-content"` | Fails WCAG 2.4.1 (Bypass Blocks). Keyboard users must tab through entire navbar on every page. |
| **Constellation Nodes** | Pioneer nodes generated as `<div>` with `onclick`/`onpointerenter` | Fails WCAG 2.1.1 (Keyboard). Inaccessible to screen readers and keyboard `Tab` navigation. |
| **Reduced Motion** | Hero typewriter, team 3D carousels, and gallery zoom do not fully respect `prefers-reduced-motion` | Fails WCAG 2.2.2 (Pause, Stop, Hide). Reduced motion users still experience animated shifts. |
| **Screen Reader Fallbacks** | Hero typewriter text is incomplete during character typing; no static full sentence announcement | Fails WCAG 4.1.2. Screen readers read fragmented substrings. |
| **Form Error States** | Contact form `catch` block shows fake "ok" status; no aria-live on copy address | Informs user message sent when API failed; violates clear error notification guidelines. |
| **Tap Targets** | Carousel navigation buttons (36×36px) | Fails WCAG 2.5.8 (Target Size minimum 24×24px; recommended 44×44px for primary controls). |
| **Contrast** | Light gray text (`#6b6385`) on lavender-tinted cards (`#f3edff` or glass overlays) | Borderline contrast (<4.5:1 on specific muted labels); requires contrast verification. |

---

## 5. Prioritised Revamp List

### Phase P0: Critical / Foundation / Breaking (Do First)
- [ ] **Design System Token Consolidation:**
  - Define SWE Purple `#6538A5`, Soft Lilac `#A78BDA`, Gold `#F5D76E` & `#E8B94F`, Ink `#1e1033`, Muted `#6b6385`, Line `#e9e3fb` in `globals.css`.
  - Remove destructive `h1, h2 { ... !important }` font-family overrides in `globals.css`.
  - Remove external Instrument Serif Google Fonts `<link>` in `app/layout.tsx`.
- [ ] **Hero Revamp (First Impression):**
  - Make display headline, eyebrow, value prop, and CTAs server-rendered for immediate sub-second LCP.
  - Implement progressive hydration for constellation canvas: cap DPR at 2, single rAF with `IntersectionObserver` pause when offscreen, damped velocity physics + restoring orbit force + div-by-zero repulsion guard, static SVG fallback.
  - Make the 10 pioneer nodes fully keyboard-navigable (`Tab` / `Enter`) with accessible glass tooltip cards.
  - Stabilize typewriter with reserved fixed width, `aria-hidden` animation, static screen reader fallback, and static word for `prefers-reduced-motion`.
  - Add refined scroll cue linking to `#about`.
- [ ] **Accessibility & HTML Scaffolding Fixes:**
  - Remove nested `<main>` in `ContactExact.tsx`; ensure single `<h1>` per page.
  - Add accessible skip-to-content link targeting `<main id="main">`.
  - Restore real `/events` directory page (filterable by category) and link homepage cards to `/events/[slug]`.
- [ ] **Dead Code Cleanup:**
  - Remove 22 identified unused files from source tree.

### Phase P1: Core Sections & Engineering Hardening
- [ ] **About Section:** Add 4 concise value pillars (Community, Inclusion, Learning, Leadership) with clean Lucide icons; add touch/keyboard toggle for PixelImage.
- [ ] **Events Carousel:** Add "View Details" CTA on active card linking to `/events/[slug]`, pagination dots with labels, 44px touch targets.
- [ ] **Team Section:** Implement flat horizontal scroller for `prefers-reduced-motion`, add `aria-roledescription="carousel"`, live active member announcement, blur image placeholders, 44px arrow buttons.
- [ ] **Impact Section:** Replace mousemove React re-renders with CSS variables/rAF spotlight; restore compact honest stats row from `content/stats.ts`.
- [ ] **Gallery Section:** Replace heavy Masonry dependency or optimize with next/image, responsive sizes, skeleton loading, and accessible keyboard lightbox with focus trap.
- [ ] **Contact Section:** Fix form validation, add honeypot spam protection, real error state handling, polite aria-live on copy email, client-side IST hours calculation.
- [ ] **Engineering Restoration:**
  - Restore `app/robots.ts`, `app/sitemap.ts`, `playwright.config.ts`, and `tests/smoke.spec.ts` from `main`.
  - Replace `__PLACEHOLDER__` in social links with official chapter handles.
  - Add Open Graph / Twitter metadata and JSON-LD `Organization` schema.

### Phase P2: Asset Optimization & Repo Hygiene
- [ ] Remove raw uncompressed `Gallery photo/` and `Team_photos/` folders from working tree and add to `.gitignore`.
- [ ] Compress active images in `public/images/` to optimized WebP format (<200 KB per photo).
- [ ] Prune unused dependencies (`three`, `@types/three`, `@hugeicons/react`, `@hugeicons/core-free-icons`).
- [ ] Add branded `not-found.tsx` and `error.tsx` error boundaries.
- [ ] Run typecheck, lint, build, Playwright smoke tests, and produce `docs/REVAMP_REPORT.md`.

