import { useMemo, useState } from "react"

import { journeyItems, type JourneyFilter } from "@/data/journeyData"
import { JourneyHeader } from "@/components/journey/JourneyHeader"
import { JourneyFilters } from "@/components/journey/JourneyFilters"
import { FeaturedMemory } from "@/components/journey/FeaturedMemory"
import { JourneyGrid } from "@/components/journey/JourneyGrid"
import { JourneyTimeline } from "@/components/journey/JourneyTimeline"
import { JourneyCTA } from "@/components/journey/JourneyCTA"
import { JourneyDialog } from "@/components/journey/JourneyDialog"

export default function Vault() {
    const [filter, setFilter] = useState<JourneyFilter>("All")
    const [selectedId, setSelectedId] = useState<number | null>(null)

    // The featured memory is pinned above the gallery regardless of filter.
    const featured = useMemo(
        () => journeyItems.find((item) => item.featured) ?? journeyItems[0],
        []
    )

    const galleryItems = useMemo(() => {
        const rest = journeyItems.filter((item) => item.id !== featured.id)
        return filter === "All"
            ? rest
            : rest.filter((item) => item.category === filter)
    }, [filter, featured.id])

    // Dialog navigation walks the full ordered list so prev/next is predictable.
    const selectedIndex =
        selectedId === null
            ? -1
            : journeyItems.findIndex((item) => item.id === selectedId)
    const selectedItem = selectedIndex >= 0 ? journeyItems[selectedIndex] : null

    const openMemory = (id: number) => setSelectedId(id)
    const closeMemory = () => setSelectedId(null)

    const navigate = (direction: 1 | -1) => {
        if (selectedIndex < 0) return
        const total = journeyItems.length
        const next = (selectedIndex + direction + total) % total
        setSelectedId(journeyItems[next].id)
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8">
                <JourneyHeader />

                <JourneyFilters active={filter} onChange={setFilter} />

                <FeaturedMemory item={featured} onOpen={openMemory} />

                <JourneyGrid items={galleryItems} onOpen={openMemory} />

                <JourneyTimeline items={journeyItems} onOpen={openMemory} />

                <JourneyCTA />
            </div>

            <JourneyDialog
                item={selectedItem}
                position={
                    selectedItem
                        ? { index: selectedIndex, total: journeyItems.length }
                        : null
                }
                onClose={closeMemory}
                onPrev={() => navigate(-1)}
                onNext={() => navigate(1)}
            />
        </main>
    )
}
