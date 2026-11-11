import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { GallerySection } from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "Gallery | SWE MIT-WPU",
  description:
    "Explore photos and moments from SWE MIT-WPU hackathons, coding workshops, STEM outreach drives, and chapter leadership summits in Pune.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Gallery"
        eyebrow="Moments & Memories"
      />
      <GallerySection />
    </div>
  );
}
