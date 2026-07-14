import { AnimatePresence, motion } from "framer-motion"

import type { JourneyItem } from "@/data/journeyData"

import { JourneyCard } from "./JourneyCard"

interface JourneyGridProps {
    items: JourneyItem[]
    onOpen: (id: number) => void
}

export function JourneyGrid({ items, onOpen }: JourneyGridProps) {
    return (
        <section aria-label="Memory gallery" className="mb-28 sm:mb-36">
            {items.length === 0 ? (
                <p className="py-20 text-center text-sm text-zinc-500">
                    No memories in this category yet — check back soon.
                </p>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[19rem] md:grid-flow-row-dense"
                >
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <JourneyCard key={item.id} item={item} onOpen={onOpen} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    )
}
