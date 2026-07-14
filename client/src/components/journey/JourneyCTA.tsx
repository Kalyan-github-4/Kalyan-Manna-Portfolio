import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"

const EASE = [0.22, 1, 0.36, 1] as const

export function JourneyCTA() {
    const reduceMotion = useReducedMotion()

    return (
        <motion.section
            initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mb-24 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] px-6 py-16 text-center sm:px-10 sm:py-24"
        >
            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(147,51,234,0.16),transparent_70%)]"
            />

            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                The journey is still being written.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg">
                Every project, event and collaboration adds another chapter. Follow along
                as I continue building, learning and creating.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                    to="/work"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0"
                >
                    View My Work
                    <ArrowUpRight
                        size={16}
                        weight="bold"
                        className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </Link>

                <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0"
                >
                    Connect With Me
                    <ArrowRight
                        size={16}
                        weight="bold"
                        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </motion.section>
    )
}
