import Hero from "@/views/Hero";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase";
// import GuestShowUp from "@/components/guestbook/GuestShowUp";
import BentoGrid from "../components/bento/BentoGrid";
import HomeAbout from "../components/about/HomeAbout";
import VaultShowcase from "@/components/vault/VaultShowcase";
import EdgeStripes from "@/components/shared/EdgeStripes";
import ExploreShowcase from "@/components/explore/ExploreShowcase";

function Home() {
  return (
    <>
      <Hero />

      {/* Positioned so the hatched gutters pin to this wrapper rather than to a
          single section — they run from the top of the bento to the guestbook,
          leaving the hero clear. They reach up through the bento's top margin
          (mt-24/32/40), fading in so they're fully visible where the cards start. */}
      <div className="relative">
        <EdgeStripes className="-top-24 [--fade:6rem] mask-[linear-gradient(to_bottom,transparent,rgb(0_0_0/0.5)_calc(var(--fade)/2),black_var(--fade))] sm:-top-32 sm:[--fade:8rem] lg:-top-40 lg:[--fade:10rem]" />

        <BentoGrid />
        <CuratedWorkShowcase />
        <HomeAbout />
        <VaultShowcase />
        <ExploreShowcase />

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
