import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { EventsCarousel } from "@/components/sections/EventsCarousel";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* 1. Purple-gradient hero constellation section */}
      <Hero />

      {/* 2. About SWE section */}
      <About />

      {/* 3. Events carousel section */}
      <EventsCarousel />

      {/* 4. Contact section */}
      <ContactSection />
    </>
  );
}
