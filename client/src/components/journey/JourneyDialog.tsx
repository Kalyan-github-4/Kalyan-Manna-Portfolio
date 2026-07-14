import { useEffect, useState } from "react"
import {
    ArrowSquareOut,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    IdentificationBadge,
    MapPin,
    X,
} from "@phosphor-icons/react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import type { JourneyItem } from "@/data/journeyData"

import { CategoryBadge } from "./CategoryBadge"
import { MemoryImage } from "./MemoryImage"

const EASE = [0.22, 1, 0.36, 1] as const

interface JourneyDialogProps {
    item: JourneyItem | null
    position: { index: number; total: number } | null
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

export function JourneyDialog({
    item,
    position,
    onClose,
    onPrev,
    onNext,
}: JourneyDialogProps) {
    const reduceMotion = useReducedMotion()
    const open = item !== null

    // Retain the last item so content stays rendered through the close
    // animation (Radix keeps the node mounted briefly after `open` flips false).
    // Updating state during render (guarded) is React's endorsed pattern for
    // deriving from changing props without an effect.
    const [cached, setCached] = useState<JourneyItem | null>(item)
    if (item !== null && item !== cached) {
        setCached(item)
    }

    // Left/right arrow keys navigate between memories while the dialog is open.
    useEffect(() => {
        if (!open) return

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault()
                onPrev()
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                onNext()
            }
        }

        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [open, onPrev, onNext])

    const memory = cached
    const images = memory
        ? [memory.image, ...(memory.gallery ?? [])]
        : []

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
            <DialogContent
                data-lenis-prevent
                className="max-h-[90vh] w-full max-w-[calc(100%-1.5rem)] overflow-y-auto border-white/10 bg-[#0b0b0f] p-0 text-white shadow-2xl shadow-black/60 sm:max-w-3xl sm:rounded-[28px]"
            >
                {memory && (
                    <>
                        <DialogTitle className="sr-only">{memory.title}</DialogTitle>
                        <DialogDescription className="sr-only">
                            {memory.description}
                        </DialogDescription>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={memory.id}
                                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                                transition={{ duration: 0.3, ease: EASE }}
                            >
                                {/* Image */}
                                <div className="relative aspect-video w-full overflow-hidden sm:rounded-t-[28px]">
                                    <MemoryImage
                                        src={memory.image}
                                        alt={`${memory.title} — ${memory.description}`}
                                        category={memory.category}
                                        loading="eager"
                                        sizes="(min-width: 640px) 48rem, 100vw"
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
                                    />
                                    <div className="absolute left-4 top-4">
                                        <CategoryBadge category={memory.category} />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 sm:p-8">
                                    <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
                                        {memory.title}
                                    </h2>

                                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <dt className="sr-only">Date</dt>
                                            <CalendarBlank
                                                size={16}
                                                className="text-white/40"
                                                aria-hidden="true"
                                            />
                                            <dd>{memory.date}</dd>
                                        </div>

                                        {memory.location && (
                                            <div className="flex items-center gap-2">
                                                <dt className="sr-only">Location</dt>
                                                <MapPin
                                                    size={16}
                                                    className="text-white/40"
                                                    aria-hidden="true"
                                                />
                                                <dd>{memory.location}</dd>
                                            </div>
                                        )}

                                        {memory.role && (
                                            <div className="flex items-center gap-2">
                                                <dt className="sr-only">Role</dt>
                                                <IdentificationBadge
                                                    size={16}
                                                    className="text-white/40"
                                                    aria-hidden="true"
                                                />
                                                <dd>{memory.role}</dd>
                                            </div>
                                        )}
                                    </dl>

                                    <p className="mt-5 text-base leading-relaxed text-zinc-300">
                                        {memory.longDescription ?? memory.description}
                                    </p>

                                    {/* Optional secondary gallery */}
                                    {images.length > 1 && (
                                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {images.slice(1).map((src, index) => (
                                                <div
                                                    key={src}
                                                    className="aspect-4/3 overflow-hidden rounded-xl border border-white/10"
                                                >
                                                    <MemoryImage
                                                        src={src}
                                                        alt={`${memory.title} — image ${index + 2}`}
                                                        category={memory.category}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {memory.externalUrl && (
                                        <a
                                            href={memory.externalUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
                                        >
                                            {memory.externalLabel ?? "Learn more"}
                                            <ArrowSquareOut size={16} aria-hidden="true" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Close button */}
                        <DialogClose asChild>
                            <button
                                type="button"
                                aria-label="Close"
                                className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <X size={16} weight="bold" aria-hidden="true" />
                            </button>
                        </DialogClose>

                        {/* Prev / next controls */}
                        <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-white/10 bg-[#0b0b0f]/95 px-6 py-3 backdrop-blur-sm sm:rounded-b-[28px]">
                            <button
                                type="button"
                                onClick={onPrev}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                                <CaretLeft
                                    size={16}
                                    weight="bold"
                                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                                    aria-hidden="true"
                                />
                                Previous
                            </button>

                            {position && (
                                <span className="font-mono text-xs text-zinc-500">
                                    {position.index + 1} / {position.total}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={onNext}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                                Next
                                <CaretRight
                                    size={16}
                                    weight="bold"
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
