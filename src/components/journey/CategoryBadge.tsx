"use client"

import { createElement } from "react"

import { cn } from "@/lib/utils"
import type { JourneyCategory } from "@/data/journeyData"

import { CATEGORY_META } from "./categoryMeta"

interface CategoryBadgeProps {
    category: JourneyCategory
    className?: string
    /** Hide the icon for very compact placements */
    showIcon?: boolean
}

export function CategoryBadge({
    category,
    className,
    showIcon = true,
}: CategoryBadgeProps) {
    const meta = CATEGORY_META[category]

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-md bg-zinc-800/90 px-2 py-1",
                "text-xs font-medium text-zinc-200",
                className
            )}
        >
            {showIcon &&
                createElement(meta.icon, {
                    size: 12,
                    weight: "fill",
                    "aria-hidden": true,
                })}
            {category}
        </span>
    )
}
