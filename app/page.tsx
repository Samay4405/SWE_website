import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

// Code-split below-the-fold interactive sections to minimize initial JavaScript payload
const EventsCarousel = dynamic(
  () =>
    import("@/components/sections/EventsCarousel").then((m) => m.EventsCarousel),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center text-xs font-mono text-[#6B6385]">
        Loading events timeline…
      </div>
    ),
  }
);

const TeamSection = dynamic(
  () => import("@/components/sections/TeamSection").then((m) => m.TeamSection),
  {
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center text-xs font-mono text-[#6B6385]">
        Loading chapter leadership…
      </div>
    ),
  }
);

const ImpactPreview = dynamic(
  () =>
    import("@/components/sections/ImpactPreview").then((m) => m.ImpactPreview),
  {
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center text-xs font-mono text-[#6B6385]">
        Loading stories…
      </div>
    ),
  }
);

const GallerySection = dynamic(
  () =>
    import("@/components/sections/GallerySection").then((m) => m.GallerySection),
  {
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center text-xs font-mono text-[#6B6385]">
        Loading archive…
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then(
      (m) => m.ContactSection
    ),
  {
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center text-xs font-mono text-[#6B6385]">
        Loading contact desk…
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      {/* 1. Primary Hero with SSR LCP and progressive canvas */}
      <Hero />

      {/* 2. Editorial About SWE section with Value Pillars */}
      <About />

      {/* 3. Physics Horizontal Events Timeline */}
      <EventsCarousel />

      {/* 4. Cylindrical Team Section (Core & Heads) */}
      <TeamSection />

      {/* 5. Alumnae Impact ("Stories That Stay") with Conic Border */}
      <ImpactPreview />

      {/* 6. Accessible Responsive Gallery & Lightbox */}
      <GallerySection />

      {/* 7. Live Desk Hours & Contact Form */}
      <ContactSection />
    </>
  );
}
