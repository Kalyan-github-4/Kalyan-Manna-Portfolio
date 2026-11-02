"use client"

import { useEffect, useState } from "react"

import { getGuestbookEntries } from "@/lib/api"

type PeekNote = { id: string; message: string; author: string }

// Card stock and tilt for each slot, so the notes look pinned up by hand.
const SLOTS = [
    { paper: "#e6dcc4", rotate: -5, className: "left-[2%] top-6" },
    { paper: "#d6dbc6", rotate: 3, className: "left-[34%] top-10" },
    { paper: "#efe8d8", rotate: -2, className: "left-[64%] top-4" },
    { paper: "#e9e3d2", rotate: 4, className: "left-[20%] top-40" },
]

function Peg() {
    return (
        <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 h-7 w-2.5 -translate-x-1/2 rounded-[2px] bg-linear-to-r from-[#a8814f] via-[#c9a06b] to-[#a8814f] shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
        />
    )
}

/** The newest few notes from the guestbook, pinned up small. */
export default function GuestbookPeek() {
    const [notes, setNotes] = useState<PeekNote[] | null>(null)

    useEffect(() => {
        let cancelled = false
        getGuestbookEntries()
            .then(({ entries }) => {
                if (cancelled) return
                setNotes(
                    entries.slice(0, SLOTS.length).map((entry) => ({
                        id: entry.id,
                        message: entry.message,
                        author: entry.user?.name || "Guest",
                    })),
                )
            })
            .catch(() => {
                if (!cancelled) setNotes([])
            })
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="relative h-full">
            {SLOTS.map((slot, index) => {
                const note = notes?.[index]
                // Loading holds every slot; once loaded, empty slots go blank paper
                // so an empty wall still reads as an invitation.
                if (notes && !note && index > 0) return null

                return (
                    <div
                        key={index}
                        className={`absolute w-[36%] min-w-34 drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)] ${slot.className}`}
                        style={{ rotate: `${slot.rotate}deg` }}
                    >
                        <Peg />
                        <div className="min-h-30 px-3.5 pb-3 pt-5" style={{ backgroundColor: slot.paper }}>
                            {notes === null ? (
                                <div aria-hidden="true" className="space-y-2">
                                    <div className="h-2.5 w-[85%] animate-pulse rounded-full bg-black/10" />
                                    <div className="h-2.5 w-[65%] animate-pulse rounded-full bg-black/10" />
                                    <div className="h-2.5 w-[75%] animate-pulse rounded-full bg-black/10" />
                                    <div className="mt-4 h-3.5 w-16 animate-pulse rounded-full bg-black/10" />
                                </div>
                            ) : note ? (
                                <>
                                    <p className="line-clamp-4 font-display text-[0.95rem] leading-5 text-zinc-800">{note.message}</p>
                                    <p className="mt-2 truncate font-hand text-lg leading-5 text-zinc-700">— {note.author}</p>
                                </>
                            ) : (
                                <p className="font-hand text-xl leading-6 text-zinc-700">Be the first to pin a note.</p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
