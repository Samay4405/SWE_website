"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StrokeDef {
  id: string;
  d: string;
  length: number;
  width: number;
  delay: number;
  duration: number;
  clip: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

// ── Bounded letter definitions to isolate handwriting strokes and eliminate chunky reveals ──
// Path coordinates and arc lengths mapped to the 790x514 coordinate space
const LETTERS: StrokeDef[] = [
  // ── Line 1: "swe" ──
  {
    id: "s",
    d: "M 162 238 C 164.2 230.0, 169.0 208.0, 175.0 190.0 C 181.0 172.0, 190.5 148.3, 198.0 130.0 C 205.5 111.7, 212.7 94.2, 220.0 80.0 C 227.3 65.8, 236.7 51.7, 242.0 45.0 C 247.3 38.3, 249.3 37.5, 252.0 40.0 C 254.7 42.5, 258.7 48.3, 258.0 60.0 C 257.3 71.7, 252.3 91.7, 248.0 110.0 C 243.7 128.3, 237.0 150.0, 232.0 170.0 C 227.0 190.0, 218.7 215.0, 218.0 230.0 C 217.3 245.0, 222.3 255.8, 228.0 260.0 C 233.7 264.2, 244.2 260.0, 252.0 255.0 C 259.8 250.0, 268.7 239.2, 275.0 230.0 C 281.3 220.8, 287.5 205.0, 290.0 200.0",
    length: 550,
    width: 76,
    delay: 0.15,
    duration: 0.45,
    clip: { x: 0, y: 0, w: 275, h: 270 },
  },
  {
    id: "w",
    d: "M 290 200 C 293.0 189.2, 301.7 157.0, 308.0 135.0 C 314.3 113.0, 322.7 78.0, 328.0 68.0 C 333.3 58.0, 336.7 63.0, 340.0 75.0 C 343.3 87.0, 345.3 117.5, 348.0 140.0 C 350.7 162.5, 352.3 195.8, 356.0 210.0 C 359.7 224.2, 364.7 233.3, 370.0 225.0 C 375.3 216.7, 381.7 181.7, 388.0 160.0 C 394.3 138.3, 403.0 108.7, 408.0 95.0 C 413.0 81.3, 414.7 78.0, 418.0 78.0 C 421.3 78.0, 425.0 81.3, 428.0 95.0 C 431.0 108.7, 433.0 140.0, 436.0 160.0 C 439.0 180.0, 442.0 204.2, 446.0 215.0 C 450.0 225.8, 454.3 235.8, 460.0 225.0 C 465.7 214.2, 474.0 173.3, 480.0 150.0 C 486.0 126.7, 491.3 95.0, 496.0 85.0 C 500.7 75.0, 505.3 83.3, 508.0 90.0 C 510.7 96.7, 511.3 119.2, 512.0 125.0",
    length: 850,
    width: 76,
    delay: 0.58,
    duration: 0.54,
    clip: { x: 270, y: 0, w: 235, h: 270 },
  },
  {
    id: "e",
    d: "M 512 125 C 515.0 120.0, 522.8 107.8, 530.0 95.0 C 537.2 82.2, 546.3 57.2, 555.0 48.0 C 563.7 38.8, 574.8 38.8, 582.0 40.0 C 589.2 41.2, 596.3 45.8, 598.0 55.0 C 599.7 64.2, 597.0 80.8, 592.0 95.0 C 587.0 109.2, 573.7 126.7, 568.0 140.0 C 562.3 153.3, 557.7 163.0, 558.0 175.0 C 558.3 187.0, 563.0 205.3, 570.0 212.0 C 577.0 218.7, 590.0 220.3, 600.0 215.0 C 610.0 209.7, 620.8 195.0, 630.0 180.0 C 639.2 165.0, 650.8 134.2, 655.0 125.0",
    length: 450,
    width: 76,
    delay: 1.10,
    duration: 0.38,
    clip: { x: 500, y: 0, w: 290, h: 270 },
  },

  // ── Line 2: "mit-wpu" ──
  {
    id: "m",
    d: "M 38 365 C 39.7 359.2, 45.0 340.0, 48.0 330.0 C 51.0 320.0, 53.7 302.5, 56.0 305.0 C 58.3 307.5, 60.0 330.0, 62.0 345.0 C 64.0 360.0, 65.3 395.0, 68.0 395.0 C 70.7 395.0, 74.0 359.5, 78.0 345.0 C 82.0 330.5, 87.5 315.5, 92.0 308.0 C 96.5 300.5, 101.2 295.5, 105.0 300.0 C 108.8 304.5, 112.2 319.2, 115.0 335.0 C 117.8 350.8, 119.2 393.3, 122.0 395.0 C 124.8 396.7, 128.0 359.5, 132.0 345.0 C 136.0 330.5, 141.3 315.5, 146.0 308.0 C 150.7 300.5, 156.0 295.5, 160.0 300.0 C 164.0 304.5, 167.5 319.2, 170.0 335.0 C 172.5 350.8, 171.3 385.0, 175.0 395.0 C 178.7 405.0, 185.3 402.5, 192.0 395.0 C 198.7 387.5, 208.3 360.8, 215.0 350.0 C 221.7 339.2, 229.2 333.3, 232.0 330.0",
    length: 670,
    width: 70,
    delay: 1.68,
    duration: 0.48,
    clip: { x: 0, y: 270, w: 236, h: 244 },
  },
  {
    id: "i",
    d: "M 232 330 C 233.0 335.8, 236.3 352.5, 238.0 365.0 C 239.7 377.5, 239.2 397.8, 242.0 405.0 C 244.8 412.2, 250.3 413.0, 255.0 408.0 C 259.7 403.0, 265.5 386.3, 270.0 375.0 C 274.5 363.7, 280.0 345.8, 282.0 340.0",
    length: 170,
    width: 65,
    delay: 2.14,
    duration: 0.18,
    clip: { x: 224, y: 270, w: 60, h: 244 },
  },
  {
    id: "t",
    d: "M 285 270 C 285.2 278.3, 285.8 303.3, 286.0 320.0 C 286.2 336.7, 285.7 355.8, 286.0 370.0 C 286.3 384.2, 284.8 398.7, 288.0 405.0 C 291.2 411.3, 298.3 413.0, 305.0 408.0 C 311.7 403.0, 324.2 380.5, 328.0 375.0",
    length: 200,
    width: 65,
    delay: 2.30,
    duration: 0.20,
    clip: { x: 278, y: 250, w: 65, h: 264 },
  },
  {
    id: "hyphen",
    d: "M 355 372 C 358.3 371.7, 366.7 371.0, 375.0 370.0 C 383.3 369.0, 400.0 366.7, 405.0 366.0",
    length: 55,
    width: 50,
    delay: 2.48,
    duration: 0.10,
    clip: { x: 340, y: 340, w: 70, h: 80 },
  },
  {
    id: "w2",
    d: "M 412 340 C 413.3 336.3, 417.0 317.2, 420.0 318.0 C 423.0 318.8, 427.0 333.0, 430.0 345.0 C 433.0 357.0, 435.0 380.0, 438.0 390.0 C 441.0 400.0, 444.3 403.3, 448.0 405.0 C 451.7 406.7, 456.0 410.0, 460.0 400.0 C 464.0 390.0, 469.0 358.7, 472.0 345.0 C 475.0 331.3, 475.8 318.0, 478.0 318.0 C 480.2 318.0, 482.7 333.0, 485.0 345.0 C 487.3 357.0, 489.5 380.0, 492.0 390.0 C 494.5 400.0, 496.7 403.3, 500.0 405.0 C 503.3 406.7, 507.7 409.2, 512.0 400.0 C 516.3 390.8, 522.0 361.7, 526.0 350.0 C 530.0 338.3, 534.3 333.3, 536.0 330.0",
    length: 400,
    width: 70,
    delay: 2.58,
    duration: 0.28,
    clip: { x: 405, y: 270, w: 125, h: 244 },
  },
  {
    id: "p",
    d: "M 548 318 C 547.7 328.3, 547.0 359.7, 546.0 380.0 C 545.0 400.3, 543.7 419.7, 542.0 440.0 C 540.3 460.3, 536.7 503.7, 536.0 502.0 C 535.3 500.3, 536.3 455.3, 538.0 430.0 C 539.7 404.7, 541.5 369.2, 546.0 350.0 C 550.5 330.8, 556.8 320.3, 565.0 315.0 C 573.2 309.7, 586.7 312.2, 595.0 318.0 C 603.3 323.8, 612.2 338.8, 615.0 350.0 C 617.8 361.2, 615.8 375.8, 612.0 385.0 C 608.2 394.2, 599.3 401.7, 592.0 405.0 C 584.7 408.3, 575.0 406.7, 568.0 405.0 C 561.0 403.3, 548.3 397.5, 550.0 395.0 C 551.7 392.5, 567.2 391.7, 578.0 390.0 C 588.8 388.3, 608.8 385.8, 615.0 385.0",
    length: 625,
    width: 70,
    delay: 2.84,
    duration: 0.38,
    clip: { x: 525, y: 270, w: 110, h: 244 },
  },
  {
    id: "u",
    d: "M 625 365 C 627.8 359.2, 637.0 337.5, 642.0 330.0 C 647.0 322.5, 651.2 315.8, 655.0 320.0 C 658.8 324.2, 662.2 340.8, 665.0 355.0 C 667.8 369.2, 668.7 396.7, 672.0 405.0 C 675.3 413.3, 680.0 417.5, 685.0 405.0 C 690.0 392.5, 697.0 344.2, 702.0 330.0 C 707.0 315.8, 711.7 315.0, 715.0 320.0 C 718.3 325.0, 719.5 345.8, 722.0 360.0 C 724.5 374.2, 725.7 397.5, 730.0 405.0 C 734.3 412.5, 741.7 415.0, 748.0 405.0 C 754.3 395.0, 764.7 355.0, 768.0 345.0",
    length: 440,
    width: 70,
    delay: 3.20,
    duration: 0.28,
    clip: { x: 630, y: 270, w: 160, h: 244 },
  },
  {
    id: "i_dot",
    d: "M 233 292 C 235 292, 237 292, 237 292",
    length: 10,
    width: 40,
    delay: 3.48,
    duration: 0.08,
    clip: { x: 220, y: 270, w: 45, h: 45 },
  },
  {
    id: "t_cross",
    d: "M 260 328 C 264.2 327.3, 275.3 325.7, 285.0 324.0 C 294.7 322.3, 312.5 319.0, 318.0 318.0",
    length: 60,
    width: 40,
    delay: 3.54,
    duration: 0.14,
    clip: { x: 250, y: 305, w: 80, h: 35 },
  },
];

