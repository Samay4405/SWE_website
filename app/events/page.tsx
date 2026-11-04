import type { Metadata } from "next";
import { EventsDirectoryClient } from "@/components/events/EventsDirectoryClient";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events & Workshops",
  description:
    "Explore upcoming hackathons, technical masterclasses, panel discussions, and community mixers organized by SWE MIT-WPU Student Chapter in Pune.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8">
      <EventsDirectoryClient initialEvents={events} />
    </div>
  );
}
