"use client"

import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import FrameMarker from "../shared/FrameMarker"
import GradientText, { HEADING_GRADIENT } from "../shared/GradientText"
import { faintDiagonalStripeStyle } from "../shared/stripeStyles"
import CuratedWorkCard from "./CuratedWorkCard"
import CuratedWorkDetails from "./CuratedWorkDetails"
import { curatedProjects } from "@/data/curatedWorkData"
import { playSwitch } from "@/lib/tap-sound"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

/**
 * Split 60/40: the banners scroll normally down the wide column, one viewport
 * each, while the write-up column sticks to the top of the screen. A banner
 * claims that column once it has climbed past the 51% line, so the details
 * never move — they just swap with a fade-up as the next project takes over.
 * Phones drop the split and stack each write-up under its own banner.
 */
export default function CuratedWorkShowcase() {
    const [activeIndex, setActiveIndex] = useState(0)
    // Mirrors activeIndex for the observer callback, which only sees the
    // first render's state, so it can tell a real switch from a re-report.
    const activeIndexRef = useRef(0)
    const bannerRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        // A thin band 51% down the viewport. A banner takes over the detail
        // column the moment its top edge rises past that line — i.e. once it
        // has climbed more than half way up the screen — and keeps it until
        // the next banner reaches the same line.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue

                    const index = bannerRefs.current.indexOf(
                        entry.target as HTMLDivElement,
                    )

                    if (index === -1 || index === activeIndexRef.current) continue

                    activeIndexRef.current = index
                    setActiveIndex(index)

                    // Only the desktop split actually swaps the write-up;
                    // phones stack each project, so there is no switch to hear.
                    if (window.matchMedia("(min-width: 1024px)").matches) {
                        playSwitch()
                    }
                }
            },
            { rootMargin: "-51% 0px -48% 0px", threshold: 0 },
        )

        for (const node of bannerRefs.current) {
            if (node) observer.observe(node)
        }

        return () => observer.disconnect()
    }, [])

    const activeProject = curatedProjects[activeIndex]

    return (
        <section
            id="curated-work"
            className="relative overflow-x-clip text-white"
        >
            {/* Padding matches EdgeStripes (same as the bento), so the frame's
                horizontal rules end on the gutters' inner border lines. */}
            <div className="mx-auto w-full max-w-[120rem] pl-8 pr-5 pt-28 sm:pl-10 sm:pr-7 lg:pl-11 lg:pr-9">
                <div className="relative flex flex-col items-center border-y border-white/10 px-5 py-16 text-center sm:px-8">
                    <FrameMarker className="-left-1 -top-1" />
                    <FrameMarker className="-right-1 -top-1" />

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
                    >
                        case studies
                    </motion.p>

                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                        className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Curated {" "}
                        <GradientText
                            className="inline-block overflow-visible pb-2 italic"
                            colors={HEADING_GRADIENT}
                            animationSpeed={6}
                        >
                            Works
                        </GradientText>
                    </motion.h2>
                </div>

                {/* No items-center here — the details column needs the full row
                    height to stick against. */}
                <div className="grid lg:grid-cols-[3fr_2fr]">
                    <div className="relative isolate flex flex-col gap-24 px-4 py-10 sm:px-8 lg:block lg:border-r lg:border-white/10 lg:px-6 lg:py-0">
                        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block" style={faintDiagonalStripeStyle} />
                        <FrameMarker className="-right-1 -top-1 hidden lg:block" />
                        <FrameMarker className="-bottom-1 -right-1 hidden lg:block" />

                        {curatedProjects.map((project, index) => (
                            <div
                                key={project.title}
                                className="lg:flex lg:h-svh lg:flex-col lg:justify-center"
                            >
                                {/* The card itself is what the observer watches —
                                    the 51% line is about the banner, not its row. */}
                                <div
                                    ref={(node) => {
                                        bannerRefs.current[index] = node
                                    }}
                                >
                                    <CuratedWorkCard project={project} />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.12,
                                        ease: EASE,
                                    }}
                                    className="mt-10 lg:hidden"
                                >
                                    <CuratedWorkDetails
                                        project={project}
                                        index={index}
                                        total={curatedProjects.length}
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:px-12">
                        {/* The write-up swaps outright — no fade in or out. The
                            block is vertically centred in a fixed-height column,
                            so the only thing that moves between projects is the
                            text itself, and `layout` eases that reflow instead of
                            letting the lines jump to their new positions. */}
                        <motion.div layout transition={{ duration: 0.35, ease: EASE }} className="w-full">
                            <CuratedWorkDetails
                                project={activeProject}
                                index={activeIndex}
                                total={curatedProjects.length}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Same bare mono CTA the vault showcase ends on. */}
                <div className="relative flex justify-center border-y border-white/10 py-8">
                    <FrameMarker className="-bottom-1 -left-1" />
                    <FrameMarker className="-bottom-1 -right-1" />
                    <Link
                        href="/work"
                        className="group flex items-center gap-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                    >
                        See all projects
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={11} weight="bold" aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
