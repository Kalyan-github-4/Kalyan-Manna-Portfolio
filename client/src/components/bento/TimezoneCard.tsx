import { Globe } from "@/components/ui/cobe-globe"

import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

// Module scope on purpose: the Globe rebuilds its WebGL context whenever any
// of its inputs change value, so a fresh array each render would tear the
// globe down and build it again on every pass.
const TILE_MARKERS = [
  { id: "bankura", location: [23.1815, 87.3036], label: "Bankura" },
  { id: "delhi", location: [28.6139, 77.209], label: "New Delhi" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "nyc", location: [40.7128, -74.006], label: "New York" },
  { id: "tokyo", location: [35.6762, 139.6503], label: "Tokyo" },
] satisfies { id: string; location: [number, number]; label: string }[]

// Every route starts at home, so the tile reads as one hub reaching out
// rather than an undirected mesh. Same module-scope rule as the markers.
const HOME: [number, number] = [23.1815, 87.3036]

const TILE_ARCS = [
  { id: "home-delhi", from: HOME, to: [28.6139, 77.209] },
  { id: "home-dubai", from: HOME, to: [25.2048, 55.2708] },
  { id: "home-london", from: HOME, to: [51.5074, -0.1278] },
  { id: "home-nyc", from: HOME, to: [40.7128, -74.006] },
  { id: "home-tokyo", from: HOME, to: [35.6762, 139.6503] },
] satisfies { id: string; from: [number, number]; to: [number, number] }[]

/**
 * Bottom-middle tile: the interactive cobe globe, oversized and anchored to
 * the bottom so it bleeds past the card edge instead of sitting inside it as a
 * complete circle. Tuned for a dark tile — lit landmass on a near-black
 * sphere — with a marker on each place I regularly work with and an arc
 * running from home out to every one of them.
 */
export default function TimezoneCard({ className = "" }: { className?: string }) {
  const { eyebrow, title } = bentoCopy.timezones

  return (
    <BentoCard
      eyebrow={eyebrow}
      title={title}
      index={3}
      className={className}
      visualClassName="min-h-32 sm:min-h-36"
    >
      {/* Wider than the slot and pushed below it — the card's overflow-hidden
          does the cropping, so only the top arc of the globe reads. */}
      <div className="absolute inset-x-0 -top-9 flex justify-center">
        <Globe
          className="w-[130%] max-w-none"
          markers={TILE_MARKERS}
          arcs={TILE_ARCS}
          dark={1}
          diffuse={0.4}
          theta={0.25}
          mapBrightness={2.4}
          mapSamples={16000}
          markerSize={0.06}
          baseColor={[0.28, 0.28, 0.32]}
          markerColor={[147 / 255, 51 / 255, 234 / 255]}
          glowColor={[0.16, 0.16, 0.2]}
          arcColor={[147 / 255, 51 / 255, 234 / 255]}
          arcWidth={0.5}
          arcHeight={0.25}
        />
      </div>
    </BentoCard>
  )
}
