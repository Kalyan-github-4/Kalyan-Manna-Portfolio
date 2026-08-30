import type { COBEOptions } from "cobe"

import { Globe } from "../shared/globe"
import BentoCard from "./BentoCard"
import { bentoCopy } from "./bentoData"

// Module scope on purpose: the Globe effect re-runs whenever `config` changes
// identity, so a fresh object each render would tear down and rebuild the
// WebGL globe on every pass.
//
// The shared default is a white globe for the light 404 page. This one is
// tuned for a dark tile — lit landmass on a near-black sphere — and drops a
// marker on each place I regularly work with.
const TILE_GLOBE: COBEOptions = {
  width: 600,
  height: 600,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 2.4,
  baseColor: [0.28, 0.28, 0.32],
  markerColor: [147 / 255, 51 / 255, 234 / 255],
  glowColor: [0.16, 0.16, 0.2],
  markers: [
    { location: [23.1815, 87.3036], size: 0.09 }, // home — Bankura, IN
    { location: [28.6139, 77.209], size: 0.06 }, // New Delhi
    { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
    { location: [51.5074, -0.1278], size: 0.06 }, // London
    { location: [40.7128, -74.006], size: 0.06 }, // New York
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  ],
}

/**
 * Bottom-middle tile: the shared cobe globe, oversized and anchored to the
 * bottom so it bleeds past the card edge instead of sitting inside it as a
 * complete circle.
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
      <div className="pointer-events-none absolute inset-x-0 -top-9 flex justify-center">
        <Globe className="w-[130%] max-w-none" config={TILE_GLOBE} />
      </div>
    </BentoCard>
  )
}
