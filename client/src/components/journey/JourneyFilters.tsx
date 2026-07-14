import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { JOURNEY_FILTERS, type JourneyFilter } from "@/data/journeyData"

interface JourneyFiltersProps {
    active: JourneyFilter
    onChange: (filter: JourneyFilter) => void
}

const INDICATOR_TRANSITION = {
    type: "spring",
    stiffness: 500,
    damping: 38,
    mass: 0.8,
} as const

export function JourneyFilters({ active, onChange }: JourneyFiltersProps) {
    return (
        <div className="mb-16 flex justify-center px-4 sm:mb-20">
            {/* Scroll container so the pills never overflow the page on small
                screens — they scroll horizontally instead. */}
            <div className="max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div
                    role="group"
                    aria-label="Filter memories by category"
                    className="mx-auto flex w-max items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl"
                >
                    {JOURNEY_FILTERS.map((filter) => {
                        const isActive = filter === active

                        return (
                            <button
                                key={filter}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => onChange(filter)}
                                className={cn(
                                    "relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                                    isActive
                                        ? "text-white"
                                        : "text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="journey-filter-pill"
                                        transition={INDICATOR_TRANSITION}
                                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-linear-to-b from-zinc-600/70 to-zinc-700/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]"
                                    />
                                )}
                                {filter}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
