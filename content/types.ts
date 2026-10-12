// ─────────────────────────────────────────────
// Content Data Model
// All placeholder values are marked "__PLACEHOLDER__"
// Replace with real chapter data before launch
// ─────────────────────────────────────────────

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Speaker {
  name: string;
  title: string;
  photo?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  category:
    | "workshop"
    | "hackathon"
    | "talk"
    | "networking"
    | "competition"
    | "outreach";
  date: string; // ISO 8601
  location: string;
  coverImage: string;
  shortDescription: string;
  body: string; // Markdown content for v1
  schedule: ScheduleItem[];
  speakers: Speaker[];
  partners: string[];
  gallery: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Leadership" | "Core" | "Advisory";
  department: string;
  year: string;
  bio: string;
  photo: string;
  linkedIn: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string; // e.g. "+"
  icon: string; // lucide icon name
}

export interface Testimonial {
  quote: string;
  name: string;
  courseYear: string;
  role: string;
  photo: string;
}

export interface GalleryItem {
  id: string;
  category: "events" | "workshops" | "team" | "outreach";
  image: string;
  caption: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
}

export interface ResourceGroup {
  category: "Learn" | "Build" | "Lead" | "Launch";
  icon: string;
  links: ResourceLink[];
}

export interface NavLink {
  label: string;
  href: string;
  isSection?: boolean; // true = scroll to section on homepage
}
