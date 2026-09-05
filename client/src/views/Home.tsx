import Hero from "@/views/Hero";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase";
import GuestShowUp from "@/components/guestbook/GuestShowUp";
import BentoGrid from "../components/bento/BentoGrid";
import GlowHorizon from "@/components/shared/GlowHorizon";
import EdgeStripes from "@/components/shared/EdgeStripes";

function Home() {
  return (
    <>
      {/* One fixed glow for the whole page — it stays put behind the hero, the
          work showcase and the guestbook instead of ending with the hero. */}
      <GlowHorizon />

      {/* Positioned so the hatched gutters pin to the page rather than to a
          single section — they run the full height, hero through guestbook. */}
      <div className="relative">
        <EdgeStripes />

        <Hero />
        <BentoGrid />
        <CuratedWorkShowcase />

        <section className="relative mt-40 md:mt-56 lg:mt-72">
          <GuestShowUp />
        </section>
      </div>
    </>
  );
}

export default Home;
