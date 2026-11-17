"use client"

import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useRef, useState, type PointerEvent } from "react"

import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import { playSwitch } from "@/lib/tap-sound"

const STRAP_TEXT = Array.from({ length: 8 }, () => "KALYAN MANNA").join(" · ")

/** Horizontal bands the strap is cut into so it can twist along its length. */
const STRAP_SLICES = 18

/** The punched slot the clip's ring passes through, shared by both faces. */
function CardSlot({ light }: { light?: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={`absolute left-1/2 top-3 h-2.5 w-14 -translate-x-1/2 rounded-full ${
                light ? "bg-zinc-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" : "bg-black/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]"
            }`}
        />
    )
}

/**
 * An ID card hanging from a lanyard. It starts face down on the logo side.
 * Sweeping the wand across it left to right turns it to the photo, right to
 * left turns it back, and a click toggles it — each with a little swing.
 */
export default function LanyardIdCard() {
    const [flipped, setFlipped] = useState(false)
    // Counts flips, so the clip's shade replays on each one.
    const [turns, setTurns] = useState(0)
    const swing = useAnimationControls()
    const reducedMotion = useReducedMotion()
    const swipeRange = useRef<{ min: number; max: number } | null>(null)

    const turn = (showFace: boolean) => {
        if (showFace === flipped) return
        setFlipped(showFace)
        setTurns((n) => n + 1)
        playSwitch()
        if (!reducedMotion) {
            // Swings the way the card was pushed.
            const push = showFace ? 1 : -1
            void swing.start({
                rotate: [0, 5 * push, -3.5 * push, 1.5 * push, 0],
                transition: { duration: 1.1, ease: "easeOut" },
            })
        }
    }

    // Flips mid-sweep, as soon as the pointer has travelled a third of the
    // card's width one way since its furthest point the other way — so a
    // partial pass works, and reversing straight back flips it back.
    const sweep = (event: PointerEvent<HTMLButtonElement>) => {
        if (event.pointerType !== "mouse") return
        const range = swipeRange.current
        if (!range) {
            swipeRange.current = { min: event.clientX, max: event.clientX }
            return
        }
        range.min = Math.min(range.min, event.clientX)
        range.max = Math.max(range.max, event.clientX)

        const needed = event.currentTarget.getBoundingClientRect().width / 3
        const showFace = event.clientX - range.min > needed ? true : range.max - event.clientX > needed ? false : null
        if (showFace === null) return
        swipeRange.current = { min: event.clientX, max: event.clientX }
        turn(showFace)
    }
    const endSweep = () => {
        swipeRange.current = null
    }

    return (
        <div className="flex flex-col items-center">
            {/* Strap: runs up to the frame's top rule. When the card turns to
                the photo, the strap takes a half twist down its length — pinned
                at the top, turned all the way round where it meets the clip. */}
            <div aria-hidden="true" className="relative h-28 w-6 perspective-[260px] sm:h-36 lg:h-40">
                {Array.from({ length: STRAP_SLICES }, (_, i) => {
                    // 0 at the anchor, 1 at the clip.
                    const reach = i / (STRAP_SLICES - 1)
                    const angle = flipped ? 180 * reach : 0
                    const transition = reducedMotion
                        ? { duration: 0 }
                        : {
                              type: "spring" as const,
                              stiffness: 120,
                              damping: 16,
                              // The twist travels up from the card that drives it.
                              delay: (1 - reach) * 0.18,
                          }
                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            animate={{ rotateY: angle }}
                            transition={transition}
                            className="absolute inset-x-0 overflow-hidden"
                            style={{
                                top: `${(i * 100) / STRAP_SLICES}%`,
                                // A hair taller than its share, so no seam shows between slices.
                                height: `calc(${100 / STRAP_SLICES}% + 1px)`,
                            }}
                        >
                            {/* The whole strap, shifted so this slice shows its own stretch of it. */}
                            <div
                                className="absolute inset-x-0 border-x border-white/10 bg-zinc-900"
                                style={{
                                    ...faintDiagonalStripeStyle,
                                    height: `${STRAP_SLICES * 100}%`,
                                    top: `${-i * 100}%`,
                                }}
                            >
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] font-semibold tracking-[0.3em] text-white/35 [writing-mode:vertical-rl]">
                                    {STRAP_TEXT}
                                </span>
                            </div>
                            {/* Shade: darkest where the strap turns edge-on to the light. */}
                            <motion.div
                                initial={false}
                                animate={{ opacity: Math.sin((angle * Math.PI) / 180) * 0.6 }}
                                transition={transition}
                                className="absolute inset-0 bg-black"
                            />
                        </motion.div>
                    )
                })}
            </div>

            <motion.div animate={swing} className="flex origin-top flex-col items-center">
                {/* Clip and ring: they turn with the card, joining the strap's
                    twist to the card's flip. */}
                <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}
                    className="relative z-10 -mb-4 flex flex-col items-center transform-3d"
                    style={{ transformPerspective: 260 }}
                >
                    <span className="relative h-4 w-12 overflow-hidden rounded-[3px] border border-white/30 bg-linear-to-b from-zinc-300 to-zinc-500 shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                        {/* Dims as the clip turns edge-on, like the strap above it. */}
                        {turns > 0 && !reducedMotion && (
                            <motion.span
                                key={turns}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.55, 0] }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                className="absolute inset-0 bg-black"
                            />
                        )}
                    </span>
                    <svg width="18" height="34" viewBox="0 0 18 34" className="-mt-0.5">
                        <path
                            d="M 9 1 C 3 4, 2 14, 5 22 C 7 29, 13 31, 14 25 C 15 19, 12 12, 9 11"
                            fill="none"
                            stroke="#d4d4d8"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                <button
                    type="button"
                    onClick={() => turn(!flipped)}
                    onPointerMove={sweep}
                    onPointerLeave={endSweep}
                    aria-pressed={flipped}
                    className="group rounded-2xl perspective-[1400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                    {/* Named by its content (the face in view, plus this hint) rather
                        than an aria-label, so the name always matches what is on screen. */}
                    <span className="sr-only">
                        {flipped ? "Turn the ID card back over" : "Flip the ID card to see the photo"}
                    </span>
                    <motion.div
                        initial={false}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}
                        className="relative h-[22rem] w-60 transform-3d sm:h-[25rem] sm:w-[17.5rem]"
                    >
                        {/* Back: what shows first. */}
                        <div
                            aria-hidden={flipped}
                            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backface-hidden"
                            style={faintDiagonalStripeStyle}
                        >
                            <CardSlot />
                            <Image src="/logo-white.webp" alt="" width={256} height={256} className="w-32 opacity-90" />
                            <span className="absolute bottom-7 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                                Kalyan Manna
                            </span>
                        </div>

                        {/* Front: the photo side. */}
                        <div aria-hidden={!flipped} className="absolute inset-0 flex rotate-y-180 flex-col overflow-hidden rounded-2xl border border-white/60 bg-[#f3f3f1] p-3.5 shadow-[0_30px_60px_rgba(0,0,0,0.7)] backface-hidden">
                            <CardSlot light />
                            <Image src="/logo-white.webp" alt="" width={256} height={256} className="mb-2 ml-0.5 w-7 invert" />
                            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-zinc-300">
                                <Image
                                    src="/kalyan-manna.webp"
                                    alt="Portrait of Kalyan Manna"
                                    fill
                                    sizes="280px"
                                    className="object-cover object-[50%_20%]"
                                />
                            </div>
                            <p className="mt-3 text-center font-display text-3xl leading-none text-zinc-900">Kalyan Manna</p>
                            <p className="mt-1.5 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
                                Full-stack developer
                            </p>
                        </div>
                    </motion.div>
                </button>
            </motion.div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                {/* The wand only exists on desktop, so smaller screens get the tap hint. */}
                <span className="lg:hidden">{flipped ? "Tap to turn back" : "Tap the card"}</span>
                <span className="hidden lg:inline">{flipped ? "Swipe back to hide" : "Swipe the wand across"}</span>
            </p>
        </div>
    )
}
