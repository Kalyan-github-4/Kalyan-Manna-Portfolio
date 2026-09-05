"use client"

import { useCallback, useEffect, useRef } from "react"
import createGlobe from "cobe"

interface Marker {
  id: string
  location: [number, number]
  label: string
}

interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

interface GlobeProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

/**
 * A draggable cobe globe with anchor-positioned labels for its markers and
 * arcs. Drag spins it, releasing flings it with decaying momentum, and the
 * vertical tilt eases back inside its limits so it never rolls past the poles.
 */
export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  arcColor = [0.3, 0.45, 0.85],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return

    const deltaX = e.clientX - pointerInteracting.current.x
    const deltaY = e.clientY - pointerInteracting.current.y
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }

    const now = Date.now()
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1)
      const maxVelocity = 0.15
      velocity.current = {
        phi: Math.max(
          -maxVelocity,
          Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
        ),
        theta: Math.max(
          -maxVelocity,
          Math.min(
            maxVelocity,
            ((e.clientY - lastPointer.current.y) / dt) * 0.08
          )
        ),
      }
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  // One key covering every visual input. The array and tuple props are new
  // objects on each render — the defaults above included — so depending on them
  // individually would tear down and rebuild the WebGL context every time a
  // parent re-renders.
  const configKey = JSON.stringify([
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  ])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    const toMarkers = () =>
      markers.map((m) => ({ location: m.location, size: markerSize, id: m.id }))
    const toArcs = () => arcs.map((a) => ({ from: a.from, to: a.to, id: a.id }))

    function animate() {
      if (!isPausedRef.current) {
        phi += speed

        if (
          Math.abs(velocity.current.phi) > 0.0001 ||
          Math.abs(velocity.current.theta) > 0.0001
        ) {
          phiOffsetRef.current += velocity.current.phi
          thetaOffsetRef.current += velocity.current.theta
          velocity.current.phi *= 0.95
          velocity.current.theta *= 0.95
        }

        // Ease the tilt back inside its limits rather than hard-clamping it.
        const thetaMin = -0.4
        const thetaMax = 0.4
        if (thetaOffsetRef.current < thetaMin) {
          thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
        } else if (thetaOffsetRef.current > thetaMax) {
          thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
        }
      }

      globe!.update({
        phi: phi + phiOffsetRef.current + dragOffset.current.phi,
        theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
        dark,
        mapBrightness,
        markerColor,
        baseColor,
        arcColor,
        markerElevation,
        markers: toMarkers(),
        arcs: toArcs(),
      })

      animationId = requestAnimationFrame(animate)
    }

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: toMarkers(),
        arcs: toArcs(),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.7,
      })

      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    // A tile that starts collapsed has no width yet, so wait for the first real
    // layout instead of building a zero-sized globe that never repaints.
    let ro: ResizeObserver | null = null
    if (canvas.offsetWidth > 0) {
      init()
    } else {
      ro = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          ro?.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      ro?.disconnect()
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />

      {/* cobe publishes an anchor name and a 0→1 visibility variable per id, so
          each label rides along with the sphere and fades as its point turns
          away from the camera. */}
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 8,
            padding: "2px 6px",
            background: "#1a1a2e",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap" as const,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.8s, filter 0.8s",
          }}
        >
          {m.label}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate3d(-50%, -1px, 0)",
              border: "5px solid transparent",
              borderTopColor: "#1a1a2e",
            }}
          />
        </div>
      ))}

      {arcs
        .filter((a) => a.label)
        .map((a) => (
          <div
            key={a.id}
            style={{
              position: "absolute",
                positionAnchor: `--cobe-arc-${a.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 8,
              padding: "2px 6px",
              background: "#fff",
              color: "#1a1a2e",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              whiteSpace: "nowrap" as const,
              pointerEvents: "none" as const,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              opacity: `var(--cobe-visible-arc-${a.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-arc-${a.id}, 0)) * 8px))`,
              transition: "opacity 0.8s, filter 0.8s",
            }}
          >
            {a.label}
            <span
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translate3d(-50%, -1px, 0)",
                border: "5px solid transparent",
                borderTopColor: "#fff",
              }}
            />
          </div>
        ))}
    </div>
  )
}
