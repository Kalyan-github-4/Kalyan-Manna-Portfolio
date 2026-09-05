"use client"

import { useEffect, useRef } from "react"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { JOURNEY_FILTERS, type JourneyFilter } from "@/data/journeyData"

const INDICATOR_TRANSITION = {
    type: "spring",
    stiffness: 500,
    damping: 38,
    mass: 0.8,
} as const

// Mac shows ⌘K, everyone else Ctrl K. Resolved once at module load — it can't
// change for the lifetime of the page, so it needs neither state nor an effect.
const IS_MAC =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

interface VaultFilterBarProps {
    active: JourneyFilter
    onChange: (filter: JourneyFilter) => void
    query: string
    onQueryChange: (query: string) => void
}

export function VaultFilterBar({
    active,
    onChange,
    query,
    onQueryChange,
}: VaultFilterBarProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                inputRef.current?.focus()
                inputRef.current?.select()
            }
            if (event.key === "Escape" && document.activeElement === inputRef.current) {
                onQueryChange("")
                inputRef.current?.blur()
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onQueryChange])

    return (
        <div className="mb-16 border-y border-dashed border-white/10 sm:mb-10">
            <div className="flex flex-col gap-3 py-2 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                {/* Category pills — scroll horizontally rather than wrapping. */}
                <div
                    role="group"
                    aria-label="Filter collections by category"
                    className="flex max-w-full items-center gap-1 overflow-x-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                    {JOURNEY_FILTERS.map((filter) => {
                        const isActive = filter === active
                        const label = filter === "All" ? "All Collections" : filter

                        return (
                            <button
                                key={filter}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => onChange(filter)}
                                className={cn(
                                    "relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                                    isActive
                                        ? "text-white"
                                        : "text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="vault-filter-pill"
                                        transition={INDICATOR_TRANSITION}
                                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-linear-to-b from-zinc-600/70 to-zinc-700/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                                    />
                                )}
                                {label}
                            </button>
                        )
                    })}
                </div>

                {/* Search */}
                <div className="relative shrink-0 lg:w-80">
                    <MagnifyingGlass
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    />

                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder="Search memories"
                        aria-label="Search memories"
                        className="w-full rounded-full border border-white/10 bg-white/4 py-2.5 pl-10 pr-20 text-sm text-white placeholder:text-zinc-400 focus:border-white/25 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                    />

                    {query ? (
                        <button
                            type="button"
                            onClick={() => onQueryChange("")}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X size={13} weight="bold" aria-hidden="true" />
                        </button>
                    ) : (
                        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem] text-zinc-400">
                            {IS_MAC ? "⌘" : "Ctrl"} K
                        </kbd>
                    )}
                </div>
            </div>
        </div>
    )
}
