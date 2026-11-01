
export interface BucketItem {
    title: string
    /** Additional context or motivation behind the goal */
    note?: string
    /** When it was completed, e.g. "October 2026" */
    doneOn?: string
}

export interface BucketSection {
    title: string
    subtitle: string
    items: BucketItem[]
}

export const bucketSections: BucketSection[] = [
    {
        title: "Build",
        subtitle: "career & creation",
        items: [
            {
                title: "Win a hackathon",
                doneOn: "October 2026",
            },
            { title: "Organize a hackathon" },
            { title: "Speak at a tech conference" },
            { title: "Make my first meaningful open-source contribution" },
            { title: "Get selected for Google Summer of Code" },
            { title: "Build an application with 10,000+ active users" },
            { title: "Ship a product that genuinely helps people" },
            {
                title: "Earn ₹1 crore in a year",
                note: "Not for the number, but for the freedom it represents.",
            },
            { title: "Build a sustainable company" },
            { title: "Mentor someone starting their development journey" },
        ],
    },
    {
        title: "Grind",
        subtitle: "health & personal growth",
        items: [
            { title: "Do 100 consecutive push-ups in a single set" },
            { title: "Do 50 consecutive pull-ups in a single set" },
            { title: "Lift twice my body weight" },
            { title: "Build my dream physique naturally" },
            { title: "Run a half marathon" },
            {
                title: "Speak five languages fluently",
                note: "Bengali and Hindi are my starting point. Working towards English and Japanese, with one more language to discover.",
            },
            { title: "Read 12 books in a year" },
            { title: "Become financially independent" },
            {
                title: "Become someone my younger self would be proud of",
                note: "Probably the most important achievement on this entire list.",
            },
        ],
    },
    {
        title: "Wander",
        subtitle: "travel & adventure",
        items: [
            {
                title: "Explore 5 states in India",
                note: "One down: Rajasthan (visited Jaipur).",
            },
            {
                title: "Travel to Japan",
                note: "Visit the real-world places I've only seen in anime.",
            },
            { title: "Experience cherry blossom season in Japan" },
            { title: "Go on a solo trip" },
            { title: "Travel to at least 3 countries" },
            { title: "Take my parents on a trip using money I've earned myself" },
            { title: "Watch a live football match in a stadium" },
            { title: "Go camping under the stars" },
            { title: "See the northern lights" },
        ],
    },
    {
        title: "Thrive",
        subtitle: "lifestyle & milestones",
        items: [
            { title: "Buy my first bike with my own money" },
            { title: "Buy my first car with my own money" },
            { title: "Own my dream home" },
            { title: "Build my dream workspace" },
            { title: "Set up my dream gaming setup" },
            { title: "Build a wardrobe that reflects my style" },
            { title: "Build a one-year emergency fund" },
            { title: "Take my family on an international vacation" },
            { title: "Live in another country for a few months" },
        ],
    },
]
