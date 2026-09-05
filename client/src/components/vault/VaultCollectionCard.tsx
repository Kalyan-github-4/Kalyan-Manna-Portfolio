"use client"

import Link from "next/link"
import { ArrowRight, Images } from "@phosphor-icons/react"
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
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 transition-colors duration-500 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                {/* Cover with the title laid over it, as in the reference. */}
                <div className="relative aspect-[4/3] overflow-hidden">
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
                        className="pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/25"
                    />

                    {/* Headings are globally serif on this site; the reference
                        sets card titles in the sans face, so opt back out. */}
                    <div className="absolute inset-0 flex items-center justify-center p-5">
                        <h3 className="text-center font-sans text-lg font-medium leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-xl">
                            {item.coverTitle}
                        </h3>
                    </div>

                    <div className="absolute left-3 top-3">
                        <CategoryBadge category={item.category} />
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-sans text-base font-semibold leading-snug text-white sm:text-lg">
                        {item.title}
                    </h4>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                        <p className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-400">
                            <Images size={12} aria-hidden="true" />
                            {item.photos.length} photos
                            <span aria-hidden="true" className="text-zinc-400">
                                ·
                            </span>
                            {item.date}
                        </p>

                        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white">
                            View
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                                <ArrowRight size={11} weight="bold" aria-hidden="true" />
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
