import type { Icon } from "@phosphor-icons/react"
import { Confetti, Lightning, Medal, RocketLaunch } from "@phosphor-icons/react"

import type { JourneyCategory } from "@/data/journeyData"

export interface CategoryMeta {
    icon: Icon
    /** Text colour for the badge label + icon */
    text: string
    /** Border colour for the badge chip */
    border: string
    /** Soft background tint for the badge chip */
    bg: string
    /** Dot colour used in the timeline */
    dot: string
}

export const CATEGORY_META: Record<JourneyCategory, CategoryMeta> = {
    Hackathons: {
        icon: Lightning,
        text: "text-blue-300",
        border: "border-blue-400/30",
        bg: "bg-blue-500/10",
        dot: "bg-blue-400",
    },
    Events: {
        icon: Confetti,
        text: "text-pink-300",
        border: "border-pink-400/30",
        bg: "bg-pink-500/10",
        dot: "bg-pink-400",
    },
    Achievements: {
        icon: Medal,
        text: "text-amber-300",
        border: "border-amber-400/30",
        bg: "bg-amber-500/10",
        dot: "bg-amber-400",
    },
    Milestones: {
        icon: RocketLaunch,
        text: "text-purple-300",
        border: "border-purple-400/30",
        bg: "bg-purple-500/10",
        dot: "bg-purple-400",
    },
}
