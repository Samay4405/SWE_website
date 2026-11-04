# Society of Women Engineers (SWE) — MIT-WPU Student Chapter

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

> **"Engineering the Future, Together."**  
> Official web platform for the Society of Women Engineers (SWE) Student Chapter at MIT World Peace University (MIT-WPU), Pune, India.

---

## 🌟 Architecture & Features

This platform is a high-performance marketing and community portal built to represent a serious, modern collegiate engineering organization.

- **Hero Constellation Canvas:** High-efficiency Canvas 2D progressive constellation featuring 10 prominent women-in-STEM pioneers with damped velocity physics, division-by-zero guards, keyboard focusable nodes, and responsive glass tooltip cards.
- **Immediate LCP Headline & Stabilized Typewriter:** Server-rendered Instrument Serif italic display typography with a fixed-width rotating typewriter container that eliminates layout shift (CLS < 0.05).
- **Editorial About Section:** MagicUI pixel-reveal photography with touch and keyboard interaction, complemented by 4 core chapter value pillars (Community, Inclusion, Learning, Leadership).
- **Physics Events Horizontal Carousel:** Physics-driven horizontal timeline with spring momentum, snap-to-card settling, active-card links to `/events/[slug]`, accessible 44px arrow controls, and a restored `/events` directory page with category filtering.
- **Dual 3D Cylindrical Team Carousels:** Cylindrical 3D perspective carousels for the Core Executive Board (8) and Department Heads (14), featuring reduced-motion flat scrollers, live screen-reader announcements, and blur-placeholder images.
- **"Stories That Stay" Impact Section:** Alumnae reflection cards framed with continuous conic gradient borders and zero-layout-thrash cursor spotlights updated via rAF, backed by authentic chapter impact statistics.
- **Accessible Visual Archive & Lightbox:** Responsive masonry gallery serving optimized responsive formats via Next.js `Image`, with a WCAG 2.2 AA compliant modal lightbox featuring focus trapping, Escape key closing, and arrow key navigation.
- **Campus Desk & Contact Form:** Live IST chapter office hours calculation (Monday–Friday 10:00 AM – 5:30 PM IST), honeypot spam protection, true error state alerts, and polite `aria-live` clipboard confirmation.

---

## 🎨 Design System & Tokens

The design system is unified across `app/globals.css`, `lib/tokens.ts`, and `lib/animations.ts`:

### Color Roles
| Token | Hex / Value | Description |
| :--- | :--- | :--- |
| `--purple` | `#6538A5` | Primary brand purple for logos, CTAs, accents, and icons |
| `--purple-deep` | `#532D8A` | Interactive hover state for primary purple |
| `--purple-soft` | `#A78BDA` | Soft lavender borders and secondary highlights |
| `--gold` | `#F5D76E` | Brand gold accent for badges, stars, and highlights |
| `--gold-warm` | `#E8B94F` | Deep gold for quote icons and conic gradients |
| `--ink` | `#1E1033` | Deep purple-black for high-contrast primary typography |
| `--muted-text` | `#6B6385` | Accessible neutral for supporting paragraphs and dates |
| `--line` | `#E9E3FB` | Soft lavender border for cards and dividers |
| `--background` | `#FCFBFE` | Crisp off-white lavender ambient base |

### Typography Scale
- **Display Type:** `Instrument Serif` (Italic, weight 400, loaded via `next/font/google`).
- **Body & Headings:** `Inter` (weights 300, 400, 500, 600, loaded via `next/font/google`).
- **Eyebrow:** `0.6875rem` font-mono uppercase with `0.28em` tracking.
- **Fluid Heading Scale:**
  - `h1`: `clamp(2.25rem, 5.2vw, 4.25rem)` (line-height: 1.06)
  - `h2`: `clamp(1.85rem, 4vw, 3.25rem)` (line-height: 1.12)
  - `h3`: `clamp(1.25rem, 2.4vw, 1.75rem)` (line-height: 1.25)
  - Body `p`: `1.05rem` (line-height: 1.75, font-light)

### Motion Presets (`lib/animations.ts`)
- **Editorial Ease:** `[0.16, 1, 0.3, 1]`
- **Carousel Spring Glide:** `{ stiffness: 130, damping: 25, mass: 0.9 }`
- **Carousel Snap:** `{ stiffness: 85, damping: 22, mass: 0.2 }`
- **Global Reduced Motion:** All CSS animations and Framer Motion transitions honor `prefers-reduced-motion: reduce`.

---

## 📝 Content Management Guide

### Adding or Updating Events
1. **Homepage Timeline:** Update `content/timelineEvents.ts` with the event title, year, date string, description, and cover image path. Link it to a detail slug via `slug: "my-event-slug"`.
2. **Directory & Detail Pages:** Add full details in `content/events.ts` including schedule, category, speakers, and venue. The page `/events/[slug]` is generated automatically.

### Adding Team Members
Edit `content/teamData.ts`:
- Append to `coreTeamMembers` (Executive Board) or `headsTeamMembers` (Department Directors).
- Include `name`, `designation`, `photo` (`/images/team/...`), and `quote`.

### Adding Gallery Photos
Add photo entries to `galleryMasonryItems` in `components/sections/GallerySection.tsx` and `content/gallery.ts`:
- Set `width`, `height`, descriptive `title`, and accessible `alt` text.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Samay4405/SWE_website.git
cd SWE_website

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production Testing

```bash
# Type check and build optimized production bundle
npm run build

# Run automated Playwright smoke test suite
npm run test
```
