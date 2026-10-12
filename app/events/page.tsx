import type { Metadata } from "next";
import { events } from "@/content/events";
import { EventsDirectoryClient } from "@/components/events/EventsDirectoryClient";

export const metadata: Metadata = {
  title: "Events & Workshops",
  description:
    "Explore upcoming and past hackathons, technical workshops, panel discussions, and networking mixers organized by SWE MIT-WPU Student Chapter in Pune.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsDirectoryClient initialEvents={events} />
    </main>
  );
}
