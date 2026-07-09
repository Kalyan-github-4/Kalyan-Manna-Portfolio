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
        <div className="mx-auto max-w-[calc(100%-24px)] px-0 pt-8 sm:max-w-[calc(100%-40px)] md:max-w-[calc(100%-64px)] md:pt-10 lg:max-w-[calc(100%-80px)]">
            <motion.div
                variants={fadeScale}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="border border-dashed border-white/10 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6"
            >
                <div className="relative min-h-115 overflow-hidden rounded-[22px] border border-white/10 bg-black sm:min-h-125 sm:rounded-[26px] md:min-h-140 md:rounded-[28px]">
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
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(42,26,77,0.72)_0%,rgba(28,18,52,0.44)_28%,rgba(0,0,0,0)_72%)] blur-[50px] md:blur-[70px]"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1.1, delay: 0.2 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_48%,rgba(180,160,255,0.24)_0%,rgba(120,90,200,0.16)_22%,rgba(0,0,0,0)_58%)]"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.28),rgba(0,0,0,0.9))]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_34%,rgba(0,0,0,0.82))]" />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative z-10 flex min-h-115 flex-col items-center justify-center space-y-7 px-5 py-12 text-center sm:min-h-125 sm:space-y-8 sm:px-6 md:min-h-140 md:space-y-10 md:px-8"
                    >
                        <motion.p
                            custom={0}
                            variants={fadeUp}
                            className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/50 sm:text-[11px] sm:tracking-[0.35em]"
                        >
                            Open to work
                        </motion.p>

                        <motion.h2
                            custom={1}
                            variants={fadeUp}
                            className="max-w-5xl text-balance font-sans text-[2rem] leading-[1.05] uppercase text-white sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            From concept to{" "}
                            <span className="font-semibold">creation</span>
                            <br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>
                            let&apos;s make it{" "}
                            <span className="font-semibold">happen!</span>
                        </motion.h2>

                        <motion.button
                            custom={2}
                            variants={fadeUp}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 py-1 pl-4 pr-1 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 sm:pl-5"
                        >
                            <span className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />

                            <span className="relative z-10 text-xs transition-colors duration-500 group-hover:text-slate-900 sm:text-sm">
                                Let&apos;s Connect
                            </span>

                            <span className="relative z-10 ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-500 group-hover:translate-x-1 sm:h-10 sm:w-10">
                                <ArrowRight size={14} />
                            </span>
                        </motion.button>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            className="mt-6 max-w-2xl sm:mt-8 md:mt-12"
                        >
                            <p className="bg-linear-to-b from-zinc-400 via-zinc-100 to-white bg-clip-text font-serif text-xl font-semibold leading-snug text-transparent sm:text-2xl md:text-3xl">
                                I&apos;m available for full-time roles & freelance projects.
                            </p>

                            <p className="mt-4 text-sm leading-6 text-white/55 sm:text-[15px] sm:leading-7 md:text-base">
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