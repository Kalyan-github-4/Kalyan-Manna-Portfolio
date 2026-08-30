import BentoCard from "./BentoCard"
import StackLens from "./StackLens"
import { bentoCopy } from "./bentoData"

/**
 * Wide right tile: the stack marquee with a magnifier the visitor can drag
 * across the whole tile. The lens goes in as an overlay rather than a child so
 * it can travel past the visual slot and over the heading; the slot itself
 * just reserves the height the marquee needs.
 */
export default function TechStackCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.techStack

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={1}
      className={className}
      visualClassName="h-[168px] sm:h-[196px]"
      copyClassName="flex min-h-24 flex-1 flex-col justify-center sm:min-h-28"
      overlay={<StackLens />}
    />
  )
}
