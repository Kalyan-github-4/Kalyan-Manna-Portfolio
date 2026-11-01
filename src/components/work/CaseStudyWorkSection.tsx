"use client"

import { motion } from "framer-motion"

import WorkProjectCard from "./WorkProjectCard"
import { workProjects } from "@/data/workProjects"
import GradientText, { HEADING_GRADIENT } from "../shared/GradientText"
import BackgroundRipple from "../shared/BackgroundRipple"
import EdgeStripes from "../shared/EdgeStripes"

export default function CaseStudyWorkSection() {
    return (
        // Side padding mirrors EdgeStripes' asymmetric gutters, plus 12-16px of air.
        <section className="relative overflow-hidden bg-black py-28 pl-11 pr-8 text-white sm:pl-14 sm:pr-11 lg:pl-15 lg:pr-13">

            {/* Background Glow */}
            <BackgroundRipple
                rows={7}
                cols={30} />

            <EdgeStripes />

            <div className="relative z-10 mx-auto w-full">
                {/* Header */}
                <div className="relative mb-20 flex min-h-50 items-center justify-center text-center">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            Case Studies
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent text-shadow-subtle font-display"
                        >
                            Selected{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-4 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                Work
                            </GradientText>
                        </motion.h1>
                    </div>
                </div>

                {/* Projects Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-white/15 border-dashed md:block" />

                    {/* Each side is its own stack, so 1→3 and 2→4 get the same
                        gap however tall a card is. Below md the stacks dissolve
                        (`contents`) and each card's `order` restores 1, 2, 3… */}
                    <div className="flex flex-col gap-y-20 md:grid md:grid-cols-2">
                        {[0, 1].map((side) => (
                            <div
                                key={side}
                                className={[
                                    "contents md:flex md:flex-col md:gap-y-24",
                                    side === 1 ? "md:pt-65" : "",
                                ].join(" ")}
                            >
                                {workProjects.map((project, index) =>
                                    index % 2 === side ? (
                                        <WorkProjectCard
                                            key={project.title}
                                            project={project}
                                            index={index}
                                        />
                                    ) : null
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mt-24 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                    Still building something great. I&apos;ll add it here once it&apos;s done.
                </p>
            </div>
        </section>
    )
}