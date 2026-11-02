"use client"

import { ArrowRight, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"

import { socialLinks } from "@/config"
import FrameMarker from "../shared/FrameMarker"
import GradientText, { HEADING_GRADIENT } from "../shared/GradientText"
import { faintDiagonalStripeStyle } from "../shared/stripeStyles"
import LanyardIdCard from "./LanyardIdCard"
import WandCursor from "./WandCursor"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

const socials = [
    { icon: LinkedinLogo, label: "LinkedIn", href: socialLinks.linkedin },
    { icon: GithubLogo, label: "GitHub", href: socialLinks.github },
    { icon: XLogo, label: "X", href: socialLinks.x },
]

/**
 * A short intro on the home page with a hanging ID card. A wand stands beside
 * the card and follows the pointer around the frame; clicking the card turns it over.
 */
export default function HomeAbout() {
    const frameRef = useRef<HTMLDivElement>(null)

    return (
        <section id="about-preview" aria-labelledby="about-preview-heading" className="relative overflow-x-clip text-white">
            {/* Same frame as the sections below: padding matches EdgeStripes so
                the hairlines end on the gutters' inner borders. */}
            <div className="mx-auto w-full max-w-[120rem] pl-8 pr-5 sm:pl-10 sm:pr-7 lg:pl-11 lg:pr-9">
                <div
                    ref={frameRef}
                    className="relative grid items-start gap-12 border-y border-white/10 pb-16 lg:grid-cols-2 lg:gap-6"
                    style={faintDiagonalStripeStyle}
                >
                    <FrameMarker className="-left-1 -top-1" />
                    <FrameMarker className="-right-1 -top-1" />
                    <FrameMarker className="-bottom-1 -left-1" />
                    <FrameMarker className="-bottom-1 -right-1" />

                    <div className="order-2 px-5 sm:px-8 lg:order-1 lg:px-10 lg:pt-24 xl:px-12">
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            know about me
                        </motion.p>

                        <motion.h2
                            id="about-preview-heading"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                            className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
                        >
                            Full-stack developer & <br/>a little bit of{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                everything
                            </GradientText>
                        </motion.h2>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                            className="mt-8 max-w-xl space-y-6 text-base leading-relaxed text-zinc-300 sm:text-lg"
                        >
                            <p>
                                I&apos;m Kalyan, a Full-Stack Developer and Freelancer who enjoys building products
                                from the ground up.
                            </p>
                            <p>
                                From frontend experiences to backend systems and AI-powered applications, I like
                                working across different layers of technology. I&apos;m driven by curiosity,
                                experimentation, and the satisfaction of turning an idea into something real.
                            </p>
                            <p className="text-zinc-400">Always learning. Always building. Never quite done.</p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                            className="mt-10"
                        >
                            <div className="flex items-center gap-2">
                                {socials.map(({ icon: Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex size-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    >
                                        <Icon size={22} aria-hidden="true" />
                                    </a>
                                ))}
                            </div>

                            <Link
                                href="/about"
                                className="group mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                            >
                                More about me
                                <span className="flex size-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:translate-x-0.5">
                                    <ArrowRight size={11} weight="bold" aria-hidden="true" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="order-1 flex justify-center lg:order-2">
                        <LanyardIdCard />
                    </div>

                    <WandCursor areaRef={frameRef} />
                </div>
            </div>
        </section>
    )
}
