import type { Stat } from "./types";

export const stats: Stat[] = [
  {
    label: "Active Members",
    value: 500,
    suffix: "+",
    icon: "Users",
  },
  {
    label: "Technical Events Held",
    value: 35,
    suffix: "+",
    icon: "Calendar",
  },
  {
    label: "Hands-on Workshop Hours",
    value: 280,
    suffix: "+",
    icon: "Clock",
  },
  {
    label: "Industry & Corporate Partners",
    value: 18,
    suffix: "+",
    icon: "Building2",
  },
];

export const achievements: { title: string; year: string; description: string }[] = [
  {
    title: "SWE Outstanding Collegiate Chapter Award",
    year: "2024",
    description: "Recognized nationally by SWE India for exceptional community outreach and student technical engagement.",
  },
  {
    title: "Best Technical Student Organization — MIT-WPU",
    year: "2023",
    description: "Awarded top collegiate club honors across the entire faculty of engineering and technology at MIT-WPU.",
  },
  {
    title: "Flagship Technovate Hackathon with 250+ Hackers",
    year: "2024",
    description: "Convened Pune's premier women-led collegiate hackathon with participants from 40+ engineering colleges.",
  },
  {
    title: "Project Spark STEM Outreach in Pune Schools",
    year: "2023",
    description: "Trained 300+ secondary school girls in foundational coding, robotics, and scientific thinking.",
  },
  {
    title: "100% Core Team Internship Placement",
    year: "2024",
    description: "Chapter leaders secured research and engineering roles at Tier-1 tech enterprises and research labs.",
  },
];

export const partners: { name: string; category: string }[] = [
  { name: "Google", category: "Technology" },
  { name: "Microsoft IDC", category: "Cloud & AI" },
  { name: "Barclays", category: "Fintech & Banking" },
  { name: "NVIDIA Inception", category: "Deep Learning" },
  { name: "Red Hat", category: "Open Source" },
  { name: "Tata Technologies", category: "Engineering Services" },
  { name: "AWS Educate", category: "Cloud Infrastructure" },
  { name: "Persistent Systems", category: "Software Enterprise" },
];

export const yearlyGrowth = [
  { year: "2021", members: 85, events: 6, workshops: 4 },
  { year: "2022", members: 180, events: 14, workshops: 10 },
  { year: "2023", members: 310, events: 24, workshops: 18 },
  { year: "2024", members: 420, events: 32, workshops: 25 },
  { year: "2025", members: 530, events: 38, workshops: 30 },
];
