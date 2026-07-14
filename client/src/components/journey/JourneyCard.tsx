import type { PointerEvent } from "react"
import { ArrowUpRight, MapPin } from "@phosphor-icons/react"
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"
import type { JourneyItem, JourneySize } from "@/data/journeyData"

import { CategoryBadge } from "./CategoryBadge"
import { MemoryImage } from "./MemoryImage"
import { useHoverCapable } from "./useHoverCapable"

const EASE = [0.22, 1, 0.36, 1] as const

// Maps a memory's "size" to a footprint on the 12-column desktop grid. Widths
// stay in multiples of 4 so cards tile cleanly; "tall" also spans two rows.
const SIZE_SPAN: Record<JourneySize, string> = {
    small: "md:col-span-4",
    medium: "md:col-span-4",
    wide: "md:col-span-8",
    tall: "md:col-span-4 md:row-span-2",
}

// Max tilt in degrees — deliberately restrained so it reads as premium depth
// rather than a novelty flip.
const MAX_TILT = 5

interface JourneyCardProps {
    item: JourneyItem
    onOpen: (id: number) => void
}

export function JourneyCard({ item, onOpen }: JourneyCardProps) {
    const reduceMotion = useReducedMotion()
    const canHover = useHoverCapable()
    const tiltEnabled = canHover && !reduceMotion

    // Raw pointer position (0–1) smoothed into spring-driven rotation.
    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const rx = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), {
        stiffness: 220,
        damping: 20,
    })
    const ry = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), {
        stiffness: 220,
        damping: 20,
    })

    const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
        if (!tiltEnabled) return
        const rect = event.currentTarget.getBoundingClientRect()
        px.set((event.clientX - rect.left) / rect.width)
        py.set((event.clientY - rect.top) / rect.height)
    }

    const handlePointerLeave = () => {
        px.set(0.5)
        py.set(0.5)
    }

    const size = item.size ?? "medium"

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ perspective: 1000 }}
            className={cn("h-80 md:h-auto", SIZE_SPAN[size])}
        >
            <motion.button
                type="button"
                onClick={() => onOpen(item.id)}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                aria-label={`Open ${item.title}`}
                style={
                    tiltEnabled
                        ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
                        : undefined
                }
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 text-left transition-colors duration-500 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                {/* Image */}
                <MemoryImage
                    src={item.image}
                    alt={`${item.title} — ${item.description}`}
                    category={item.category}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />

                {/* Grain / noise texture (CSS-only, very subtle) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />

                {/* Dark gradient overlay — deepens on hover for text legibility */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Top row: category + arrow */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <CategoryBadge category={item.category} />

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </span>
                </div>

                {/* Bottom content — title lifts on hover to reveal metadata */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                        <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">
                            {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">{item.date}</p>
                    </div>

                    {/* Supporting metadata: revealed on hover, always readable on
                        touch (no-hover) devices where it can't be triggered. */}
                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                        <div className="overflow-hidden">
                            <p className="pt-2 text-sm leading-relaxed text-zinc-300">
                                {item.description}
                            </p>

                            {item.location && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                                    <MapPin
                                        size={13}
                                        className="text-white/40"
                                        aria-hidden="true"
                                    />
                                    {item.location}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </motion.button>
        </motion.article>
    )
}
