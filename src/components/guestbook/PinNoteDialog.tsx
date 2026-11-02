"use client"

import { useState } from "react"
import { PushPin, X } from "@phosphor-icons/react"
import { Dialog as DialogPrimitive } from "radix-ui"

import {
    Dialog,
    DialogClose,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CreateGuestCard from "./components/CreateGuestCard"

interface PinNoteDialogProps {
    onSubmit: (message: string) => Promise<void>
}

/** "Pin your note": the postcard from the wall, opened over a blurred page. */
export function PinNoteDialog({ onSubmit }: PinNoteDialogProps) {
    const [open, setOpen] = useState(false)

    // A failed post rejects before the close, leaving the visitor's words in place.
    const handleSubmit = async (message: string) => {
        await onSubmit(message)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="group/pin inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-2xl border border-blue-300/40 bg-linear-to-b from-blue-500 to-blue-700 px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(37,99,235,0.4)] transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_28px_rgba(37,99,235,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                    <PushPin
                        size={17}
                        weight="bold"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/pin:-rotate-12"
                    />
                    Pin your note
                </button>
            </DialogTrigger>

            <DialogPortal>
                <DialogOverlay className="bg-black/60 supports-backdrop-filter:backdrop-blur-md" />

                <DialogPrimitive.Content
                    data-lenis-prevent
                    aria-describedby={undefined}
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-[calc(100%-2.5rem)] -translate-x-1/2 -translate-y-1/2 outline-none duration-200 max-sm:top-16 max-sm:translate-y-0 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:max-w-lg"
                >
                    <DialogTitle className="sr-only">Pin your note</DialogTitle>

                    <DialogClose
                        aria-label="Close"
                        className="absolute -top-10 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                        <X size={18} weight="bold" aria-hidden="true" />
                    </DialogClose>

                    <CreateGuestCard onSubmit={handleSubmit} />
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}
