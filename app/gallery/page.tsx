import type { Metadata } from "next";
import { galleryItems } from "@/content/gallery";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore photos and moments from SWE MIT-WPU hackathons, coding workshops, STEM outreach drives, and chapter leadership summits in Pune.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryClient initialItems={galleryItems} />
    </main>
  );
}
