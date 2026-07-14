import { createElement, useMemo } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import type { JourneyItem } from "@/data/journeyData"

import { CATEGORY_META } from "./categoryMeta"

const EASE = [0.22, 1, 0.36, 1] as const

interface JourneyTimelineProps {
    items: JourneyItem[]
    onOpen: (id: number) => void
}

export function JourneyTimeline({ items, onOpen }: JourneyTimelineProps) {
    // Group memories by year, newest year first. Order within a year follows
    // the source array, which is already chronological (newest → oldest).
    const groups = useMemo(() => {
        const byYear = new Map<number, JourneyItem[]>()

        for (const item of items) {
            const existing = byYear.get(item.year) ?? []
            existing.push(item)
            byYear.set(item.year, existing)
        }

        return [...byYear.entries()].sort((a, b) => b[0] - a[0])
    }, [items])

    return (
        <section aria-labelledby="timeline-title" className="mb-28 sm:mb-36">
            <div className="mb-14 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                >
                    The Timeline
                </motion.p>

                <motion.h2
                    id="timeline-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                    className="font-display text-3xl text-white sm:text-4xl md:text-5xl"
                >
                    How it unfolded
                </motion.h2>
            </div>

            <div className="mx-auto max-w-3xl">
                {groups.map(([year, yearItems]) => (
                    <div
                        key={year}
                        className="grid grid-cols-1 md:grid-cols-[7rem_1fr]"
                    >
                        {/* Year label */}
                        <div className="mb-4 md:mb-0 md:pt-1">
                            <motion.span
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.6 }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="font-display text-3xl text-white/90 md:sticky md:top-28 md:text-4xl"
                            >
                                {year}
                            </motion.span>
                        </div>

                        {/* Events with a continuous left rail */}
                        <ul className="relative space-y-1 border-l border-white/10 pb-10 pl-6 md:pl-8">
                            {yearItems.map((item, index) => {
                                const meta = CATEGORY_META[item.category]

                                return (
                                    <motion.li
                                        key={item.id}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.6 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: index * 0.06,
                                            ease: EASE,
                                        }}
                                        className="relative"
                                    >
                                        {/* Dot */}
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute top-4 -left-[1.6rem] h-3 w-3 rounded-full ring-4 ring-black md:-left-[2.1rem]",
                                                meta.dot
                                            )}
                                        >
                                            <motion.span
                                                className={cn(
                                                    "absolute inset-0 rounded-full",
                                                    meta.dot
                                                )}
                                                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2, 1] }}
                                                transition={{
                                                    duration: 2.4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => onOpen(item.id)}
                                            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-transparent px-3 py-3 text-left transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                        >
                                            <span>
                                                <span className="block font-medium text-zinc-200 transition-colors group-hover:text-white">
                                                    {item.title}
                                                </span>
                                                <span className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500">
                                                    <span>{item.month}</span>
                                                    <span aria-hidden="true">·</span>
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center gap-1",
                                                            meta.text
                                                        )}
                                                    >
                                                        {createElement(meta.icon, {
                                                            size: 12,
                                                            weight: "fill",
                                                            "aria-hidden": true,
                                                        })}
                                                        {item.category}
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
