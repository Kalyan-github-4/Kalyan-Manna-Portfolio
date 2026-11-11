"use client"

import type { CSSProperties, ReactNode } from "react"
import { Paperclip, ShareNetwork, Trash } from "@phosphor-icons/react"

export interface NoteEntry {
    id: string
    message: string
    author: string
    /** Null falls back to initials on the stamp. */
    imageUrl: string | null
    date: string
    createdAtIso: string
    ownerClerkUserId: string | null
}

interface NoteCardProps {
    entry: NoteEntry
    /** Pinned notes all hang from a clothespin. */
    pinned?: boolean
    canDelete?: boolean
    onShare?: (id: string) => void
    onDelete?: (id: string) => void
}

/** Stable across renders and prepends, so a note keeps its look for good. */
function hashId(id: string) {
    let h = 0
    for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 99991
    return h
}

const LINE = 36
const rules = (color: string) =>
    `linear-gradient(to bottom, transparent ${LINE - 1}px, ${color} ${LINE - 1}px, ${color} ${LINE}px)`

interface PaperStyle {
    color: string
    style: CSSProperties
    /** Bottom edge torn into teeth. */
    torn?: boolean
    margin?: boolean
    holes?: boolean
    stitched?: boolean
    meta: string
}

const PAPERS: PaperStyle[] = [
    {
        // Ruled notebook
        color: "#ddd8c8",
        style: { backgroundImage: rules("rgba(82,110,160,0.28)"), backgroundSize: `100% ${LINE}px` },
        torn: true,
        margin: true,
        meta: "text-zinc-500",
    },
    {
        // Kraft, with the top corners cut
        color: "#b89a6c",
        style: {
            backgroundImage: "linear-gradient(to bottom, #b4976a, #a5875c)",
            clipPath: "polygon(16px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%, 0 16px)",
        },
        meta: "text-zinc-800/70",
    },
    {
        // Airmail
        color: "#ddd4c0",
        style: {
            border: "9px solid",
            borderImage:
                "repeating-linear-gradient(-45deg, #b8413f 0 12px, #ddd4c0 12px 24px, #2f5b98 24px 36px, #ddd4c0 36px 48px) 9",
        },
        meta: "text-zinc-500",
    },
    {
        // Yellow legal pad
        color: "#dccf8f",
        style: { backgroundImage: rules("rgba(80,90,130,0.22)"), backgroundSize: `100% ${LINE}px` },
        margin: true,
        meta: "text-zinc-600",
    },
    {
        // Graph paper
        color: "#dcdad0",
        style: {
            backgroundImage:
                "linear-gradient(rgba(82,110,160,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(82,110,160,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
        },
        torn: true,
        meta: "text-zinc-500",
    },
    {
        // Sage card with a stitched border
        color: "#c5cbb6",
        style: {},
        stitched: true,
        meta: "text-zinc-600",
    },
    {
        // Dotted page, punched for a binder
        color: "#d9d5c9",
        style: {
            backgroundImage: "radial-gradient(rgba(60,60,70,0.22) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
        },
        holes: true,
        meta: "text-zinc-500",
    },
]

/** Shorter notes are set larger, so every card fills about the same space. */
function messageSize(length: number) {
    if (length <= 30) return "font-display text-[2rem] leading-10"
    if (length <= 70) return "font-display text-[1.6rem] leading-9"
    if (length <= 140) return "font-display text-[1.15rem] leading-7"
    if (length <= 200) return "font-sans text-[0.875rem] leading-[1.3rem]"
    return "font-sans text-[0.8rem] leading-[1.2rem]"
}

const TAPES =["#c9b77a", "#d29a9f", "#9dbb97", "#92aede"]
const CLIPS = ["#e0a92e", "#3fb6a0", "#df7fb0"]

function Fastener({ kind, tint }: { kind: number; tint: number }): ReactNode {
    if (kind === 0) {
        return (
            <div
                aria-hidden="true"
                className="absolute -top-5 left-1/2 z-20 h-13 w-4.5 -translate-x-1/2 rounded-[3px] bg-linear-to-r from-[#a8814f] via-[#c9a06b] to-[#a8814f] shadow-[0_3px_5px_rgba(0,0,0,0.45)]"
            >
                <span className="absolute inset-x-0 top-4 h-1.5 bg-linear-to-b from-zinc-200 to-zinc-400" />
            </div>
        )
    }

    if (kind === 1) {
        return (
            <div
                aria-hidden="true"
                className="absolute -top-3 z-20 h-7 w-24 -rotate-2 opacity-85 shadow-sm"
                style={{ backgroundColor: TAPES[tint % TAPES.length], left: `${18 + (tint % 50)}%` }}
            />
        )
    }

    if (kind === 2) {
        return (
            <Paperclip
                aria-hidden="true"
                size={40}
                weight="bold"
                className="absolute -top-5 z-20 rotate-12"
                style={{ color: CLIPS[tint % CLIPS.length], left: `${35 + (tint % 45)}%` }}
            />
        )
    }

    return (
        <span
            aria-hidden="true"
            className="absolute -top-2 left-1/3 z-20 size-5 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.5)]"
            style={{ background: "radial-gradient(circle at 35% 30%, #8ff0c8, #17966f 70%)" }}
        />
    )
}

