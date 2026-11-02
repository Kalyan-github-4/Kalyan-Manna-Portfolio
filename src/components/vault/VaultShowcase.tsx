"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { journeyItems } from "@/data/journeyData"
import FrameMarker from "@/components/shared/FrameMarker"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import { VaultCollectionCard } from "@/components/vault/VaultCollectionCard"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

/**
 * Three collections lifted onto the home page as a teaser for /vault. The
 * pinned "latest" one leads, the rest fall in newest-first, and the cards are
 * the same ones /vault uses so the two pages can never drift apart.
 */
const featured = journeyItems
    .filter((item) => !item.hideOnHome)
    .sort((a, b) => {
        if (a.latest !== b.latest) return a.latest ? -1 : 1
        return b.id - a.id
    })
    .slice(0, 3)

export default function VaultShowcase() {
    if (featured.length === 0) return null

    return (
        <section
            id="vault-showcase"
            aria-labelledby="vault-showcase-heading"
            className="relative overflow-x-clip text-white"
        >
            {/* Same frame as the curated work above: padding matches
                EdgeStripes so the hairlines end on the gutters' inner borders. */}
            <div className="mx-auto w-full max-w-[120rem] pl-8 pr-5 pt-28 sm:pl-10 sm:pr-7 lg:pl-11 lg:pr-9">
                {/* Heading on the left, the link pushed to the right on its baseline;
                    phones stack the two. */}
                <div className="relative flex flex-col items-start gap-6 border-y border-white/10 px-5 py-10 text-left sm:flex-row sm:items-end sm:justify-between sm:px-8">
                    <FrameMarker className="-left-1 -top-1" />
                    <FrameMarker className="-right-1 -top-1" />

                    <div>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            from the vault
                        </motion.p>

                        <motion.h2
                            id="vault-showcase-heading"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                            className="font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            The days that{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                made it
                            </GradientText>
                        </motion.h2>
                    </div>

                    {/* Same link style as "More about me" in the section above. */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                        className="shrink-0 sm:pb-3"
                    >
                        <Link
                            href="/vault"
                            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                        >
                            See more collections
                            <span className="flex size-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                                <ArrowRight size={11} weight="bold" aria-hidden="true" />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    className="relative grid grid-cols-1 gap-3 border-b border-white/10 p-3 sm:grid-cols-2 lg:grid-cols-3"
                    style={faintDiagonalStripeStyle}
                >
                    <FrameMarker className="-bottom-1 -left-1" />
                    <FrameMarker className="-bottom-1 -right-1" />

                    {featured.map((item) => (
                        <VaultCollectionCard key={item.id} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
