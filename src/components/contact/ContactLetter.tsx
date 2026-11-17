"use client"

import { Fragment, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type PointerEvent, type ReactNode } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
    Barbell,
    CalendarCheck,
    CheckCircle,
    Paperclip,
    PaperPlaneTilt,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import TimeZoneSelect from "./TimeZoneSelect"
import { siteConfig } from "@/config"

const TOPICS = ["Full-time role", "Freelance project", "Just saying hi", "Bug report", "Other"] as const
const MAX_MESSAGE = 500

/** Bookable window, in IST (the owner's clock): 11:00–23:00, every 30 min. */
const HOME_TZ = "Asia/Kolkata"
/** 18:00–21:00 IST is gym time, so no calls start in that window. */
const GYM = { from: 18, to: 21 } as const
const SLOT_TIMES = Array.from({ length: 25 }, (_, i) => [11 + Math.floor(i / 2), (i % 2) * 30] as const).filter(
    ([h]) => h < GYM.from || h >= GYM.to,
)
const DAYS_AHEAD = 14
const LEAD_DAYS = 3

type Status = "idle" | "sending" | "sent" | "error"

/** Calendar days in IST, starting a few days out and skipping Sundays. */
function upcomingDays() {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: HOME_TZ, year: "numeric", month: "2-digit", day: "2-digit" })
        .format(new Date())
        .split("-")
        .map(Number)
    const days: { y: number; m: number; d: number; date: Date }[] = []
    let offset = LEAD_DAYS

    while (days.length < DAYS_AHEAD) {
        const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + offset))
        if (date.getUTCDay() !== 0) {
            days.push({ y: date.getUTCFullYear(), m: date.getUTCMonth(), d: date.getUTCDate(), date })
        }
        offset++
    }
    return days
}

/** An IST wall-clock time as an absolute instant. */
function istInstant(y: number, m: number, d: number, h: number, min: number) {
    return new Date(Date.UTC(y, m, d, h, min) - (5 * 60 + 30) * 60_000)
}

