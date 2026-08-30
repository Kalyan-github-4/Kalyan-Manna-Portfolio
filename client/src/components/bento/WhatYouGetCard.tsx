import Bucket from "./Bucket"
import BentoCard from "./BentoCard"
// import { bentoCopy } from "./bentoData"

/**
 * Bottom-left tile: the open-box illustration with deliverable chips dropping
 * into it on a loop.
 */
export default function WhatYouGetCard({ className = "" }: { className?: string }) {
  // const { eyebrow, title } = bentoCopy.whatYouGet

  return (
    <BentoCard
      // eyebrow={eyebrow}
      // title={title}
      index={2}
      className={className}
      // The illustration is anchored to the card's bottom edge and reaches
      // well above the slot, so the slot has to reserve its full height —
      // otherwise the chip lands on top of the heading.
      visualClassName="h-44 sm:h-48"
    >
      {/* Negative bottom cancels the card's own padding, so the box meets the
          card's bottom edge instead of floating above it. */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-7 flex justify-center sm:-bottom-9">
        <Bucket className="w-[260px] sm:w-[300px] lg:w-[340px]" />
      </div>
    </BentoCard>
  )
}
