import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
  Lightning,
  PersonArmsSpread,
  ShieldCheck,
  Sparkle,
  type Icon,
} from "@phosphor-icons/react"

type Chip = {
  id: number
  title: string
  description: string
  icon: Icon
}

const INITIAL_CHIPS: Chip[] = [
  {
    id: 1,
    title: "Production Ready",
    description: "Fully type-safe and tested",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Fluid Motion",
    description: "60fps optimizations built-in",
    icon: Lightning,
  },
  {
    id: 3,
    title: "Accessible",
    description: "Works perfectly for everyone",
    icon: PersonArmsSpread,
  },
  {
    id: 4,
    title: "Modern Design",
    description: "Crafted for high-end feel",
    icon: Sparkle,
  },
]

/**
 * The deliverables illustration: a chip drops into an open box every couple of
 * seconds, and the queue rotates so it reads as a steady stream of things
 * being packed rather than a list.
 *
 * Three stacked layers are what make the chip land *inside* the box instead of
 * sliding over it — rear flaps at z-0, the chip at z-10, box body and front
 * flap at z-20. The second SVG references filter ids declared in the first.
 */

type BucketProps = {
  className?: string
}

export default function Bucket({ className }: BucketProps) {
  const [items, setItems] = useState(INITIAL_CHIPS)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setItems((previous) => {
        const [first, ...rest] = previous

        return [...rest, first]
      })
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

  const chip = items[0]
  const ChipIcon = chip.icon

  return (
    <div className={cn(
      // Deliberately not clipped: the chip enters from above the frame.
      "relative isolate aspect-655/352",
      className
    )}>
      {/* ── Behind the chip: the rear flaps ─────────────────────────────── */}
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 655 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0"
      >
        <g filter="url(#filter1_dddi_51_65)">
          <path
            d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z"
            fill="white"
            fillOpacity="0.42"
            shapeRendering="crispEdges"
          />
        </g>

        <g filter="url(#filter2_dddi_51_65)">
          <path
            d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z"
            fill="white"
            fillOpacity="0.42"
            shapeRendering="crispEdges"
          />
        </g>

        <g filter="url(#filter3_dddi_51_65)">
          <path
            d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z"
            fill="url(#paint0_linear_51_65)"
            fillOpacity="0.72"
            shapeRendering="crispEdges"
          />
        </g>

        <g filter="url(#filter4_dddi_51_65)">
          <path
            d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z"
            fill="white"
            fillOpacity="0.32"
            shapeRendering="crispEdges"
          />
        </g>

        <g filter="url(#filter5_dddi_51_65)">
          <path
            d="M487.973 78.9088V42.8774L536.404 79.1144L487.973 78.9088Z"
            fill="white"
            fillOpacity="0.32"
            shapeRendering="crispEdges"
          />
        </g>

        <defs>
          <BucketFilters />
        </defs>
      </svg>

      {/* ── The chip ────────────────────────────────────────────────────── */}
      {/* The chip is pinned to the bottom of this band, so it holds its height
          above the lip at any render size. The lip itself is at 22.4% (y=79 of
          the 352 viewBox); the band stops short of it to leave a gap. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[13%]">
        <div className="relative flex h-full w-full items-end justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={chip.id}
              initial={{ y: -40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 56, scale: 0.8, transition: { duration: 0.8 } }}
              transition={{
                duration: 0.5,
                ease: [0.455, 0.03, 0.515, 0.955],
              }}
              className="pointer-events-auto absolute bottom-0 flex w-47.5 origin-bottom items-center gap-2 rounded-full border border-white/12 bg-zinc-950/95 py-1.5 pl-1.5 pr-3 text-left shadow-lg shadow-black/40"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
                <ChipIcon size={14} weight="duotone" />
              </span>

              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-[11px] font-semibold leading-none text-white">
                  {chip.title}
                </span>
                <span className="truncate text-[9px] leading-tight text-white/45">
                  {chip.description}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── In front of the chip: the box body and the front flap ───────── */}
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 655 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <g filter="url(#filter0_i_51_65)">
          <path
            d="M512.766 79.1595L147.766 79.1624C136.453 79.1625 130.796 79.1626 127.281 82.6773C123.766 86.192 123.766 91.8488 123.766 103.162V327.159C123.766 338.473 123.766 344.13 127.281 347.645C130.796 351.159 136.453 351.159 147.766 351.159H512.766C524.08 351.159 529.737 351.159 533.252 347.645C536.766 344.13 536.766 338.473 536.766 327.159V103.159C536.766 91.8457 536.766 86.1888 533.252 82.6741C529.737 79.1594 524.08 79.1594 512.766 79.1595Z"
            className="fill-card"
          />
        </g>

        <g filter="url(#filter6_dddi_51_65)">
          <path
            d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z"
            fill="white"
            fillOpacity="0.42"
            shapeRendering="crispEdges"
          />
        </g>
      </svg>
    </div>
  )
}

type FilterRegion = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

// Every flap uses the same three drop shadows plus an inner highlight and
// differs only in the region it covers, so the body is written once here
// rather than five times inline.
const FILTER_REGIONS: FilterRegion[] = [
  { id: "filter1_dddi_51_65", x: 443.561, y: -10.5141, width: 211.24, height: 166.977 },
  { id: "filter2_dddi_51_65", x: 0, y: -10.9516, width: 215.96, height: 167.786 },
  { id: "filter3_dddi_51_65", x: 78.7048, y: 20.823, width: 501.297, height: 136.012 },
  { id: "filter4_dddi_51_65", x: 78.7048, y: 20.823, width: 137.255, height: 136.012 },
  { id: "filter5_dddi_51_65", x: 443.561, y: 20.823, width: 137.255, height: 136.012 },
  { id: "filter6_dddi_51_65", x: 21.477, y: 56.6875, width: 612.444, height: 212.562 },
]

function InnerHighlight({ result }: { result: string }) {
  return (
    <>
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="5.51362" />
      <feGaussianBlur stdDeviation="1.83787" />
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
      />
      <feBlend mode="normal" in2="shape" result={result} />
    </>
  )
}

function DropShadowStack({ id, x, y, width, height }: FilterRegion) {
  return (
    <filter
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feFlood floodOpacity="0" result="BackgroundImageFix" />

      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="33.3087" />
      <feGaussianBlur stdDeviation="22.2058" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_51_65"
      />

      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="1.27808" />
      <feGaussianBlur stdDeviation="1.27808" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
      />
      <feBlend
        mode="normal"
        in2="effect1_dropShadow_51_65"
        result="effect2_dropShadow_51_65"
      />

      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="8.94656" />
      <feGaussianBlur stdDeviation="4.47328" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
      />
      <feBlend
        mode="normal"
        in2="effect2_dropShadow_51_65"
        result="effect3_dropShadow_51_65"
      />

      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect3_dropShadow_51_65"
        result="shape"
      />

      <InnerHighlight result="effect4_innerShadow_51_65" />
    </filter>
  )
}

function BucketFilters() {
  return (
    <>
      {/* The box body carries the inner highlight only — no drop shadows. */}
      <filter
        id="filter0_i_51_65"
        x="123.766"
        y="79.1595"
        width="413"
        height="275.676"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <InnerHighlight result="effect1_innerShadow_51_65" />
      </filter>

      {FILTER_REGIONS.map((region) => (
        <DropShadowStack key={region.id} {...region} />
      ))}

      <linearGradient
        id="paint0_linear_51_65"
        x1="329.353"
        y1="42.8774"
        x2="329.353"
        y2="79.1144"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.4" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </>
  )
}
