"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { navLinks, socialLinks } from "@/content/navigation";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

const footerSections = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Team", href: "/team" },
      { label: "Impact", href: "/impact" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About SWE", href: "https://swe.org", external: true },
      { label: "SWE India", href: "https://india.swe.org", external: true },
      { label: "MIT-WPU", href: "https://mitwpu.edu.in", external: true },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
};

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-block font-bold text-lg tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
              }}
            >
              <span className="text-primary">SWE</span>{" "}
              <span className="text-foreground/70 font-normal text-sm">
                MIT-WPU
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              Society of Women Engineers
              <br />
              MIT-WPU Student Chapter
              <br />
              Pune, Maharashtra, India
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-200"
                  >
                    {Icon && <Icon className="size-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sitemap columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Location
            </h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              MIT World Peace University
              <br />
              Survey No. 124, Paud Road,
              <br />
              Kothrud, Pune — 411038
              <br />
              Maharashtra, India
            </address>
            <p className="text-sm text-muted-foreground mt-4">
              <a
                href="mailto:swe@mitwpu.edu.in"
                className="hover:text-foreground transition-colors duration-200"
              >
                swe@mitwpu.edu.in
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} SWE MIT-WPU Student Chapter. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Engineering the Future, Together.
          </p>
        </div>
      </div>
    </footer>
  );
}
