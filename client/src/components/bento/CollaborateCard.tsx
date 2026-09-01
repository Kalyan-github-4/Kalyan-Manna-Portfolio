import LazyRobotScene from "@/components/robot/LazyRobotScene"

import BentoCard from "./BentoCard"

/**
 * Wide left tile: the interactive robot and nothing else — no eyebrow, no
 * title, no arrow. Drag it or tap it and it reacts, so the tile is the
 * affordance rather than a label pointing at one.
 */
export default function CollaborateCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard index={0} className={className} visualClassName="min-h-64">
      <LazyRobotScene wrapperClassName="absolute inset-0" scale={2.2} yOffset={-0.3} />
    </BentoCard>
  )
}
