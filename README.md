# Society of Women Engineers (SWE) — MIT-WPU Chapter Website

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

> **"Engineering the Future, Together."**  
> Official web platform for the Society of Women Engineers (SWE) Student Chapter at MIT World Peace University (MIT-WPU), Pune, India.

---

## 🌟 Overview & Key Features

This platform is a high-performance marketing and community portal built to represent a serious, modern collegiate engineering organization.

- **Hero Canvas (3D WebGL):** Interactive Three.js floating constellation node network with mouse parallax, 60fps rendering, and automatic static SVG fallback for devices with reduced-motion preferences.
- **Organizational Architecture:** 3-tier heritage visualizer (*SWE Global* → *SWE India* → *MIT-WPU Chapter*) and strategic focus areas (Technical, Leadership, Community, Career).
- **Interactive Events Directory (`/events` & `/events/[slug]`):** Real-time category filtering (Hackathons, Workshops, Talks, Networking, Competitions, Outreach), text search, dynamic schedule timelines, and speaker profiles.
- **Team Directory (`/team`):** Categorized rosters across Executive Leadership, Core Committee, and Faculty Mentors with accessible 3D-flip biography cards.
- **Impact & Growth Analytics (`/impact`):** Recharts 5-year interactive membership growth curves (2021–2025), key honors, and corporate collaborator grid.
- **Photo Gallery & Lightbox (`/gallery`):** Multi-category responsive masonry layout with keyboard-navigable full-screen modal lightbox.
- **Interactive Contact & Join (`/contact`):** Validated contact inquiry form with Next.js App Router API endpoint (`/api/contact`), campus location details, and membership FAQs.
- **Design System:** Space Grotesk display typography + Inter body text, refined neutral background palette with curated `#4A3AFF` deep violet accents.

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

---

## 🛠️ Build & Production

```bash
# Type check and build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📸 Screen Recordings & Screenshots

All visual test verification recordings and screenshots are available in the local directory:  
📂 **[`screenshots/`](./screenshots/)**

- **`final_complete_website_tour.webp`**: Comprehensive animated screen recording covering all pages, Three.js parallax, category filtering, lightbox, and form submission.
- **`impact_page_full_*.png`**: Impact analytics page showing the Recharts growth graph.
- **`gallery_masonry_grid_*.png`**: Photo gallery masonry view with filter pills.
- **`team_page_flipped_*.png`**: Interactive team cards with flipped biography states.
- **`contact_success_state_*.png`**: Contact submission confirmation state.

---

## 🏛️ Project Structure

```text
├── app/
│   ├── api/contact/route.ts    # Contact form API route handler
│   ├── contact/page.tsx        # Contact & membership page
│   ├── events/                 # Events directory & dynamic [slug] pages
│   ├── gallery/page.tsx        # Masonry photo gallery & lightbox
│   ├── impact/page.tsx         # Impact analytics & Recharts growth curves
│   ├── team/page.tsx           # Team directory with flipped bios
│   ├── layout.tsx              # Root layout with sticky Navbar & Footer
│   └── page.tsx                # Homepage assembly
├── components/
│   ├── contact/                # Contact form component
│   ├── events/                 # Event cards and directory client
│   ├── gallery/                # MasonryGrid and Lightbox
│   ├── impact/                 # Recharts GrowthChart
│   ├── layout/                 # Sticky Navbar, Footer, MobileDrawer
│   ├── sections/               # Hero, About, WhyJoin, Testimonials, Timeline, Resources, JourneyCTA
│   ├── shared/                 # AnimatedCounter, FilterPills, ScrollReveal
│   ├── three/                  # HeroCanvas (Three.js WebGL node network)
│   └── ui/                     # shadcn UI components
├── content/                    # Data models (events, team, stats, testimonials, gallery, timeline)
└── screenshots/                # Screen recordings & verification screenshots
```

---

## 📄 License
This project is licensed under the MIT License for the Society of Women Engineers, MIT-WPU Chapter.
