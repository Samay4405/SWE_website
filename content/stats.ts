import type { Stat } from "./types";

export const stats: Stat[] = [
  {
    label: "__PLACEHOLDER__ Active Members",
    value: 150,
    suffix: "+",
    icon: "Users",
  },
  {
    label: "__PLACEHOLDER__ Events Conducted",
    value: 30,
    suffix: "+",
    icon: "Calendar",
  },
  {
    label: "__PLACEHOLDER__ Workshop Hours",
    value: 200,
    suffix: "+",
    icon: "Clock",
  },
  {
    label: "__PLACEHOLDER__ Industry Partners",
    value: 12,
    suffix: "+",
    icon: "Building2",
  },
];

export const achievements: string[] = [
  "__PLACEHOLDER__ SWE Outstanding Student Chapter Award 2024",
  "__PLACEHOLDER__ Best Technical Club at MIT-WPU TechFest",
  "__PLACEHOLDER__ Organized Pune's largest women-in-tech hackathon",
  "__PLACEHOLDER__ 95% member satisfaction rating in annual survey",
  "__PLACEHOLDER__ Partnered with 5 Fortune 500 companies for mentorship",
];

export const partners: { name: string; logo: string }[] = [
  { name: "__PLACEHOLDER__ TechCorp", logo: "/images/partners/placeholder-1.svg" },
  { name: "__PLACEHOLDER__ InnovateLabs", logo: "/images/partners/placeholder-2.svg" },
  { name: "__PLACEHOLDER__ Infosys", logo: "/images/partners/placeholder-3.svg" },
  { name: "__PLACEHOLDER__ Microsoft", logo: "/images/partners/placeholder-4.svg" },
  { name: "__PLACEHOLDER__ Google", logo: "/images/partners/placeholder-5.svg" },
  { name: "__PLACEHOLDER__ Tata Consultancy", logo: "/images/partners/placeholder-6.svg" },
];

export const yearlyGrowth = [
  { year: "2020", members: 25, events: 4 },
  { year: "2021", members: 45, events: 8 },
  { year: "2022", members: 75, events: 14 },
  { year: "2023", members: 110, events: 22 },
  { year: "2024", members: 150, events: 30 },
];
