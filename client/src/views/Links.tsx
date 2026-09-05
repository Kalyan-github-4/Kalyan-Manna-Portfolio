"use client"

import LinksHero from "@/components/links/LinksHero";
import ProfileCard from "@/components/links/ProfileCard";
import LinkSection from "@/components/links/LinkSection";
import { contactSections } from "@/components/links/linksData";
import EdgeStripes from "@/components/shared/EdgeStripes";

const Links = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.16),transparent_32%),linear-gradient(to_bottom,#050505,#000000)]"
      />

      <section className="relative flex min-h-screen flex-col overflow-hidden px-6 py-28 sm:px-8 md:px-10 lg:px-13">
        <EdgeStripes />

        <LinksHero />

        <div className="relative z-10 mx-auto grid w-full gap-10 border-y border-dashed border-white/10 py-8 lg:grid-cols-[360px_1fr]">
          <div className="relative">
            <div className="absolute -inset-y-8 -right-5 hidden border-r border-dashed border-white/10 lg:block" />
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