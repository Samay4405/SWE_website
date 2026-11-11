import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | SWE MIT-WPU",
  description:
    "Learn about the mission, core pillars, and initiatives of the Society of Women Engineers (SWE) MIT-WPU Student Chapter in Pune.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
