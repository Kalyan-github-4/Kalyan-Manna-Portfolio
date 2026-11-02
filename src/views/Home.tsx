import Hero from "@/views/Hero";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase";
// import GuestShowUp from "@/components/guestbook/GuestShowUp";
import BentoGrid from "../components/bento/BentoGrid";
import VaultShowcase from "@/components/vault/VaultShowcase";
import EdgeStripes from "@/components/shared/EdgeStripes";

function Home() {
  return (
    <>
      <Hero />

      {/* Positioned so the hatched gutters pin to this wrapper rather than to a
          single section — they run from the top of the bento to the guestbook,
          leaving the hero clear. */}
      <div className="relative">
        <EdgeStripes />

        <BentoGrid />
        <CuratedWorkShowcase />
        <VaultShowcase />

        {/* User feedback section hidden for now.
        <section className="relative mt-40 md:mt-56 lg:mt-72">
          <GuestShowUp />
        </section>
        */}
      </div>
    </>
  );
}

export default Home;
