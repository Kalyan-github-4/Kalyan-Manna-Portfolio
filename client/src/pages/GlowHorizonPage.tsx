import { Link } from "react-router-dom"
import GlowHorizon from "@/components/hero/GlowHorizon"

export default function GlowHorizonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <GlowHorizon />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
            to="/"
          >
            Back to home
          </Link>
          <a
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur"
            href="/glow-horizon"
          >
            /glow-horizon
          </a>
        </div>

        <div className="pointer-events-none flex flex-1 items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/45">Void Purple Preview</p>
            <h1 className="text-4xl font-display text-white md:text-6xl">GlowHorizon</h1>
            <p className="mt-4 text-sm leading-6 text-white/55 md:text-base">
              Full-viewport background preview with a centered glowing horizon arc, ambient violet haze, and subtle light beams.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}