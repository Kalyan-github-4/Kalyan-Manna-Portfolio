import { motion } from "framer-motion"

import WorkProjectCard from "./WorkProjectCard"
import { workProjects } from "./workProjects"
import GradientText from "../shared/GradientText"
import BackgroundRipple from "../shared/BackgroundRipple"

export default function CaseStudyWorkSection() {
    return (
        <section className="relative overflow-hidden bg-black px-4 py-28 text-white sm:px-6 lg:px-8">

            {/* Background Glow */}
            <BackgroundRipple
                rows={7}
                cols={30} />


            <div className="relative z-10 mx-auto w-full">
                {/* Header */}
                <div className="relative mb-28 flex min-h-70 items-center justify-center text-center">
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
                                colors={["#1E40AF", "#9333EA", "#DB2777"]}
                                animationSpeed={6}
                            >
                                Work
                            </GradientText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{
                                duration: 0.75,
                                delay: 0.16,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8"
                        >
                            A curated collection of products, interfaces, and digital experiences I’ve
                            designed and built with performance, usability, and clean engineering in mind.
                        </motion.p>
                    </div>
                </div>

                {/* Projects Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-white/15 border-dashed md:block" />

                    <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-0 md:gap-y-0">
                        {workProjects.map((project, index) => (
                            <WorkProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}