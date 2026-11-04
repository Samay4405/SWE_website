export interface TimelineEventItem {
  id: string;
  slug?: string;
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
    id: "orientation-2025",
    slug: "building-with-javascript",
    title: "SWE Orientation 2025",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "AUGUST 2025",
    description:
      "An introduction to SWE, its mission and initiatives, welcoming curious students and giving them a glimpse into the community and opportunities ahead.",
    coverImage: "/images/events/orientation-2025.jpg",
  },
  {
    id: "icebreaker-batch-ceremony-2025",
    slug: "swe-industry-connect-mixer",
    title: "Icebreaker & Batch Ceremony",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "SEPTEMBER 2025",
    description:
      "An evening of games, laughter and connections as new recruits met the SWE heads, followed by a batch ceremony celebrating the team's new beginnings.",
    coverImage: "/images/events/icebreaker-batch-ceremony-2025.jpg",
  },
  {
    id: "resq-centre-visit-2025",
    slug: "stem-empowerment-pune-outreach",
    title: "RESQ Centre Visit",
    year: 2025,
    yearLabel: "2025",
    dateDisplay: "OCTOBER 2025",
    description:
      "A visit to RESQ Charitable Trust to learn about animal rescue, veterinary care and rehabilitation efforts for injured wildlife and community animals.",
    coverImage: "/images/events/resq-centre-visit-2025.jpg",
  },

  // ── YEAR 2026 ──
  {
    id: "jab-swe-met-hackathon-2026",
    slug: "technovate-hackathon-2026",
    title: "SWE Hackathon",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "JANUARY 2026",
    description:
      "A hackathon challenging participants to develop innovative solutions to real-world women's safety problems, featuring a prize pool of ₹20,000.",
    coverImage: "/images/events/hackathon-collab.jpg",
  },
  {
    id: "we-local-bengaluru-2026",
    slug: "women-in-stem-leadership-summit",
    title: "We Local – Bengaluru",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "APRIL 2026",
    description:
      "SWE members travelled to Bengaluru for We Local, connecting with the wider SWE community, exchanging ideas and celebrating women in engineering.",
    coverImage: "/images/events/we-local-bengaluru-2026.jpg",
  },
  {
    id: "orientation-2026",
    slug: "cloud-native-kubernetes-masterclass",
    title: "SWE Orientation 2026",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "SEPTEMBER 2026",
    description:
      "Welcoming a new batch of aspiring members, introducing them to SWE's vision, initiatives and the opportunities to learn, contribute and grow.",
    coverImage: "/images/events/orientation-2026.jpg",
  },
  {
    id: "icebreaker-2026",
    slug: "swe-industry-connect-mixer",
    title: "Icebreaker 2026",
    year: 2026,
    yearLabel: "2026",
    dateDisplay: "OCTOBER 2026",
    description:
      "A fun-filled gathering bringing new recruits and existing members together through games, conversations and activities, building connections beyond the classroom.",
    coverImage: "/images/events/icebreaker-batch-ceremony-2025.jpg",
  },
];
