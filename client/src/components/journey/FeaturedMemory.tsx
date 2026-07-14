import {
    ArrowUpRight,
    CalendarBlank,
    IdentificationBadge,
    MapPin,
} from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import type { JourneyItem } from "@/data/journeyData"

import { CategoryBadge } from "./CategoryBadge"
import { MemoryImage } from "./MemoryImage"

const EASE = [0.22, 1, 0.36, 1] as const

interface FeaturedMemoryProps {
    item: JourneyItem
    onOpen: (id: number) => void
}

export function FeaturedMemory({ item, onOpen }: FeaturedMemoryProps) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.section
            aria-labelledby="featured-memory-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group relative mb-24 sm:mb-32"
        >
            {/* Soft spotlight glow anchored to the card */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_25%_30%,rgba(147,51,234,0.16),transparent_70%)] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            />

            <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 transition-colors duration-500 group-hover:border-white/20 lg:grid-cols-2">
                {/* Image — clickable, opens the memory */}
                <button
                    type="button"
                    onClick={() => onOpen(item.id)}
                    aria-label={`Open ${item.title}`}
                    className="group/img relative aspect-16/10 w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 lg:aspect-auto lg:h-full"
                >
                    <MemoryImage
                        src={item.image}
                        alt={`${item.title} — ${item.description}`}
                        category={item.category}
                        loading="eager"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay for legibility + depth */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/40"
                    />

                    <div className="absolute left-4 top-4">
                        <CategoryBadge category={item.category} />
                    </div>
                </button>

                {/* Content */}
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-10">
                    <div>
                        <p className="mb-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/40">
                            Featured Memory
                        </p>

                        <h2
                            id="featured-memory-title"
                            className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
                        >
                            {item.title}
                        </h2>
                    </div>

                    <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                            <dt className="sr-only">Date</dt>
                            <CalendarBlank
                                size={16}
                                className="text-white/40"
                                aria-hidden="true"
                            />
                            <dd>{item.date}</dd>
                        </div>

                        {item.location && (
                            <div className="flex items-center gap-2">
                                <dt className="sr-only">Location</dt>
                                <MapPin
                                    size={16}
                                    className="text-white/40"
                                    aria-hidden="true"
                                />
                                <dd>{item.location}</dd>
                            </div>
                        )}

                        {item.role && (
                            <div className="flex items-center gap-2">
                                <dt className="sr-only">Role</dt>
                                <IdentificationBadge
                                    size={16}
                                    className="text-white/40"
                                    aria-hidden="true"
                                />
                                <dd>{item.role}</dd>
                            </div>
                        )}
                    </dl>

                    <p className="max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
                        {item.description}
                    </p>

                    <div>
                        <button
                            type="button"
                            onClick={() => onOpen(item.id)}
                            className="group/btn inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 py-2.5 pl-5 pr-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0"
                        >
                            View Memory
                            <ArrowUpRight
                                size={16}
                                weight="bold"
                                className="transition-transform duration-500 ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
