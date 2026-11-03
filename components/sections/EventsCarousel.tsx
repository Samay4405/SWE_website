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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { capturePointer, releasePointer, TOUCH_GESTURE_CLASS } from "@/lib/touch";
import { cn } from "@/lib/utils";
import {
  timelineEventsData,
  type TimelineEventItem,
} from "@/content/timelineEvents";

// ── Physical / spring coefficients adapted for editorial fluidity ──
const GLIDE_SPRING = { stiffness: 130, damping: 25, mass: 0.9 };
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
              ? "border-[#6d28d9]/40 shadow-[0_18px_42px_-14px_rgba(109,40,217,0.22)] ring-1 ring-[#6d28d9]/15"
              : "border-[#e9e3fb] shadow-[0_10px_28px_-16px_rgba(109,40,217,0.12)] hover:border-[#6d28d9]/30",
          )}
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {/* TOP: Image Header (Notion-style cover banner) */}
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

          {/* BOTTOM: Clean Semi-transparent Content Area */}
          <div className="relative flex flex-col justify-between p-4 sm:p-5 bg-transparent text-left min-h-[148px]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  id={`${id}-date`}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#6b6385] font-normal"
                >
                  {event.dateDisplay}
                </span>
              </div>

              <h3
                id={`${id}-title`}
                className="font-semibold text-[16px] sm:text-[17px] text-[#1e1033] tracking-tight line-clamp-1"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                {event.title}
              </h3>

              <p
                className={`mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6b6385] ${
                  [
                    "orientation-2025",
                    "icebreaker-batch-ceremony-2025",
                    "resq-centre-visit-2025",
                    "icebreaker-2026",
                  ].includes(event.id)
                    ? "line-clamp-4"
                    : "line-clamp-3"
                } font-light`}
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {event.description}
              </p>
            </div>
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
          className="absolute inset-0 cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9] focus-visible:ring-offset-2"
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
            i === middle ? "bg-[#6d28d9]/40" : "bg-[#6d28d9]/18",
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

  // Card width tailored to 340-370px on desktop with responsive mobile/tablet bounds
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
        ...GLIDE_SPRING,
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

  // Global window arrow key listener when hover/focused inside events
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        select(Math.max(0, latest.current.activeIndex - 1));
      } else if (e.key === "ArrowRight") {
        select(Math.min(latest.current.last, latest.current.activeIndex + 1));
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [select]);

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

  // Horizontal mouse wheel gesture
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

  // Entrance animation variants triggered when section enters viewport
  const headerVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const subtitleVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const timelineStageVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.22,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="events"
      className="relative w-full bg-transparent overflow-hidden select-none py-12 sm:py-16 md:py-20 flex flex-col justify-center min-h-[calc(100svh-90px)]"
      aria-label="Events and Workshops Timeline"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* ── 1. Heading & Subtitle Sequence ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10"
        >
          {/* Heading */}
          <motion.h2
            variants={headerVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1e1033] leading-tight"
            style={{
              fontFamily: "Inter, var(--font-sans), system-ui, sans-serif",
              letterSpacing: "-0.035em",
            }}
          >
            Stories We&apos;ve{" "}
            <em
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: "italic",
                fontWeight: 400,
                color: "#6d28d9",
                letterSpacing: "-0.01em",
              }}
            >
              Created
            </em>
            .
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariant}
            className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-[#6b6385] max-w-2xl font-light leading-relaxed"
            style={{
              fontFamily: "Inter, var(--font-sans), system-ui, sans-serif",
              fontWeight: 300,
              color: "#6b6385",
            }}
          >
            A collection of events, experiences and moments that make our journey memorable.
          </motion.p>
        </motion.div>

        {/* ── 2. Interactive Horizontal Timeline Stage ── */}
        <motion.div
          variants={timelineStageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative w-full"
        >
          {/* Editorial Edge Vignettes (Soft left and right stage fade) */}
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
            aria-label="Events Horizontal Timeline. Drag or use arrow keys."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "relative w-full cursor-grab overflow-hidden active:cursor-grabbing",
              TOUCH_GESTURE_CLASS,
            )}
            style={{
              height: "410px",
            }}
          >
            {/* Small Connecting Tick Marks in gaps between adjacent cards */}
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
            <ul className="absolute inset-0 m-0 p-0">
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
        </motion.div>

        {/* ── 3. Event Navigation Controls ── */}
        <div className="relative z-20 mx-auto mt-4 flex w-full items-center justify-center px-2 sm:mt-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => select(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous event"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e3fb] bg-white text-[#6d28d9] shadow-xs transition-all duration-200 hover:border-[#6d28d9] hover:bg-[#f3edff] hover:text-[#1e1033] disabled:pointer-events-none disabled:opacity-35 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => select(Math.min(last, activeIndex + 1))}
              disabled={activeIndex === last}
              aria-label="Next event"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e3fb] bg-white text-[#6d28d9] shadow-xs transition-all duration-200 hover:border-[#6d28d9] hover:bg-[#f3edff] hover:text-[#1e1033] disabled:pointer-events-none disabled:opacity-35 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
