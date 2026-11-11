import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "Team | SWE MIT-WPU",
  description:
    "Meet the Core Team executive leadership and Departmental Heads driving technical excellence and empowerment at the SWE MIT-WPU Chapter in Pune.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <PageHeader
        title="Our Team"
        eyebrow="Leadership & Departmental Heads"
      />
      <TeamSection />
    </div>
  );
}
