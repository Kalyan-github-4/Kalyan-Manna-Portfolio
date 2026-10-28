"use client"

import LinksHero from "@/components/links/LinksHero";
import LinksMobile from "@/components/links/LinksMobile";
import ProfileCard from "@/components/links/ProfileCard";
import LinkSection from "@/components/links/LinkSection";
import { contactSections } from "@/components/links/linksData";
import EdgeStripes from "@/components/shared/EdgeStripes";

const Links = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-28 text-white md:pt-38">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.16),transparent_32%),linear-gradient(to_bottom,#050505,#000000)]"
      />
      <h1 className="sr-only">Links - Connect With Kalyan Manna</h1>

      <LinksMobile />

      <section className="relative hidden px-6 sm:px-8 md:block md:px-10 lg:px-13">
        <EdgeStripes />

        <LinksHero />

        <div className="relative z-10 flex flex-col border-t border-dashed border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-4 lg:col-span-3 lg:p-6">
              <div className="sticky top-32">
                <ProfileCard />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="hidden border-x border-dashed border-white/10 lg:col-span-1 lg:block"
            />

            <nav aria-label="Social links" className="space-y-12 p-4 lg:col-span-8 lg:p-6">
              {contactSections.map((section, index) => (
                <LinkSection key={section.title} section={section} sectionIndex={index} />
              ))}
            </nav>
          </div>
          <div className="h-px w-full border-t border-dashed border-white/10" />
        </div>
      </section>
    </main>
  );
};

export default Links;
