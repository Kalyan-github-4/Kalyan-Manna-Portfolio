import { useMemo, useState } from "react"
import { MagnifyingGlassPlus } from "@phosphor-icons/react"

import Masonry from "@/components/shared/Masonry"
import type { MasonryItem } from "@/components/shared/masonryLayout"
import type { VaultPhoto } from "@/data/journeyData"

import { PhotoLightbox } from "./PhotoLightbox"

/** A photo, adapted to the shape the masonry packs. */
interface PhotoTile extends MasonryItem {
    id: string
    photo: VaultPhoto
    index: number
}

// Column counts, widest breakpoint first. The 400px step keeps two columns on
// ordinary phones, which is what makes the grid read as Pinterest rather than
// as a single stack of images.
const BREAKPOINTS = [
    "(min-width:1536px)",
    "(min-width:1100px)",
    "(min-width:768px)",
    "(min-width:400px)",
]
const COLUMNS = [5, 4, 3, 2]

interface CollectionMasonryProps {
    photos: VaultPhoto[]
    collectionTitle: string
}

export function CollectionMasonry({
    photos,
    collectionTitle,
}: CollectionMasonryProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const tiles = useMemo<PhotoTile[]>(
        () =>
            photos.map((photo, index) => ({
                id: photo.id,
                img: photo.src,
                width: photo.width,
                height: photo.height,
                photo,
                index,
            })),
        [photos]
    )

    if (photos.length === 0) {
        return (
            <p className="py-20 text-center text-sm text-zinc-400">
                No photos in this collection yet — check back soon.
            </p>
        )
    }

    return (
        <>
            <Masonry
                items={tiles}
                breakpoints={BREAKPOINTS}
                columns={COLUMNS}
                minColumns={1}
                gap={16}
                onItemClick={(tile) => setOpenIndex(tile.index)}
                itemLabel={(tile) =>
                    `Open photo ${tile.index + 1} of ${photos.length}`
                }
                animateFrom="bottom"
                hoverScale={1.02}
                renderItem={(tile) => (
                    <PhotoTileCard tile={tile} total={photos.length} />
                )}
            />

            <PhotoLightbox
                photos={photos}
                index={openIndex}
                collectionTitle={collectionTitle}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
        </>
    )
}

function PhotoTileCard({ tile, total }: { tile: PhotoTile; total: number }) {
    return (
        <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900">
            <img
                src={tile.photo.src}
                srcSet={tile.photo.srcSet}
                alt={tile.photo.caption ?? `Photo ${tile.index + 1} of ${total}`}
                width={tile.photo.width}
                height={tile.photo.height}
                loading="lazy"
                decoding="async"
                sizes="(min-width:1536px) 20vw, (min-width:1100px) 25vw, (min-width:768px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />

            {/* Hover affordance — the whole tile opens the lightbox. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30"
            />

            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100"
            >
                <MagnifyingGlassPlus size={14} weight="bold" />
            </span>

            {tile.photo.caption && (
                <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 text-xs text-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {tile.photo.caption}
                </p>
            )}
        </div>
    )
}
