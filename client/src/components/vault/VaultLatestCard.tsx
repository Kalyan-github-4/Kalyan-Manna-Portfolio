"use client"

import Link from "next/link"
import { ArrowRight, Images, MapPin } from "@phosphor-icons/react"
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
            className="mb-24 sm:mb-32"
        >
            <Link
                href={`/vault/${item.slug}`}
                aria-label={`View the ${item.title} collection`}
                className="group grid overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 transition-colors duration-500 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:grid-cols-2"
            >
                {/* Cover */}
                <div className="relative aspect-16/10 overflow-hidden md:aspect-auto md:min-h-88">
                    <MemoryImage
                        src={item.image}
                        srcSet={item.imageSrcSet}
                        width={item.width}
                        height={item.height}
                        alt={`${item.title} — ${item.description}`}
                        category={item.category}
                        loading="eager"
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="absolute inset-0"
                        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-black/35"
                    />

                    {/* Headings are globally serif on this site; the reference
                        sets card titles in the sans face, so opt back out. */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                        <h3 className="text-center font-sans text-2xl  leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-3xl">
                            {item.coverTitle}
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-col p-6 sm:p-8">
                    <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/50">
                        Latest
                    </p>

                    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-zinc-400">
                        <Images size={13} aria-hidden="true" />
                        {item.photos.length} photos
                        <span aria-hidden="true" className="text-zinc-400">
                            ·
                        </span>
                        {item.date}
                    </p>

                    <h4 className="mt-3 font-sans text-2xl font-semibold leading-tight text-white sm:text-3xl">
                        {item.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <CategoryBadge category={item.category} />

                        {item.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-400">
                                <MapPin size={12} aria-hidden="true" />
                                {item.location}
                            </span>
                        )}

                        {item.role && (
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-400">
                                {item.role}
                            </span>
                        )}
                    </div>

                    <span className="mt-6 flex items-center justify-end gap-2 text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white md:mt-auto md:pt-6">
                        View collection
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={13} weight="bold" aria-hidden="true" />
                        </span>
                    </span>
                </div>
            </Link>
        </motion.article>
    )
}
