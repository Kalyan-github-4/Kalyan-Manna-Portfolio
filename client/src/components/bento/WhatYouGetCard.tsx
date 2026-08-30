import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Bottom-left tile: open-box illustration with a floating "code you keep"
 * badge. Visual not built yet.
 */
export default function WhatYouGetCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.whatYouGet

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={2}
      className={className}
    >
      {/* TODO: box illustration + deliverable badge */}
    </BentoCard>
  )
}
