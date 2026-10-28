import type { SVGProps } from "react"

/**
 * A slim four-point sparkle (✦) — long points with concave sides. Phosphor's
 * Sparkle is chunkier and carries extra accent stars, so this is drawn by hand.
 * Colour follows `currentColor`.
 */
export default function FourPointStar({
    size = 14,
    ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 0C12.6 8.4 15.6 11.4 24 12C15.6 12.6 12.6 15.6 12 24C11.4 15.6 8.4 12.6 0 12C8.4 11.4 11.4 8.4 12 0Z" />
        </svg>
    )
}
