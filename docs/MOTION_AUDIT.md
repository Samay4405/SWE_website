# SWE MIT-WPU — Motion System & Interaction Audit

> **Document Type:** Technical & Creative Motion Audit  
> **Target:** Design + Motion Revamp (Premium, Luminous, Editorial)  
> **Branch:** `experimental_stuff`  
> **Status:** Step 0 Complete — Baseline for Implementation

---

## 1. Existing Animation & Interaction Inventory

| Surface / Component | Technique / Library | Current Behavior | Performance Cost | Inconsistencies & Gaps |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Constellation** | Canvas 2D + rAF | 10 pioneer nodes with orbital restoration, mouse repulsion, connection lines. | Low–Medium (DPR 2, single rAF, paused offscreen). | Lacks depth layers (flat canvas); no shooting star event; node click has no ripple cascade to neighbor nodes; card reveal is sudden. |
| **Hero Typewriter** | `setInterval` + React state | Fixed-width container, single word cycling with blinking cursor. | Negligible CPU. | Word changes via text-slice rather than an elegant vertical flip or 3D letter morph; no character blur transition. |
| **Hero CTAs** | CSS Tailwind transitions | `transition-all duration-300`, simple arrow `translate-x-0.5`. | Negligible. | No magnetic cursor attraction; no sheen sweep; no tactile press-down scale; arrow does not glide with spring. |
| **Navbar** | Framer Motion (`layoutId`) + CSS | Floating translucent purple box follows active hovered link; scroll-spy updates section. | Low (GPU layoutId). | Links lack animated drawing underlines; no scroll progress bar; mobile drawer hamburger icon does not morph into an 'X'. |
| **About (Pixel Photo)** | Canvas 2D + CSS | MagicUI PixelImage reveals on hover/touch. | Medium on pixelation trigger. | Card has no 3D cursor-follow tilt; lacks floating status badge; value pillars enter statically without SVG stroke draw. |
| **Events Carousel** | Framer Motion `motion.div` | Drag-based horizontal scrolling with spring snap. | Low–Medium (transforms only). | Active card does not scale dynamically; neighbor cards do not blur; drag velocity does not modulate carousel tick indicators. |
| **Team 3D Cylinders** | CSS 3D transforms + pointer events | Cylindrical rotational carousel with manual drag matrix math. | Medium (3D perspective rasterization). | Drag stops abruptly without momentum inertia; no velocity motion blur; counter digits don't roll; member cards lack 3D lift. |
| **Impact ("Stories That Stay")** | CSS `@keyframes` + rAF CSS vars | Conic gradient rotating border, rAF updates `--mx`/`--my` for radial spotlight. | Low (CSS variables, 0 React re-renders). | Border rotation speed is static on hover; spotlight lacks smooth lerp smoothing; quote marks don't animate; no pausable timer ring. |
| **Gallery & Lightbox** | CSS columns + Framer Motion | Masonry layout, hover zoom, AnimatePresence modal overlay. | Low. | Entrance is not staggered; lightbox opens with generic scale rather than shared-element FLIP transition from thumbnail; no drag-to-dismiss. |
| **Contact Form** | React state + CSS transitions | Form validation, clipboard copy feedback via text switch, pulsing dot for IST hours. | Low. | Labels are static (not floating); error validation has no shake; copy action lacks confetti/sparkle burst; submit button does not morph to spinner. |
| **Ambient Blobs** | CSS `@keyframes blobDrift` | 8 radial gradient divs with 40px blur, translate3d animation. | Low–Medium (large blur filters). | Motion is repetitive linear drift; does not react to scroll velocity; lacks subtle organic distortion. |
| **Theme Toggle** | Framer Motion + GPU View Transition | Sun/Moon rotation + GPU View Transition with PaintSplashWave canvas. | Low (GPU clip-path). | Works well, can be further integrated with the global magnetic and sheen interaction language. |

---

## 2. Inconsistencies & Systemic Issues Identified

1. **Duration Fragmentation**:
   - Currently scattered across arbitrary values: `150ms`, `200ms`, `300ms`, `400ms`, `500ms`, `650ms`, `750ms`, `820ms`.
   - *Fix*: Standardize on 5 semantic duration tokens: `instant` (100ms), `fast` (180ms), `base` (280ms), `slow` (480ms), and `cinematic` (800ms+).

