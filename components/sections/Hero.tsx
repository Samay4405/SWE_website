"use client";

import React, { useEffect, useRef } from "react";
import "./HeroConstellation.css";

type FamousRecord = [string, string, number, number, string];

const F: FamousRecord[] = [
  [
    "Ada Lovelace",
    "Algorithms",
    0.1,
    0.2,
    "Wrote the first published algorithm for Babbage’s Analytical Engine in the 1840s.",
  ],
  [
    "Marie Curie",
    "Radioactivity",
    0.25,
    0.12,
    "The first person to win Nobel Prizes in two different sciences, physics and chemistry.",
  ],
  [
    "Grace Hopper",
    "Compiler",
    0.07,
    0.52,
    "Built the first compiler and pushed for English-like languages that paved the way to COBOL.",
  ],
  [
    "Katherine Johnson",
    "Trajectories",
    0.2,
    0.78,
    "Her orbital calculations helped send John Glenn into orbit and astronauts to the Moon.",
  ],
  [
    "Hedy Lamarr",
    "Wireless",
    0.37,
    0.88,
    "Co-invented frequency hopping, an idea that underpins modern Wi-Fi and Bluetooth.",
  ],
  [
    "Margaret Hamilton",
    "Apollo",
    0.9,
    0.22,
    "Led the MIT team that wrote the onboard flight software for the Apollo missions.",
  ],
  [
    "Radia Perlman",
    "Networking",
    0.75,
    0.1,
    "Invented the spanning-tree protocol that keeps Ethernet networks free of loops.",
  ],
  [
    "Kalpana Chawla",
    "Astronaut",
    0.93,
    0.58,
    "The first woman of Indian origin in space, flying aboard Space Shuttle Columbia in 1997.",
  ],
  [
    "Tessy Thomas",
    "Missiles",
    0.8,
    0.8,
    "Led India’s Agni-IV and Agni-V missile projects and is known as India’s Missile Woman.",
  ],
  [
    "Anandi Gopal Joshi",
    "Medicine",
    0.63,
    0.9,
    "India’s first woman physician trained in Western medicine, graduating in 1886.",
  ],
];

const WORDS = [
  "collaborate",
  "network",
  "learn",
  "grow",
  "lead",
  "innovate",
  "inspire",
];

interface StarNode {
  nx: number;
  ny: number;
  ph: number;
  f?: number; // 1 for famous nodes
  r?: number; // radius for background nodes
  px: number;
  py: number;
  e?: HTMLDivElement;
  card?: HTMLElement | null;
  open?: boolean;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const twRef = useRef<HTMLSpanElement>(null);

