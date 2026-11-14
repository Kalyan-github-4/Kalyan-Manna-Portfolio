"use client"

import { useRef } from "react"
import type { PointerEvent, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const SPRING_CONFIG = { damping: 100, stiffness: 400 }

type MagneticButtonProps = {
    children: ReactNode
    /** How far the element follows the cursor, as a fraction of the offset. */
    distance?: number
}

/**
 * Pulls its child toward the cursor while hovered and springs it back on exit.
 * Mouse only: touch and pen pointers are ignored, so a tap on a phone never
 * makes the button jump. Listens on the element itself, so nothing runs while
 * the cursor is elsewhere on the page.
 *
 * Owns the x/y transform, so keep entry animations that also move on y — the
 * footer's fadeUp, for one — on a wrapper outside this rather than inside it.
 */
function MagneticButton({ children, distance = 0.6 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, SPRING_CONFIG)
    const springY = useSpring(y, SPRING_CONFIG)

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse" || !ref.current) return

        const rect = ref.current.getBoundingClientRect()
        x.set((event.clientX - (rect.left + rect.width / 2)) * distance)
        y.set((event.clientY - (rect.top + rect.height / 2)) * distance)
    }

    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            onPointerCancel={reset}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    )
}

export { MagneticButton }
