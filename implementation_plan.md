# SWE MIT-WPU Chapter Website — Implementation Plan

> **Tagline:** "Engineering the Future, Together."
> **Design Tone:** Professional · Minimal · Editorial · Confident

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Summary](#2-tech-stack-summary)
3. [Design System](#3-design-system)
4. [Content Data Model](#4-content-data-model)
5. [Folder Structure](#5-folder-structure)
6. [Phase 0 — Project Scaffold](#6-phase-0--project-scaffold)
7. [Phase 1 — Navbar + Footer + Layout Shell](#7-phase-1--navbar--footer--layout-shell)
8. [Phase 2 — Hero (Static) + About + Why Join](#8-phase-2--hero-static--about--why-join)
9. [Phase 3 — Events Directory & Detail Pages](#9-phase-3--events-directory--detail-pages)
10. [Phase 4 — Team Directory + Impact Section](#10-phase-4--team-directory--impact-section)
11. [Phase 5 — Testimonials + Gallery + Lightbox](#11-phase-5--testimonials--gallery--lightbox)
12. [Phase 6 — Journey Timeline + Resources + Contact/CTA/Footer](#12-phase-6--journey-timeline--resources--contactctafooter)
13. [Phase 7 — R3F Animated Hero](#13-phase-7--r3f-animated-hero)
14. [Phase 8 — Polish, Accessibility, Performance & Deploy](#14-phase-8--polish-accessibility-performance--deploy)
15. [Risk & Mitigation](#15-risk--mitigation)
16. [Open Questions for You](#16-open-questions-for-you)

---

## 1. Project Overview

Build a production-grade, animated marketing/community website for the **Society of Women Engineers (SWE), MIT-WPU Student Chapter, Pune, India**. The site should communicate: student community, technical growth, leadership, career development, events, and chapter impact — all with a serious engineering-org feel, not a generic college-club page.

### Key Constraints
- All content is local/static (TypeScript/JSON files) — no CMS for v1
- No fabricated stats, names, or achievements — all placeholders clearly marked as `__PLACEHOLDER__`
- `prefers-reduced-motion` respected everywhere
- Mobile-first responsive design (breakpoints: 375px / 768px / 1440px)
- Lighthouse targets: 90+ for Performance, Accessibility, and SEO

---

## 2. Tech Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript, RSC) |
| Styling | Tailwind CSS 4 + shadcn/ui primitives |
| Animation (UI) | Framer Motion (scroll reveals, layout transitions, counters) |
| Animation (Scroll) | GSAP + ScrollTrigger (timeline, hero sequence) |
| 3D Hero Visual | React Three Fiber + drei (Phase 7 only) |
| Content | Local `.ts` files in `/content` |
| Forms | Next.js Route Handler → Resend / Formspree |
| Images | `next/image` with blur placeholders |
| Icons | lucide-react |
| Charts | Recharts (Impact section) |
| Testing | Playwright (smoke tests) |
| Deployment | Vercel (GitHub integration) |

---

## 3. Design System

### 3.1 Typography

| Role | Font | Fallback |
|---|---|---|
| Headings (display) | **Space Grotesk** (Google Fonts) | system-ui, sans-serif |
| Body / UI | **Inter** (Google Fonts) | system-ui, sans-serif |

- Fluid type scale using `clamp()`:
  - `h1`: `clamp(2.5rem, 5vw + 1rem, 4.5rem)`
  - `h2`: `clamp(2rem, 3vw + 0.5rem, 3rem)`
  - `h3`: `clamp(1.25rem, 2vw + 0.25rem, 1.75rem)`
  - `body`: `1rem` (16px) / `1.125rem` (18px) on large screens
  - `small/caption`: `0.875rem`

### 3.2 Color Palette

| Token | Light Mode | Dark Mode (stretch) | Usage |
|---|---|---|---|
| `--bg` | `#FAFAF9` (warm off-white) | `#0F0F0F` | Page background |
| `--fg` | `#1A1A1A` (near-black) | `#EDEDED` | Primary text |
| `--muted` | `#6B6B6B` | `#9A9A9A` | Secondary text |
| `--border` | `#E5E5E3` | `#2A2A2A` | Thin 1px borders |
| `--accent` | `#4A3AFF` (deep violet) | `#6B5CFF` | CTAs, links, active states, chart accents |
| `--accent-hover` | `#3D2FD9` | `#7D70FF` | Hover states |
| `--surface` | `#FFFFFF` | `#171717` | Card/component backgrounds |

> The accent is used **sparingly** — never as a dominant background wash.

### 3.3 Spacing & Layout

- **Base grid:** 8px
- **Section padding (vertical):** 96px–160px desktop, 64px–96px mobile
- **Container max-width:** 1280px, centered, 24px horizontal padding (mobile), 48px (desktop)
- **Corner radius:** 4–8px (no pill shapes)
- **Borders:** 1px solid `--border`, no box-shadows on cards

### 3.4 Motion Principles

| Pattern | Implementation | Duration |
|---|---|---|
| Scroll reveal | Fade-in + 12px translateY | 500–600ms, `ease-out` |
| Hover states | Scale/color transitions | 150–250ms, `ease` |
| Counter animation | Count from 0 to value (once) | 1.5–2s, `ease-out` |
| Layout transitions | Framer Motion `layout` prop | 300ms |
| Timeline scrub | GSAP ScrollTrigger, `scrub: true` | Tied to scroll |
| Reduced motion | All animations → instant / `duration: 0` | — |

---

## 4. Content Data Model

All types defined in `/content/types.ts`. Seed data in individual files.

```typescript
// content/types.ts

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: "workshop" | "hackathon" | "talk" | "networking" | "competition" | "outreach";
  date: string;               // ISO 8601
  location: string;
  coverImage: string;
  shortDescription: string;
  body: string;               // MDX or rich text (plain markdown for v1)
  schedule: ScheduleItem[];
  speakers: Speaker[];
  partners: string[];
  gallery: string[];
}

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Speaker {
  name: string;
  title: string;
  photo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Leadership" | "Core" | "Advisory";
  department: string;
  year: string;
  bio: string;
  photo: string;
  linkedIn: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;           // e.g. "+"
  icon: string;              // lucide icon name
}

export interface Testimonial {
  quote: string;
  name: string;
  courseYear: string;
  role: string;
  photo: string;
}

export interface GalleryItem {
  id: string;
  category: "events" | "workshops" | "team" | "outreach";
  image: string;
  caption: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}
```

Each placeholder value will be marked with `"__PLACEHOLDER__"` or obviously dummy text like `"Lorem ipsum — replace with real chapter data before launch"`.

---

## 5. Folder Structure

```
/app
  layout.tsx                 ← Root layout (fonts, metadata, navbar, footer)
  page.tsx                   ← Home (all homepage sections composed here)
  /events
    page.tsx                 ← Events directory with filtering
    /[slug]
      page.tsx               ← Individual event detail
  /team
    page.tsx                 ← Team directory
  /impact
    page.tsx                 ← Impact stats, charts, achievements
  /gallery
    page.tsx                 ← Masonry gallery with lightbox
  /contact
    page.tsx                 ← Contact form + location
  /api
    /contact
      route.ts               ← Server-side form handler

/components
  /sections                  ← One component per homepage section
    Hero.tsx
    About.tsx
    WhyJoin.tsx
    EventsPreview.tsx
    ImpactPreview.tsx
    Testimonials.tsx
    JourneyCTA.tsx
  /ui                        ← shadcn primitives (button, dialog, input, etc.)
  /layout
    Navbar.tsx
    Footer.tsx
    MobileDrawer.tsx
    SectionWrapper.tsx       ← Reusable section container with padding/max-width
  /three                     ← R3F hero scene (Phase 7)
    NetworkScene.tsx
    HeroCanvas.tsx
  /shared
    AnimatedCounter.tsx
    ScrollReveal.tsx          ← Framer Motion wrapper for scroll-triggered reveals
    FilterPills.tsx
    Lightbox.tsx
    MasonryGrid.tsx
    TimelineItem.tsx

/content
  types.ts
  events.ts
  team.ts
  stats.ts
  testimonials.ts
  gallery.ts
  timeline.ts
  resources.ts
  navigation.ts             ← Nav links config

/lib
  animations.ts              ← Shared Framer Motion variants
  utils.ts                   ← cn() helper, formatDate, etc.
  fonts.ts                   ← Next.js font configuration

/public
  /images
    /team                    ← Team member photos
    /events                  ← Event cover images
    /gallery                 ← Gallery images
    /partners                ← Partner/sponsor logos
    hero-fallback.svg        ← Static engineering-grid SVG
    og-image.png             ← Open Graph image

/tests
  smoke.spec.ts              ← Playwright smoke tests
```

---

## 6. Phase 0 — Project Scaffold

> **Goal:** App boots, base typography/colors render, folder structure is in place.

### Tasks

| # | Task | Details |
|---|---|---|
| 0.1 | Initialize Next.js 15 | `npx -y create-next-app@latest ./` with TypeScript, Tailwind CSS, App Router, `src/` OFF, import alias `@/*` |
| 0.2 | Verify Tailwind CSS 4 | Confirm v4 config format (`@theme` in CSS), adjust if `create-next-app` ships v3 |
| 0.3 | Install core dependencies | `framer-motion`, `gsap`, `@gsap/react`, `lucide-react`, `recharts`, `clsx`, `tailwind-merge` |
| 0.4 | Initialize shadcn/ui | `npx -y shadcn@latest init` — select New York style, CSS variables, slate base color |
| 0.5 | Add shadcn components | `button`, `dialog`, `input`, `textarea`, `label`, `badge`, `separator`, `sheet` (for mobile drawer) |
| 0.6 | Configure fonts | Set up **Space Grotesk** (display) + **Inter** (body) via `next/font/google` in `lib/fonts.ts`, apply in root layout |
| 0.7 | Define design tokens | Configure Tailwind theme with color tokens (`--bg`, `--fg`, `--accent`, etc.), spacing scale, fluid typography utilities |
| 0.8 | Create folder structure | Create all directories: `/components/sections`, `/components/ui`, `/components/three`, `/components/shared`, `/components/layout`, `/content`, `/lib`, `/public/images/*`, `/tests` |
| 0.9 | Create `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge), `formatDate()`, other shared utilities |
| 0.10 | Create `lib/animations.ts` | Shared Framer Motion variants: `fadeInUp`, `staggerContainer`, `scaleOnHover` |
| 0.11 | Create content type definitions | `/content/types.ts` with all interfaces from Section 4 |
| 0.12 | Seed placeholder content | Populate all `/content/*.ts` files with `__PLACEHOLDER__` data (3–5 items per collection) |
| 0.13 | Create `SectionWrapper` component | Reusable wrapper with consistent padding, max-width, optional ID for scroll targeting |
| 0.14 | Create `ScrollReveal` component | Framer Motion wrapper that fades+translates children on scroll into view, respects `prefers-reduced-motion` |
| 0.15 | Verify | Run `npm run dev`, confirm app boots, fonts load, color tokens render correctly on a test page |

### Verification Checklist
- [ ] `npm run dev` starts without errors
- [ ] Space Grotesk heading + Inter body text visible
- [ ] Accent color renders correctly
- [ ] Tailwind utilities work with custom tokens
- [ ] All folders exist

---

## 7. Phase 1 — Navbar + Footer + Layout Shell

> **Goal:** Persistent navigation and footer, responsive at 375/768/1440px.

### Tasks

| # | Task | Details |
|---|---|---|
| 1.1 | Build `Navbar` | Sticky, transparent over hero → solid white/black background on scroll (using `useScroll` or IntersectionObserver). Logo + nav links + "Join SWE" accent button. Active-section indicator via scroll spy. |
| 1.2 | Build `MobileDrawer` | Hamburger icon triggers a slide-in sheet (shadcn `Sheet`) with full nav links. Focus-trapped. |
| 1.3 | Build `Footer` | Sitemap columns (Pages, Connect, Resources), social media icons, MIT-WPU location, copyright `© {year} SWE MIT-WPU`. Thin top border. |
| 1.4 | Root `layout.tsx` | Apply fonts, wrap with Navbar + Footer, add base metadata (title, description, OG tags). |
| 1.5 | Create `/content/navigation.ts` | Centralized nav link config so Navbar, Footer, and mobile drawer share the same source of truth. |
| 1.6 | Responsive testing | Verify at 375px (mobile), 768px (tablet), 1440px (desktop). |

### Verification Checklist
- [ ] Navbar sticks to top, transitions from transparent → solid on scroll
- [ ] Active link highlights based on scroll position (homepage) or route (subpages)
- [ ] "Join SWE" button is visually distinct (filled accent)
- [ ] Mobile hamburger opens drawer, links work, drawer closes on selection
- [ ] Footer renders with all columns, social links, copyright
- [ ] Layout is clean at all 3 breakpoints

---

## 8. Phase 2 — Hero (Static) + About + Why Join

> **Goal:** First three homepage sections with scroll animations. NO R3F yet.

### Tasks

| # | Task | Details |
|---|---|---|
| 2.1 | Create `hero-fallback.svg` | Design a static engineering-grid/network-node SVG graphic (lines, dots, hexagonal or circuit-board motif). Clean, monochrome with accent highlights. |
| 2.2 | Build `Hero` section | Full-viewport height. Large headline ("Engineering the Future, Together.") + subtext + two CTAs ("Explore Events" → `/events`, "Join the Community" → `/contact`). Static SVG positioned as background/decorative element. Space reserved for future R3F canvas (same dimensions). |
| 2.3 | Build `About` section | Three-part layout: (1) "What is SWE?" paragraph, (2) "Global → India → MIT-WPU" animated connecting diagram (CSS/SVG animated on scroll), (3) Four focus areas as a 2×2 grid (Technical, Leadership, Community, Career) with icons + descriptions. All wrapped in `ScrollReveal`. |
| 2.4 | Build `WhyJoin` section | Five pillars in a responsive grid: Learn / Build / Connect / Lead / Grow. Each pillar: icon + title + one-line description. Ending CTA button. Staggered reveal animation. |
| 2.5 | Compose on homepage | Import Hero + About + WhyJoin into `/app/page.tsx`. Assign section IDs for scroll-spy. |

### Verification Checklist
- [ ] Hero fills viewport, headline is large and confident, CTAs are clickable
- [ ] Static SVG renders as background graphic — no layout shift
- [ ] About section reveals on scroll with smooth animation
- [ ] Connecting diagram animates (Global → India → MIT-WPU)
- [ ] 2×2 focus grid renders responsively
- [ ] WhyJoin pillars stagger in on scroll
- [ ] All sections have correct IDs for navbar scroll-spy
- [ ] Reduced-motion: animations are instant/disabled

---

## 9. Phase 3 — Events Directory & Detail Pages

> **Goal:** Full events experience with filtering and individual event pages.

### Tasks

| # | Task | Details |
|---|---|---|
| 3.1 | Build `EventsPreview` (homepage) | Featured event hero card (large, image-backed) + 3 recent event cards. "View All Events" link. |
| 3.2 | Build `FilterPills` component | Pill-shaped category buttons (All, Workshop, Hackathon, Talk, Networking, Competition, Outreach). Active state with accent color. Client-side filtering. |
| 3.3 | Build `/events/page.tsx` | Full events directory page: FilterPills at top, responsive grid of event cards below. Framer Motion `layout` prop for animated reflows on filter change. Empty state if no events match. |
| 3.4 | Build event card component | Cover image, category badge, title, date, location, short description. Hover: subtle lift + border highlight. Links to `/events/[slug]`. |
| 3.5 | Build `/events/[slug]/page.tsx` | Event detail page: hero image, title, date/location/category metadata, body content, schedule timeline, speakers grid, partner logos, event gallery (reusing gallery component patterns). Back button. Generate `generateStaticParams` from event data. |
| 3.6 | SEO | Per-page `<title>` and `<meta description>` from event data. OG image from cover image. |

### Verification Checklist
- [ ] Homepage events preview shows featured + recent events
- [ ] `/events` page renders all events in a grid
- [ ] Filter pills work: clicking filters the grid with layout animation
- [ ] Empty state shows when no events match a filter
- [ ] Clicking an event card navigates to `/events/[slug]`
- [ ] Event detail page renders all sections (schedule, speakers, etc.)
- [ ] Back navigation works
- [ ] No full-page reload on filter change

---

## 10. Phase 4 — Team Directory + Impact Section

> **Goal:** Team page and Impact page with animated stats and charts.

### Tasks

| # | Task | Details |
|---|---|---|
| 4.1 | Build `AnimatedCounter` | Component that counts from 0 to target value when scrolled into view (IntersectionObserver + Framer Motion `useMotionValue` / `useSpring`). Fires only once. Respects reduced-motion. |
| 4.2 | Build `/team/page.tsx` | Grouped sections: Leadership → Core → Advisory. Each group has a header + grid of member cards. |
| 4.3 | Build team member card | Photo, name, role, department/year. On hover/tap: card flips (or panel slides) to reveal bio + LinkedIn link. Accessible keyboard interaction. |
| 4.4 | Build `ImpactPreview` (homepage) | 4 stat cards with `AnimatedCounter` + a "See Full Impact" CTA linking to `/impact`. |
| 4.5 | Build `/impact/page.tsx` | Full-page layout: (1) Stats grid with animated counters, (2) Year-wise growth chart (Recharts line/bar chart, animated on mount), (3) Achievements list, (4) Partner/collaborator logo grid (grayscale → color on hover). |
| 4.6 | Configure Recharts chart | Styled to match design system (accent color for lines/bars, clean axes, no gridlines clutter). Responsive. |

### Verification Checklist
- [ ] `/team` shows members grouped by team category
- [ ] Card hover/tap reveals bio and LinkedIn — works with keyboard
- [ ] Stats animate from 0 to value on scroll, fire only once
- [ ] Growth chart renders with real axes and animated draw-in
- [ ] Partner logos are grayscale, transition to color on hover
- [ ] Homepage impact preview links to `/impact`
- [ ] All pages responsive at 375/768/1440px

---

## 11. Phase 5 — Testimonials + Gallery + Lightbox

> **Goal:** Social proof carousel and full gallery experience.

### Tasks

| # | Task | Details |
|---|---|---|
| 5.1 | Build `Testimonials` section | Auto-advancing carousel (4–5s interval). Each slide: large quote, name, course/year, role, photo. Pause on hover/focus. Swipeable on mobile (touch events or Framer Motion drag). Dot indicators. |
| 5.2 | Build `MasonryGrid` component | CSS columns-based masonry layout. Responsive: 1 col mobile, 2 cols tablet, 3–4 cols desktop. |
| 5.3 | Build `/gallery/page.tsx` | Category filter pills (All, Events, Workshops, Team, Outreach) + masonry grid of gallery items. Animated layout transitions on filter. |
| 5.4 | Build `Lightbox` component | Modal overlay: full-screen image view, left/right arrow navigation, Esc to close, keyboard-navigable (arrow keys), focus-trapped (no interaction with page behind), swipe on mobile. Image counter ("3 / 12"). |
| 5.5 | Integrate lightbox | Clicking any gallery image opens the lightbox at that image's index. |

### Verification Checklist
- [ ] Testimonials auto-advance, pause on hover, are swipeable
- [ ] Gallery renders in masonry layout, responsive
- [ ] Category filters animate the grid layout transition
- [ ] Clicking an image opens the lightbox
- [ ] Lightbox: arrow keys navigate, Esc closes, focus is trapped
- [ ] Lightbox: displays image counter
- [ ] No scroll on body while lightbox is open

---

## 12. Phase 6 — Journey Timeline + Resources + Contact/CTA/Footer

> **Goal:** Timeline, resources section, contact form, and final CTA band.

### Tasks

| # | Task | Details |
|---|---|---|
| 6.1 | Build Journey timeline | Vertical timeline driven by GSAP ScrollTrigger. Each entry: year badge + title + description. Line draws as user scrolls. Each milestone fades in when its scroll position is reached. |
| 6.2 | Build Resources section | Grouped link lists (Learn / Build / Lead / Launch). Each group: heading + list of links with icons. Include a `visible` flag in content data — section can be hidden until real resources are added. |
| 6.3 | Build Join CTA band | Full-bleed section with bold headline ("Ready to Engineer the Future?"), accent-colored CTA button, subtle background pattern. |
| 6.4 | Build `/contact/page.tsx` | Contact form (name, email, subject, message) + chapter location/address + embedded or static map + social links. |
| 6.5 | Build `/api/contact/route.ts` | Server-side form handler with validation (zod). Posts to Resend API if configured, falls back to Formspree, or logs to console with a clear TODO. Never exposes API keys client-side. Returns JSON success/error. |
| 6.6 | Client-side form UX | Validation errors shown inline, loading spinner on submit, success toast/message on completion, error state on failure. |
| 6.7 | Update Footer | Ensure footer has complete sitemap (all pages), social links, location, and copyright. |

### Verification Checklist
- [ ] Timeline draws on scroll, milestones reveal at correct positions
- [ ] Resources section renders (or is hidden if flagged off)
- [ ] CTA band is visually impactful with working button
- [ ] Contact form validates client-side (empty fields, email format)
- [ ] Form submits via Route Handler, shows loading → success/error
- [ ] No API keys in client bundle
- [ ] Footer is complete with all links

---

## 13. Phase 7 — R3F Animated Hero

> **Goal:** Swap the Hero's static SVG for an animated 3D network scene.

### Tasks

| # | Task | Details |
|---|---|---|
| 7.1 | Install R3F deps | `@react-three/fiber`, `@react-three/drei`, `three` |
| 7.2 | Build `NetworkScene` | Low-poly animated node-and-connection network: ~40–60 floating nodes (small spheres) with edges (thin lines) between nearby nodes. Gentle float animation. Monochrome + accent color highlights. GPU-light (no post-processing, no heavy geometry). |
| 7.3 | Build `HeroCanvas` | Lazy-loaded R3F `<Canvas>` wrapper. Uses `React.lazy` + `Suspense` with the static SVG as fallback. |
| 7.4 | Motion detection | Check `prefers-reduced-motion` and `navigator.hardwareConcurrency`/`navigator.deviceMemory`. If reduced-motion is preferred OR device is low-end → render static SVG, never mount the Canvas. |
| 7.5 | No layout shift | The hero container has a fixed reserved size. The R3F canvas is `position: absolute` behind the text content. Static SVG occupies the same space. Transition is seamless. |
| 7.6 | Performance tuning | Target 60fps on mid-range laptops. Cap `pixelRatio` at 1.5. Use `frameloop="demand"` or throttle renders when offscreen. |

### Verification Checklist
- [ ] 3D scene renders behind hero text, does not cause layout shift
- [ ] Nodes float gently, connections form between nearby nodes
- [ ] `prefers-reduced-motion: reduce` → static SVG shows, no Canvas mounted
- [ ] Low-end device detection works (graceful fallback)
- [ ] No console errors or WebGL warnings
- [ ] Performance: 60fps on a standard laptop, no jank on scroll

---

## 14. Phase 8 — Polish, Accessibility, Performance & Deploy

> **Goal:** Production-ready site, passing all acceptance criteria.

### Tasks

| # | Task | Details |
|---|---|---|
| 8.1 | Full responsive pass | Test every page at 375px, 768px, 1440px. Fix all overflow, truncation, spacing issues. |
| 8.2 | Accessibility audit | Keyboard navigation on all interactive elements. Alt text on all images. ARIA labels on icon-only buttons. Color contrast ≥ 4.5:1 for text. Focus rings visible. Skip-to-content link. `role` attributes on landmarks. |
| 8.3 | Reduced-motion pass | Set `prefers-reduced-motion: reduce` in browser. Verify: no animations play, all content still visible and usable. |
| 8.4 | SEO metadata | Verify every page has unique `<title>`, `<meta description>`, proper heading hierarchy (single `<h1>`), OG tags. |
| 8.5 | Image optimization | All images served via `next/image`. Add blur placeholders. Verify responsive `sizes` attribute. Compress any oversized assets. |
| 8.6 | Lighthouse audit | Run Lighthouse on Home, Events, Team, Gallery, Contact. Target: 90+ Performance, 90+ Accessibility, 90+ SEO. Fix issues. |
| 8.7 | Write Playwright smoke tests | Tests: (1) Nav links work, (2) Event filter updates grid, (3) Gallery lightbox opens/navigates/closes, (4) Contact form validates and submits, (5) Mobile drawer opens/closes. |
| 8.8 | Run smoke tests | Execute Playwright suite, fix any failures. |
| 8.9 | Final content audit | Grep for `__PLACEHOLDER__` — document every spot that needs real data. Create a handoff checklist. |
| 8.10 | Deploy to Vercel | Connect GitHub repo → Vercel. Verify production build succeeds. Test deployed URL. |
| 8.11 | Analytics flag | Add a commented-out / env-flag block for Vercel Analytics. Do not wire without user confirmation. |

### Verification Checklist
- [ ] All pages responsive at 3 breakpoints — no visual bugs
- [ ] Full keyboard navigation works (Tab, Enter, Esc, Arrows where relevant)
- [ ] Screen reader: landmarks, headings, alt text, ARIA labels all present
- [ ] Reduced-motion: site fully usable with no animation
- [ ] Lighthouse: 90+ across Performance/Accessibility/SEO
- [ ] Playwright: all smoke tests pass
- [ ] Placeholder audit: full list of content needing replacement
- [ ] Production deployment live and accessible

---

## 15. Risk & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tailwind CSS v4 incompatibility with `create-next-app` | Medium | Medium | Check version after scaffold; downgrade to v3 or manually configure v4 if needed |
| R3F performance issues on low-end devices | Medium | High | Device detection + static fallback; cap pixel ratio; Phase 7 is isolated so issues don't block other work |
| GSAP ScrollTrigger conflicts with Next.js App Router | Medium | Medium | Register ScrollTrigger in a `useLayoutEffect` with cleanup; test in both dev and production builds |
| shadcn/ui component version mismatches | Low | Low | Pin versions; use `--overwrite` flag if needed |
| Large bundle size from 3D dependencies | Medium | Medium | Dynamic import R3F scene; tree-shake drei; analyze bundle with `@next/bundle-analyzer` |
| Placeholder content left in production | Low | High | Phase 8 includes grep audit; CI could include a placeholder check |

---

## 16. Open Questions for You

> [!IMPORTANT]
> Please review and answer these before I begin execution:

1. **Domain & Branding:** Do you have an existing SWE MIT-WPU logo (SVG preferred)? If not, I'll create a clean text-based logo mark.

2. **Color preference:** I've proposed deep violet (`#4A3AFF`) as the accent. Would you prefer a different accent color (e.g., graphite-blue, teal, SWE's official purple `#5B2C8C`)?

3. **Contact form backend:** Should I configure Resend (requires an API key) or Formspree (requires a form ID), or just log to console for v1?

4. **Dark mode:** The design system includes dark mode tokens. Should I implement a light/dark toggle for v1, or ship light-only?

5. **Social links:** Which platforms should appear in the footer/contact? (Instagram, LinkedIn, Twitter/X, YouTube, Discord, etc.)

6. **Real content:** Do you have any real content ready to populate (team photos, event descriptions, testimonials), or should everything be `__PLACEHOLDER__` for now?

7. **Deployment:** Do you have a Vercel account linked to this GitHub repo, or should I include setup instructions?

---

> [!NOTE]
> **Estimated execution time:** ~6–8 hours across all 9 phases. Each phase will be built, launched in the browser, and verified before moving to the next.

**Awaiting your approval to begin Phase 0.** ✦
