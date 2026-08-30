import Hero from "@/pages/Hero.tsx";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase.tsx";
import GuestShowUp from "@/components/guestbook/GuestShowUp.tsx";
import BentoGrid from "../components/bento/BentoGrid.tsx";
import GlowHorizon from "@/components/shared/GlowHorizon";

function Home() {
  return (
    <>
      {/* One fixed glow for the whole page — it stays put behind the hero, the
          work showcase and the guestbook instead of ending with the hero. */}
      <GlowHorizon />

      <Hero />
      <BentoGrid />
      <CuratedWorkShowcase />

      <section className="relative mt-40 md:mt-56 lg:mt-72">
        <GuestShowUp />
      </section>
    </>
  );
}

export default Home;
