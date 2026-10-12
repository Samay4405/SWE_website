import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { ImpactPreview } from "@/components/sections/ImpactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyJoin />
      <EventsPreview />
      <ImpactPreview />
    </>
  );
}
