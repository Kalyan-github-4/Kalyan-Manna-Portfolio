"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { journeyItems } from "@/data/journeyData"
import GradientText from "@/components/shared/GradientText"
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
const featured = [...journeyItems]
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
            <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-10 pt-28 text-center sm:px-8">
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
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
                    className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    Moments &{" "}
                    <GradientText
                        className="inline-block overflow-visible pb-2 italic"
                        colors={["#1E40AF", "#9333EA", "#DB2777"]}
                        animationSpeed={6}
                    >
                        memories
                    </GradientText>
                </motion.h2>
            </div>

            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="mx-auto w-full max-w-[120rem] px-5 sm:px-8 lg:px-12"
            >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((item) => (
                        <VaultCollectionCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Same bare mono CTA the reference ends on — no pill, just
                    the label and the card's circular arrow. */}
                <div className="mt-14 flex justify-center pb-4">
                    <Link
                        href="/vault"
                        className="group flex items-center gap-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                    >
                        See more collections
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                            <ArrowRight size={11} weight="bold" aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
