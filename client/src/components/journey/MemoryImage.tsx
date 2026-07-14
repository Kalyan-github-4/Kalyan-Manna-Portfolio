import { useState } from "react"

import { cn } from "@/lib/utils"
import type { JourneyCategory } from "@/data/journeyData"

// A per-category gradient used both as the loading backdrop and as the
// fallback when an image file hasn't been added to /public/journey yet.
const CATEGORY_GRADIENT: Record<JourneyCategory, string> = {
    Hackathons: "from-blue-600/40 via-indigo-600/25 to-purple-700/40",
    Events: "from-purple-600/40 via-fuchsia-600/25 to-pink-600/40",
    Achievements: "from-amber-500/30 via-pink-600/25 to-purple-700/40",
    Milestones: "from-sky-600/40 via-blue-600/25 to-indigo-700/40",
}

interface MemoryImageProps {
    src: string
    alt: string
    category: JourneyCategory
    className?: string
    imgClassName?: string
    /** Passed straight to the underlying <img> — defaults to lazy */
    loading?: "lazy" | "eager"
    sizes?: string
}

/**
 * Renders a memory image on top of a category-tinted gradient. If the image
 * fails to load (e.g. the file isn't present yet) the gradient remains visible
 * with the category label, so the layout never shows a broken-image icon and
 * never shifts.
 */
export function MemoryImage({
    src,
    alt,
    category,
    className,
    imgClassName,
    loading = "lazy",
    sizes,
}: MemoryImageProps) {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(
        "loading"
    )

    return (
        <div
            className={cn(
                "relative h-full w-full overflow-hidden bg-linear-to-br",
                CATEGORY_GRADIENT[category],
                className
            )}
        >
            {/* Fallback label — only meaningful when the image is missing */}
            {status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/40">
                        {category}
                    </span>
                </div>
            )}

            {status !== "error" && (
                <img
                    src={src}
                    alt={alt}
                    loading={loading}
                    decoding="async"
                    sizes={sizes}
                    onLoad={() => setStatus("loaded")}
                    onError={() => setStatus("error")}
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-700",
                        status === "loaded" ? "opacity-100" : "opacity-0",
                        imgClassName
                    )}
                />
            )}
        </div>
    )
}