export default function ContactLetter() {
    const searchParams = useSearchParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [topic, setTopic] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [booking, setBooking] = useState(searchParams.has("book-call"))
    const [localZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone || HOME_TZ)
    const [timeZone, setTimeZone] = useState(localZone)
    const [dayIndex, setDayIndex] = useState(0)
    const [slot, setSlot] = useState<string | null>(null)
    const [status, setStatus] = useState<Status>("idle")
    const [error, setError] = useState<string | null>(null)

    const today = useMemo(
        () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        [],
    )
    const [days] = useState(upcomingDays)
    const isWide = useIsWide()

    const { groups, gym } = useMemo(() => {
        const day = days[dayIndex]
        const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" })
        const hourFmt = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" })
        const buckets: Record<"Morning" | "Afternoon" | "Evening" | "Night", { iso: string; label: string }[]> = {
            Morning: [],
            Afternoon: [],
            Evening: [],
            Night: [],
        }

        // Small hours (before 5 AM) count as night, not morning, for visitors far west.
        const bucketOf = (instant: Date) => {
            const localHour = Number(hourFmt.format(instant)) % 24
            return localHour < 5 || localHour >= 21
                ? "Night"
                : localHour < 12
                  ? "Morning"
                  : localHour < 17
                    ? "Afternoon"
                    : "Evening"
        }

        for (const [h, min] of SLOT_TIMES) {
            const instant = istInstant(day.y, day.m, day.d, h, min)
            buckets[bucketOf(instant)].push({ iso: instant.toISOString(), label: timeFmt.format(instant) })
        }

        // The gym gap, in the visitor's clock, shown after the group it starts in.
        const gymStart = istInstant(day.y, day.m, day.d, GYM.from, 0)
        const gymEnd = istInstant(day.y, day.m, day.d, GYM.to, 0)

        return {
            groups: Object.entries(buckets).filter(([, slots]) => slots.length > 0),
            gym: {
                label: `${timeFmt.format(gymStart)} – ${timeFmt.format(gymEnd)}`,
                after: bucketOf(gymStart),
            },
        }
    }, [days, dayIndex, timeZone])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setError(null)

        if (name.trim().length < 2) return setError("Tell me your name.")
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("That email doesn't look right.")
        if (message.trim().length < 10) return setError("Write a little more — at least 10 characters.")
        if (booking && !slot) return setError("Pick a time for the call.")

        setStatus("sending")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    topic: topic ?? undefined,
                    call: booking && slot ? { start: slot, timeZone } : undefined,
                }),
            })
            if (!res.ok) throw new Error(String(res.status))
            setStatus("sent")
        } catch {
            setStatus("error")
            setError("Couldn't send that. Try again, or email me directly.")
        }
    }

    if (status === "sent") {
        return (
            <LetterShell>
                <div className="flex w-full flex-col items-center py-10 text-center xl:w-lg">
                    <CheckCircle size={44} weight="duotone" className="text-blue-400" />
                    <p className="mt-5 font-hand text-4xl text-white sm:text-5xl">Letter sent!</p>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                        {booking
                            ? "Your call request is in. I'll confirm the slot with a Google Meet invite."
                            : "Thanks for writing. I'll get back to you within 48 hours."}
                    </p>
                </div>
            </LetterShell>
        )
    }

    return (
        <LetterShell>
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col xl:flex-row">
                    {/* Left: the letter. Fixed width on desktop so the card can
                        grow smoothly around it when the time picker opens. */}
                    <div className="w-full min-w-0 xl:w-lg xl:shrink-0">
                        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">{today}</p>
                        <p className="mt-2 font-hand text-4xl leading-none text-[#f4efe4] sm:text-5xl">
                            Hey {siteConfig.shortName},
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <Field label="Your name">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    autoComplete="name"
                                    maxLength={80}
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Email">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="jane@example.com"
                                    autoComplete="email"
                                    maxLength={120}
                                    className={inputClass}
                                />
                            </Field>
                        </div>

                        <fieldset className="mt-4">
                            <legend className="mb-2 text-sm font-medium text-zinc-300">What&apos;s it about?</legend>
                            <div className="flex flex-wrap gap-1.5">
                                {TOPICS.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        aria-pressed={topic === t}
                                        onClick={() => setTopic(topic === t ? null : t)}
                                        className={cn(
                                            "cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-200",
                                            topic === t
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/25 hover:text-white",
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <Field label="Message" className="mt-4">
                            <div className="relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
                                    placeholder="Tell me what you're working on, or just say hi..."
                                    rows={4}
                                    className={cn(inputClass, "h-32 resize-none pb-7")}
                                />
                                <span className="pointer-events-none absolute bottom-2.5 right-4 text-[10px] tracking-widest text-zinc-500">
                                    {message.length} / {MAX_MESSAGE}
                                </span>
                            </div>
                        </Field>

                        <div className="mt-5 flex items-start gap-3.5">
                            <button
                                type="button"
                                role="switch"
                                aria-checked={booking}
                                aria-label="Book a 30-min call too"
                                onClick={() => {
                                    setBooking(!booking)
                                    setError(null)
                                }}
                                className={cn(
                                    "relative mt-0.5 h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-500",
                                    booking ? "bg-blue-600" : "bg-white/10",
                                )}
                            >
                                <span
                                    className={cn(
                                        "absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                                        booking && "translate-x-5",
                                    )}
                                />
                            </button>
                            <div>
                                <p className="text-[15px] font-semibold text-white">Book a 30-min call too</p>
                                <p className="mt-0.5 text-[13px] text-zinc-500">Google Meet. It&apos;s a request until I accept it.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: the time picker. Its wrapper animates width on
                        desktop (height on smaller screens) from 0 to auto, so
                        the card grows instead of snapping. */}
                    <AnimatePresence initial={false}>
                        {booking && (
                            <motion.div
                                key="picker"
                                initial={isWide ? { width: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                                animate={isWide ? { width: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                                exit={isWide ? { width: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                                transition={{
                                    width: { duration: 0.7, ease: EASE },
                                    height: { duration: 0.6, ease: EASE },
                                    opacity: { duration: 0.45, ease: "easeOut" },
                                }}
                                className="overflow-hidden"
                            >
                                <div className="flex pt-8 xl:pt-0">
                                    {/* w-[1px], not w-px: the theme's --container-px token turns w-px into 1.5rem. */}
                                    <div aria-hidden className="mx-10 hidden w-[1px] shrink-0 bg-linear-to-b from-transparent via-white/12 to-transparent xl:block" />
                                    <TimePicker
                                        days={days}
                                        dayIndex={dayIndex}
                                        onDay={(i) => {
                                            setDayIndex(i)
                                            setSlot(null)
                                        }}
                                        groups={groups}
                                        gym={gym}
                                        slot={slot}
                                        onSlot={setSlot}
                                        timeZone={timeZone}
                                        localZone={localZone}
                                        onZone={(z) => {
                                            setTimeZone(z)
                                            setSlot(null)
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-4 border-t border-dashed border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <p className="truncate font-hand text-2xl leading-none text-[#f4efe4]/80">
                            Yours, {name.trim() || <span className="text-zinc-600">________</span>}
                        </p>
                        <p className="mt-1.5 text-xs text-zinc-500">
                            Only used to reply to you.{" "}
                            <Link href="/privacy" className="text-zinc-300 underline underline-offset-4 hover:text-white">
                                Privacy
                            </Link>
                        </p>
                    </div>

                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                        {error && (
                            <p role="alert" className="text-sm text-red-400">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group/pin inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-blue-300/40 bg-linear-to-b from-blue-500 to-blue-700 px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(37,99,235,0.4)] transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_28px_rgba(37,99,235,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:opacity-70"
                        >
                            {booking ? (
                                <CalendarCheck size={17} weight="bold" aria-hidden className="transition-transform duration-300 group-hover/pin:-rotate-12" />
                            ) : (
                                <PaperPlaneTilt size={17} weight="bold" aria-hidden className="transition-transform duration-300 group-hover/pin:-rotate-12" />
                            )}
                            {status === "sending" ? "Sending…" : booking ? "Request the call" : "Send"}
                        </button>
                    </div>
                </div>
            </form>
        </LetterShell>
    )
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Click-and-drag horizontal scrolling for a mouse. Touch already swipes
 * natively, so only mouse pointers are handled. A drag past a few pixels
 * swallows the click that follows, so letting go over a day doesn't select it.
 */
function useDragScroll() {
    const state = useRef({ down: false, startX: 0, startLeft: 0, moved: false })

    return {
        /** Spread onto the scroll container. */
        handlers: {
            onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
                if (e.pointerType !== "mouse" || e.button !== 0) return
                state.current = { down: true, startX: e.clientX, startLeft: e.currentTarget.scrollLeft, moved: false }
            },
            onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
                const s = state.current
                if (!s.down) return
                const dx = e.clientX - s.startX
                if (!s.moved && Math.abs(dx) > 4) {
                    s.moved = true
                    e.currentTarget.setPointerCapture(e.pointerId)
                }
                if (s.moved) e.currentTarget.scrollLeft = s.startLeft - dx
            },
            onPointerUp: () => {
                state.current.down = false
            },
            onPointerCancel: () => {
                state.current.down = false
            },
        },
        wasDragged: () => state.current.moved,
    }
}

const WIDE_QUERY = "(min-width: 1280px)"
const subscribeWide = (cb: () => void) => {
    const mq = window.matchMedia(WIDE_QUERY)
    mq.addEventListener("change", cb)
    return () => mq.removeEventListener("change", cb)
}
/** True at Tailwind's xl, where the picker sits beside the letter. */
function useIsWide() {
    return useSyncExternalStore(
        subscribeWide,
        () => window.matchMedia(WIDE_QUERY).matches,
        () => false,
    )
}

const inputClass =
    "w-full rounded-xl border border-white/8 bg-black/25 px-4 py-3 text-[15px] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-zinc-600 hover:border-white/15 focus:border-blue-400/50 focus:bg-black/35 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_0_0_3px_rgba(59,130,246,0.15)]"

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
    return (
        <label className={cn("block", className)}>
            <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
            {children}
        </label>
    )
}

interface TimePickerProps {
    days: ReturnType<typeof upcomingDays>
    dayIndex: number
    onDay: (i: number) => void
    groups: [string, { iso: string; label: string }[]][]
    /** The no-calls gym window, and the group it follows. */
    gym: { label: string; after: string }
    slot: string | null
    onSlot: (iso: string) => void
    timeZone: string
    localZone: string
    onZone: (tz: string) => void
}

/** Fixed width on desktop so its content never reflows while the wrapper animates. */
function TimePicker({ days, dayIndex, onDay, groups, gym, slot, onSlot, timeZone, localZone, onZone }: TimePickerProps) {
    const drag = useDragScroll()

    return (
        <div className="w-full min-w-0 xl:w-lg xl:shrink-0 xl:pt-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-300">Pick a time</p>
                <TimeZoneSelect value={timeZone} localZone={localZone} onChange={onZone} />
            </div>

            <div
                data-lenis-prevent
                {...drag.handlers}
                className="-mx-1 mt-3 flex cursor-grab touch-pan-x select-none gap-2 overflow-x-auto px-1 pb-1 scrollbar-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
            >
                {days.map((day, i) => {
                    const active = i === dayIndex
                    return (
                        <button
                            key={day.date.toISOString()}
                            type="button"
                            draggable={false}
                            onClick={() => {
                                if (!drag.wasDragged()) onDay(i)
                            }}
                            className={cn(
                                "flex w-15 shrink-0 cursor-pointer flex-col items-center rounded-xl border py-2 transition-colors duration-200",
                                active
                                    ? "border-white bg-white text-black"
                                    : "border-white/10 bg-white/3 text-white hover:border-white/25",
                            )}
                        >
                            <span className="text-[9px] tracking-widest text-zinc-500">
                                {day.date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase()}
                            </span>
                            <span className="text-lg font-semibold leading-tight">{day.d}</span>
                            <span className="text-[9px] tracking-widest text-zinc-500">
                                {day.date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase()}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="mt-3 space-y-3.5">
                {groups.map(([label, slots]) => (
                    <Fragment key={label}>
                        <div>
                            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                {slots.map((s) => (
                                    <button
                                        key={s.iso}
                                        type="button"
                                        aria-pressed={slot === s.iso}
                                        onClick={() => onSlot(s.iso)}
                                        className={cn(
                                            "cursor-pointer whitespace-nowrap rounded-lg border px-1.5 py-2 text-[13px] font-medium transition-colors duration-200",
                                            slot === s.iso
                                                ? "border-blue-400/60 bg-blue-600 text-white"
                                                : "border-white/10 bg-white/3 text-white hover:border-white/25",
                                        )}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {label === gym.after && <GymNote label={gym.label} />}
                    </Fragment>
                ))}
                {!groups.some(([label]) => label === gym.after) && <GymNote label={gym.label} />}
            </div>
        </div>
    )
}

/** Where the 6–9 PM slots would be: a sticky-note style "out at the gym". */
function GymNote({ label }: { label: string }) {
    return (
        <div className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-dashed border-amber-300/25 bg-amber-300/4 px-3.5 py-2.5">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(-45deg, transparent 0 10px, rgba(252,211,77,0.06) 10px 20px)",
                }}
            />
            <span className="relative grid size-9 shrink-0 -rotate-12 place-items-center rounded-full bg-amber-300/12 text-amber-300">
                <Barbell size={20} weight="duotone" />
            </span>
            <div className="relative min-w-0">
                <p className="font-hand text-xl leading-tight text-amber-100/90">
                    Out lifting heavy things. Back after the last set.
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200/50">
                    {label} · gym hours, no calls
                </p>
            </div>
        </div>
    )
}

/** Air-mail envelope stripes: red, paper, blue, paper. */
const AIRMAIL =
    "repeating-linear-gradient(-45deg, #c2414b 0 14px, transparent 14px 22px, #2f5fb3 22px 36px, transparent 36px 44px)"

/** Fine paper grain, so the dark sheet doesn't read as a flat panel. */
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

/**
 * The envelope: an air-mail striped border around a dark sheet of paper with
 * grain and a soft top light, plus the paperclip, stamp and pencil. Sized by
 * its content (w-fit on desktop) so it can grow around the time picker.
 */
function LetterShell({ children }: { children: ReactNode }) {
    return (
        <div className="relative mx-auto mt-8 w-full max-w-3xl xl:w-fit xl:max-w-none">
            <Paperclip
                size={40}
                weight="light"
                aria-hidden
                className="absolute -top-5 left-10 z-20 rotate-[-8deg] text-zinc-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            />

            <div
                className="relative rounded-[1.75rem] bg-[#1c1c1f] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]"
                style={{ backgroundImage: AIRMAIL }}
            >
                <div className="relative overflow-hidden rounded-[1.35rem] bg-linear-to-b from-[#1a1a1d] to-[#111113] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgba(0,0,0,0.6)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                        style={{ backgroundImage: GRAIN }}
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]"
                    />

                    <div className="relative px-5 py-6 sm:px-10 sm:py-8">
                        <Stamp />
                        {children}
                    </div>
                </div>
            </div>

            <Pencil />
        </div>
    )
}

/** Perforated stamp with a postmark struck half across it. */
function Stamp() {
    const perforation = "radial-gradient(circle, transparent 2.5px, #000 2.5px)"

    return (
        <div aria-hidden className="pointer-events-none absolute right-5 top-5 sm:right-8 sm:top-6">
            <div className="relative z-10 rotate-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                {/* Perforated paper behind the face: the holes are cut from
                    this layer only, so they show just around the edge. */}
                <div
                    className="absolute inset-0 bg-[#f4efe4]"
                    style={{
                        WebkitMask: `${perforation} -4px -4px / 8px 8px`,
                        mask: `${perforation} -4px -4px / 8px 8px`,
                    }}
                />
                <div className="relative p-1.5">
                    <div className="relative flex h-14 w-12 flex-col items-center justify-center gap-1 bg-[#f4efe4] text-white sm:h-16 sm:w-14">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-700" />
                        <PaperPlaneTilt size={22} weight="bold" className="relative" />
                        <span className="relative text-[5px] font-bold tracking-widest">AIR MAIL</span>
                    </div>
                </div>
            </div>

            <svg
                width="104"
                height="56"
                viewBox="0 0 104 56"
                className="absolute -left-20 top-3 hidden -rotate-6 text-zinc-400/70 sm:block"
            >
                <defs>
                    <path id="postmark-arc" d="M 58 28 a 19 19 0 1 1 38 0 a 19 19 0 1 1 -38 0" />
                </defs>
                {[18, 25, 32, 39].map((y) => (
                    <path
                        key={y}
                        d={`M0 ${y} q 5 -4 10 0 t 10 0 t 10 0 t 10 0`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.1"
                    />
                ))}
                <circle cx="77" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="77" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <text fontSize="5.5" letterSpacing="1.2" fill="currentColor" fontFamily="ui-monospace, monospace">
                    <textPath href="#postmark-arc" startOffset="0">KHARAGPUR · INDIA · AIR MAIL ·</textPath>
                </text>
                <text x="77" y="30" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" fontFamily="ui-monospace, monospace">
                    IN
                </text>
            </svg>
        </div>
    )
}

function Pencil() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 200 60"
            className="pointer-events-none absolute -bottom-10 -right-8 hidden w-48 rotate-[-18deg] md:block"
        >
            <rect x="10" y="22" width="20" height="16" rx="4" fill="#f472b6" />
            <rect x="28" y="21" width="10" height="18" fill="#a1a1aa" />
            <rect x="38" y="21" width="120" height="18" fill="#facc15" />
            <rect x="38" y="21" width="120" height="6" fill="#fde047" />
            <polygon points="158,21 190,30 158,39" fill="#f5d0a9" />
            <polygon points="182,27.7 190,30 182,32.3" fill="#27272a" />
        </svg>
    )
}
