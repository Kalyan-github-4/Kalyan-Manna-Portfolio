import { memo } from "react"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "motion/react"

import NeuralBackground from "./NeuralBackground"
import { fadeScale, fadeUp, staggerContainer } from "./footerMotion"

type FooterCTAProps = {
    isInView: boolean
}

function FooterCTA({ isInView }: FooterCTAProps) {
    return (
        <div className="mx-auto max-w-[calc(100%-48px)] px-0 pt-10 md:max-w-[calc(100%-80px)]">
            <motion.div
                variants={fadeScale}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="border border-dashed border-white/10 px-4 py-4 md:px-6 md:py-6"
            >
                <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-black md:min-h-[560px]">
                    <NeuralBackground
                        className="absolute inset-0"
                        color="#b4a0ff"
                        trailOpacity={0.12}
                        particleCount={700}
                        speed={0.8}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={
                            isInView
                                ? { opacity: 0.9, scale: 1 }
                                : { opacity: 0, scale: 1.08 }
                        }
                        transition={{
                            duration: 1.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(42,26,77,0.72)_0%,rgba(28,18,52,0.44)_28%,rgba(0,0,0,0)_72%)] blur-[70px]"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1.1, delay: 0.2 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_48%,rgba(180,160,255,0.24)_0%,rgba(120,90,200,0.16)_22%,rgba(0,0,0,0)_58%)]"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.22),rgba(0,0,0,0.88))]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28),transparent_34%,rgba(0,0,0,0.76))]" />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative z-10 flex min-h-[560px] flex-col items-center justify-center space-y-10 px-6 text-center"
                    >
                        <motion.p
                            custom={0}
                            variants={fadeUp}
                            className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50"
                        >
                            Open to work
                        </motion.p>

                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            className="max-w-5xl text-balance font-sans text-3xl uppercase text-white md:text-5xl lg:text-6xl"
                        >
                            From concept to{" "}
                            <span className="font-semibold">creation</span>
                            <br />
                            let&apos;s make it{" "}
                            <span className="font-semibold">happen!</span>
                        </motion.h2>

                        <motion.button
                            custom={2}
                            variants={fadeUp}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 py-1 pl-5 pr-1 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500"
                        >
                            <span className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />

                            <span className="relative z-10 text-sm transition-colors duration-500 group-hover:text-slate-900">
                                Let&apos;s Connect
                            </span>

                            <span className="relative z-10 ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-500 group-hover:translate-x-1">
                                <ArrowRight size={14} />
                            </span>
                        </motion.button>

                        <motion.div custom={3} variants={fadeUp} className="mt-12 max-w-2xl">
                            <p className="font-serif text-2xl font-semibold md:text-3xl bg-linear-to-b from-zinc-400 via-zinc-100 to-white bg-clip-text text-transparent">
                                I&apos;m available for full-time roles & freelance projects.
                            </p>

                            <p className="mt-5 text-[15px] leading-7 text-white/55 md:text-base">
                                I craft modern web applications, polished interfaces, and
                                seamless digital experiences.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default memo(FooterCTA)