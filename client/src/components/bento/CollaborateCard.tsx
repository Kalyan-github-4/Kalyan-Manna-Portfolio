import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

/**
 * Wide left tile: concentric rings with the portrait at their centre, copy and
 * the arrow below. Visual not built yet.
 */
export default function CollaborateCard({ className = "" }: { className?: string }) {
  const { eyebrow, title, href } = bentoCopy.collaborate

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      titlePosition="bottom"
      href={href}
      index={0}
      className={className}
    >
      {/* TODO: orbit rings + profile image */}
    </BentoCard>
  )
}
