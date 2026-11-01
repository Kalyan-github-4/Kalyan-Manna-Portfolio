"use client"

import type { ReactNode } from "react"
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
    Trophy,
} from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { journeyItems, type JourneyItem } from "@/data/journeyData"
import { CategoryBadge } from "@/components/journey/CategoryBadge"
import { MemoryImage } from "@/components/journey/MemoryImage"
import { CollectionMasonry } from "@/components/vault/CollectionMasonry"
import {
    VAULT_CARD_FRAME,
    VAULT_FRAME_GUTTERS,
} from "@/components/vault/VaultFilterBar"
import Breadcrumbs from "@/components/shared/Breadcrumbs"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"

const EASE = [0.22, 1, 0.36, 1] as const

function DetailTag({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
            {children}
        </span>
    )
}

interface CollectionLinkProps {
    item: JourneyItem
    direction: "previous" | "next"
}

/** Walks to a neighbouring collection, led by that collection's cover. */
function CollectionLink({ item, direction }: CollectionLinkProps) {
    const isNext = direction === "next"

    return (
        <Link
            href={`/vault/${item.slug}`}
            aria-label={`${isNext ? "Next" : "Previous"} collection: ${item.title}`}
            className={cn(
                "group relative block h-36 overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-44",
                isNext && "sm:col-start-2"
            )}
        >
            <MemoryImage
                src={item.image}
                srcSet={item.imageSrcSet}
                alt=""
                category={item.category}
                sizes="(min-width:640px) 50vw, 100vw"
                className="absolute inset-0"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20"
            />

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 p-4 sm:p-5",
                    isNext && "text-right"
                )}
            >
                <span
                    className={cn(
                        "flex items-center gap-1 text-xs font-medium text-zinc-200",
                        isNext && "justify-end"
                    )}
                >
                    {!isNext && <CaretLeft size={12} weight="bold" aria-hidden="true" />}
                    {isNext ? "Next" : "Previous"}
                    {isNext && <CaretRight size={12} weight="bold" aria-hidden="true" />}
                </span>

                <span className="mt-1 block font-sans text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {item.coverTitle ?? item.title}
                </span>
            </div>
        </Link>
    )
}

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
            {/* Same shell and frame gutters as /vault. */}
            <section className="relative overflow-hidden bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    {/* Collection header — inset by the frame's padding, so its
                        text lines up with the edge of the gallery below. */}
                    <motion.header
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={cn(VAULT_FRAME_GUTTERS, "mb-8 px-3")}
                    >
                        <Breadcrumbs currentLabel={collection.coverTitle ?? collection.title} />

                        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
                            <div>
                                <h1 className="-ml-2 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
                                    <GradientText
                                        colors={HEADING_GRADIENT}
                                        animationSpeed={6}
                                    >
                                        {collection.coverTitle ?? collection.title}
                                    </GradientText>
                                </h1>

                                <dl className="mt-4 flex flex-wrap items-center gap-2">
                                    {collection.result && (
                                        <div>
                                            <dt className="sr-only">Result</dt>
                                            <dd className="inline-flex items-center gap-1.5 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-zinc-950">
                                                <Trophy size={12} weight="fill" aria-hidden="true" />
                                                {collection.result}
                                            </dd>
                                        </div>
                                    )}

                                    <div>
                                        <dt className="sr-only">Category</dt>
                                        <dd>
                                            <CategoryBadge category={collection.category} />
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="sr-only">Date</dt>
                                        <dd>
                                            <DetailTag>
                                                <CalendarBlank size={12} aria-hidden="true" />
                                                {collection.date}
                                            </DetailTag>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="sr-only">Photos</dt>
                                        <dd>
                                            <DetailTag>
                                                <Images size={12} aria-hidden="true" />
                                                {collection.photos.length} photos
                                            </DetailTag>
                                        </dd>
                                    </div>

                                    {collection.location && (
                                        <div>
                                            <dt className="sr-only">Location</dt>
                                            <dd>
                                                <DetailTag>
                                                    <MapPin size={12} aria-hidden="true" />
                                                    {collection.location}
                                                </DetailTag>
                                            </dd>
                                        </div>
                                    )}

                                    {collection.role && (
                                        <div>
                                            <dt className="sr-only">Role</dt>
                                            <dd>
                                                <DetailTag>
                                                    <IdentificationBadge size={12} aria-hidden="true" />
                                                    {collection.role}
                                                </DetailTag>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div>
                                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                                    {collection.longDescription ?? collection.description}
                                </p>

                                {collection.externalUrl && (
                                    <a
                                        href={collection.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-white/6 px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/12 hover:text-white"
                                    >
                                        {collection.externalLabel ?? "Visit link"}
                                        <ArrowSquareOut size={14} aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.header>

                    {/* The Pinterest masonry for this collection */}
                    <section
                        aria-label={`${collection.title} photo gallery`}
                        className={VAULT_CARD_FRAME}
                        style={faintDiagonalStripeStyle}
                    >
                        <CollectionMasonry
                            photos={collection.photos}
                            collectionTitle={collection.title}
                        />
                    </section>

                    {/* Prev / next collection */}
                    {hasNext && (
                        <nav
                            aria-label="Collection navigation"
                            className={cn(VAULT_CARD_FRAME, "mt-6 grid gap-3 sm:grid-cols-2")}
                            style={faintDiagonalStripeStyle}
                        >
                            {hasPrevious && (
                                <CollectionLink item={previous} direction="previous" />
                            )}

                            <CollectionLink item={next} direction="next" />
                        </nav>
                    )}
                </div>
            </section>
        </main>
    )
}
