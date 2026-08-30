import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Bottom-middle tile: the dotted globe with arcs and city labels. The existing
 * `shared/globe` component is the intended visual — wired up in a later pass.
 */
export default function TimezoneCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.timezones

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={3}
      className={className}
    >
      {/* TODO: globe + city markers */}
    </BentoCard>
  )
}
