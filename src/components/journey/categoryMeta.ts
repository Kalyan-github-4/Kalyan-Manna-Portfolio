import type { Icon } from "@phosphor-icons/react"
import { Confetti, Lightning, Medal, RocketLaunch } from "@phosphor-icons/react"

import type { JourneyCategory } from "@/data/journeyData"

export interface CategoryMeta {
    icon: Icon
    /** Dot colour used in the timeline */
    dot: string
}

export const CATEGORY_META: Record<JourneyCategory, CategoryMeta> = {
    Hackathons: {
        icon: Lightning,
        dot: "bg-blue-400",
    },
    Events: {
        icon: Confetti,
        dot: "bg-pink-400",
    },
    Achievements: {
        icon: Medal,
        dot: "bg-amber-400",
    },
    Milestones: {
        icon: RocketLaunch,
        dot: "bg-purple-400",
    },
}
