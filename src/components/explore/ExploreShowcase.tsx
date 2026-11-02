"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ReactNode } from "react"

import { milestones, stack } from "@/data/attributionData"
import BentoCard from "../bento/BentoCard"
import FrameMarker from "../shared/FrameMarker"
import GradientText, { HEADING_GRADIENT } from "../shared/GradientText"
import { faintDiagonalStripeStyle } from "../shared/stripeStyles"
import { connectLinks, profileInfo } from "../links/linksData"
import GuestbookPeek from "./GuestbookPeek"

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

interface ExploreCardProps {
    href: string
    eyebrow: string
    title: string
    footer?: string
    children: ReactNode
}

/** A bento tile — same shell, corner wash and arrow on hover — with a mono footer line. */
function ExploreCard({ href, eyebrow, title, footer, children }: ExploreCardProps) {
    return (
        <BentoCard href={href} eyebrow={eyebrow} title={title} className="block h-96" copyClassName="text-left" visualClassName="flex flex-col text-left">
            <div className="relative min-h-0 flex-1">{children}</div>

            {/* Clears the arrow that rises into the bottom-right corner on hover. */}
            {footer && (
                <p className="mt-4 pr-14 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">{footer}</p>
            )}
        </BentoCard>
    )
}

/** A pocket version of /more/links: who I am, then every profile with its handle. */
function LinksPeek() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-3">
                <Image
                    src={profileInfo.image}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-xl border border-white/10 object-cover"
                />
                <div className="min-w-0">
                    <p className="truncate font-display text-xl leading-6 text-white">{profileInfo.name}</p>
                    <p className="truncate text-xs text-zinc-400">
                        {profileInfo.role} · {profileInfo.location}
                    </p>
                </div>
            </div>

            <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-hidden pr-2 mask-[linear-gradient(to_bottom,black_60%,transparent)]">
                {connectLinks.map(({ eyebrow, detail, icon: Icon }, index) => (
                    <li
                        key={eyebrow}
                        // Each row slides a beat after the one above when the card is hovered.
                        style={{ transitionDelay: `${index * 40}ms` }}
                        className="flex h-10 items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3 transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                        {Icon && <Icon size={16} weight="duotone" aria-hidden="true" className="shrink-0 text-zinc-300" />}
                        <span className="w-20 shrink-0 truncate font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            {eyebrow}
                        </span>
                        <span className="truncate text-sm text-zinc-200">{detail}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/** The build history from /more/attribution as a short timeline, fading out at the bottom. */
function BuildTimeline() {
    return (
        <ol className="h-full space-y-3 overflow-hidden mask-[linear-gradient(to_bottom,black_55%,transparent)]">
            {[...milestones].reverse().map(({ date, label }) => (
                <li key={label} className="relative flex items-baseline gap-4 border-l border-white/10 pl-4">
                    <span aria-hidden="true" className="absolute -left-[3px] top-1.5 size-1.5 rounded-full bg-zinc-500" />
                    <span className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{date}</span>
                    <span className="text-sm text-zinc-300">{label}</span>
                </li>
            ))}
        </ol>
    )
}

/**
 * The last stop on the home page: three doors into the rest of the site —
 * every link in one place, how the site was made, and the guestbook.
 */
export default function ExploreShowcase() {
    return (
        <section id="explore" aria-labelledby="explore-heading" className="relative overflow-x-clip text-white">
            {/* Same frame as the sections above: padding matches EdgeStripes so
                the hairlines end on the gutters' inner borders. */}
            <div className="mx-auto w-full max-w-[120rem] pl-8 pr-5 pt-28 sm:pl-10 sm:pr-7 lg:pl-11 lg:pr-9">
                <div className="relative flex flex-col items-center border-y border-white/10 px-5 py-10 text-center sm:px-8">
                    <FrameMarker className="-left-1 -top-1" />
                    <FrameMarker className="-right-1 -top-1" />

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
                    >
                        my site
                    </motion.p>

                    <motion.h2
                        id="explore-heading"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                        className="font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        While you&apos;re
                        <GradientText
                            className="inline-block overflow-visible pb-2 italic"
                            colors={HEADING_GRADIENT}
                            animationSpeed={6}
                        >
                            here
                        </GradientText>
                    </motion.h2>
                </div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    className="relative grid grid-cols-1 gap-3 border-b border-white/10 p-3 md:grid-cols-2 lg:grid-cols-3"
                    style={faintDiagonalStripeStyle}
                >
                    <FrameMarker className="-bottom-1 -left-1" />
                    <FrameMarker className="-bottom-1 -right-1" />

                    <ExploreCard
                        href="/more/links"
                        eyebrow="Links"
                        title="Find me everywhere"
                        footer={`${connectLinks.length} profiles, one page`}
                    >
                        <LinksPeek />
                    </ExploreCard>

                    <ExploreCard
                        href="/more/attribution"
                        eyebrow="Attribution"
                        title="How this site came together"
                        footer={`Built with ${stack[0].items.join(" · ")}`}
                    >
                        <BuildTimeline />
                    </ExploreCard>

                    <ExploreCard href="/more/guestbook" eyebrow="Guestbook" title="Sign the wall, leave a note">
                        <GuestbookPeek />
                    </ExploreCard>
                </motion.div>
            </div>
        </section>
    )
}
