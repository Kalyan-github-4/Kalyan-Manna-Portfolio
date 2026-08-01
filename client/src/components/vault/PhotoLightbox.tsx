import { useEffect, useState } from "react"
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import type { VaultPhoto } from "@/data/journeyData"

const EASE = [0.22, 1, 0.36, 1] as const

interface PhotoLightboxProps {
    photos: VaultPhoto[]
    /** Index of the open photo, or null when closed. */
    index: number | null
    collectionTitle: string
    onClose: () => void
    onNavigate: (index: number) => void
}

export function PhotoLightbox({
    photos,
    index,
    collectionTitle,
    onClose,
    onNavigate,
}: PhotoLightboxProps) {
    const reduceMotion = useReducedMotion()
    const open = index !== null

    // Retain the last photo so content stays rendered through the close
    // animation (Radix keeps the node mounted briefly after `open` flips false).
    const [cached, setCached] = useState<number>(index ?? 0)
    if (index !== null && index !== cached) {
        setCached(index)
    }

    const step = (direction: 1 | -1) => {
        if (index === null || photos.length === 0) return
        onNavigate((index + direction + photos.length) % photos.length)
    }

    useEffect(() => {
        if (!open) return

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault()
                step(-1)
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                step(1)
            }
        }

        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    })

    const photo = photos[cached]
    if (!photo) return null

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
            <DialogContent
                data-lenis-prevent
                className="w-full max-w-[calc(100%-1.5rem)] border-white/10 bg-[#0b0b0f] p-0 text-white shadow-2xl shadow-black/60 sm:max-w-5xl sm:rounded-[28px]"
            >
                <DialogTitle className="sr-only">
                    {collectionTitle} — photo {cached + 1} of {photos.length}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    {photo.caption ??
                        `Photo ${cached + 1} from the ${collectionTitle} collection.`}
                </DialogDescription>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={photo.id}
                            src={photo.src}
                            alt={
                                photo.caption ??
                                `${collectionTitle} — photo ${cached + 1}`
                            }
                            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="max-h-[78vh] w-full object-contain sm:rounded-t-[28px]"
                        />
                    </AnimatePresence>

                    <DialogClose
                        aria-label="Close"
                        className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                        <X size={16} weight="bold" aria-hidden="true" />
                    </DialogClose>
                </div>

                {/* Footer nav */}
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                        <CaretLeft size={14} weight="bold" aria-hidden="true" />
                        Previous
                    </button>

                    <p className="font-mono text-xs text-zinc-400">
                        {cached + 1} <span className="text-zinc-400">/</span>{" "}
                        {photos.length}
                    </p>

                    <button
                        type="button"
                        onClick={() => step(1)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                        Next
                        <CaretRight size={14} weight="bold" aria-hidden="true" />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
