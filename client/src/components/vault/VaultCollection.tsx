"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import {
    ArrowLeft,
    ArrowSquareOut,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    IdentificationBadge,
    Images,
    MapPin,
} from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import { journeyItems } from "@/data/journeyData"
import { CategoryBadge } from "@/components/journey/CategoryBadge"
import { CollectionMasonry } from "@/components/vault/CollectionMasonry"
import EdgeStripes from "@/components/shared/EdgeStripes"

const EASE = [0.22, 1, 0.36, 1] as const

export default function VaultCollection() {
    const params = useParams<{ slug: string }>()
    const slug = params?.slug
    const reduceMotion = useReducedMotion()

    const index = journeyItems.findIndex((item) => item.slug === slug)
    const collection = index >= 0 ? journeyItems[index] : null

    if (!collection) {
        return (
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 text-center text-white">
                <EdgeStripes />

                <div className="relative z-10">
                    <h1 className="font-display text-3xl sm:text-4xl">
                        Collection not found
                    </h1>
                    <p className="mt-3 text-sm text-zinc-400">
                        That memory isn’t in the vault — it may have been renamed.
                    </p>
                    <Link
                        href="/vault"
                        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
                    >
                        <ArrowLeft size={14} weight="bold" aria-hidden="true" />
                        Back to the Vault
                    </Link>
                </div>
            </main>
        )
    }

    // Wrap around so the visitor can keep walking the vault in either
    // direction. Below three collections the two directions land on the same
    // page, so only "Next" is worth showing — and with one, neither is.
    const previous =
        journeyItems[(index - 1 + journeyItems.length) % journeyItems.length]
    const next = journeyItems[(index + 1) % journeyItems.length]
    const hasNext = journeyItems.length > 1
    const hasPrevious = journeyItems.length > 2

    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and full-bleed inner column as /work and /vault. */}
            <section className="relative overflow-hidden bg-black px-4 py-28 text-white sm:px-6 lg:px-8">
                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <Link
                        href="/vault"
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        <ArrowLeft size={14} weight="bold" aria-hidden="true" />
                        Back to the Vault
                    </Link>

                    {/* Collection header */}
                    <motion.header
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-14 mt-8 sm:mb-20"
                    >
                        <CategoryBadge category={collection.category} />

                        <h1 className="mt-5 bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl leading-tight text-transparent text-shadow-subtle sm:text-5xl md:text-6xl">
                            {collection.title}
                        </h1>

                        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-zinc-400">
                            <div className="flex items-center gap-2">
                                <dt className="sr-only">Photos</dt>
                                <Images
                                    size={13}
                                    className="text-white/60"
                                    aria-hidden="true"
                                />
                                <dd>{collection.photos.length} photos</dd>
                            </div>

                            <div className="flex items-center gap-2">
                                <dt className="sr-only">Date</dt>
                                <CalendarBlank
                                    size={13}
                                    className="text-white/60"
                                    aria-hidden="true"
                                />
                                <dd>{collection.date}</dd>
                            </div>

                            {collection.location && (
                                <div className="flex items-center gap-2">
                                    <dt className="sr-only">Location</dt>
                                    <MapPin
                                        size={13}
                                        className="text-white/60"
                                        aria-hidden="true"
                                    />
                                    <dd>{collection.location}</dd>
                                </div>
                            )}

                            {collection.role && (
                                <div className="flex items-center gap-2">
                                    <dt className="sr-only">Role</dt>
                                    <IdentificationBadge
                                        size={13}
                                        className="text-white/60"
                                        aria-hidden="true"
                                    />
                                    <dd>{collection.role}</dd>
                                </div>
                            )}
                        </dl>

                        <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                            {collection.longDescription ?? collection.description}
                        </p>

                        {collection.externalUrl && (
                            <a
                                href={collection.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
                            >
                                {collection.externalLabel ?? "Visit link"}
                                <ArrowSquareOut size={14} aria-hidden="true" />
                            </a>
                        )}
                    </motion.header>

                    {/* The Pinterest masonry for this collection */}
                    <section aria-label={`${collection.title} photo gallery`}>
                        <CollectionMasonry
                            photos={collection.photos}
                            collectionTitle={collection.title}
                        />
                    </section>

                    {/* Prev / next collection */}
                    {hasNext && (
                        <nav
                            aria-label="Collection navigation"
                            className="mt-20 grid gap-4 border-t border-white/10 pt-10 sm:mt-28 sm:grid-cols-2"
                        >
                            {hasPrevious && (
                                <Link
                                    href={`/vault/${previous.slug}`}
                                    className="group flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/60 p-5 transition-colors hover:border-white/25"
                                >
                                    <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400">
                                        <CaretLeft
                                            size={11}
                                            weight="bold"
                                            aria-hidden="true"
                                        />
                                        Previous
                                    </span>
                                    <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white sm:text-base">
                                        {previous.title}
                                    </span>
                                </Link>
                            )}

                            <Link
                                href={`/vault/${next.slug}`}
                                className="group flex flex-col items-end gap-1 rounded-2xl border border-white/10 bg-zinc-950/60 p-5 text-right transition-colors hover:border-white/25 sm:col-start-2"
                            >
                                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400">
                                    Next
                                    <CaretRight
                                        size={11}
                                        weight="bold"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white sm:text-base">
                                    {next.title}
                                </span>
                            </Link>
                        </nav>
                    )}
                </div>
            </section>
        </main>
    )
}
