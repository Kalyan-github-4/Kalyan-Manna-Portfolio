import LazyRobotScene from "@/components/robot/LazyRobotScene"

import BentoCard from "./BentoCard"

/**
 * Wide left tile: the interactive robot and nothing else — no eyebrow, no
 * title, no arrow. Drag it or tap it and it reacts, so the tile is the
 * affordance rather than a label pointing at one. "NAMASTE" sits behind it as
 * texture, sized off the tile's own width so it fills the card at every
 * breakpoint instead of being tuned per screen.
 */
export default function CollaborateCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard index={0} className={className} visualClassName="min-h-64 [container-type:inline-size]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display font-semibold uppercase leading-none tracking-[0.12em] text-white/[0.07]"
        style={{ fontSize: "clamp(2.5rem, 15cqw, 9rem)" }}
      >
        Let's Build Together
      </span>

      <LazyRobotScene wrapperClassName="absolute inset-0" scale={1.6} yOffset={-0.2} />
    </BentoCard>
  )
}
