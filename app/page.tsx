import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { ImpactPreview } from "@/components/sections/ImpactPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { Resources } from "@/components/sections/Resources";
import { JourneyCTA } from "@/components/sections/JourneyCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyJoin />
      <EventsPreview />
      <ImpactPreview />
      <Testimonials />
      <Timeline />
      <Resources />
      <JourneyCTA />
    </>
  );
}
