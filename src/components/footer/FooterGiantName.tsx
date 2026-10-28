"use client"

import { memo, type RefObject } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { siteConfig } from "@/config"

type FooterGiantNameProps = {
    /** The reveal wrapper — the name settles as it scrolls fully into view. */
    targetRef: RefObject<HTMLElement | null>
}

// Diagonal hatching clipped to the glyphs, with a faint outline so the thin
// display serif keeps its shape, easing off toward the bottom without vanishing.
const hatchStyle = {
    backgroundImage:
        "repeating-linear-gradient(-45deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 3px)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextStroke: "1px rgba(255,255,255,0.18)",
    WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 100%)",
    maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 100%)",
} as const

function FooterGiantName({ targetRef }: FooterGiantNameProps) {
    // Progress is measured by hand rather than with useScroll's `target`, which
    // never updated here — the wrapper holds a position: fixed layer. 0 when
    // the wrapper's top meets the bottom of the screen, 1 once it is fully in.
    const { scrollY } = useScroll()
    const scrollYProgress = useTransform(scrollY, () => {
        const target = targetRef.current
        if (!target) return 0

        const { top, height } = target.getBoundingClientRect()
        if (height === 0) return 0

        return Math.min(Math.max((window.innerHeight - top) / height, 0), 1)
    })

    // Rises, grows and fades in as the cover lifts off it.
    // Settles at its resting opacity by the halfway mark.
    const y = useTransform(scrollYProgress, [0, 1], ["12%", "0%"])
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.7])

    return (
        // Same width and dashed sides as FooterBottom, so its edge borders run
        // on down to the bottom of the page with the name framed between them.
        <div
            aria-hidden="true"
            className="pointer-events-none mx-auto max-w-[calc(100%-48px)] select-none overflow-hidden border-x border-dashed border-white/10 pt-8 md:max-w-[calc(100%-80px)]"
        >
            <motion.p
                style={{ y, scale, opacity, ...hatchStyle }}
                className="origin-bottom whitespace-nowrap text-center font-display text-[15.5vw] leading-[0.8] tracking-tight"
            >
                {siteConfig.name}
            </motion.p>
        </div>
    )
}

export default memo(FooterGiantName)
