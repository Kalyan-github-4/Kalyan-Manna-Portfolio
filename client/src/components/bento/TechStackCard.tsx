import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Wide right tile: rows of tech pills drifting in alternating directions.
 * Visual not built yet.
 */
export default function TechStackCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.techStack

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={1}
      className={className}
    >
      {/* TODO: marquee rows of stack pills */}
    </BentoCard>
  )
}
