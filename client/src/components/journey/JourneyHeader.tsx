import { motion } from "framer-motion"

import GradientText from "@/components/shared/GradientText"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Mirrors the header in CaseStudyWorkSection so /vault and /work read as the
 * same page family — same eyebrow, same gradient display heading, same
 * spacing. Only the copy differs.
 */
export function JourneyHeader() {
    return (
        <div className="relative mb-28 flex min-h-70 items-center justify-center text-center">
            <div>
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                >
                    Vault
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                    className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-4xl text-transparent text-shadow-subtle font-display sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    Moments Worth{" "}
                    <GradientText
                        className="inline-block overflow-visible pb-4 italic"
                        colors={["#1E40AF", "#9333EA", "#DB2777"]}
                        animationSpeed={6}
                    >
                        Keeping
                    </GradientText>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
                    className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8"
                >
                    A collection of hackathons, achievements, events, collaborations and
                    meaningful milestones that have shaped my growth as a developer.
                </motion.p>
            </div>
        </div>
    )
}
