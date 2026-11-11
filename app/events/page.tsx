import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventsCarousel } from "@/components/sections/EventsCarousel";

export const metadata: Metadata = {
  title: "Events | SWE MIT-WPU",
  description:
    "Explore upcoming and past hackathons, workshops, guest lectures, and networking sessions hosted by SWE MIT-WPU in Pune.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Events"
        eyebrow="Programs & Gatherings"
      />
      <EventsCarousel />
    </div>
  );
}
