"use client";

import React, { useEffect, useRef } from "react";
import "./HeroConstellation.css";

interface FamousStarData {
  name: string;
  field: string;
  nx: number;
  ny: number;
}

const FAMOUS_NODES: FamousStarData[] = [
  { name: "Ada Lovelace", field: "Algorithms", nx: 0.1, ny: 0.2 },
  { name: "Marie Curie", field: "Radioactivity", nx: 0.25, ny: 0.12 },
  { name: "Grace Hopper", field: "Compiler", nx: 0.07, ny: 0.52 },
  { name: "Katherine Johnson", field: "Trajectories", nx: 0.2, ny: 0.78 },
  { name: "Hedy Lamarr", field: "Wireless", nx: 0.37, ny: 0.88 },
  { name: "Margaret Hamilton", field: "Apollo", nx: 0.9, ny: 0.22 },
  { name: "Radia Perlman", field: "Networking", nx: 0.75, ny: 0.1 },
  { name: "Kalpana Chawla", field: "Astronaut", nx: 0.93, ny: 0.58 },
  { name: "Tessy Thomas", field: "Missiles", nx: 0.8, ny: 0.8 },
  { name: "Anandi Gopal Joshi", field: "Medicine", nx: 0.63, ny: 0.9 },
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
  r?: number; // radius for small nodes
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

  // Typewriter effect
  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      const currentWord = WORDS[wordIdx];
      const el = twRef.current;

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

  // Constellation Canvas & Nodes Simulation
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

    // Initialize nodes array with famous nodes
    const N: StarNode[] = FAMOUS_NODES.map((f, i) => {
      const e = document.createElement("div");
      e.className = "star";

      const p = f.name.split(" ");
      const ini = p[0][0] + p[p.length - 1][0];
      const slug = f.name.toLowerCase().replace(/[^a-z]+/g, "-");

      e.innerHTML = `<div class="dot"><div class="core"></div></div><div class="card"><div class="ph"><span>${ini}</span><img src="/photos/${slug}.jpg" alt="${f.name}" onerror="this.remove()"></div><div><small>Known for</small><i>${f.field}</i><span>${f.name}</span></div></div>`;

      hero.appendChild(e);
      createdElements.push(e);

      const card = e.querySelector<HTMLElement>(".card");
      const dot = e.querySelector<HTMLElement>(".dot");

      const n: StarNode = {
        nx: f.nx,
        ny: f.ny,
        ph: i * 1.7,
        f: 1,
        px: 0,
        py: 0,
        e,
        card,
        open: false,
      };

      if (dot && card) {
        dot.onpointerenter = () => {
          const w = hero.clientWidth;
          card.style.setProperty(
            "--sx",
            n.px < 130 ? "-12%" : n.px > w - 130 ? "-88%" : "-50%"
          );
          e.classList.toggle("dn", n.py < 150);
        };

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

    // Populate quiet field of small background nodes (up to 120 total)
    while (N.length < 120) {
      const nx = rnd();
      const ny = rnd();
      // Keep center region clear for title and text
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
      createdElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <section className="hero-constellation" id="hero" ref={heroRef}>
      <canvas id="c" ref={canvasRef} />
      <h1>
        Society of <em>Women</em> Engineers
      </h1>
      <div className="eb">MIT-WPU · Pune</div>
      <p className="sub">
        We’re here to <span id="tw" ref={twRef}></span>
        <span className="cur">_</span>
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
