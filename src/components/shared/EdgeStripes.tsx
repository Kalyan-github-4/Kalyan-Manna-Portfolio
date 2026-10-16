import { diagonalStripeStyle } from "./stripeStyles"

/**
 * Hatched gutters pinned to the left and right edges of the nearest
 * positioned ancestor — the same texture the footer strip uses.
 */
export default function EdgeStripes() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div
                className="absolute inset-y-0 left-3 w-5 sm:w-7 lg:w-8 border-x border-white/20"
                style={diagonalStripeStyle}
            />

            <div
                className="absolute inset-y-0 right-0 w-5 sm:w-7 lg:w-9 border-x border-white/20"
                style={diagonalStripeStyle}
            />
        </div>
    )
}
