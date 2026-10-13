import type { NavLink } from "./types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about", isSection: true },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Impact", href: "/impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/swe_mitwpu",
    icon: "Instagram",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/swe-mitwpu",
    icon: "Linkedin",
  },
  {
    label: "Twitter",
    href: "https://x.com/swe_mitwpu",
    icon: "Twitter",
  },
];
