import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Bottom-right tile: a drifting row of app icons above the copy, linking to
 * the /more/uses page. Visual not built yet.
 */
export default function UsesCard({ className = "" }: { className?: string }) {
  const { eyebrow, title, href } = bentoCopy.uses

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      titlePosition="bottom"
      href={href}
      index={4}
      className={className}
    >
      {/* TODO: app icon rail */}
    </BentoCard>
  )
}
