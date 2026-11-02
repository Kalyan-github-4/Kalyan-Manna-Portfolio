"use client"

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "framer-motion"
import { useEffect, type RefObject } from "react"

// Half-widths down the wand, tip first: a thin shaft with knuckles, a banded
// grip and a bulbous handle. Mirrored to build the outline.
const PROFILE: [number, number][] = [
    [0, 0.4], [24, 1.4], [62, 2.1], [70, 3.6], [78, 2.3], [140, 2.9], [150, 4.6], [160, 3.1],
    [222, 3.7], [232, 5.6], [242, 4], [296, 4.8], [304, 6.4], [326, 6.4], [334, 5.6], [362, 8.8],
    [382, 11.5], [398, 9], [412, 8.2], [428, 11], [444, 11.8], [460, 9], [472, 7.4], [480, 0],
]
const CENTER = 13

function wandOutline() {
    const right = PROFILE.map(([y, w]) => [CENTER + w, y])
    const left = PROFILE.map(([y, w]) => [CENTER - w, y]).reverse()
    const points = [...right, ...left]
    // Curves through the midpoints, so the knuckles read as turned wood, not facets.
    let d = `M ${points[0][0]} ${points[0][1]}`
    for (let i = 1; i < points.length - 1; i++) {
        const [x, y] = points[i]
        const [nx, ny] = points[i + 1]
        d += ` Q ${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`
    }
    return `${d} Z`
}

const OUTLINE = wandOutline()
const SCALE = 1.2
const WIDTH = 26 * SCALE
const HEIGHT = 480 * SCALE
const LEAN = 8
// The tip trails just below-right of the pointer, so the cursor itself stays clear.
const OFFSET = { x: 22, y: 14 }
// Where the wand stands when the pointer is elsewhere: just left of the card.
const REST = { x: 0.6, y: 0.12 }

/**
 * A wand that lives in `areaRef`. It stands beside the ID card by default,
 * follows the pointer while it's over the area, and drifts back to its spot
 * when the pointer leaves. Desktop only — it sits in a layer hidden below lg.
 */
export default function WandCursor({ areaRef }: { areaRef: RefObject<HTMLElement | null> }) {
    const reducedMotion = useReducedMotion()

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const spring = reducedMotion ? { stiffness: 2000, damping: 100 } : { stiffness: 140, damping: 22, mass: 0.9 }
    const springX = useSpring(x, spring)
    const springY = useSpring(y, spring)
    const swing = useTransform(useVelocity(springX), [-3000, 3000], [LEAN + 24, LEAN - 24], { clamp: true })
    const rotate = useSpring(swing, { stiffness: 70, damping: 16, mass: 1.2 })

    useEffect(() => {
        const area = areaRef.current
        if (!area) return

        let pointer: { clientX: number; clientY: number } | null = null

        const rest = (instant = false) => {
            const { width, height } = area.getBoundingClientRect()
            const restX = width * REST.x
            const restY = height * REST.y
            if (instant) {
                x.jump(restX)
                y.jump(restY)
                springX.jump(restX)
                springY.jump(restY)
            } else {
                x.set(restX)
                y.set(restY)
            }
        }

        const follow = () => {
            if (!pointer) return
            const rect = area.getBoundingClientRect()
            x.set(pointer.clientX - rect.left + OFFSET.x)
            y.set(pointer.clientY - rect.top + OFFSET.y)
        }

        const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return
            pointer = { clientX: event.clientX, clientY: event.clientY }
            follow()
        }
        const leave = () => {
            pointer = null
            rest()
        }

        rest(true)
        const resizeObserver = new ResizeObserver(() => {
            if (!pointer) rest(true)
        })
        resizeObserver.observe(area)

        area.addEventListener("pointermove", move)
        area.addEventListener("pointerleave", leave)
        // Scrolling slides the area under a still pointer, so re-aim from its last spot.
        window.addEventListener("scroll", follow, { passive: true })
        return () => {
            resizeObserver.disconnect()
            area.removeEventListener("pointermove", move)
            area.removeEventListener("pointerleave", leave)
            window.removeEventListener("scroll", follow)
        }
    }, [areaRef, x, y, springX, springY])

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden lg:block">
            <motion.div
                className="absolute left-0 top-0"
                style={{ x: springX, y: springY, rotate, marginLeft: -WIDTH / 2, transformOrigin: `${WIDTH / 2}px 0px` }}
            >
                <svg width={WIDTH} height={HEIGHT} viewBox="0 0 26 480" className="drop-shadow-[0_14px_30px_rgba(0,0,0,0.75)]">
                    <defs>
                        <linearGradient id="wand-wood" x1="0" x2="1">
                            <stop offset="0" stopColor="#0c0c0e" />
                            <stop offset="0.45" stopColor="#2a2a2e" />
                            <stop offset="1" stopColor="#0c0c0e" />
                        </linearGradient>
                    </defs>
                    <path d={OUTLINE} fill="url(#wand-wood)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" />
                    {/* The grip's bands. */}
                    <path d="M 6.6 304 H 19.4 M 6.6 326 H 19.4" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" />
                    <path d="M 13 310 L 16 320 H 10 Z" fill="#60a5fa" opacity="0.85" />
                </svg>
            </motion.div>
        </div>
    )
}