interface HandwrittenTitleProps {
  onAnimationComplete?: () => void;
  className?: string;
}

export function HandwrittenTitle({
  onAnimationComplete,
  className = "",
}: HandwrittenTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const isEffectiveFinished = Boolean(prefersReducedMotion || isAnimationFinished);

  useEffect(() => {
    if (prefersReducedMotion) {
      onAnimationComplete?.();
      return;
    }

    const totalDurationMs = 3750;
    const timer = setTimeout(() => {
      setIsAnimationFinished(true);
      onAnimationComplete?.();
    }, totalDurationMs);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, animationKey, onAnimationComplete]);

  const handleReplay = () => {
    if (prefersReducedMotion) return;
    setIsAnimationFinished(false);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onClick={handleReplay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleReplay();
      }}
      title="Click to replay handwriting animation"
      aria-label="SWE MIT-WPU handwritten title"
    >
      {/* ── Signature Box: sized 10-15% larger with refined negative space ── */}
      <div className="relative w-full max-w-[260px] sm:max-w-[330px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px] aspect-[790/514]">
        <svg
          key={animationKey}
          viewBox="0 0 790 514"
          className="w-full h-full drop-shadow-[0_4px_24px_rgba(255,255,255,0.28)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Clipart boundaries to isolate each letter strictly and eliminate premature bleeding */}
            {LETTERS.map((letter) => (
              <clipPath
                key={`clip-${letter.id}`}
                id={`clip-${letter.id}-${animationKey}`}
              >
                <rect
                  x={letter.clip.x}
                  y={letter.clip.y}
                  width={letter.clip.w}
                  height={letter.clip.h}
                />
              </clipPath>
            ))}

            {/* Unified handwriting reveal mask */}
            <mask
              id={`handwriting-mask-${animationKey}`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="790"
              height="514"
            >
              <rect width="790" height="514" fill="black" />

              {/* When animation finishes, unmask entire artwork for 100% crispness */}
              {isEffectiveFinished ? (
                <rect width="790" height="514" fill="white" />
              ) : (
                <g fill="none">
                  {LETTERS.map((letter) => (
                    <g
                      key={letter.id}
                      clipPath={`url(#clip-${letter.id}-${animationKey})`}
                    >
                      <motion.path
                        d={letter.d}
                        stroke="white"
                        strokeWidth={letter.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={letter.length}
                        initial={
                          prefersReducedMotion
                            ? { strokeDashoffset: 0, opacity: 1 }
                            : { strokeDashoffset: letter.length, opacity: 0 }
                        }
                        animate={{ strokeDashoffset: 0, opacity: 1 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                strokeDashoffset: {
                                  delay: letter.delay,
                                  duration: letter.duration,
                                  ease: [0.33, 1, 0.68, 1],
                                },
                                opacity: {
                                  delay: letter.delay,
                                  duration: 0.04,
                                },
                              }
                        }
                      />
                    </g>
                  ))}
                </g>
              )}
            </mask>
          </defs>

          {/* ── The authentic cursive brush alphabets revealed progressively by the handwriting mask ── */}
          <image
            href="/images/hero/swe-title-transparent.png"
            x="0"
            y="0"
            width="790"
            height="514"
            mask={`url(#handwriting-mask-${animationKey})`}
            preserveAspectRatio="xMidYMid meet"
          />

          {/* ── Active Pen Stroke Guide: fine white line leading the handwriting ink ── */}
          {!isEffectiveFinished && (
            <g fill="none" opacity="0.65">
              {LETTERS.map((letter) => (
                <g
                  key={`guide-${letter.id}`}
                  clipPath={`url(#clip-${letter.id}-${animationKey})`}
                >
                  <motion.path
                    d={letter.d}
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={letter.length}
                    initial={{ strokeDashoffset: letter.length, opacity: 0 }}
                    animate={{ strokeDashoffset: 0, opacity: 1 }}
                    transition={{
                      strokeDashoffset: {
                        delay: letter.delay,
                        duration: letter.duration,
                        ease: [0.33, 1, 0.68, 1],
                      },
                      opacity: {
                        delay: letter.delay,
                        duration: 0.04,
                      },
                    }}
                  />
                </g>
              ))}
            </g>
          )}
        </svg>

        {/* Ambient subtle light glow beneath the title */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-15 bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
