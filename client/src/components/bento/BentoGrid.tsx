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
      <div className="mx-auto w-full max-w-[120rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-7">

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
