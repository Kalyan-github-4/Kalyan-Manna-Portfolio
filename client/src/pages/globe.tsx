import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    {
      location: [23.1815, 87.3036],
      size: 0.1,
    },
  ],
}

export interface GlobeProps {
  className?: string
  config?: COBEOptions
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    let phi = config.phi
    let animationFrameId = 0

    const getCanvasSize = () => {
      const width = canvas.offsetWidth
      const pixelRatio = config.devicePixelRatio ?? 2

      return {
        width: width * pixelRatio,
        height: width * pixelRatio,
      }
    }

    const size = getCanvasSize()

    const globe = createGlobe(canvas, {
      ...config,
      width: size.width,
      height: size.height,
    })

    const animate = () => {
      phi += 0.005

      const currentSize = getCanvasSize()

      globe.update({
        phi,
        width: currentSize.width,
        height: currentSize.height,
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      globe.destroy()
    }
  }, [config])

  return (
    <div className={cn("relative aspect-square w-full max-w-md", className)}>
      <canvas
        ref={canvasRef}
        className="size-full [contain:layout_paint_size]"
      />
    </div>
  )
}