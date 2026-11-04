import type { NavLink } from "./types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", isSection: false },
  { label: "About", href: "#about", isSection: true },
  { label: "Events", href: "#events", isSection: true },
  { label: "Team", href: "#team", isSection: true },
  { label: "Impact", href: "#impact", isSection: true },
  { label: "Gallery", href: "#gallery", isSection: true },
  { label: "Contact", href: "#contact", isSection: true },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/swe_mitwpu",
    icon: "Instagram",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/swe-mit-wpu",
    icon: "Linkedin",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/swe_mitwpu",
    icon: "Twitter",
  },
];
