"use client"

import dynamic from "next/dynamic"
import { useInView } from "framer-motion"
import { useRef, type ComponentProps } from "react"

import type { Globe as GlobeComponent } from "@/components/ui/cobe-globe"

type GlobeProps = ComponentProps<typeof GlobeComponent>

/**
 * The cobe globe is a WebGL canvas with nothing to server-render, and building
 * it (shader compile plus 16k map samples) is one of the heaviest tasks on the
 * page. So it is neither in the first-load JS nor built at load: the chunk is
 * fetched and the globe created only once its tile is about to scroll into
 * view. The wrapper keeps the globe's square box, so nothing shifts when the
 * canvas arrives (it fades in on its own).
 */
const Globe = dynamic(() => import("@/components/ui/cobe-globe").then((m) => m.Globe), {
  ssr: false,
  loading: () => null,
})

export default function LazyGlobe(props: GlobeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: "300px 0px" })

  return (
    <div ref={ref} className={`relative aspect-square ${props.className ?? ""}`}>
      {near && <Globe {...props} className="w-full" />}
    </div>
  )
}
