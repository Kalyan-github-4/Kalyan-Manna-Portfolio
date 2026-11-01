export type BucketSectionId = "career" | "travel" | "growth" | "fitness" | "life"

export interface BucketItem {
    title: string
    /** Extra context under the title, where the goal needs it */
    note?: string
    image: string
    /** When it was crossed off, e.g. "October 2026" — absent while still open */
    doneOn?: string
    /**
     * Takes two grid columns. Each section's pattern has to fill whole rows at
     * both 2 and 4 columns: 1-1-1-1, 2-1-1-2-2 or 2-1-1-2-2-2-2.
     */
    wide?: boolean
}

export interface BucketSection {
    id: BucketSectionId
    title: string
    items: BucketItem[]
}

const unsplash = (id: string) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=75`

export const bucketSections: BucketSection[] = [
    {
        id: "career",
        title: "Career & Building",
        items: [
            {
                title: "Win a hackathon",
                image: "/hacktoberfest-x-jis/hacktoberfest-img-1.webp",
                doneOn: "October 2026",
                wide: true,
            },
            {
                title: "Organize a hackathon",
                image: unsplash("1504384308090-c894fdcc538d"),
            },
            {
                title: "Speak at a tech conference",
                image: unsplash("1540575467063-178a50c2df87"),
            },
            {
                title: "Make my first open-source contribution",
                image: unsplash("1555066931-4365d14bab8c"),
                wide: true,
            },
            {
                title: "Ship a product that genuinely helps people",
                image: unsplash("1460925895917-afdab827c52f"),
                wide: true,
            },
            {
                title: "Build an application with 10,000+ active users",
                image: unsplash("1551288049-bebda4e38f71"),
                wide: true,
            },
            {
                title: "Earn ₹1 crore in a year",
                note: "Not for the number, but for the freedom it represents.",
                image: unsplash("1579621970563-ebec7560ff3e"),
                wide: true,
            },
        ],
    },
    {
        id: "travel",
        title: "Travel & Experiences",
        items: [
            {
                title: "Travel to Japan and visit places I've only seen in anime",
                image: unsplash("1493976040374-85c8e12f0c0e"),
            },
            {
                title: "Go on a solo trip",
                image: unsplash("1501555088652-021faa106b9b"),
            },
            {
                title: "Explore a country without following a fixed itinerary",
                image: unsplash("1488646953014-85cb44e25828"),
            },
            {
                title: "Make memories in places I've never imagined visiting",
                image: unsplash("1530789253388-582c481c54b0"),
            },
        ],
    },
    {
        id: "growth",
        title: "Learning & Personal Growth",
        items: [
            {
                title: "Speak five languages fluently",
                note: "Currently Bengali and Hindi. Working on English and Japanese. Two more to go.",
                image: unsplash("1456513080510-7bf3a84b82f8"),
            },
            {
                title: "Read 12 books in a year",
                image: unsplash("1481627834876-b7833e8f5570"),
            },
            {
                title: "Become genuinely comfortable speaking English",
                image: unsplash("1475721027785-f74eccf877e2"),
            },
            {
                title: "Never stop being curious about the world",
                image: unsplash("1507413245164-6160d8298b31"),
            },
        ],
    },
    {
        id: "fitness",
        title: "Fitness & Strength",
        items: [
            {
                title: "Do 100 consecutive push-ups in a single set",
                image: unsplash("1598971639058-fab3c3109a00"),
                wide: true,
            },
            {
                title: "Do 50 consecutive pull-ups in a single set",
                image: unsplash("1526506118085-60ce8714f8c5"),
            },
            {
                title: "Lift 2× my body weight",
                image: unsplash("1517836357463-d25dfeac3438"),
            },
            {
                title: "Build my dream physique naturally",
                image: unsplash("1583454110551-21f2fa2afe61"),
                wide: true,
            },
            {
                title: "Become stronger every single year",
                image: unsplash("1534438327276-14e5300c3a48"),
                wide: true,
            },
        ],
    },
    {
        id: "life",
        title: "Life Goals",
        items: [
            {
                title: "Become someone my younger self would be proud of",
                image: unsplash("1503454537195-1dcabb73ffb9"),
            },
            {
                title: "Build something that outlives my involvement in it",
                image: unsplash("1441974231531-c6227db76b6e"),
            },
            {
                title: "Have the freedom to work from anywhere in the world",
                image: unsplash("1501504905252-473c47e087f8"),
            },
            {
                title: "Collect experiences, not just achievements",
                image: unsplash("1503220317375-aaad61436b1b"),
            },
        ],
    },
]
