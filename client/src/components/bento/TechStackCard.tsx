import BentoCard from "./BentoCard"
import StackLens from "./StackLens"
import { bentoCopy } from "./bentoData"

/**
 * Wide right tile: the stack marquee with a magnifier the visitor can drag
 * across the whole tile. The lens goes in as an overlay rather than a child so
 * it can travel past the visual slot and over the heading; the slot itself
 * just reserves the height the marquee needs. The copy block is centred in
 * the tile rather than hugging the left edge, so the heading sits under the
 * lens' travel path instead of off to one side.
 */
export default function TechStackCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.techStack

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={1}
      className={className}
      visualClassName="h-[188px] sm:h-[220px]"
      copyClassName="flex flex-1 flex-col justify-start [&>div]:justify-center"
      overlay={<StackLens />}
    />
  )
}