/** The perforated stamp a guest's photo is mounted on. */
export function NoteStamp({
    imageUrl,
    name,
    color,
}: {
    imageUrl: string | null
    name: string
    color: string
}) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()

    return (
        <div
            className="rotate-3 border-4 border-dotted bg-white p-0.5 shadow-sm"
            style={{ borderColor: color }}
        >
            {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- avatar URLs come from the database, so their hosts can't be allowlisted
                <img
                    src={imageUrl}
                    alt=""
                    width={64}
                    height={76}
                    loading="lazy"
                    decoding="async"
                    className="h-19 w-16 object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
            ) : (
                <div className="grid h-19 w-16 place-items-center bg-zinc-200 font-display text-2xl text-zinc-600">
                    {initials || "G"}
                </div>
            )}
        </div>
    )
}

/** A guest's note on the wall: one of several papers, kept for good by its id. */
export function NoteCard({
    entry,
    pinned = false,
    canDelete = false,
    onShare,
    onDelete,
}: NoteCardProps) {
    const hash = hashId(entry.id)
    const paper = PAPERS[hash % PAPERS.length]
    const fastener = pinned ? 0 : 1 + (hash % 3)
    const tilt = ((hash % 7) - 3) * 0.5

    return (
        // The shadow lives here as a filter so it follows torn and cut edges,
        // which a box-shadow on the paper would ignore.
        <figure
            id={`guest-card-${entry.id}`}
            className="group relative w-full scroll-mt-28 rotate-(--tilt) drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out hover:rotate-0"
            style={{ "--tilt": `${tilt}deg` } as CSSProperties}
        >
            <Fastener kind={fastener} tint={hash} />

            <div
                // One height for every card from md up, so the wall reads as an even
                // grid; on phones a single column can grow to fit the note.
                className={`relative flex min-h-56 flex-col overflow-hidden pb-5 pr-5 pt-9 md:h-60 ${paper.margin ? "pl-14" : "pl-6"}`}
                style={{ backgroundColor: paper.color, ...paper.style }}
            >
                {paper.margin && (
                    <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-10 bg-red-400/60"
                        style={{ width: 1 }}
                    />
                )}

                {paper.stitched && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-2 border border-dashed border-zinc-700/35"
                    />
                )}

                {paper.holes && (
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-3 top-2.5 h-3"
                        style={{
                            backgroundImage: "radial-gradient(circle, #000 4px, transparent 4.5px)",
                            backgroundSize: "24px 12px",
                        }}
                    />
                )}

                {/* A plain block, not a flex item, so the message still wraps around the stamp. */}
                <div className="relative min-h-0 flex-1 overflow-hidden">
                    <div className="float-right mb-1 ml-3">
                        <NoteStamp
                            imageUrl={entry.imageUrl}
                            name={entry.author}
                            color={paper.color}
                        />
                    </div>

                    <blockquote
                        title={entry.message}
                        className={`wrap-break-word text-zinc-800 ${messageSize(entry.message.length)}`}
                    >
                        {entry.message}
                    </blockquote>
                </div>

                <figcaption className="relative flex items-end justify-between gap-3 pt-3">
                    <div className="min-w-0">
                        <p className="truncate pr-2 font-hand text-[1.7rem] leading-9 text-zinc-800">
                            — {entry.author}
                        </p>
                        <p className={`font-mono text-[0.65rem] uppercase leading-5 tracking-[0.15em] ${paper.meta}`}>
                            {entry.date}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-0.5">
                        {canDelete && (
                            <button
                                type="button"
                                aria-label={`Delete ${entry.author}'s note`}
                                onClick={() => onDelete?.(entry.id)}
                                className={`cursor-pointer rounded-full p-1.5 transition-colors hover:bg-black/10 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 ${paper.meta}`}
                            >
                                <Trash size={15} weight="bold" aria-hidden="true" />
                            </button>
                        )}

                        <button
                            type="button"
                            aria-label={`Share ${entry.author}'s note`}
                            onClick={() => onShare?.(entry.id)}
                            className={`cursor-pointer rounded-full p-1.5 transition-colors hover:bg-black/10 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 ${paper.meta}`}
                        >
                            <ShareNetwork size={15} weight="bold" aria-hidden="true" />
                        </button>
                    </div>
                </figcaption>
            </div>

            {/* Two opposing triangle rows cut the bottom into teeth. */}
            {paper.torn && (
                <div
                    aria-hidden="true"
                    className="h-2.5"
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${paper.color} 50%, transparent 50%), linear-gradient(225deg, ${paper.color} 50%, transparent 50%)`,
                        backgroundSize: "14px 100%",
                    }}
                />
            )}
        </figure>
    )
}
