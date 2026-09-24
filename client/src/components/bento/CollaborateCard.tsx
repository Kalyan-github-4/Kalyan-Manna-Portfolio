import Image from "next/image"

import { media } from "@/config/media"

import BentoCard from "./BentoCard"

// The robot is parked while the ring chain is the tile's visual. Restore both
// this import and the <LazyRobotScene /> below to bring it back.
// import LazyRobotScene from "@/components/robot/LazyRobotScene"

/**
 * Two chains of tangent rings running outward from the middle of the tile, with
 * the portrait wedged into the gap they leave between them.
 *
 * Every measurement is a multiple of `--d`, the diameter the ring strokes are
 * centred on, so the whole figure scales as one unit. `--d` is itself a share
 * of the tile's own width in container query units, so the proportions hold at
 * every breakpoint instead of being tuned per screen.
 */

/** Ring centres, in diameters out from the tile's midline. Tangent, so one apart. */
const RING_OFFSETS = [0.745, 1.745, 2.745]

/** Stroke weight and the ring box it implies — the border straddles `--d`. */
const STROKE = "calc(var(--d) * 0.061)"
const RING_BOX = "calc(var(--d) * 1.061)"

/**
 * The chain doesn't end, it fades — it falls from full strength at the midline
 * to nothing well short of the card's edge, so the rings read as a fragment of
 * something longer rather than a row of six.
 */
const CHAIN_FADE =
  "linear-gradient(to right, transparent 4%, rgba(0,0,0,0.22) 6%, rgba(0,0,0,0.27) 8%, rgba(0,0,0,0.38) 13%, rgba(0,0,0,0.47) 19%, rgba(0,0,0,0.59) 24%, rgba(0,0,0,0.66) 27%, rgba(0,0,0,0.78) 34%, rgba(0,0,0,0.9) 42%, #000 50%, rgba(0,0,0,0.9) 58%, rgba(0,0,0,0.78) 66%, rgba(0,0,0,0.66) 73%, rgba(0,0,0,0.59) 76%, rgba(0,0,0,0.47) 81%, rgba(0,0,0,0.38) 87%, rgba(0,0,0,0.27) 92%, rgba(0,0,0,0.22) 94%, transparent 96%)"

/**
 * Client faces that surface on hover, each parked on a ring's stroke. `x`/`y`
 * are the avatar's centre in diameters from the tile's midpoint and `size` its
 * width in diameters; `opacity` dims a face on hover. Kept inside ±2.2 so
 * none drift past the chain's fade.
 */
const CLIENTS = [
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces&q=80", x: -2.18, y: -0.25, size: 0.24, opacity: 0.6 },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80", x: -0.8, y: -0.45, size: 0.35 },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces&q=80", x: -1.1, y: 0.35, size: 0.29 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80", x: 1.0, y: 0.38, size: 0.34 },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces&q=80", x: 2.0, y: -0.43, size: 0.26, opacity: 0.6 },
]

export default function CollaborateCard({ className = "" }: { className?: string }) {
  return (
    <BentoCard
      index={0}
      className={className}
      eyebrow="Let's build together"
      title="Clear communication, fast iterations, no surprises"
      titlePosition="bottom"
      copyAlign="center"
      visualClassName="grid place-items-center [container-type:inline-size]"
    >
      <div
        className="relative w-full"
        style={{
          ["--d" as string]: "clamp(5.25rem, 20cqw, 10.5rem)",
          height: "calc(var(--d) * 1.08)",
        }}
      >
        {/* The rings are drawn opaque and the whole layer is dimmed as one, so
            that where two tangent rings meet the strokes stay a single weight
            instead of compounding into a bright seam. The mask forces the
            flattening the effect depends on. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.135] transition-opacity duration-500 ease-out group-hover:opacity-[0.3]"
          style={{ maskImage: CHAIN_FADE, WebkitMaskImage: CHAIN_FADE }}
        >
          {RING_OFFSETS.flatMap((offset) => [-offset, offset]).map((offset) => (
            <span
              key={offset}
              className="absolute top-1/2 left-1/2 rounded-full border-white transition-colors duration-500 ease-out group-hover:border-primary"
              style={{
                width: RING_BOX,
                height: RING_BOX,
                // Heavy — a sixteenth of the diameter — which is what keeps
                // these reading as links rather than hairline outlines.
                borderWidth: STROKE,
                translate: `calc(${offset} * var(--d) - 50%) -50%`,
              }}
            />
          ))}
        </div>

        {/* Outside the faded layer, so the portrait holds full strength however
            far the chain either side of it has dimmed. */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border-white/15 bg-white/4 transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-primary/70 group-hover:shadow-[0_0_28px_-4px_var(--accent)]"
          style={{
            width: "calc(var(--d) * 0.715)",
            height: "calc(var(--d) * 0.715)",
            borderWidth: "calc(var(--d) * 0.012)",
            padding: STROKE,
          }}
        >
          <Image
            src={media.profile}
            alt=""
            width={220}
            height={220}
            sizes="220px"
            className="size-full rounded-full object-cover"
          />
        </div>

        {/* Clients pop onto the chain on hover, one after another. Also outside
            the faded layer so each face lands at full strength. */}
        {CLIENTS.map((client, i) => (
          <span
            key={client.src}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 scale-50 rounded-full border-2 border-primary/60 bg-card p-0.5 opacity-0 shadow-[0_0_18px_-4px_var(--accent)] transition-[opacity,scale] duration-300 ease-out group-hover:scale-100 group-hover:opacity-(--o) group-hover:duration-500 group-hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:scale-100"
            style={{
              width: `calc(var(--d) * ${client.size})`,
              height: `calc(var(--d) * ${client.size})`,
              translate: `calc(${client.x} * var(--d) - 50%) calc(${client.y} * var(--d) - 50%)`,
              transitionDelay: `${i * 60}ms`,
              ["--o" as string]: client.opacity ?? 1,
            }}
          >
            {/* Plain <img>: next/image has no remote hosts configured. */}
            <img
              src={client.src}
              alt=""
              loading="lazy"
              className="size-full rounded-full object-cover"
            />
          </span>
        ))}
      </div>

      {/* <LazyRobotScene wrapperClassName="absolute inset-0" scale={1.6} yOffset={-0.2} /> */}
    </BentoCard>
  )
}
