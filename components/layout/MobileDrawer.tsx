"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/content/navigation";

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection: string;
  isHome: boolean;
}

export function MobileDrawer({
  open,
  onOpenChange,
  activeSection,
  isHome,
}: MobileDrawerProps) {
  const handleNavClick = (href: string) => {
    onOpenChange(false);
    if (href === "/" && isHome) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
      return;
    }
    if (href.startsWith("#") && isHome) {
      // Small delay for sheet close animation before scrolling
      setTimeout(() => {
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return isHome && (activeSection === "" || activeSection === "hero");
    }
    if (href.startsWith("#")) {
      return activeSection === href.replace("#", "");
    }
    return false;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle
              className="text-lg font-bold flex items-center gap-2"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              <Image
                src="/images/hero/swe-logo.png"
                alt="SWE Logo"
                width={70}
                height={32}
                className="h-6 w-auto inline-block brightness-0 dark:filter-none dark:brightness-100 opacity-90"
              />
              <span className="text-muted-foreground font-normal text-xs uppercase tracking-wider border-l pl-2">
                MIT-WPU
              </span>
            </SheetTitle>
            <ThemeToggle />
          </div>
        </SheetHeader>

        <nav className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.isSection && !isHome ? `/${link.href}` : link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200",
                isActive(link.href)
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-6 mt-auto">
          <Link href="/contact" onClick={() => onOpenChange(false)} className="block">
            <Button className="w-full rounded-full" size="lg">
              Join SWE
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
