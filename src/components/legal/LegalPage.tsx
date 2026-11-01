"use client"

import type { ReactNode } from "react"
import type { Icon } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import BackgroundRipple from "@/components/shared/BackgroundRipple"
import EdgeStripes from "@/components/shared/EdgeStripes"
import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import { VAULT_CARD_FRAME } from "@/components/vault/VaultFilterBar"

const EASE = [0.22, 1, 0.36, 1] as const

export interface LegalSummary {
    icon: Icon
    title: string
    text: string
}

interface LegalPageProps {
    heading: ReactNode
    lastUpdated: string
    summary: LegalSummary[]
    children: ReactNode
}

/** Shell shared by /privacy and /terms: header, the short version, then sections. */
export default function LegalPage({
    heading,
    lastUpdated,
    summary,
    children,
}: LegalPageProps) {
    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frames as /more/attribution. */}
            <section className="relative overflow-clip bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <BackgroundRipple rows={7} cols={30} />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <header className="mb-8 px-8 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            Legal
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                            className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            {heading}
                        </motion.h1>
                    </header>

                    <section
                        aria-label="The short version"
                        className={`${VAULT_CARD_FRAME} mb-6`}
                        style={faintDiagonalStripeStyle}
                    >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-2 pt-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                            <h2 className="font-mono text-[0.7rem] font-semibold tracking-[0.15em]">
                                The short version
                            </h2>
                            <p>Last updated {lastUpdated}</p>
                        </div>

                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {summary.map(({ icon: SummaryIcon, title, text }) => (
                                <li
                                    key={title}
                                    className="rounded-3xl border border-white/10 bg-[#050507] p-5"
                                >
                                    <SummaryIcon
                                        size={22}
                                        weight="duotone"
                                        aria-hidden="true"
                                        className="text-zinc-200"
                                    />
                                    <p className="mt-3 font-sans text-base font-semibold text-white">
                                        {title}
                                    </p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                                        {text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {children}
                </div>
            </section>
        </main>
    )
}

/** Plain legal copy for the right-hand panel of a section. */
export function LegalProse({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-4 text-base leading-relaxed text-zinc-300 [&_a]:font-medium [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-white">
            {children}
        </div>
    )
}

/** Label and detail rows, split by hairlines. */
export function LegalRows({ rows }: { rows: { label: string; text: ReactNode }[] }) {
    return (
        <dl className="divide-y divide-white/10 border-t border-white/10">
            {rows.map(({ label, text }) => (
                <div
                    key={label}
                    className="grid gap-1 py-3.5 md:grid-cols-[10rem_1fr] md:gap-6"
                >
                    <dt className="font-sans text-sm font-semibold text-white">{label}</dt>
                    <dd className="text-sm leading-relaxed text-zinc-400">{text}</dd>
                </div>
            ))}
        </dl>
    )
}
