"use client"

import { useCallback, useRef, useState, type ReactNode } from "react"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { ArrowRight, PencilSimple } from "@phosphor-icons/react"

import { NoteStamp } from "../NoteCard"
import GuestbookLoginButtons from "./GuestbookLoginButtons"

const POSTCARD = "#e3dfd2"

interface CreateGuestCardProps {
    maxLength?: number
    onSubmit?: (message: string) => Promise<void> | void
}

/** The postcard both states share, so signing in only changes what's written on it. */
function Postcard({ stamp, children }: { stamp: ReactNode; children: ReactNode }) {
    return (
        <div className="relative -rotate-1 drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)]">
            <div
                aria-hidden="true"
                className="absolute -top-3 left-8 z-20 h-7 w-28 -rotate-3 opacity-90"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg, #92aede 0 4px, #b4c8e8 4px 8px)",
                }}
            />

            <div className="relative p-6 pt-7" style={{ backgroundColor: POSTCARD }}>
                <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.4em] text-zinc-500">
                    Post card
                </p>

                <div className="float-right mb-2 ml-3">{stamp}</div>

                <h2 className="font-hand text-5xl leading-none text-blue-700">
                    Leave your mark
                </h2>

                {children}
            </div>

            <PencilSimple
                aria-hidden="true"
                size={56}
                weight="fill"
                className="absolute -bottom-5 -right-2 z-20 -rotate-12 text-amber-400"
            />
        </div>
    )
}

function SignedOutCreateCard() {
    return (
        <Postcard
            stamp={
                <div className="grid h-22 w-20 rotate-3 place-items-center border border-dashed border-zinc-500/50 text-center font-hand text-xl leading-5 text-zinc-500">
                    your face here
                </div>
            }
        >
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                A note on the wall, pinned for everyone who visits.
            </p>

            <div className="clear-both pt-4">
                <GuestbookLoginButtons />
            </div>

            <p className="mt-2 text-xs text-zinc-500">
                Your name and photo appear with your note.
            </p>

            <p className="mt-4 border-b border-dashed border-zinc-500/50 pb-1 font-hand text-2xl text-zinc-700">
                <span className="mr-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-zinc-500">
                    To
                </span>
                The Wall, kalyanmanna.com
            </p>
        </Postcard>
    )
}

function SignedInCreateCard({
    maxLength,
    onSubmit,
}: Required<CreateGuestCardProps>) {
    const { user } = useUser()
    const submittingRef = useRef(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const authorName =
        user?.fullName ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress ||
        "Guest"

    const isEmpty = message.trim().length === 0

    const handleSubmit = useCallback(async () => {
        if (isEmpty || submittingRef.current) return

        submittingRef.current = true
        setIsSubmitting(true)

        try {
            await onSubmit(message.trim())
            setMessage("")
        } catch (error) {
            console.error("CreateGuestCard submit failed:", error)
        } finally {
            submittingRef.current = false
            setIsSubmitting(false)
        }
    }, [isEmpty, message, onSubmit])

    return (
        <Postcard
            stamp={
                <NoteStamp
                    imageUrl={user?.imageUrl ?? null}
                    name={authorName}
                    color={POSTCARD}
                />
            }
        >
            <textarea
                value={message}
                maxLength={maxLength}
                disabled={isSubmitting}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write something nice…"
                aria-label="Your note"
                rows={3}
                className="mt-3 block w-full resize-none bg-transparent font-display text-2xl leading-9 text-zinc-800 outline-none placeholder:text-zinc-500 disabled:opacity-60"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, transparent 35px, rgba(82,110,160,0.28) 35px, rgba(82,110,160,0.28) 36px)",
                    backgroundSize: "100% 36px",
                }}
            />

            <div className="clear-both mt-3 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate font-hand text-2xl text-zinc-800">
                    — {authorName}
                </p>

                <div className="flex shrink-0 items-center gap-3 pr-8">
                    <span className="font-mono text-xs text-zinc-500">
                        {message.length}/{maxLength}
                    </span>

                    <button
                        type="button"
                        disabled={isEmpty || isSubmitting}
                        onClick={handleSubmit}
                        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isSubmitting ? "Pinning…" : "Pin it"}
                        <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </Postcard>
    )
}

export default function CreateGuestCard({
    maxLength = 100,
    onSubmit = () => {},
}: CreateGuestCardProps) {
    return (
        <>
            <SignedOut>
                <SignedOutCreateCard />
            </SignedOut>

            <SignedIn>
                <SignedInCreateCard maxLength={maxLength} onSubmit={onSubmit} />
            </SignedIn>
        </>
    )
}
