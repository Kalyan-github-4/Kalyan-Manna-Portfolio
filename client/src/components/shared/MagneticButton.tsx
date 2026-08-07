import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const SPRING_CONFIG = { damping: 100, stiffness: 400 }

type MagneticButtonProps = {
    children: ReactNode
    /** How far the element follows the cursor, as a fraction of the offset. */
    distance?: number
}

/**
 * Pulls its child toward the cursor while hovered and springs it back on exit.
 * Owns the x/y transform, so keep entry animations that also move on y — the
 * footer's fadeUp, for one — on a wrapper outside this rather than inside it.
 */
function MagneticButton({ children, distance = 0.6 }: MagneticButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, SPRING_CONFIG)
    const springY = useSpring(y, SPRING_CONFIG)

    useEffect(() => {
        const calculateDistance = (event: MouseEvent) => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const distanceX = event.clientX - (rect.left + rect.width / 2)
            const distanceY = event.clientY - (rect.top + rect.height / 2)

            x.set(isHovered ? distanceX * distance : 0)
            y.set(isHovered ? distanceY * distance : 0)
        }

        document.addEventListener("mousemove", calculateDistance)

        return () => document.removeEventListener("mousemove", calculateDistance)
    }, [distance, isHovered, x, y])

    return (
        <motion.div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    )
}

export { MagneticButton }
