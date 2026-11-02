import { cn } from "@/lib/utils"

import { diagonalStripeStyle } from "./stripeStyles"

/**
 * Hatched gutters pinned to the left and right edges of the nearest
 * positioned ancestor — the same texture the footer strip uses.
 */
export default function EdgeStripes({ className }: { className?: string }) {
    return (
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0", className)}>
            <div
                className="absolute inset-y-0 left-3 w-5 sm:w-7 lg:w-8 border-x border-white/20 bg-clip-content px-0.5"
                style={diagonalStripeStyle}
            />

            <div
                className="absolute inset-y-0 right-0 w-5 sm:w-7 lg:w-9 border-x border-white/20 bg-clip-content px-0.5"
                style={diagonalStripeStyle}
            />
        </div>
    )
}
