"use client"

import { memo, type RefObject } from "react"
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion"

import { siteConfig } from "@/config"

type FooterGiantNameProps = {
    /** The reveal wrapper — the name settles as it scrolls fully into view. */
    targetRef: RefObject<HTMLElement | null>
}

// Diagonal hatching clipped to the glyphs, with a faint outline so the thin
// display serif keeps its shape. Applied per letter: background-clip: text on
// a parent doesn't follow transformed children.
const hatchStyle = {
    backgroundImage:
        "repeating-linear-gradient(-45deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 3px)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextStroke: "1px rgba(255,255,255,0.18)",
} as const

// Eases off toward the bottom without vanishing.
const fadeMask = {
    WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 100%)",
    maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.3) 100%)",
} as const

// Share of the scroll range each letter animates over; the rest is spread
// across the letters as stagger, so the last one lands exactly at 1.
const LETTER_SPAN = 0.45

type LetterProps = {
    char: string
    index: number
    count: number
    progress: MotionValue<number>
}

function Letter({ char, index, count, progress }: LetterProps) {
    const start = count > 1 ? (index / (count - 1)) * (1 - LETTER_SPAN) : 0
    const end = start + LETTER_SPAN

    const y = useTransform(progress, [start, end], ["70%", "0%"])
    const rotate = useTransform(progress, [start, end], [8, 0])
    const opacity = useTransform(progress, [start, start + LETTER_SPAN * 0.6], [0, 1])
    const filter = useTransform(progress, [start, end], ["blur(10px)", "blur(0px)"])

    return (
        <motion.span
            style={{ y, rotate, opacity, filter, ...hatchStyle }}
            className="inline-block origin-bottom-left will-change-transform"
        >
            {char === " " ? " " : char}
        </motion.span>
    )
}

function FooterGiantName({ targetRef }: FooterGiantNameProps) {
    const reduceMotion = useReducedMotion()

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

    const letters = Array.from(siteConfig.name)

    return (
        // Same width and dashed sides as FooterBottom, so its edge borders run
        // on down to the bottom of the page with the name framed between them.
        <div
            aria-hidden="true"
            className="pointer-events-none relative mx-auto max-w-[calc(100%-48px)] select-none overflow-hidden border-x border-dashed border-white/10 pt-8 md:max-w-[calc(100%-80px)]"
        >
            <p
                style={fadeMask}
                className="whitespace-nowrap text-center font-display text-[15.5vw] leading-[0.8] tracking-tight opacity-40"
            >
                {reduceMotion ? (
                    <span style={hatchStyle}>{siteConfig.name}</span>
                ) : (
                    letters.map((char, i) => (
                        <Letter
                            key={i}
                            char={char}
                            index={i}
                            count={letters.length}
                            progress={scrollYProgress}
                        />
                    ))
                )}
            </p>

            {/* Black shade rising from the bottom edge, in the footer's own
                background colour so the letters sink into the page. */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-[#08080a] via-[#08080a]/70 to-transparent" />
        </div>
    )
}

export default memo(FooterGiantName)
