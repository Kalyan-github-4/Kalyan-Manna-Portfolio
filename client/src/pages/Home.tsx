import Hero from "@/pages/Hero.tsx";
import CuratedWorkShowcase from "../components/work/CuratedWorkShowcase.tsx";
// Superseded by CuratedWorkShowcase — the perspective-scroll showcase is kept
// on disk but out of the page.
// import Project from "../components/work/Project.tsx";
// import Footer from "../components/footer/Footer.tsx";
import GuestShowUp from "@/components/guestbook/GuestShowUp.tsx";

function Home() {
  return (
    <>
      <Hero />
      <CuratedWorkShowcase />
      {/* <Project /> */}

      <section className="relative mt-40 md:mt-56 lg:mt-72">
        <GuestShowUp />
      </section>
    </>
  );
}

export default Home;