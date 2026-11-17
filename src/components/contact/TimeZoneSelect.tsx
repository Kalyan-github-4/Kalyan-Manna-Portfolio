"use client"

import { useMemo, useRef, useState, type KeyboardEvent } from "react"
import { Popover } from "radix-ui"
import { CaretDown, Check, GlobeHemisphereEast, MagnifyingGlass } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

const POPULAR = [
    "Asia/Kolkata",
    "UTC",
    "Europe/London",
    "Europe/Berlin",
    "America/New_York",
    "America/Chicago",
    "America/Los_Angeles",
    "Asia/Dubai",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
]

interface ZoneInfo {
    id: string
    city: string
    name: string
    offset: string
    /** Minutes east of UTC, for sorting. */
    minutes: number
}

function describe(id: string, now: Date): ZoneInfo {
    const part = (style: "long" | "shortOffset") =>
        new Intl.DateTimeFormat("en-US", { timeZone: id, timeZoneName: style })
            .formatToParts(now)
            .find((p) => p.type === "timeZoneName")?.value ?? ""

    const offset = part("shortOffset") === "GMT" ? "GMT+0" : part("shortOffset")
    const match = /GMT([+-])(\d+)(?::(\d+))?/.exec(offset)
    const minutes = match ? (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3] ?? 0)) : 0

    return {
        id,
        city: id === "UTC" ? "UTC" : (id.split("/").pop() ?? id).replace(/_/g, " "),
        name: part("long"),
        offset,
        minutes,
    }
}

function allZones(): string[] {
    try {
        return Intl.supportedValuesOf("timeZone")
    } catch {
        return POPULAR
    }
}

interface TimeZoneSelectProps {
    value: string
    /** The visitor's own zone, pinned to the top of the list. */
    localZone: string
    onChange: (tz: string) => void
}

export default function TimeZoneSelect({ value, localZone, onChange }: TimeZoneSelectProps) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [active, setActive] = useState(0)
    const listRef = useRef<HTMLDivElement>(null)

    const selected = useMemo(() => describe(value, new Date()), [value])

    // Built when the panel opens, so the times shown are current.
    const sections = useMemo(() => {
        if (!open) return []
        const now = new Date()
        const q = query.trim().toLowerCase()

        if (q) {
            const matches = allZones()
                .map((id) => describe(id, now))
                .filter((z) => `${z.id} ${z.city} ${z.name} ${z.offset}`.toLowerCase().includes(q))
                .sort((a, b) => a.minutes - b.minutes || a.city.localeCompare(b.city))
                .slice(0, 60)
            return [{ title: matches.length ? "Results" : "", zones: matches }]
        }

        const popular = POPULAR.filter((id) => id !== localZone)
            .map((id) => describe(id, now))
            .sort((a, b) => a.minutes - b.minutes)
        return [
            { title: "Your time zone", zones: [describe(localZone, now)] },
            { title: "Popular", zones: popular },
        ]
    }, [open, query, localZone])

    const flat = useMemo(() => sections.flatMap((s) => s.zones), [sections])
    /** Index in `flat` of each section's first row, for keyboard highlighting. */
    const starts = useMemo(
        () => sections.map((_, i) => sections.slice(0, i).reduce((n, s) => n + s.zones.length, 0)),
        [sections],
    )
    const clockFmt = (id: string) =>
        new Intl.DateTimeFormat("en-US", { timeZone: id, hour: "numeric", minute: "2-digit" }).format(new Date())

    const choose = (id: string) => {
        onChange(id)
        setOpen(false)
    }

    const scrollIntoView = (index: number) => {
        listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!flat.length) return
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault()
            const next = (active + (e.key === "ArrowDown" ? 1 : -1) + flat.length) % flat.length
            setActive(next)
            scrollIntoView(next)
        } else if (e.key === "Enter") {
            e.preventDefault()
            choose(flat[active].id)
        }
    }

    return (
        <Popover.Root
            open={open}
            onOpenChange={(next) => {
                setOpen(next)
                if (next) {
                    setQuery("")
                    setActive(0)
                }
            }}
        >
            <Popover.Trigger
                aria-label={`Time zone: ${selected.name}`}
                className="group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1.5 pl-2.5 pr-2 text-xs text-zinc-300 outline-none transition-colors duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400/50 data-[state=open]:border-white/25 data-[state=open]:bg-white/8 data-[state=open]:text-white"
            >
                <GlobeHemisphereEast size={14} className="shrink-0 text-zinc-400 group-hover:text-zinc-200" />
                <span className="truncate">{selected.name}</span>
                <span className="shrink-0 rounded-full bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                    {selected.offset}
                </span>
                <CaretDown
                    size={11}
                    weight="bold"
                    className="shrink-0 text-zinc-500 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    align="end"
                    sideOffset={8}
                    collisionPadding={16}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault()
                        ;(e.currentTarget as HTMLElement | null)?.querySelector("input")?.focus()
                    }}
                    className="z-50 w-[min(22rem,calc(100vw-2rem))] origin-(--radix-popover-content-transform-origin) overflow-hidden rounded-2xl border border-white/10 bg-[#141416]/95 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                >
                    <div className="flex items-center gap-2 border-b border-white/8 px-3.5">
                        <MagnifyingGlass size={15} className="shrink-0 text-zinc-500" />
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setActive(0)
                                listRef.current?.scrollTo({ top: 0 })
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Search city or zone…"
                            aria-label="Search time zones"
                            className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                    </div>

                    <div
                        ref={listRef}
                        data-lenis-prevent
                        role="listbox"
                        aria-label="Time zones"
                        className="max-h-72 overflow-y-auto overscroll-contain p-1.5 [scrollbar-width:thin]"
                    >
                        {flat.length === 0 && (
                            <p className="px-3 py-8 text-center text-sm text-zinc-500">No time zone matches “{query}”.</p>
                        )}

                        {sections.map((section, sectionIndex) =>
                            section.zones.length === 0 ? null : (
                                <div key={section.title} className="mb-1 last:mb-0">
                                    {section.title && (
                                        <p className="px-2.5 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                                            {section.title}
                                        </p>
                                    )}
                                    {section.zones.map((z, zoneIndex) => {
                                        const i = starts[sectionIndex] + zoneIndex
                                        const isSelected = z.id === value
                                        return (
                                            <button
                                                key={z.id}
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                data-index={i}
                                                onMouseMove={() => setActive(i)}
                                                onClick={() => choose(z.id)}
                                                className={cn(
                                                    "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150",
                                                    i === active ? "bg-white/8" : "bg-transparent",
                                                )}
                                            >
                                                <span className="min-w-0 flex-1">
                                                    <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                                                        <span className="truncate">{z.city}</span>
                                                        {isSelected && <Check size={13} weight="bold" className="shrink-0 text-blue-400" />}
                                                    </span>
                                                    <span className="block truncate text-xs text-zinc-500">{z.name}</span>
                                                </span>
                                                <span className="shrink-0 text-right">
                                                    <span className="block text-xs font-medium tabular-nums text-zinc-300">
                                                        {clockFmt(z.id)}
                                                    </span>
                                                    <span className="block font-mono text-[10px] text-zinc-500">{z.offset}</span>
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            ),
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
