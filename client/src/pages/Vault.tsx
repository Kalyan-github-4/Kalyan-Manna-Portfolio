import { useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { journeyItems, type JourneyFilter } from "@/data/journeyData"
import { JourneyHeader } from "@/components/journey/JourneyHeader"
import BackgroundRipple from "@/components/shared/BackgroundRipple"
import EdgeStripes from "@/components/shared/EdgeStripes"
import { VaultFilterBar } from "@/components/vault/VaultFilterBar"
import { VaultFeaturedCard } from "@/components/vault/VaultFeaturedCard"
import { VaultCollectionCard } from "@/components/vault/VaultCollectionCard"

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="mb-8 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
            {children}
        </p>
    )
}

export default function Vault() {
    const [filter, setFilter] = useState<JourneyFilter>("All")
    const [query, setQuery] = useState("")

    const featured = useMemo(
        () => journeyItems.find((item) => item.featured) ?? journeyItems[0],
        []
    )

    // The featured slot only makes sense while browsing everything — once the
    // visitor filters or searches, they want results, not a pinned hero.
    const trimmedQuery = query.trim()
    const isBrowsingAll = filter === "All" && trimmedQuery === ""

    const results = useMemo(() => {
        const needle = trimmedQuery.toLowerCase()

        return journeyItems.filter((item) => {
            if (filter !== "All" && item.category !== filter) return false
            if (!needle) return true

            return [
                item.title,
                item.description,
                item.location,
                item.role,
                item.category,
            ]
                .filter(Boolean)
                .some((field) => field!.toLowerCase().includes(needle))
        })
    }, [filter, trimmedQuery])

    const gridItems = isBrowsingAll
        ? results.filter((item) => item.id !== featured.id)
        : results

    return (
        <main className="min-h-screen bg-black">
            {/* Shell mirrors CaseStudyWorkSection: full-bleed inner column, the
                same horizontal padding, and the same rippling backdrop. */}
            <section className="relative overflow-hidden bg-black px-4 py-28 text-white sm:px-8 lg:px-9">
                <BackgroundRipple rows={7} cols={30} />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <JourneyHeader />

                    <VaultFilterBar
                        active={filter}
                        onChange={setFilter}
                        query={query}
                        onQueryChange={setQuery}
                    />

                    {isBrowsingAll && (
                        <section aria-label="Featured collection" className="px-4">
                            <SectionLabel>Featured Collection</SectionLabel>
                            <VaultFeaturedCard item={featured} />
                        </section>
                    )}

                    <section
                        aria-label="All collections"
                        className="mb-28 sm:mb-36 px-4"
                    >
                        <SectionLabel>
                            {isBrowsingAll
                                ? "Latest Collections"
                                : `${results.length} ${results.length === 1
                                    ? "collection"
                                    : "collections"
                                }`}
                        </SectionLabel>

                        {gridItems.length === 0 ? (
                            <p className="py-20 text-center text-sm text-zinc-400">
                                {trimmedQuery
                                    ? `Nothing matches “${trimmedQuery}” — try another search.`
                                    : "No collections in this category yet — check back soon."}
                            </p>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                <AnimatePresence mode="popLayout">
                                    {gridItems.map((item) => (
                                        <VaultCollectionCard
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </section>

                    <SectionLabel>The journey still being written...</SectionLabel>

                </div>
            </section>
        </main>
    )
}
