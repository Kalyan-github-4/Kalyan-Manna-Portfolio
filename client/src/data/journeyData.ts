// Central data model for the Journey page.
//
// Images are referenced as direct public paths (e.g. "/journey/hexafall.jpg").
// Drop the matching files into `client/public/journey/` — until they exist the
// cards render a graceful gradient fallback (see MemoryImage), so nothing breaks.

export type JourneyCategory =
    | "Hackathons"
    | "Events"
    | "Achievements"
    | "Milestones"

export type JourneyFilter = "All" | JourneyCategory

export type JourneySize = "small" | "medium" | "wide" | "tall"

export type JourneyItem = {
    id: number
    title: string
    category: JourneyCategory
    /** Human-readable date, e.g. "July 2026" */
    date: string
    /** Numeric year used for the timeline grouping */
    year: number
    /** Short month label used in the timeline, e.g. "Jul" */
    month: string
    location?: string
    role?: string
    /** One or two line summary shown on cards */
    description: string
    /** Longer copy shown inside the details dialog */
    longDescription?: string
    /** Primary image (public path) */
    image: string
    /** Optional additional images for the dialog gallery */
    gallery?: string[]
    featured?: boolean
    size?: JourneySize
    externalUrl?: string
    externalLabel?: string
}

export const JOURNEY_FILTERS: JourneyFilter[] = [
    "All",
    "Hackathons",
    "Events",
    "Achievements",
    "Milestones",
]

export const journeyItems: JourneyItem[] = [
    {
        id: 1,
        title: "HexaFall 2.0",
        category: "Hackathons",
        date: "July 2026",
        year: 2026,
        month: "Jul",
        location: "Kolkata, India",
        role: "Selected Participant",
        description:
            "Selected as an official participant for HexaFall 2.0, building a meaningful product under hackathon constraints.",
        longDescription:
            "Selected as an official participant for HexaFall 2.0, where our team collaborated to design, build and present a meaningful technology solution under hackathon constraints. Two days of rapid prototyping, late-night debugging and pitching taught me how much a focused team can ship when the clock is the only real enemy.",
        image: "/journey/hexafall.jpg",
        featured: true,
        size: "wide",
        externalUrl: "https://hexafall.example.com",
        externalLabel: "Event page",
    },
    {
        id: 2,
        title: "Selected as a Student Ambassador",
        category: "Achievements",
        date: "May 2026",
        year: 2026,
        month: "May",
        location: "Remote",
        role: "Student Ambassador",
        description:
            "Chosen to represent a developer community on campus — hosting sessions and helping peers get started.",
        longDescription:
            "Chosen as a Student Ambassador to represent a developer community on campus. The role is part evangelism, part mentorship: running intro sessions, answering the questions I once had, and connecting curious students with the resources that helped me the most.",
        image: "/journey/student-ambassador.jpg",
        size: "tall",
    },
    {
        id: 3,
        title: "EasyPG Product Milestone",
        category: "Milestones",
        date: "March 2026",
        year: 2026,
        month: "Mar",
        role: "Founder & Developer",
        description:
            "Shipped a major release of EasyPG — a platform that makes finding and managing PG accommodation effortless.",
        longDescription:
            "Shipped a major release of EasyPG, a platform I've been building to make finding and managing PG accommodation effortless for students and owners alike. This milestone brought real listings, a cleaner booking flow and the first genuine users — the moment a side project starts feeling like a product.",
        image: "/journey/easypg-launch.jpg",
        size: "wide",
        externalUrl: "https://easypg.example.com",
        externalLabel: "Visit EasyPG",
    },
    {
        id: 4,
        title: "Developer Community Meetup",
        category: "Events",
        date: "November 2025",
        year: 2025,
        month: "Nov",
        location: "Kolkata, India",
        description:
            "Spent an evening with local builders swapping ideas, demos and the occasional strong opinion about frameworks.",
        longDescription:
            "An evening with local developers — lightning talks, live demos and the kind of hallway conversations that turn into collaborations. Meeting people who build for the same reasons I do reminded me that the ecosystem is bigger and warmer than any single screen.",
        image: "/journey/community-meetup.jpg",
        size: "small",
    },
    {
        id: 5,
        title: "Building With My Team",
        category: "Milestones",
        date: "September 2025",
        year: 2025,
        month: "Sep",
        description:
            "The late nights, whiteboards and shared wins that turned a group of individuals into an actual team.",
        longDescription:
            "Some of my favourite memories aren't a single event — they're the process. Whiteboards covered in half-formed ideas, merge conflicts resolved at midnight, and the quiet satisfaction of a feature finally clicking into place. This is the memory of becoming a team, not just a group chat.",
        image: "/journey/team-memory.jpg",
        size: "wide",
    },
    {
        id: 6,
        title: "First Hackathon Experience",
        category: "Hackathons",
        date: "July 2025",
        year: 2025,
        month: "Jul",
        location: "Kolkata, India",
        role: "Participant",
        description:
            "My first real hackathon — equal parts terrifying and exhilarating, and the moment I fell for building fast.",
        longDescription:
            "My very first hackathon. I walked in unsure whether I belonged and walked out certain that I did. We didn't win, but we shipped something real in 24 hours, and I discovered how much I love the pressure of turning an idea into a working demo before sunrise.",
        image: "/journey/first-hackathon.jpg",
        size: "tall",
    },
    {
        id: 7,
        title: "Portfolio Launch",
        category: "Milestones",
        date: "April 2025",
        year: 2025,
        month: "Apr",
        role: "Designer & Developer",
        description:
            "Designed and shipped the first version of this very portfolio — a home for the work and the story behind it.",
        longDescription:
            "The first public version of this portfolio going live. Designing and building my own corner of the web forced me to think about typography, motion and story in a way client work never quite does. It's still evolving — this page is proof of that.",
        image: "/journey/portfolio-launch.jpg",
        size: "small",
        externalUrl: "https://kalyanmanna.example.com",
        externalLabel: "View portfolio",
    },
    {
        id: 8,
        title: "First Freelance Project",
        category: "Milestones",
        date: "January 2025",
        year: 2025,
        month: "Jan",
        role: "Freelance Developer",
        description:
            "Delivered my first paid project — my first real lesson in scope, deadlines and shipping for someone else.",
        longDescription:
            "My first paid client project. Beyond the code, it taught me the parts of software that tutorials skip: setting expectations, negotiating scope, and the particular pride of handing over something that solves a real person's problem.",
        image: "/journey/first-freelance.jpg",
        size: "small",
    },
]
