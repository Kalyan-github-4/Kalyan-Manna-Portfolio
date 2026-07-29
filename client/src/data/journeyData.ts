// Central data model for the Vault.
//
// A "memory" is a *collection*: it has a cover (shown as a card on /vault) and
// a set of photos (shown as a Pinterest masonry on /vault/:slug).
//
// Imagery is currently mocked with Unsplash photos at a spread of aspect
// ratios so the masonry has something realistic to pack. To swap in real
// photos, replace the `photo(...)` cover and the `mockPhotos(...)` call with
// literal entries:
//
//     image: "/journey/hexafall.jpg", width: 1600, height: 1067,
//     photos: [
//         { id: "hexafall-1", src: "/journey/hexafall/1.jpg", width: 1600, height: 2400 },
//         ...
//     ],
//
// The width/height pair is not optional: the masonry derives each tile's
// height from the ratio *before* the image loads, which is what keeps the grid
// from reflowing as photos stream in.

export type JourneyCategory =
    | "Hackathons"
    | "Events"
    | "Achievements"
    | "Milestones"

export type JourneyFilter = "All" | JourneyCategory

export type JourneySize = "small" | "medium" | "wide" | "tall"

/** A single image inside a collection's masonry. */
export type VaultPhoto = {
    id: string
    src: string
    /** Intrinsic width in px — only the width:height ratio is used */
    width: number
    /** Intrinsic height in px */
    height: number
    caption?: string
}

