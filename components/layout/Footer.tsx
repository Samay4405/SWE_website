"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { socialLinks } from "@/content/navigation";

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
    title: "Affiliations",
    links: [
      { label: "SWE Global", href: "https://swe.org", external: true },
      { label: "SWE India", href: "https://india.swe.org", external: true },
      { label: "MIT-WPU Pune", href: "https://mitwpu.edu.in", external: true },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-1 border-t border-[#E9E3FB]/80 bg-white/70 backdrop-blur-md"
    >
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-left">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-block font-semibold text-xl tracking-tight mb-3 text-[#1E1033]"
            >
              <span className="text-[#6538A5]">SWE</span>{" "}
              <span className="font-normal text-sm text-[#6B6385]">
                MIT-WPU
              </span>
            </Link>
            <p className="text-xs sm:text-[13px] text-[#6B6385] leading-relaxed max-w-[260px] font-light">
              Society of Women Engineers
              <br />
              MIT-WPU Student Chapter
              <br />
              Pune, Maharashtra, India
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-5">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit SWE MIT-WPU on ${social.label}`}
                    className="flex items-center justify-center h-10 w-10 rounded-full border border-[#E9E3FB] text-[#6B6385] hover:text-[#6538A5] hover:border-[#6538A5]/40 hover:bg-[#F6F2FC] transition-all duration-200"
                  >
                    {Icon && <Icon className="size-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-4 text-[#1E1033] font-semibold">
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
                        className="text-sm text-[#6B6385] hover:text-[#6538A5] transition-colors duration-200 font-light"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#6B6385] hover:text-[#6538A5] transition-colors duration-200 font-light"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Campus Location Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-4 text-[#1E1033] font-semibold">
              Location
            </h4>
            <address className="not-italic text-xs sm:text-[13px] text-[#6B6385] leading-relaxed font-light">
              MIT World Peace University
              <br />
              Survey No. 124, Paud Road,
              <br />
              Kothrud, Pune — 411038
              <br />
              Maharashtra, India
            </address>
            <p className="text-xs sm:text-[13px] text-[#6B6385] mt-4 font-light">
              <a
                href="mailto:swe.chapter@mitwpu.edu.in"
                className="text-[#6538A5] hover:underline"
              >
                swe.chapter@mitwpu.edu.in
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-[#E9E3FB]" />

        {/* Copyright & Back to Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6385]">
          <p className="font-light">
            © {currentYear} SWE MIT-WPU Student Chapter. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-serif italic text-sm text-[#6538A5]">
              Engineering the Future, Together.
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E9E3FB] hover:border-[#6538A5]/40 hover:bg-[#F6F2FC] text-[#1E1033] hover:text-[#6538A5] transition-all duration-200 cursor-pointer text-xs font-medium"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
