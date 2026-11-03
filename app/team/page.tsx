import type { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "Team Directory | SWE MIT-WPU",
  description:
    "Meet the Core Team executive leadership and Departmental Heads driving technical excellence and empowerment at the SWE MIT-WPU Chapter in Pune.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Editorial Core Team & Heads 3D Cylindrical Carousels */}
      <TeamSection />
    </main>
  );
}