export type JourneyItem = {
    id: number
    /** URL segment for the collection page, e.g. /vault/hexafall-2-0 */
    slug: string
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
    /** Longer copy shown on the collection page */
    longDescription?: string
    /** Cover image (public path or absolute URL) */
    image: string
    /** Intrinsic cover width in px — only the width:height ratio is used */
    width: number
    /** Intrinsic cover height in px */
    height: number
    /** The collection itself — what the masonry lays out */
    photos: VaultPhoto[]
    /** Optional additional images for the legacy dialog gallery */
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

const unsplash = (id: string, width: number, height: number) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`

/**
 * Builds a mock Unsplash cover cropped to exactly the dimensions we declare,
 * so the ratio we lay out against always matches the pixels that land.
 */
const photo = (id: string, width: number, height: number) => ({
    image: unsplash(id, width, height),
    width,
    height,
})

/** Verified Unsplash photo ids used to fake out the collections. */
const UNSPLASH_POOL = [
    "1517048676732-d65bc937f952",
    "1522202176988-66273c2fd55f",
    "1531482615713-2afd69097998",
    "1498050108023-c5249f4df085",
    "1461749280684-dccba630e2f6",
    "1540575467063-178a50c2df87",
    "1505373877841-8d25f7d46678",
    "1523580494863-6f3031224c94",
    "1519389950473-47ba0277781c",
    "1454165804606-c3d57bc86b40",
    "1552664730-d307ca884978",
    "1517245386807-bb43f82c33c4",
    "1524178232363-1fb2b075b655",
    "1516321318423-f06f85e504b3",
    "1555949963-ff9fe0c870eb",
    "1504384308090-c894fdcc538d",
    "1511578314322-379afb476865",
    "1487058792275-0ad4aaf24ca7",
    "1526772662000-3f88f10405ff",
    "1519337265831-281ec6cc8514",
    "1556761175-b413da4baf72",
    "1573164713988-8665fc963095",
    "1600880292203-757bb62b4baf",
    "1506744038136-46273834b3fb",
    "1517486808906-6ca8b3f04846",
    "1543269865-cbf427effbad",
    "1531403009284-440f080d1e12",
    "1515187029135-18ee286d815b",
    "1542744173-8e7e53415bb0",
    "1560250097-0b93528c311a",
    "1521737604893-d14cc237f11d",
    "1497215728101-856f4ea42174",
    "1497366754035-f200968a6e72",
    "1497366811353-6870744d04b2",
    "1522071820081-009f0129c71c",
    "1533749871411-5e21e14bcc7d",
    "1520880867055-1e30d1cb001c",
    "1517457373958-b7bdd4587205",
    "1508387027939-27cccde53673",
    "1493225457124-a3eb161ffa5f",
]

// Portrait / landscape / square mix, cycled so every collection gets a genuine
// spread of ratios for the masonry to pack.
const RATIO_CYCLE = [
    [800, 1200],
    [1200, 800],
    [900, 900],
    [800, 1000],
    [1200, 900],
    [1000, 800],
    [800, 1100],
    [1280, 720],
    [900, 1200],
    [1200, 675],
] as const

/**
 * Deterministically fakes a collection's photo set.
 *
 * The pool stride (7) is coprime with the pool size (40), so consecutive
 * photos in one collection never repeat an image, while the per-collection
 * offset keeps neighbouring collections from looking identical.
 */
function mockPhotos(seed: number, count: number): VaultPhoto[] {
    return Array.from({ length: count }, (_, i) => {
        const [width, height] = RATIO_CYCLE[(seed + i) % RATIO_CYCLE.length]
        const poolIndex = (seed * 13 + i * 7) % UNSPLASH_POOL.length
        return {
            id: `${seed}-${i}`,
            src: unsplash(UNSPLASH_POOL[poolIndex], width, height),
            width,
            height,
        }
    })
}

export const journeyItems: JourneyItem[] = [
    {
        id: 1,
        slug: "hexafall-2-0",
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
        ...photo("1517048676732-d65bc937f952", 1200, 800),
        photos: mockPhotos(1, 14),
        featured: true,
        size: "wide",
        externalUrl: "https://hexafall.example.com",
        externalLabel: "Event page",
    },
    {
        id: 9,
        slug: "demo-day-pitch",
        title: "Demo Day Pitch",
        category: "Hackathons",
        date: "June 2026",
        year: 2026,
        month: "Jun",
        location: "Kolkata, India",
        role: "Presenter",
        description:
            "Eight minutes on stage to explain six weeks of work — and the first time pitching felt like storytelling.",
        longDescription:
            "Demo day: eight minutes, one shot, and a room of people who had never seen the product before. Compressing six weeks of decisions into a story that lands is a different skill from building, and this was the moment I stopped resenting that and started enjoying it.",
        ...photo("1511578314322-379afb476865", 1280, 720),
        photos: mockPhotos(2, 9),
    },
    {
        id: 2,
        slug: "student-ambassador",
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
        ...photo("1524178232363-1fb2b075b655", 800, 1100),
        photos: mockPhotos(3, 11),
        size: "tall",
    },
    {
        id: 10,
        slug: "first-1000-users",
        title: "First 1,000 Users",
        category: "Achievements",
        date: "April 2026",
        year: 2026,
        month: "Apr",
        role: "Founder & Developer",
        description:
            "The analytics dashboard crossed four digits — a number that stopped being a metric and started being people.",
        longDescription:
            "Watching the counter roll past 1,000 was strange. Every one of those sessions is someone who trusted a thing I built with an actual problem of theirs. It reframed how I think about bugs, loading states and half-finished features — none of it is theoretical any more.",
        ...photo("1516321318423-f06f85e504b3", 900, 900),
        photos: mockPhotos(4, 8),
    },
    {
        id: 3,
        slug: "easypg-product-milestone",
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
        ...photo("1498050108023-c5249f4df085", 1200, 800),
        photos: mockPhotos(5, 12),
        size: "wide",
        externalUrl: "https://easypg.example.com",
        externalLabel: "Visit EasyPG",
    },
    {
        id: 11,
        slug: "first-workshop",
        title: "Ran My First Workshop",
        category: "Events",
        date: "February 2026",
        year: 2026,
        month: "Feb",
        location: "Kolkata, India",
        role: "Speaker",
        description:
            "Taught a room of juniors how to go from empty folder to deployed app in ninety minutes.",
        longDescription:
            "Standing in front of a room and teaching something forces a level of clarity that reading never does. Ninety minutes, empty folder to deployed app, with all the detours I'd normally hand-wave past. Half the value was mine — I found the gaps in my own understanding live, in front of an audience.",
        ...photo("1519389950473-47ba0277781c", 800, 1000),
        photos: mockPhotos(6, 10),
    },
    {
        id: 12,
        slug: "design-sprint-week",
        title: "Design Sprint Week",
        category: "Milestones",
        date: "January 2026",
        year: 2026,
        month: "Jan",
        description:
            "Five days of sketching, deciding and prototyping before writing a single line of production code.",
        longDescription:
            "A full week spent deliberately not coding: sketching flows, arguing about hierarchy, prototyping in low fidelity and testing with real people. It saved us at least a month of building the wrong thing, and permanently changed how I start projects.",
        ...photo("1454165804606-c3d57bc86b40", 1200, 800),
        photos: mockPhotos(7, 9),
    },
    {
        id: 13,
        slug: "tech-conference",
        title: "Tech Conference, Front Row",
        category: "Events",
        date: "December 2025",
        year: 2025,
        month: "Dec",
        location: "Bengaluru, India",
        description:
            "Two days of talks, hallway conversations and a notebook that came home completely full.",
        longDescription:
            "My first big conference as an attendee. The talks were good; the hallway track was better. Meeting people whose blog posts had unblocked me at 2am, and realising they were figuring it out too, did more for my confidence than any single session on the schedule.",
        ...photo("1540575467063-178a50c2df87", 1200, 800),
        photos: mockPhotos(8, 13),
    },
    {
        id: 4,
        slug: "developer-community-meetup",
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
        ...photo("1523580494863-6f3031224c94", 900, 900),
        photos: mockPhotos(9, 10),
        size: "small",
    },
    {
        id: 14,
        slug: "hackathon-finalist",
        title: "Hackathon Finalist",
        category: "Achievements",
        date: "October 2025",
        year: 2025,
        month: "Oct",
        location: "Kolkata, India",
        role: "Team Lead",
        description:
            "Top five out of ninety teams — the first time the work was judged by strangers and held up.",
        longDescription:
            "Placing in the final five out of ninety teams was validation I didn't know I was looking for. We didn't take first, but standing on that stage knowing the judges had picked our work apart and it survived was worth more than the placement.",
        ...photo("1505373877841-8d25f7d46678", 800, 1200),
        photos: mockPhotos(10, 8),
    },
    {
        id: 5,
        slug: "building-with-my-team",
        title: "Building With My Team",
        category: "Milestones",
        date: "September 2025",
        year: 2025,
        month: "Sep",
        description:
            "The late nights, whiteboards and shared wins that turned a group of individuals into an actual team.",
        longDescription:
            "Some of my favourite memories aren't a single event — they're the process. Whiteboards covered in half-formed ideas, merge conflicts resolved at midnight, and the quiet satisfaction of a feature finally clicking into place. This is the memory of becoming a team, not just a group chat.",
        ...photo("1522202176988-66273c2fd55f", 800, 1000),
        photos: mockPhotos(11, 15),
        size: "wide",
    },
    {
        id: 15,
        slug: "campus-coding-club",
        title: "Campus Coding Club",
        category: "Events",
        date: "August 2025",
        year: 2025,
        month: "Aug",
        location: "Kolkata, India",
        description:
            "Weekly sessions where a handful of us turned an empty classroom into the best part of the week.",
        longDescription:
            "It started with four people and a borrowed projector. By the end of the semester the room was full. Nothing we built there was impressive on its own, but the habit of showing up and building alongside other people compounded in a way solo practice never did.",
        ...photo("1517245386807-bb43f82c33c4", 900, 900),
        photos: mockPhotos(12, 11),
    },
    {
        id: 6,
        slug: "first-hackathon-experience",
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
        ...photo("1531482615713-2afd69097998", 800, 1200),
        photos: mockPhotos(13, 12),
        size: "tall",
    },
    {
        id: 16,
        slug: "late-night-debugging",
        title: "Late Night Debugging",
        category: "Milestones",
        date: "June 2025",
        year: 2025,
        month: "Jun",
        description:
            "Three in the morning, one stubborn race condition, and the quiet triumph when the log finally went silent.",
        longDescription:
            "Not a milestone anyone hands out an award for, but the one I think about most. A race condition that only appeared under load, four hours of narrowing it down, and the specific kind of joy that arrives when a bug you couldn't even describe becomes a two-line fix.",
        ...photo("1487058792275-0ad4aaf24ca7", 1200, 800),
        photos: mockPhotos(14, 7),
    },
    {
        id: 17,
        slug: "first-open-source-pr",
        title: "First Open Source PR",
        category: "Milestones",
        date: "May 2025",
        year: 2025,
        month: "May",
        role: "Contributor",
        description:
            "A tiny docs fix in someone else's repo — and the outsized thrill of seeing 'merged' for the first time.",
        longDescription:
            "It was a typo in a README. I rewrote the PR description four times before submitting it. When the maintainer merged it with a one-word thanks, something clicked: these projects are just people, and the door was never actually locked.",
        ...photo("1555949963-ff9fe0c870eb", 800, 1000),
        photos: mockPhotos(15, 8),
    },
    {
        id: 7,
        slug: "portfolio-launch",
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
        ...photo("1461749280684-dccba630e2f6", 1200, 800),
        photos: mockPhotos(16, 10),
        size: "small",
        externalUrl: "https://kalyanmanna.example.com",
        externalLabel: "View portfolio",
    },
    {
        id: 18,
        slug: "team-retro",
        title: "Team Retro",
        category: "Milestones",
        date: "March 2025",
        year: 2025,
        month: "Mar",
        description:
            "The meeting where we finally said the awkward things out loud — and got noticeably better afterwards.",
        longDescription:
            "Our first honest retrospective. Naming what wasn't working, without blame, took more courage than any technical decision that quarter. Everything the team did afterwards was faster and calmer for it.",
        ...photo("1552664730-d307ca884978", 800, 1000),
        photos: mockPhotos(17, 9),
    },
    {
        id: 8,
        slug: "first-freelance-project",
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
        ...photo("1504384308090-c894fdcc538d", 1200, 900),
        photos: mockPhotos(18, 10),
        size: "small",
    },
]

/** Lookup used by the collection route. */
export const getCollectionBySlug = (slug: string) =>
    journeyItems.find((item) => item.slug === slug)
