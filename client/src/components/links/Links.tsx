import LinksHero from "@/components/links/LinksHero";
import ProfileCard from "@/components/links/ProfileCard";
import LinkSection from "@/components/links/LinkSection";
import { contactSections } from "@/components/links/linksData";

const diagonalStripeStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)",
};

const Links = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.16),transparent_32%),linear-gradient(to_bottom,#050505,#000000)]" />
        <div className="absolute left-0 top-0 h-full w-16 opacity-60" style={diagonalStripeStyle} />
        <div className="absolute right-0 top-0 h-full w-16 opacity-60" style={diagonalStripeStyle} />
      </div>

      <section className="relative flex min-h-screen flex-col px-6 py-28 sm:px-8 md:px-10 lg:px-13">
        <LinksHero />

        <div className="mx-auto grid w-full gap-10 border-y border-dashed border-white/10 py-8 lg:grid-cols-[360px_1fr]">
          <div className="relative">
            <div className="absolute -inset-y-8 right-[-20px] hidden border-r border-dashed border-white/10 lg:block" />
            <ProfileCard />
          </div>

          <div className="space-y-14 lg:pl-8">
            {contactSections.map((section, index) => (
              <LinkSection
                key={section.title}
                section={section}
                sectionIndex={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Links;