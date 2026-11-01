"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { hardware, toolGroups } from "@/data/usesData"
import BackgroundRipple from "@/components/shared/BackgroundRipple"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import { VAULT_CARD_FRAME } from "@/components/vault/VaultFilterBar"

const EASE = [0.22, 1, 0.36, 1] as const

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <h2 className="mb-3 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
            {children}
        </h2>
    )
}

export default function Uses() {
    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frames as /vault. */}
            <section className="relative overflow-hidden bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
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
                            Uses
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                            className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            My digital{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                setup
                            </GradientText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
                            className="mt-2 text-sm text-zinc-400 sm:text-base"
                        >
                            The hardware and tools I build with.
                        </motion.p>
                    </header>

                    <section aria-label="Hardware" className="mb-6">
                        <SectionLabel>Hardware</SectionLabel>

                        <dl
                            className={`${VAULT_CARD_FRAME} grid gap-3 sm:grid-cols-3`}
                            style={faintDiagonalStripeStyle}
                        >
                            {hardware.map(({ label, value, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#050507] p-4 sm:p-5"
                                >
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200">
                                        <Icon size={24} weight="duotone" aria-hidden="true" />
                                    </span>

                                    <div className="min-w-0">
                                        <dt className="text-xs font-medium text-zinc-400">{label}</dt>
                                        <dd className="mt-0.5 font-sans text-lg font-semibold leading-tight text-white">
                                            {value}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </section>

                    {toolGroups.map((group) => (
                        <section key={group.title} aria-label={group.title} className="mb-6">
                            <SectionLabel>{group.title}</SectionLabel>

                            <ul
                                className={`${VAULT_CARD_FRAME} grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3`}
                                style={faintDiagonalStripeStyle}
                            >
                                {group.tools.map(({ name, note, icon: Icon, color }) => (
                                    <li
                                        key={name}
                                        className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#050507] p-4 transition-colors duration-300 hover:border-white/25 hover:bg-[#111113] sm:p-5"
                                    >
                                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                            <Icon size={24} aria-hidden="true" style={{ color }} />
                                        </span>

                                        <div className="min-w-0">
                                            <p className="font-sans text-base font-semibold leading-tight text-white">
                                                {name}
                                            </p>
                                            <p className="mt-0.5 text-sm text-zinc-400">{note}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </section>
        </main>
    )
}
