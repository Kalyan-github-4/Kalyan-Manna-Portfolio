"use client"

import LinksHero from "@/components/links/LinksHero";
import LinkSection from "@/components/links/LinkSection";
import { connectLinks, siteLinks } from "@/components/links/linksData";
import SilkBackground from "@/components/shared/SilkBackground";
import EdgeStripes from "@/components/shared/EdgeStripes";

const Links = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black pb-16 text-white">
      <SilkBackground />

      <EdgeStripes />

      {/* Padding clears EdgeStripes, whose inner edge moves at each breakpoint. */}
      <div className="relative z-10 px-9 sm:px-11 lg:px-12">
        <LinksHero />
        <LinkSection title="On the site" links={siteLinks} />
        <LinkSection title="Connect" links={connectLinks} />
      </div>
    </main>
  );
};

export default Links;
