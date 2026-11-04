"use client";

import {
  animate,
  type AnimationPlaybackControls,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { capturePointer, releasePointer, TOUCH_GESTURE_CLASS } from "@/lib/touch";
import { cn } from "@/lib/utils";
import { SPRING_GLIDE, EASE_EDITORIAL } from "@/lib/animations";
import {
  timelineEventsData,
  type TimelineEventItem,
} from "@/content/timelineEvents";

// ── Physical / spring coefficients adapted for editorial fluidity ──
const FLICK_MOMENTUM = 0.32;
const MAX_FLICK_EVENTS = 3;
const DRAG_THRESHOLD = 4;
const RUBBER_BAND = 0.28;

// Scale and dimming for neighbouring cards
const SIDE_SCALE = 0.78;
const SIDE_DIM = 0.38;

// Vertical center of the cards within the stage
const CARD_CENTER = 0.44;

// Gap ticks: refined, minimal lines positioned strictly between adjacent cards
const GAP_TICKS = 5;
const GAP_TICK_SPAN = 0.65;
const TICK_SHORT = 0.08;
const TICK_TALL = 0.14;

type Geometry = {
  step: number;
  cardWidth: number;
  near: number;
  halfWidth: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cardX(o: number, { step, near }: Geometry) {
  const a = Math.abs(o);
  return Math.sign(o) * (a <= 1 ? a * near : near + (a - 1) * step);
}

function cardScale(o: number) {
  return 1 - (1 - SIDE_SCALE) * Math.min(Math.abs(o), 1);
}

// ── Refined Event Card with Cover Image Header and Crisp Content Area ──
function TimelineEventCard({
  scroll,
  index,
  geometry,
  event,
  active,
  onSelect,
  onKeyDown,
  buttonRef,
}: {
  scroll: MotionValue<number>;
  index: number;
  geometry: Geometry;
  event: TimelineEventItem;
  active: boolean;
  onSelect: (index: number) => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLButtonElement>, index: number) => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const id = useId();
  const { cardWidth } = geometry;
  const offset = useTransform(scroll, (s) => index - s);
  const x = useTransform(offset, (o) => cardX(o, geometry));
  const scale = useTransform(offset, cardScale);
  const zIndex = useTransform(offset, (o) => 100 - Math.round(Math.abs(o) * 10));
  const veilOpacity = useTransform(
    offset,
    (o) => SIDE_DIM * Math.min(Math.abs(o), 1),
  );

  return (
    <motion.li
      data-slot="timeline-event"
      data-active={active || undefined}
      className="absolute left-1/2 list-none"
      style={{
        top: `${CARD_CENTER * 100}%`,
        x,
        scale,
        zIndex,
        width: cardWidth,
        marginLeft: -cardWidth / 2,
      }}
    >
      <div className="relative -translate-y-1/2">
        <div
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300",
            active
              ? "border-[#6538A5]/40 shadow-[0_18px_42px_-14px_rgba(101,56,165,0.22)] ring-1 ring-[#6538A5]/20"
              : "border-[#E9E3FB] shadow-[0_10px_28px_-16px_rgba(101,56,165,0.12)] hover:border-[#6538A5]/30",
          )}
          style={{
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* TOP: Image Header */}
          <div className="relative w-full h-[168px] sm:h-[180px] overflow-hidden bg-[#F2EFF7] flex-shrink-0">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 370px"
              className="object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index < 3}
            />
            {/* Subtle top edge shine and gradient vignette */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60"
              aria-hidden="true"
            />
          </div>

          {/* BOTTOM: Clean Content Area */}
          <div className="relative flex flex-col justify-between p-4 sm:p-5 bg-transparent text-left min-h-[160px]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  id={`${id}-date`}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#6B6385] font-medium"
                >
                  {event.dateDisplay}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F6F2FC] text-[#6538A5] border border-[#E9E3FB]">
                  {event.yearLabel}
                </span>
              </div>

              <h3
                id={`${id}-title`}
                className="font-semibold text-[16px] sm:text-[17px] text-[#1E1033] tracking-tight line-clamp-1"
              >
                {event.title}
              </h3>

              <p
                className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6B6385] font-light line-clamp-3"
              >
                {event.description}
              </p>
            </div>

            {/* View Details Link on Active Card */}
            {active && event.slug && (
              <div className="mt-3.5 pt-2.5 border-t border-[#E9E3FB] flex items-center justify-between z-20 relative">
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6538A5] hover:text-[#532D8A] transition-colors group/link focus-visible:outline-none focus-visible:underline"
                >
                  <span>View Details &amp; Registration</span>
                  <ArrowRight className="size-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {/* Side veil for non-active neighbours (softly dims without disappearing) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#FCFBFE]"
            style={{ opacity: veilOpacity }}
          />
        </div>

        {/* Full surface clickable button */}
        <button
          ref={buttonRef}
          type="button"
          tabIndex={active ? 0 : -1}
          aria-current={active ? "step" : undefined}
          aria-labelledby={`${id}-title ${id}-date`}
          onClick={() => onSelect(index)}
          onKeyDown={(e) => onKeyDown(e, index)}
          className="absolute inset-0 cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5] focus-visible:ring-offset-2 z-10"
        />
      </div>
    </motion.li>
  );
}

// ── Subtle Connecting Tick Marks Between Adjacent Cards ──
function GapTicks({
  scroll,
  index,
  geometry,
  gap,
}: {
  scroll: MotionValue<number>;
  index: number;
  geometry: Geometry;
  gap: number;
}) {
  const { cardWidth } = geometry;
  const x = useTransform(scroll, (s) => {
    const o = index - s;
    const right = cardX(o, geometry) + (cardWidth * cardScale(o)) / 2;
    const left = cardX(o + 1, geometry) - (cardWidth * cardScale(o + 1)) / 2;
    return (right + left) / 2;
  });

  const spacing = (gap * GAP_TICK_SPAN) / (GAP_TICKS - 1);
  const middle = (GAP_TICKS - 1) / 2;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center z-0"
      style={{ x, top: `${CARD_CENTER * 100}%`, gap: spacing - 1 }}
    >
      {Array.from({ length: GAP_TICKS }, (_, i) => (
        <span
          key={i}
          className={cn(
            "block w-0.5 rounded-full transition-colors",
            i === middle ? "bg-[#6538A5]/40" : "bg-[#6538A5]/18",
          )}
          style={{
            height: cardWidth * (i === middle ? TICK_TALL : TICK_SHORT),
          }}
        />
      ))}
    </motion.div>
  );
}

export function EventsCarousel() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const events = timelineEventsData;
  const total = events.length;
  const last = Math.max(0, total - 1);

  const [activeIndex, setActiveIndex] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(900);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setStageWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => {
      setStageWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Responsive card geometry
  const cardWidth = Math.min(
    360,
    stageWidth * (stageWidth < 640 ? 0.8 : stageWidth < 1024 ? 0.46 : 0.32),
  );

  const gap = clamp(cardWidth * 0.22, 36, 68);
  const geometry: Geometry = {
    step: cardWidth * SIDE_SCALE + gap,
    cardWidth,
    near: (cardWidth * (1 + SIDE_SCALE)) / 2 + gap,
    halfWidth: stageWidth / 2,
  };
  const { step } = geometry;

  const scroll = useMotionValue(0);
  const glideRef = useRef<AnimationPlaybackControls | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const latest = useRef({ events, activeIndex, step, last });
  useLayoutEffect(() => {
    latest.current = { events, activeIndex, step, last };
  });

  const glidingRef = useRef(false);

  const commit = useCallback((index: number) => {
    const current = latest.current;
    if (index === current.activeIndex) return;
    current.activeIndex = index;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    return scroll.on("change", (v) => {
      if (glidingRef.current) return;
      commit(clamp(Math.round(v), 0, latest.current.last));
    });
  }, [scroll, commit]);

  const stopGlide = useCallback(() => {
    glidingRef.current = false;
    glideRef.current?.stop();
    glideRef.current = null;
  }, []);

  const glideTo = useCallback(
    (to: number, velocity = scroll.getVelocity()) => {
      stopGlide();
      commit(to);
      if (prefersReducedMotion) {
        scroll.set(to);
        return;
      }
      glidingRef.current = true;
      glideRef.current = animate(scroll, to, {
        type: "spring",
        ...SPRING_GLIDE,
        velocity,
        restDelta: 0.001,
        onComplete: () => {
          glidingRef.current = false;
          glideRef.current = null;
        },
      });
    },
    [scroll, stopGlide, commit, prefersReducedMotion],
  );

  const settle = useCallback(
    (velocity: number) => {
      const projected =
        scroll.get() +
        clamp(velocity * FLICK_MOMENTUM, -MAX_FLICK_EVENTS, MAX_FLICK_EVENTS);
      glideTo(clamp(Math.round(projected), 0, latest.current.last), velocity);
    },
    [scroll, glideTo],
  );

  const select = useCallback(
    (index: number, focus = false) => {
      const target = clamp(index, 0, latest.current.last);
      glideTo(target);
      if (focus) buttonsRef.current[target]?.focus({ preventScroll: true });
    },
    [glideTo],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
      const next =
        e.key === "ArrowRight"
          ? index + 1
          : e.key === "ArrowLeft"
            ? index - 1
            : e.key === "Home"
              ? 0
              : e.key === "End"
                ? latest.current.last
                : null;
      if (next === null) return;
      e.preventDefault();
      select(next, true);
    },
    [select],
  );

  // Pointer drag gestures
  const draggingRef = useRef(false);
  const drag = useRef({
    id: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    prevX: 0,
    prevT: 0,
  });

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    stopGlide();
    const now = performance.now();
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startScroll: scroll.get(),
      moved: false,
      lastX: e.clientX,
      lastT: now,
      prevX: e.clientX,
      prevT: now,
    };
    draggingRef.current = true;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!draggingRef.current || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      capturePointer(e.currentTarget, e.pointerId);
    }
    const raw = d.startScroll - dx / step;
    scroll.set(
      raw < 0
        ? raw * RUBBER_BAND
        : raw > last
          ? last + (raw - last) * RUBBER_BAND
          : raw,
    );
    d.prevX = d.lastX;
    d.prevT = d.lastT;
    d.lastX = e.clientX;
    d.lastT = performance.now();
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!draggingRef.current || e.pointerId !== d.id) return;
    draggingRef.current = false;
    if (!d.moved) return;
    releasePointer(e.currentTarget, e.pointerId);
    const dt = d.lastT - d.prevT;
    const vpx = dt > 0 ? (d.lastX - d.prevX) / dt : 0;
    settle((-vpx * 1000) / step);
  };

  // Wheel gesture
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let settleTimer: number | undefined;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      stopGlide();
      const { step, last } = latest.current;
      scroll.set(clamp(scroll.get() + e.deltaX / step, -0.3, last + 0.3));
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(
        () =>
          glideTo(clamp(Math.round(scroll.get()), 0, latest.current.last), 0),
        140,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settleTimer);
    };
  }, [scroll, stopGlide, glideTo]);

  useEffect(() => stopGlide, [stopGlide]);

  const headerVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_EDITORIAL },
    },
  };

  return (
    <section
      id="events"
      className="relative w-full bg-transparent overflow-hidden select-none py-16 sm:py-20 md:py-24 flex flex-col justify-center min-h-[calc(100svh-90px)]"
      aria-label="Events and Workshops Timeline"
    >
      <div className="section-container flex flex-col">
        {/* ── 1. Heading & Eyebrow ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10"
        >
          <motion.div variants={headerVariant} className="flex items-center gap-2 mb-3">
            <span className="section-eyebrow">Chapter Highlights</span>
          </motion.div>

          <motion.h2
            variants={headerVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033] leading-tight"
          >
            Stories We&apos;ve{" "}
            <span className="font-accent">Created</span>.
          </motion.h2>

          <motion.p
            variants={headerVariant}
            className="mt-3 text-sm sm:text-base md:text-lg text-[#6B6385] max-w-2xl font-light leading-relaxed"
          >
            A curated timeline of hackathons, workshops, and community moments shaping our chapter journey.
          </motion.p>
        </motion.div>

        {/* ── 2. Interactive Horizontal Timeline Stage ── */}
        <div className="relative w-full">
          {/* Edge Vignettes */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-[#FCFBFE] to-transparent z-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-[#FCFBFE] to-transparent z-20"
            aria-hidden="true"
          />

          <div
            ref={stageRef}
            aria-label="Events horizontal timeline. Drag or use arrow keys."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "relative w-full cursor-grab overflow-hidden active:cursor-grabbing",
              TOUCH_GESTURE_CLASS,
            )}
            style={{
              height: "430px",
            }}
          >
            {/* Connecting Gap Ticks */}
            {events.slice(0, -1).map((ev, i) => (
              <GapTicks
                key={ev.id}
                scroll={scroll}
                index={i}
                geometry={geometry}
                gap={gap}
              />
            ))}

            {/* Event Cards Track */}
            <ul className="absolute inset-0 m-0 p-0" role="list">
              {events.map((ev, i) => (
                <TimelineEventCard
                  key={ev.id}
                  scroll={scroll}
                  index={i}
                  geometry={geometry}
                  event={ev}
                  active={i === activeIndex}
                  onSelect={select}
                  onKeyDown={onKeyDown}
                  buttonRef={(node) => {
                    buttonsRef.current[i] = node;
                  }}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* ── 3. Navigation Controls & Pagination Dots ── */}
        <div className="relative z-20 mx-auto mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          {/* Arrow Buttons (Accessible 44px tap target) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => select(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous event slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E3FB] bg-white text-[#6538A5] shadow-xs transition-all duration-200 hover:border-[#6538A5] hover:bg-[#F6F2FC] disabled:pointer-events-none disabled:opacity-30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#E9E3FB]" role="tablist" aria-label="Event slides navigation">
              {events.map((ev, i) => (
                <button
                  key={ev.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Slide ${i + 1}: ${ev.title}`}
                  onClick={() => select(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5]",
                    i === activeIndex
                      ? "w-6 bg-[#6538A5]"
                      : "w-2.5 bg-[#E9E3FB] hover:bg-[#A78BDA]"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => select(Math.min(last, activeIndex + 1))}
              disabled={activeIndex === last}
              aria-label="Next event slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E3FB] bg-white text-[#6538A5] shadow-xs transition-all duration-200 hover:border-[#6538A5] hover:bg-[#F6F2FC] disabled:pointer-events-none disabled:opacity-30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538A5]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Directory Link CTA */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6538A5] hover:text-[#532D8A] transition-colors group px-3.5 py-1.5 rounded-full hover:bg-[#F6F2FC] border border-transparent hover:border-[#E9E3FB]"
          >
            <span>Explore All Events &amp; Workshops</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventsCarousel;
