"use client"

import { Check } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { bucketSections } from "@/data/bucketListData"
import SilkBackground from "@/components/shared/SilkBackground"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import SplitSection, { Strong } from "@/components/shared/SplitSection"

const EASE = [0.22, 1, 0.36, 1] as const

export default function BucketList() {
    const allItems = bucketSections.flatMap((section) => section.items)
    const doneCount = allItems.filter((item) => item.doneOn).length

    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frames as /more/attribution. */}
            <section className="relative overflow-clip bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <SilkBackground />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <header className="mb-8 px-8 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
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
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                before i&apos;m done
                            </GradientText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
                            className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300 sm:text-base"
                        >
                            Things I want to do, places I want to see, and versions of myself I want to become.
                        </motion.p>

                        <p className="mt-3 text-sm font-medium text-zinc-400">
                            {doneCount} of {allItems.length} crossed off
                        </p>
                    </header>

                    {bucketSections.map((section) => (
                        <SplitSection
                            key={section.title}
                            title={<><Strong>{section.title}</Strong><br />{section.subtitle}</>}
                        >
                            <ul className="-my-3 divide-y divide-white/10">
                                {section.items.map((item) => (
                                    <li key={item.title} className="flex gap-3.5 py-3.5">
                                        <span
                                            aria-hidden="true"
                                            className={
                                                item.doneOn
                                                    ? "mt-1 flex size-5 shrink-0 items-center justify-center rounded-md bg-white text-zinc-950"
                                                    : "mt-1 size-5 shrink-0 rounded-md border border-white/25"
                                            }
                                        >
                                            {item.doneOn && <Check size={13} weight="bold" />}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={
                                                    item.doneOn
                                                        ? "font-hand text-2xl font-semibold leading-7 text-white"
                                                        : "font-hand text-2xl leading-7 text-zinc-300"
                                                }
                                            >
                                                <span className="sr-only">
                                                    {item.doneOn ? "Done: " : "Not done yet: "}
                                                </span>
                                                {item.title}
                                            </p>

                                            {item.note && (
                                                <p className="mt-0.5 text-sm text-zinc-500">{item.note}</p>
                                            )}
                                        </div>

                                        {item.doneOn && (
                                            <span className="h-fit shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
                                                {item.doneOn}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </SplitSection>
                    ))}
                </div>
            </section>
        </main>
    )
}
