"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
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
  pathname: string;
  isHome: boolean;
}

export function MobileDrawer({
  open,
  onOpenChange,
  pathname,
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
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
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
                className="h-6 w-auto inline-block brightness-0 opacity-80"
              />
              <span className="text-muted-foreground font-normal text-xs uppercase tracking-wider border-l pl-2">
                MIT-WPU
              </span>
            </SheetTitle>
          </div>
        </SheetHeader>

        <nav className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200",
                isActive(link.href)
                  ? "text-foreground bg-muted font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6d28d9]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="px-6 pt-4 pb-6 mt-auto border-t border-border">
          <Link href="/contact" onClick={() => onOpenChange(false)} className="block">
            <Button className="w-full justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Join SWE Chapter
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
