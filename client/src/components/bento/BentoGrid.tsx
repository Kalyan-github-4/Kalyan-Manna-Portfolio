import CollaborateCard from "./CollaborateCard"
import TechStackCard from "./TechStackCard"
import WhatYouGetCard from "./WhatYouGetCard"
import TimezoneCard from "./TimezoneCard"
import UsesCard from "./UsesCard"

/**
 * The tile wall that sits directly under the hero.
 *
 * A six-column grid on desktop: the top row splits 4/2 so the stack tile sits
 * in a box close to the lens illustration's natural width, and the bottom row
 * is three even thirds. Tablets collapse to two equal columns with the wide
 * tiles spanning both, and phones stack.
 */
export default function BentoGrid() {
  return (
    <section
      id="bento"
      className="relative text-white"
      aria-label="How I work"
    >
      {/* Padding is asymmetric on purpose: it matches EdgeStripes exactly so
          the card edges land on the hatched gutters' inner border lines.
          Left gutter sits at left-3 (12px) and is 20/28/32px wide -> 32/40/44px.
          Right gutter is pinned to the edge at 20/28/36px wide. */}
      <div className="mx-auto w-full max-w-[120rem] py-20 pl-8 pr-5 sm:py-24 sm:pl-10 sm:pr-7 lg:pl-11 lg:pr-9">
        <div className="grid grid-cols-1 gap-3  md:grid-cols-2 lg:grid-cols-7 border-y border-white/10">

          {/* First row */}
          <CollaborateCard className="md:col-span-2 lg:col-span-4" />
          <TechStackCard className="md:col-span-2 lg:col-span-3" />

          {/* Second row */}
          <div className="grid gap-3 sm:gap-4 md:col-span-2 lg:col-span-7 lg:grid-cols-3">
            <WhatYouGetCard />
            <TimezoneCard />
            <UsesCard />
          </div>

        </div>
      </div>
    </section>
  )
}
