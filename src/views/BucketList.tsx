"use client"

import { motion } from "framer-motion"

import { bucketSections, type BucketItem } from "@/data/bucketListData"
import SilkBackground from "@/components/shared/SilkBackground"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/** The ink colour for everything "done": counts, ticks, dates. */
const INK = "text-[#8fb0ff]"

export default function BucketList() {
    const allItems = bucketSections.flatMap((section) => section.items)
    const doneCount = allItems.filter((item) => item.doneOn).length

    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frames as /more/attribution. */}
            <section className="relative overflow-clip bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <SilkBackground />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <header className="mb-10 px-8 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            The Bucket List
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                            className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            Things i&apos;ll do{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                before i&apos;m done
                            </GradientText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
                            className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300 sm:text-base"
                        >
                            Things I want to do, places I want to see, and versions of myself I want to become.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, rotate: -4 }}
                            animate={{ opacity: 1, rotate: -2 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                            className="mt-6 inline-flex items-center gap-3 font-hand text-2xl text-zinc-300"
                        >
                            {doneCount} down, {allItems.length - doneCount} to go
                            <Tally count={doneCount} />
                        </motion.p>
                    </header>

                    <div className="mx-auto max-w-6xl space-y-20">
                        {bucketSections.map((section, s) => {
                            // Count rows across sections so the photo frames keep cycling.
                            const offset = bucketSections.slice(0, s).reduce((n, prev) => n + prev.items.length, 0)
                            const sectionDone = section.items.filter((item) => item.doneOn).length

                            return (
                                <section key={section.title}>
                                    <div className="mb-10 text-center">
                                        <h2 className="relative isolate inline-block px-4 font-hand text-5xl font-semibold text-white sm:text-6xl">
                                            {/* A rough brush stroke behind the word. */}
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-1 -z-10 h-3/5 -rotate-2 rounded-[45%_12%_40%_15%] bg-[#2b3550]/80"
                                            />
                                            {section.title}
                                        </h2>
                                        <p className="mt-2 font-hand text-2xl text-zinc-400">
                                            {section.subtitle},{" "}
                                            <span className={INK}>
                                                {sectionDone} of {section.items.length} done
                                            </span>
                                        </p>
                                    </div>

                                    <ul className="space-y-10">
                                        {section.items.map((item, i) => (
                                            <BucketRow key={item.title} item={item} index={offset + i} flip={i % 2 === 1} />
                                        ))}
                                    </ul>
                                </section>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

/**
 * One goal: tick, handwritten title and doodle down the middle column, with
 * the done date and any photo pinned to the margins on wide screens.
 */
function BucketRow({ item, index, flip }: { item: BucketItem; index: number; flip: boolean }) {
    const Doodle = item.icon
    const done = Boolean(item.doneOn)
    // Done goals get the postmarked stamp; the rest rotate through the other frames.
    const frame: Frame = done ? "stamp" : FRAMES[index % FRAMES.length]

    return (
        <motion.li
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid items-center gap-y-4 lg:grid-cols-[1fr_minmax(0,38rem)_1fr] lg:gap-x-10"
        >
            <div className={cn("hidden lg:flex lg:justify-end", flip && "lg:order-3 lg:justify-start")}>
                {item.photo ? <PinnedPhoto photo={item.photo} frame={frame} done={done} flip={flip} /> : null}
            </div>

            <div className="flex items-start gap-4 lg:order-2">
                <HandCheckbox checked={done} />

                <div className="min-w-0 flex-1">
                    <p
                        className={cn(
                            "font-hand text-3xl leading-8",
                            done ? "font-semibold text-white" : "text-zinc-200",
                        )}
                    >
                        <span className="sr-only">{done ? "Done: " : "Not done yet: "}</span>
                        {item.title}
                    </p>

                    {item.note && <p className="mt-2 font-hand text-xl leading-7 text-zinc-500">{item.note}</p>}

                    {item.doneOn && (
                        <div className="mt-3 lg:hidden">
                            <DoneOn date={item.doneOn} />
                        </div>
                    )}

                    {item.photo && (
                        <div className="mt-5 lg:hidden">
                            <PinnedPhoto photo={item.photo} frame={frame} done={done} flip={flip} />
                        </div>
                    )}
                </div>

                <Doodle
                    aria-hidden="true"
                    weight="thin"
                    className="mt-1 size-14 shrink-0 text-white/75 sm:size-16"
                />
            </div>

            <div className={cn("hidden lg:flex", flip ? "lg:order-1 lg:justify-end" : "lg:order-3")}>
                {item.doneOn ? <DoneOn date={item.doneOn} /> : null}
            </div>
        </motion.li>
    )
}

/** A wobbly hand-drawn box; the tick draws itself in when it scrolls into view. */
function HandCheckbox({ checked }: { checked: boolean }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 28 28" className="mt-1 size-7 shrink-0" fill="none">
            <path
                d="M4.5 5.2 C10 4.6 17 4.4 23.4 4.9 C23.8 11 23.6 17 23.2 23.3 C17 23.8 10.5 23.6 4.8 23.1 C4.3 17 4.2 11 4.5 5.2 Z"
                className="stroke-white/70"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            {checked && (
                <motion.path
                    d="M8 14.5 L12.5 19 L25 4"
                    className="stroke-[#8fb0ff]"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                />
            )}
        </svg>
    )
}

/** "done, Oct 2026" with a little squiggle underneath. */
function DoneOn({ date }: { date: string }) {
    return (
        <p className={cn("inline-flex -rotate-3 flex-col items-center font-hand text-2xl font-semibold", INK)}>
            done, {date}
            <svg aria-hidden="true" viewBox="0 0 40 8" className="mt-0.5 h-2 w-10" fill="none">
                <path d="M2 5 Q 10 1 20 4.5 T 38 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        </p>
    )
}

const FRAMES = ["tape", "clip", "stamp"] as const
type Frame = (typeof FRAMES)[number]

/**
 * A photo pinned to the page: a postage stamp, a print held on with tape, or
 * one clipped on with a paper clip. Done goals get a postmark over the corner.
 */
function PinnedPhoto({
    photo,
    frame,
    done,
    flip,
}: {
    photo: NonNullable<BucketItem["photo"]>
    frame: Frame
    done: boolean
    flip: boolean
}) {
    return (
        <figure className={cn("relative w-56 sm:w-64", flip ? "rotate-3" : "-rotate-6")}>
            <div
                className={cn(
                    "bg-[#efece4] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]",
                    frame === "stamp" ? "p-2.5" : "p-2",
                )}
                style={
                    frame === "stamp"
                        ? {
                              // Solid face plus a row of half-holes punched along every edge.
                              mask: "linear-gradient(#000 0 0) content-box, radial-gradient(circle 3px, #0000 96%, #000) -5px -5px / 10px 10px round",
                          }
                        : undefined
                }
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-4/3 w-full object-cover" />
            </div>

            {frame === "tape" && (
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 bg-[#cdbf9f]/75 shadow-sm",
                        flip ? "-rotate-3" : "rotate-2",
                    )}
                    style={{
                        // Torn, zigzag ends like a strip pulled off the roll.
                        clipPath:
                            "polygon(0 8%, 3% 0, 97% 4%, 100% 14%, 98% 32%, 100% 50%, 97% 70%, 100% 88%, 96% 100%, 3% 96%, 0 84%, 2% 64%, 0 46%, 2% 28%)",
                    }}
                />
            )}

            {frame === "clip" && (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 64"
                    className={cn("absolute -top-7 h-20 w-7 text-zinc-300", flip ? "right-8 rotate-6" : "left-8 -rotate-6")}
                    fill="none"
                >
                    <path
                        d="M8 40 V10 a5 5 0 0 1 10 0 V48 a8 8 0 0 1 -16 0 V16"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                    />
                </svg>
            )}

            {done && (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 64 64"
                    className={cn("absolute -bottom-6 size-20 text-[#8fb0ff]", flip ? "-left-6" : "-right-6")}
                    fill="none"
                >
                    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                    <path
                        d="M23 33 L29.5 39 L42 24"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </figure>
    )
}

/** Tally marks: four strokes and a slash per five. */
function Tally({ count }: { count: number }) {
    const groups = Array.from({ length: Math.ceil(count / 5) }, (_, g) => Math.min(5, count - g * 5))

    return (
        <span aria-hidden="true" className={cn("inline-flex gap-2", INK)}>
            {groups.map((marks, g) => (
                <svg key={g} viewBox="0 0 30 26" className="h-6 w-7" fill="none">
                    {Array.from({ length: Math.min(marks, 4) }, (_, i) => (
                        <path
                            key={i}
                            d={`M${5 + i * 6} 3 L${4 + i * 6} 23`}
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    ))}
                    {marks === 5 && (
                        <path d="M1 18 L28 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    )}
                </svg>
            ))}
        </span>
    )
}
