"use client"

import { useEffect, useRef } from "react"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { JOURNEY_FILTERS, journeyItems, type JourneyFilter } from "@/data/journeyData"

/**
 * Margins that carry the filter bar and card frames out to the inner border
 * lines of the EdgeStripes. They're relative to the Vault shell's own padding,
 * which is wider than the right-hand stripe at `sm`, hence the negative margin.
 */
export const VAULT_FRAME_GUTTERS = "ml-4 mr-1 sm:ml-2 sm:-mr-1 lg:mr-0"

/** The striped frame the home page's bento and showcase grids sit in. */
export const VAULT_CARD_FRAME = `${VAULT_FRAME_GUTTERS} border-y border-white/10 p-3`

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
        <div className={cn(VAULT_FRAME_GUTTERS, "mb-4 border-y border-white/10")}>
            <div className="flex flex-col gap-2 p-3 md:flex-row md:items-center md:justify-between md:gap-6">
                {/* Segmented control — scrolls horizontally rather than wrapping. */}
                <div
                    role="group"
                    aria-label="Filter collections by category"
                    className="flex h-10 max-w-full items-center gap-1 overflow-x-auto rounded-xl bg-white/6 p-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden md:w-fit"
                >
                    {JOURNEY_FILTERS.map((filter) => {
                        const isActive = filter === active
                        const count =
                            filter === "All"
                                ? journeyItems.length
                                : journeyItems.filter((item) => item.category === filter).length

                        return (
                            <button
                                key={filter}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => onChange(filter)}
                                className={cn(
                                    "relative h-8 flex-1 shrink-0 cursor-pointer rounded-lg px-3 text-sm font-medium transition-colors duration-300 md:flex-none",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50",
                                    isActive
                                        ? "text-zinc-950"
                                        : "text-zinc-300 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="vault-filter-pill"
                                        transition={INDICATOR_TRANSITION}
                                        className="absolute inset-0 rounded-lg bg-white"
                                    />
                                )}
                                <span className="relative flex items-center justify-center gap-1.5">
                                    {filter}
                                    <span
                                        className={cn(
                                            "text-xs tabular-nums",
                                            isActive ? "text-zinc-600" : "text-zinc-400"
                                        )}
                                    >
                                        {count}
                                    </span>
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Search */}
                <div className="relative shrink-0 md:w-72">
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
                        className="h-10 w-full rounded-xl bg-white/6 pl-10 pr-16 text-sm text-white transition-colors placeholder:text-zinc-400 hover:bg-white/8 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30 [&::-webkit-search-cancel-button]:hidden"
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
                        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md bg-white/8 px-1.5 py-0.5 font-sans text-[0.7rem] font-medium text-zinc-300 md:block">
                            {IS_MAC ? "⌘" : "Ctrl"} K
                        </kbd>
                    )}
                </div>
            </div>
        </div>
    )
}
