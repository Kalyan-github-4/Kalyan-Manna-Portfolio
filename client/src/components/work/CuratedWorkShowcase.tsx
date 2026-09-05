"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import GradientText from "../shared/GradientText"
import CuratedWorkCard from "./CuratedWorkCard"
import CuratedWorkDetails from "./CuratedWorkDetails"
import { curatedProjects } from "./curatedWork"

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

                    if (index !== -1) setActiveIndex(index)
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
            <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-10 pt-28 text-center sm:px-8">
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
                        colors={["#1E40AF", "#9333EA", "#DB2777"]}
                        animationSpeed={6}
                    >
                        Works
                    </GradientText>
                </motion.h2>
            </div>

            {/* No items-center here — the details column needs the full row
                height to stick against. */}
            <div className="mx-auto grid w-full max-w-[120rem] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:px-20 lg:pb-0">
                <div className="flex flex-col gap-24 lg:block">
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
                                <CuratedWorkDetails project={project} />
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
                    {/* The write-up swaps outright — no fade in or out. The
                        block is vertically centred in a fixed-height column,
                        so the only thing that moves between projects is the
                        text itself, and `layout` eases that reflow instead of
                        letting the lines jump to their new positions. */}
                    <motion.div layout transition={{ duration: 0.35, ease: EASE }} className="w-full">
                        <CuratedWorkDetails project={activeProject} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
