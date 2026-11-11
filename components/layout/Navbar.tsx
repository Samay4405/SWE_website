"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/content/navigation";
import { MobileDrawer } from "./MobileDrawer";

export function Navbar() {
  const [elementFocused, setElementFocused] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleHoverButton = (index: number | null) => {
    setElementFocused(index);
  };

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "/" && isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    },
    [isHome]
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
          isHome && !isScrolled
            ? "bg-transparent border-transparent"
            : "border-[#e9e3fb]/60"
        )}
        style={{
          backgroundColor:
            isHome && !isScrolled ? "transparent" : "rgba(255, 255, 255, 0.7)",
          backdropFilter: isHome && !isScrolled ? "none" : "blur(12px)",
          WebkitBackdropFilter: isHome && !isScrolled ? "none" : "blur(12px)",
        }}
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
                  className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-all duration-300 select-none brightness-0 opacity-80 group-hover:opacity-100"
                  priority
                />
              </div>
              <span className="font-heading font-semibold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 border-l border-neutral-300 pl-2.5 select-none text-neutral-600 group-hover:text-neutral-900">
                MIT-WPU
              </span>
            </Link>
          </div>

          {/* ── CENTRE: Navigation links with translucent purple hover highlight ── */}
          <div
            className="hidden md:flex items-center justify-center gap-1 lg:gap-1.5"
            onMouseLeave={() => handleHoverButton(null)}
          >
            {navLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => handleHoverButton(index)}
                  className={cn(
                    "relative inline-flex items-center justify-center px-3.5 py-1.5 text-[0.85rem] font-normal transition-colors duration-200 rounded-[7px] tracking-[0.04em] whitespace-nowrap select-none no-underline",
                    active
                      ? "text-[#1e1033] font-semibold"
                      : "text-[#6b6385] hover:text-[#1e1033]"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Active Indicator bar */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#6d28d9] rounded-full" />
                  )}

                  {/* Translucent Purple Animated Hover Rectangle */}
                  <AnimatePresence>
                    {elementFocused === index && (
                      <motion.div
                        layout={true}
                        layoutId="focused-element"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="-z-10 absolute inset-0 rounded-[7px] backdrop-blur-[1px] pointer-events-none"
                        style={{
                          backgroundColor: "rgba(109, 40, 217, 0.28)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: Join SWE button at extreme right ── */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex group">
              <Button
                type="button"
                className="relative inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-[0.85rem] font-normal tracking-[0.04em] bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Join SWE
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Button>
            </Link>

            {/* Mobile hamburger button */}
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden h-9 w-9 text-neutral-800 hover:bg-neutral-100 transition-colors duration-300"
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
        pathname={pathname}
        isHome={isHome}
      />
    </>
  );
}

export default Navbar;