  // Smooth scroll handler for Join button
  const handleJoin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el =
      document.getElementById("join") || document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "contact";
    }
  };

  // Smooth scroll handler for Explore Events button
  const handleEvents = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("events");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "events";
    }
  };

  // Typewriter effect matching the exact timing and behavior
  useEffect(() => {
    const el = twRef.current;
    if (!el) return;

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      const currentWord = WORDS[wordIdx];
      if (!isDeleting) {
        charIdx++;
        if (el) el.textContent = currentWord.slice(0, charIdx);
        if (charIdx === currentWord.length) {
          isDeleting = true;
          timer = setTimeout(step, 1500);
          return;
        }
        timer = setTimeout(step, 70);
        return;
      }
      charIdx--;
      if (el) el.textContent = currentWord.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % WORDS.length;
        timer = setTimeout(step, 300);
        return;
      }
      timer = setTimeout(step, 40);
    }

    step();

    return () => clearTimeout(timer);
  }, []);

  // Constellation Canvas & Interactive Stars Simulation
  useEffect(() => {
    const hero = heroRef.current;
    const cv = canvasRef.current;
    if (!hero || !cv) return;

    const cx = cv.getContext("2d");
    if (!cx) return;

    const m = { x: -999, y: -999 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        m.x = e.clientX - rect.left;
        m.y = e.clientY - rect.top;
      } else {
        m.x = -999;
        m.y = -999;
      }
    };

    const handlePointerLeave = () => {
      m.x = -999;
      m.y = -999;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Seeded pseudo-random generator
    let sd = 7;
    const rnd = () => {
      sd |= 0;
      sd = (sd + 0x6d2b79f5) | 0;
      let t = Math.imul(sd ^ (sd >>> 15), 1 | sd);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const createdElements: HTMLDivElement[] = [];

    /* Place each card on the side where it clears the centre content and stays on screen */
    function place(n: StarNode) {
      if (!hero || !n.card) return;
      const heroRect = hero.getBoundingClientRect();
      const W = hero.clientWidth;
      const H = hero.clientHeight;
      const c = n.card;
      const w = Math.min(310, W - 24);
      c.style.width = w + "px";
      const h = c.offsetHeight;
      const g = 28;

      let r: { l: number; t: number; r: number; b: number } | null = null;
      hero.querySelectorAll<HTMLElement>(".eb,h1,.sub,.btns").forEach((el) => {
        const b = el.getBoundingClientRect();
        const bl = b.left - heroRect.left;
        const bt = b.top - heroRect.top;
        const br = b.right - heroRect.left;
        const bb = b.bottom - heroRect.top;
        r = r
          ? {
              l: Math.min(r.l, bl),
              t: Math.min(r.t, bt),
              r: Math.max(r.r, br),
              b: Math.max(r.b, bb),
            }
          : { l: bl, t: bt, r: br, b: bb };
      });

      if (!r) {
        r = { l: W / 2 - 150, t: H / 2 - 100, r: W / 2 + 150, b: H / 2 + 100 };
      }

      const pad = 16;
      const cl = Math.max(12, Math.min(W - w - 12, n.px - w / 2));
      const ct = Math.max(12, Math.min(H - h - 12, n.py - h / 2));
      const C: [number, number][] = [
        [cl, n.py - h - g],
        [cl, n.py + g],
        [n.px + g, ct],
        [n.px - w - g, ct],
      ];
      let best = C[0];
      let bs = 1e12;
      C.forEach(([x, y]) => {
        const ox =
          Math.max(0, Math.min(x + w, r!.r + pad) - Math.max(x, r!.l - pad));
        const oy =
          Math.max(0, Math.min(y + h, r!.b + pad) - Math.max(y, r!.t - pad));
        const out =
          Math.max(0, 12 - x) +
          Math.max(0, x + w + 12 - W) +
          Math.max(0, 12 - y) +
          Math.max(0, y + h + 12 - H);
        const s = ox * oy + out * 400;
        if (s < bs) {
          bs = s;
          best = [x, y];
        }
      });
      c.style.setProperty("--cx", best[0] - n.px + "px");
      c.style.setProperty("--cy", best[1] - n.py + "px");
    }

    // Initialize nodes array with famous nodes
    const N: StarNode[] = F.map((f, i) => {
      const e = document.createElement("div");
      e.className = "star";
      e.style.setProperty("--d", -i * 0.37 + "s");

      const p = f[0].split(" ");
      const ini = p[0][0] + p[p.length - 1][0];
      const slug = f[0].toLowerCase().replace(/[^a-z]+/g, "-");

      e.innerHTML = `<div class="dot"><div class="core"></div></div><div class="card"><div class="ph"><span>${ini}</span><img src="/photos/${slug}.jpg" alt="${f[0]}" onerror="this.remove()"></div><div><small>Known for</small><i>${f[1]}</i><b>${f[0]}</b><p>${f[4]}</p></div></div>`;

      hero.appendChild(e);
      createdElements.push(e);

      const card = e.querySelector<HTMLElement>(".card");
      const dot = e.querySelector<HTMLElement>(".dot");

      const n: StarNode = {
        nx: f[2],
        ny: f[3],
        ph: i * 1.7,
        f: 1,
        px: 0,
        py: 0,
        e,
        card,
        open: false,
      };

      if (dot) {
        dot.onpointerenter = () => place(n);
        dot.onclick = (event) => {
          event.stopPropagation();
          N.forEach((o) => {
            if (o.f && o !== n && o.e) {
              o.open = false;
              o.e.classList.remove("open");
            }
          });
          n.open = !n.open;
          e.classList.toggle("open", n.open);
          if (n.open) place(n);
        };
      }

      return n;
    });

    // Close cards on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".star")) {
        N.forEach((o) => {
          if (o.f && o.open && o.e) {
            o.open = false;
            o.e.classList.remove("open");
          }
        });
      }
    };
    window.addEventListener("click", handleOutsideClick);

    // Reposition open cards on resize
    const handleResize = () => {
      N.forEach((o) => {
        if (o.f && o.open) {
          place(o);
        }
      });
    };
    window.addEventListener("resize", handleResize);

    // Populate quiet field of small background nodes (up to 120 total)
    while (N.length < 120) {
      const nx = rnd();
      const ny = rnd();
      if (
        Math.pow((nx - 0.5) / 0.3, 2) + Math.pow((ny - 0.5) / 0.26, 2) <
        1
      )
        continue;
      const ed = Math.max(Math.abs(nx - 0.5), Math.abs(ny - 0.5)) * 2;
      if (rnd() > 0.2 + 0.8 * ed * ed) continue;
      if (N.some((o) => Math.hypot(o.nx - nx, o.ny - ny) < 0.05)) continue;

      N.push({
        nx,
        ny,
        ph: rnd() * 6,
        r: 0.9 + rnd() * 1.3,
        px: 0,
        py: 0,
      });
    }

    let animId: number;

    function tick(t: number) {
      if (!cx) return;
      const w = hero?.clientWidth || window.innerWidth;
      const h = hero?.clientHeight || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      if (cv && (cv.width !== w * dpr || cv.height !== h * dpr)) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, w, h);

      const L = Math.max(110, Math.min(w, h) * 0.22);

      N.forEach((n) => {
        n.px = n.nx * w + Math.sin(t / 2400 + n.ph) * 3;
        n.py = n.ny * h + Math.cos(t / 2800 + n.ph) * 3;

        const dx = m.x - n.px;
        const dy = m.y - n.py;
        const d = Math.hypot(dx, dy);

        if (d < 170 && d > 0) {
          const k = ((1 - d / 170) * 10) / d;
          n.px += dx * k;
          n.py += dy * k;
        }
      });

      // Soft cursor glow
      if (m.x > 0 && m.y > 0) {
        const g = cx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 130);
        g.addColorStop(0, "rgba(109,40,217,.08)");
        g.addColorStop(1, "rgba(109,40,217,0)");
        cx.fillStyle = g;
        cx.fillRect(m.x - 130, m.y - 130, 260, 260);
      }

      // Inter-node connections & cursor connections
      cx.lineWidth = 0.7;
      for (let i = 0; i < N.length; i++) {
        const a = N[i];

        for (let j = i + 1; j < N.length; j++) {
          const b = N[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d < L) {
            cx.strokeStyle = `rgba(109,40,217,${(1 - d / L) * 0.22})`;
            cx.beginPath();
            cx.moveTo(a.px, a.py);
            cx.lineTo(b.px, b.py);
            cx.stroke();
          }
        }

        const dm = Math.hypot(a.px - m.x, a.py - m.y);
        if (dm < 170) {
          cx.strokeStyle = `rgba(109,40,217,${(1 - dm / 170) * 0.4})`;
          cx.beginPath();
          cx.moveTo(a.px, a.py);
          cx.lineTo(m.x, m.y);
          cx.stroke();
        }
      }

      // Render small nodes and update DOM famous star transforms
      N.forEach((n) => {
        if (n.f && n.e) {
          n.e.style.transform = `translate(${n.px}px,${n.py}px)`;
          return;
        }
        if (n.r) {
          cx.fillStyle = "rgba(109,40,217,.5)";
          cx.beginPath();
          cx.arc(n.px, n.py, n.r, 0, 6.3);
          cx.fill();
        }
      });

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
      createdElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="bg">
        <div className="bl b1"></div>
        <div className="bl b2"></div>
        <div className="bl b3"></div>
        <div className="grid"></div>
      </div>
      <canvas id="c" ref={canvasRef} />
      <div className="eb top">Student Chapter</div>
      <h1>
        Society of <em>Women</em> Engineers
      </h1>
      <div className="eb">MIT-WPU · Pune</div>
      <p className="sub">
        We’re here to{" "}
        <span className="slot">
          <span className="sz">collaborate</span>
          <span className="ty">
            <span id="tw" ref={twRef}></span>
            <span className="cur">_</span>
          </span>
        </span>
      </p>
      <div className="btns">
        <a className="cta" href="#join" onClick={handleJoin}>
          Join the community
        </a>
        <a className="cta ghost" href="#events" onClick={handleEvents}>
          Explore events
        </a>
      </div>
      <span className="hint">HOVER THE GLOWING NODES · TAP ON MOBILE</span>
    </section>
  );
}
