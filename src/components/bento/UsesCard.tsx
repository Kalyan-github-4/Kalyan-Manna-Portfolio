import BentoCard from "./BentoCard"
import IntegrationHub from "./IntegrationHub"
// Parked for now — swap back in for IntegrationHub below to restore the rail.
// import ToolRail from "./ToolRail"
import { bentoCopy } from "./bentoData"

/**
 * Bottom-right tile: the tools wired into a central hub above the copy,
 * linking to the /more/uses page.
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
      copyClassName="text-left"
      // The hub diagram needs room for three rows of tiles; any shorter and
      // the top and bottom tiles overlap the hub.
      visualClassName="min-h-55"
    >
      {/* <ToolRail /> */}
      <IntegrationHub />
    </BentoCard>
  )
}
