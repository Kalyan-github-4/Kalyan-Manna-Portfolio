"use client"

import {
    Barbell,
    Brain,
    GlobeHemisphereEast,
    RocketLaunch,
    Sparkle,
    type Icon,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { bucketSections, type BucketSectionId } from "@/data/bucketListData"
import { BucketCard } from "@/components/bucketList/BucketCard"
import BackgroundRipple from "@/components/shared/BackgroundRipple"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"

const EASE = [0.22, 1, 0.36, 1] as const

const SECTION_ICONS: Record<BucketSectionId, Icon> = {
    career: RocketLaunch,
    travel: GlobeHemisphereEast,
    growth: Brain,
    fitness: Barbell,
    life: Sparkle,
}

export default function BucketList() {
    const allItems = bucketSections.flatMap((section) => section.items)
    const doneCount = allItems.filter((item) => item.doneOn).length

    return (
        <main className="min-h-screen bg-black">
            {/* Same shell as /vault: rippling backdrop, edge stripes, same padding. */}
            <section className="relative overflow-hidden bg-black px-4 py-28 text-white sm:px-8 lg:px-9">
                <BackgroundRipple rows={7} cols={30} />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <div className="relative mb-16 flex min-h-50 items-center justify-center pl-12 pr-9 text-center sm:px-14">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: EASE }}
                                className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                            >
                                The Bucket List
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 26 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                                className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl"
                            >
                                Things i&apos;ll do{" "}
                                <GradientText
                                    className="inline-block overflow-visible pb-4 italic"
                                    colors={HEADING_GRADIENT}
                                    animationSpeed={6}
                                >
                                    before i&apos;m done
                                </GradientText>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
                                className="mx-auto mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base"
                            >
                                <p className="text-zinc-200">
                                    Things I want to do, places I want to see, and versions of myself I want to become.
                                </p>
                                <p>
                                    Real photos replace these as I cross things off.
                                </p>
                            </motion.div>

                            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-400">
                                {doneCount} of {allItems.length} crossed off
                            </p>
                        </div>
                    </div>

                    {/* Gutters match the Vault's sections, clear of the EdgeStripes. */}
                    <div className="mb-28 space-y-16 pl-12 pr-9 sm:mb-36 sm:space-y-20 sm:pl-14 sm:pr-11 lg:pl-15 lg:pr-13">
                        {bucketSections.map((section, sectionIndex) => {
                            const SectionIcon = SECTION_ICONS[section.id]
                            const offset = bucketSections
                                .slice(0, sectionIndex)
                                .reduce((total, previous) => total + previous.items.length, 0)

                            return (
                                <section key={section.id} aria-labelledby={`bucket-${section.id}`}>
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
                                            <SectionIcon size={18} weight="duotone" aria-hidden="true" />
                                        </span>

                                        <h2
                                            id={`bucket-${section.id}`}
                                            className="font-sans text-xl font-semibold text-white sm:text-2xl"
                                        >
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {section.items.map((item, index) => (
                                            <BucketCard
                                                key={item.title}
                                                item={item}
                                                number={offset + index + 1}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}
