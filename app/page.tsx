import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { EventsCarousel } from "@/components/sections/EventsCarousel";
import { TeamSection } from "@/components/sections/TeamSection";
import { ImpactPreview } from "@/components/sections/ImpactPreview";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* 1. Existing purple-gradient hero section */}
      <Hero />

      {/* 2. Existing About SWE section */}
      <About />

      {/* 3. New integrated Events carousel */}
      <EventsCarousel />

      {/* 4. Team section */}
      <TeamSection />

      {/* 5. Impact section */}
      <ImpactPreview />

      {/* 6. Gallery section */}
      <GallerySection />

      {/* 7. Contact section */}
      <ContactSection />
    </>
  );
}
