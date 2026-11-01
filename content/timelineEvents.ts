export interface TimelineEventItem {
  id: string;
  title: string;
  year: number;
  yearLabel: "2025" | "2026";
  dateDisplay: string;
  description: string;
  coverImage: string;
}

export const timelineEventsData: TimelineEventItem[] = [
  // ── YEAR 2025 ──
  {
    id: "ice-breaker-2025",
    title: "Ice Breaker",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "2025",
    description:
      "A welcoming event that brought SWE members together, encouraged introductions, and helped build connections within the community.",
    coverImage: "/images/events/networking-mixer.svg",
  },
  {
    id: "resq-animal-shelter-2025",
    title: "The ResQ Animal Shelter Visit",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "2025",
    description:
      "An opportunity to visit an animal shelter, understand animal welfare efforts, and engage with a meaningful community initiative.",
    coverImage: "/images/events/stem-outreach.svg",
  },
  {
    id: "welocal-bengaluru-2025",
    title: "WeLocal Bengaluru",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "2025",
    description:
      "A collaborative experience focused on connecting with people, exchanging ideas, and exploring opportunities for learning and growth.",
    coverImage: "/images/events/stem-summit.jpg",
  },

  // ── YEAR 2026 ──
  {
    id: "jab-swe-met-hackathon-2026",
    title: "Jab SWE Met Hackathon",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "2026",
    description:
      "A collaborative hackathon where participants worked together, explored creative ideas, and developed innovative solutions.",
    coverImage: "/images/events/hackathon-collab.jpg",
  },
  {
    id: "orientation-2026",
    title: "Orientation",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "2026",
    description:
      "An introduction to SWE MIT-WPU, its vision, activities, and opportunities for students to learn, participate, and grow.",
    coverImage: "/images/events/leadership-summit.svg",
  },
  {
    id: "ice-breaker-2026",
    title: "Ice Breaker",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "2026",
    description:
      "A fun community-building event designed to help members interact, get to know one another, and strengthen connections within SWE.",
    coverImage: "/images/events/cloud-masterclass.jpg",
  },
];
