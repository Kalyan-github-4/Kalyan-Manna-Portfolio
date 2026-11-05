"use client"

import Link from "next/link"
import { ArrowRight, Trophy } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import type { JourneyItem } from "@/data/journeyData"
import { CategoryBadge } from "@/components/journey/CategoryBadge"
import { MemoryImage } from "@/components/journey/MemoryImage"

const EASE = [0.22, 1, 0.36, 1] as const

interface VaultCollectionCardProps {
    item: JourneyItem
}

export function VaultCollectionCard({ item }: VaultCollectionCardProps) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
        >
            <Link
                href={`/vault/${item.slug}`}
                aria-label={`View the ${item.title} collection`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#050507] p-2 transition-colors duration-500 hover:border-white/25 hover:bg-[#111113] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                {/* A 4:3 crop inset inside the card frame. The title sits at the
                    foot of the photo so it stays clear of people's faces. */}
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                    <MemoryImage
                        src={item.image}
                        srcSet={item.imageSrcSet}
                        width={item.width}
                        height={item.height}
                        alt={`${item.title} — ${item.description}`}
                        category={item.category}
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="absolute inset-0"
                        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/30"
                    />

                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                            <CategoryBadge category={item.category} />

                            {/* The same win badge the latest card wears. */}
                            {item.result && (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-zinc-950">
                                    <Trophy size={12} weight="fill" aria-hidden="true" />
                                    {item.result}
                                </span>
                            )}
                        </div>

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-950 opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                            <ArrowRight size={13} weight="bold" aria-hidden="true" />
                        </span>
                    </div>

                    {/* Headings are globally serif on this site; cards use the
                        sans face. */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="font-sans text-xl font-semibold leading-tight text-white sm:text-2xl">
                            {item.coverTitle ?? item.title}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-zinc-300">
                            {item.date} · {item.photos.length} photos
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="px-3 pb-3 pt-3.5">
                    <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                    </p>
                </div>
            </Link>
        </motion.article>
    )
}
