import CollaborateCard from "./CollaborateCard"
import TechStackCard from "./TechStackCard"
import WhatYouGetCard from "./WhatYouGetCard"
import TimezoneCard from "./TimezoneCard"
import UsesCard from "./UsesCard"

/**
 * The tile wall that sits directly under the hero.
 *
 * A six-column grid on desktop: two half-width tiles on the top row, three
 * third-width tiles below. Tablets collapse to two equal columns with the
 * collaborate tile spanning both, and phones stack.
 */
export default function BentoGrid() {
  return (
    <section
      id="bento"
      className="relative text-white"
      aria-label="How I work"
    >
      {/* Same gutters as the curated-work section below it — 120rem cap,
          px-5 / sm:px-8 / lg:px-20 — so both sections share one edge line. */}
      <div className="mx-auto w-full max-w-[120rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-20">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          <CollaborateCard className="md:col-span-2 lg:col-span-3" />
          <TechStackCard className="md:col-span-2 lg:col-span-3" />

          <WhatYouGetCard className="lg:col-span-2" />
          <TimezoneCard className="lg:col-span-2" />
          <UsesCard className="md:col-span-2 lg:col-span-2" />
        </div>
      </div>
    </section>
  )
}
