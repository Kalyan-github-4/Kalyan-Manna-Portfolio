"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Trophy } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import type { JourneyItem } from "@/data/journeyData"
import { CategoryBadge } from "@/components/journey/CategoryBadge"
import { MemoryImage } from "@/components/journey/MemoryImage"

const EASE = [0.22, 1, 0.36, 1] as const

interface VaultLatestCardProps {
    item: JourneyItem
}

export function VaultLatestCard({ item }: VaultLatestCardProps) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.article
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
        >
            <Link
                href={`/vault/${item.slug}`}
                aria-label={`View the ${item.title} collection`}
                className="group grid overflow-hidden rounded-3xl border border-white/10 bg-[#050507] p-2 transition-colors duration-500 hover:border-white/25 hover:bg-[#111113] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:grid-cols-[3fr_2fr]"
            >
                {/* Height is capped so the whole card fits on load, with the
                    next row peeking in below it. */}
                <div className="relative aspect-2/1 overflow-hidden rounded-2xl md:aspect-auto md:min-h-60">
                    <MemoryImage
                        src={item.image}
                        srcSet={item.imageSrcSet}
                        width={item.width}
                        height={item.height}
                        alt={`${item.title} — ${item.description}`}
                        category={item.category}
                        loading="eager"
                        sizes="(min-width:768px) 60vw, 100vw"
                        className="absolute inset-0"
                        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />

                    {item.result && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-zinc-950">
                            <Trophy size={12} weight="fill" aria-hidden="true" />
                            {item.result}
                        </span>
                    )}
                </div>

                {/* Body */}
                <div className="flex flex-col px-3 pb-3 pt-4 md:px-6 md:py-2">
                    {/* Headings are globally serif on this site; cards use the
                        sans face. */}
                    <h3 className="font-sans text-2xl font-semibold leading-tight text-white lg:text-3xl">
                        {item.coverTitle ?? item.title}
                    </h3>

                    <p className="mt-1.5 text-sm font-medium text-zinc-300">
                        {item.date} · {item.photos.length} photos
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm md:line-clamp-3 leading-relaxed text-zinc-400">
                        {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <CategoryBadge category={item.category} />

                        {item.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                                <MapPin size={12} aria-hidden="true" />
                                {item.location}
                            </span>
                        )}

                        {item.role && (
                            <span className="inline-flex items-center rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                                {item.role}
                            </span>
                        )}
                    </div>

                    <span className="mt-5 flex items-center justify-end gap-2 text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white md:mt-auto md:pt-2">
                        View collection
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={14} weight="bold" aria-hidden="true" />
                        </span>
                    </span>
                </div>
            </Link>
        </motion.article>
    )
}
