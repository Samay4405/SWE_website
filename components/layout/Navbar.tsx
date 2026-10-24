"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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

  // When on homepage and over hero, use hero's white/lavender theme
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
              ? "bg-[#171044]/35 backdrop-blur-md border-b border-white/10"
              : "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        )}
      >
        <nav className="section-container flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight group"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            <span
              className={cn(
                "transition-colors duration-300 font-extrabold text-xl tracking-tight",
                activeHeroTheme ? "text-white" : "text-primary"
              )}
            >
              SWE
            </span>
            <span
              className={cn(
                "hidden sm:inline font-normal text-xs md:text-sm tracking-wide transition-colors duration-300",
                activeHeroTheme ? "text-[#DCD0F5]/85" : "text-foreground/70"
              )}
            >
              MIT-WPU
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.isSection && !isHome ? `/${link.href}` : link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
                    activeHeroTheme
                      ? active
                        ? "text-white font-semibold"
                        : "text-[#DCD0F5]/80 hover:text-white"
                      : active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {/* Active indicator line */}
                  {active && (
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full transition-all duration-300",
                        activeHeroTheme
                          ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          : "bg-primary"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex">
              <Button
                size="sm"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeHeroTheme
                    ? "bg-white/5 border border-white/40 text-white hover:bg-white/15 hover:border-white shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-xs"
                )}
              >
                Join SWE
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "md:hidden h-9 w-9 transition-colors duration-300",
                activeHeroTheme
                  ? "text-white hover:bg-white/10 hover:text-white"
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
