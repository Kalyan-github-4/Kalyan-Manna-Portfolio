import Hero from "@/components/hero/Hero";
import Project from "../components/work/Project.tsx";
// import Footer from "../components/footer/Footer.tsx";
import GuestShowUp from "@/components/guestbook/GuestShowUp.tsx";

function Home() {
  return (
    <>
      <Hero />
      <Project />

      <section className="relative mt-40 md:mt-56 lg:mt-72">
        <GuestShowUp />
      </section>
    </>
  );
}

export default Home;