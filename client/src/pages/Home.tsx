import Hero from "@/pages/Hero.tsx";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase.tsx";
import GuestShowUp from "@/components/guestbook/GuestShowUp.tsx";

function Home() {
  return (
    <>
      <Hero />
      <CuratedWorkShowcase />

      <section className="relative mt-40 md:mt-56 lg:mt-72">
        <GuestShowUp />
      </section>
    </>
  );
}

export default Home;