2. **Easing Mismatch**:
   - The codebase mixes `linear`, `ease-in-out`, `cubic-bezier(0.16, 1, 0.3, 1)`, and `cubic-bezier(0.25, 0.1, 0.25, 1)`.
   - *Fix*: Consolidate into 3 cubic-bezier curves (standard, emphasised-out, emphasised-in) and 3 Framer Motion spring presets (snappy, smooth, bouncy).

3. **Missing Micro-Interactions**:
   - **Buttons**: Lack magnetic pull toward the cursor, sweeping sheen highlights, and click ripples.
   - **Links**: Lack animated left-to-right draw-and-retract underlines.
   - **Cards**: Lack cursor-tracking 3D tilt (max 6°) and lifted elevation shadows.
   - **Success Feedback**: Clipboard copy and form submission use plain text swaps with no particle or sparkle reward.
   - **Custom Cursor**: Desktop users currently have a default system pointer with no contextual guidance ("Drag" on carousels, "View" on photos).

4. **Scroll Choreography Deficits**:
   - Scrolling is currently native browser jump without unified inertia or scroll progress indication.
   - Section reveals fire as simple block fades rather than editorial masked line reveals.

---

## 3. Proposed Motion Architecture (`lib/motion.ts`)

```typescript
// Semantic Durations (seconds & ms)
export const DURATION = {
  instant: 0.1,    // 100ms - micro-toggles, active states
  fast: 0.18,      // 180ms - hover sheens, tooltips, icon snaps
  base: 0.28,      // 280ms - standard card transitions, drawers
  slow: 0.48,      // 480ms - section reveals, modal entrances
  cinematic: 0.85, // 850ms - hero transitions, route morphs
} as const;

// Curated Easing Curves
export const EASING = {
  standard: [0.2, 0.0, 0.0, 1.0],      // General UI transitions
  emphasisedOut: [0.16, 1.0, 0.3, 1.0], // Editorial entrances (decelerate)
  emphasisedIn: [0.7, 0.0, 0.84, 0.0],  // Exits (accelerate)
} as const;

// Physical Spring Presets
export const SPRINGS = {
  snappy: { stiffness: 420, damping: 28, mass: 0.8 },  // Button press, toggles
  smooth: { stiffness: 220, damping: 24, mass: 1.0 },  // Cards, carousels, cursor
  bouncy: { stiffness: 320, damping: 16, mass: 0.9 },  // Micro-badges, sparkles
} as const;
```

---

## 4. 10-Line Hero Upgrade Plan

1. **Parallax Depth Layering**: Split the hero background into 3 distinct z-depth layers (distant starfield particles, interactive constellation, ambient violet-gold radial glow) with subtle $\pm 24\text{px}$ pointer-driven parallax.
2. **Organic Node Respiration**: Pioneer nodes pulse with a gentle, out-of-sync breathing glow (using a harmonic sin function) when idle to feel alive.
3. **Shooting Star Ambient Event**: Add a rare, celestial shooting star that subtly streaks across the upper canvas once every 24–36 seconds with an atmospheric particle tail.
4. **Node Click Ripple Cascade**: Clicking or tapping any pioneer star sends a radiant shockwave ring through all connected constellation lines to neighboring nodes.
5. **Spring Pioneer Glass Card**: Expand the selected pioneer info card using `SPRINGS.snappy` with soft glassmorphism (`backdrop-blur-md`, 1px gold/purple border, delicate inner highlight).
6. **Masked Editorial Headline Entrance**: Reveal the main headline (`Engineering the Future, Together`) line-by-line using vertical clipping masks (`overflow: hidden`) with serif italic words transitioning from a gentle blur to sharp focus.
7. **3D Flipping Word Carousel**: Replace the plain slice-based typewriter with a smooth vertical 3D rotating flip effect that morphs each keyword (*innovate, lead, grow*) with spring inertia.
8. **Magnetic Primary CTA**: Primary button (*Join SWE MIT-WPU*) pulls magnetically toward the cursor (max 8px) with a spring release on mouse-leave.
9. **Sweeping Sheen Highlight**: An angled, luminous white-gold sheen sweeps across the primary CTA on hover, accompanied by a sliding arrow ($+4\text{px}$).
10. **Touch & Reduced-Motion Fallback**: Automatically bypass all mouse parallax and physics on touchscreens or when `prefers-reduced-motion` is detected, rendering a crisp, static SVG constellation with instant tooltips.
