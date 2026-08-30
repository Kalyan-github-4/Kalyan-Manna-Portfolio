import Bucket from "./Bucket"
import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Bottom-left tile: the open-box illustration with deliverable chips dropping
 * into it on a loop.
 */
export default function WhatYouGetCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.whatYouGet

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={2}
      className={className}
      visualClassName="flex items-end justify-center"
    >
      {/* Aspect-locked at 655/352, so the width cap is what sets the tile
          height — keep it in step with the other second-row tiles. */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 flex justify-center">
        <Bucket className="w-[260px] sm:w-[300px] lg:w-[340px]" />
      </div>
    </BentoCard>
  )
}
