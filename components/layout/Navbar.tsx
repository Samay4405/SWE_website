"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/content/navigation";
import { MobileDrawer } from "./MobileDrawer";

export function Navbar() {
  const [isOverHero, setIsOverHero] = useState(true);
  const [isScrolledOverHero, setIsScrolledOverHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // When on homepage and over hero, use hero's white theme
  const activeHeroTheme = isHome && isOverHero;

  // ── Hero & Scroll detection ──
  useEffect(() => {
    if (!isHome) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsOverHero(entry.isIntersecting);
        setIsScrolledOverHero(entry.isIntersecting && window.scrollY > 20);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);

    const handleScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      const overHero = rect.bottom > 72;
      setIsOverHero(overHero);
      setIsScrolledOverHero(overHero && window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  // ── Scroll spy for active section on homepage ──
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks
      .filter((link) => link.isSection)
      .map((link) => link.href.replace("#", ""));

    const handleScroll = () => {
      // While near the top within hero, clear active section
      if (window.scrollY < 240) {
        setActiveSection("");
        return;
      }

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#") && isHome) {
        e.preventDefault();
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [isHome]
  );

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeSection === href.replace("#", "");
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          activeHeroTheme
            ? isScrolledOverHero
              ? "bg-[#171044]/40 backdrop-blur-md border-b border-white/10"
              : "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        )}
      >
        {/* Full-width container: extreme left logo, centered links, extreme right CTA */}
        <nav className="w-full px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between h-16 md:h-18">
          {/* ── LEFT: Supplied SWE Logo at extreme left ── */}
          <div className="flex-1 flex justify-start items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-hidden"
              aria-label="SWE MIT-WPU Home"
            >
              <div className="relative h-7 sm:h-8 md:h-9 flex items-center">
                <Image
                  src="/images/hero/swe-logo.png"
                  alt="SWE Logo"
                  width={110}
                  height={52}
                  className={cn(
                    "h-6 sm:h-7 md:h-8 w-auto object-contain transition-all duration-300 select-none",
                    activeHeroTheme
                      ? "brightness-100 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                      : "brightness-0 opacity-80 group-hover:opacity-100"
                  )}
                  priority
                />
              </div>
              <span
                className={cn(
                  "font-heading font-semibold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 border-l pl-2.5 select-none",
                  activeHeroTheme
                    ? "text-white/90 border-white/30"
                    : "text-foreground/70 border-border"
                )}
              >
                MIT-WPU
              </span>
            </Link>
          </div>

          {/* ── CENTRE: Navigation links ── */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.isSection && !isHome ? `/${link.href}` : link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-md tracking-wide",
                    activeHeroTheme
                      ? active
                        ? "text-white font-semibold drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]"
                        : "text-white/85 hover:text-white hover:opacity-100"
                      : active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {/* Subtle active indicator line */}
                  {active && (
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full transition-all duration-300",
                        activeHeroTheme
                          ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "bg-primary"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: Join SWE button at extreme right ── */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex group">
              <button
                type="button"
                className={cn(
                  "relative inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden",
                  activeHeroTheme
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-xs hover:shadow-md"
                )}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Join SWE
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
                {activeHeroTheme && (
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                )}
              </button>
            </Link>

            {/* Mobile hamburger button */}
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "md:hidden h-9 w-9 transition-colors duration-300",
                activeHeroTheme
                  ? "text-white hover:bg-white/15 hover:text-white"
                  : "text-foreground hover:bg-muted"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        activeSection={activeSection}
        isHome={isHome}
      />
    </>
  );
}
