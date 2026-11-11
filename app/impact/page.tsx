import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImpactPreview } from "@/components/sections/ImpactPreview";

export const metadata: Metadata = {
  title: "Impact | SWE MIT-WPU",
  description:
    "Stories that stay — heartfelt words, experiences and milestones from the alumnae and community that make SWE MIT-WPU special.",
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Impact"
        eyebrow="Voices & Testimonials"
      />
      <ImpactPreview />
    </div>
  );
}
