// Central data model for the Vault.
//
// A "memory" is a *collection*: it has a cover (shown as a card on /vault) and
// a set of photos (shown as a Pinterest masonry on /vault/:slug).
//
// ─── Adding a collection ──────────────────────────────────────────────────
//
// 1. Drop the photos in `client/public/<dir>/`, where `<dir>` is URL-safe —
//    lowercase, hyphens, no spaces or dots. Match the slug for clarity, e.g.
//    `public/acehack-5-0/`.
//
// 2. Name the cover `cover.jpeg` (or `.jpg`) and list it first — it becomes
//    both the card cover on /vault and the opening tile of the masonry.
//
// 3. Run `npm run optimize:images` — it rewrites the folder as WebP at several
//    widths. Keep listing the ORIGINAL filenames below; the `.webp` paths and
//    the srcset are derived from them.
//
// 4. Read the real pixel dimensions of every file. From `client/`:
//
//        Add-Type -AssemblyName System.Drawing
//        Get-ChildItem public/<dir> | Sort-Object Name | ForEach-Object {
//          $i = [Drawing.Image]::FromFile($_.FullName)
//          '["{0}", {1}, {2}],' -f $_.Name, $i.Width, $i.Height
//          $i.Dispose()
//        }
//
//    The width/height pair is not optional: the masonry derives each tile's
//    height from the ratio *before* the image loads, which is what keeps the
//    grid from reflowing as photos stream in. Wrong numbers mean a visible
//    jump on load, so read them — don't estimate.
//
// 4. Append a block to `collections` below. Cover and `photos` are derived, so
//    a collection is just metadata plus its file list:
//
//        {
//            id: 3,
//            slug: "my-event",
//            coverTitle: "My Event",
//            title: "Memories from My Event",
//            category: "Hackathons",
//            date: "August 2026",
//            year: 2026,
//            month: "Aug",
//            description: "One or two lines, shown on the card.",
//            dir: "my-event",
//            files: [
//                ["cover.jpeg", 1600, 1067],
//                ["01.jpg", 1600, 2400],
//            ],
//        },
//
//    Order `files` so landscape and portrait alternate — a run of one shape
//    stacks into a single column and skews the grid.
//
// Category pills on /vault are derived from the collections that exist, so a
// new category appears as soon as something uses it.

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
    /** Candidate WebP widths for the same photo, ready for an `srcset` */
    srcSet: string
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
    /** Short name for the card; falls back to `title` */
    coverTitle?: string
    title: string
    category: JourneyCategory
    /** Further categories it also files under in the Vault's filters and search */
    alsoIn?: JourneyCategory[]
    /** Human-readable date, e.g. "July 2026" */
    date: string
    /** Numeric year used for the timeline grouping */
    year: number
    /** Short month label used in the timeline, e.g. "Jul" */
    month: string
    location?: string
    role?: string
    /** How it ended, e.g. "Winner" — shown as a pill on the latest card */
    result?: string
    /** One or two line summary shown on cards */
    description: string
    /** Longer copy shown on the collection page */
    longDescription?: string
    /** Cover image (public path) — derived from the first file */
    image: string
    /** Candidate WebP widths for the cover, ready for an `srcset` */
    imageSrcSet: string
    /** Intrinsic cover width in px — only the width:height ratio is used */
    width: number
    /** Intrinsic cover height in px */
    height: number
    /** The collection itself — what the masonry lays out */
    photos: VaultPhoto[]
    /** Optional additional images for the legacy dialog gallery */
    gallery?: string[]
    /** Pins this collection to the Vault's "Latest Collection" hero slot */
    latest?: boolean
    /** Keeps this collection on /vault but out of the home page showcase */
    hideOnHome?: boolean
    size?: JourneySize
    externalUrl?: string
    externalLabel?: string
}

/** One real photo: `[filename, intrinsic width, intrinsic height]`. */
type PhotoFile = [file: string, width: number, height: number]

/**
 * A collection as authored — metadata plus the folder its photos live in.
 * Cover and `photos` are derived from `files`, so they aren't declared twice.
 */
type CollectionSource = Omit<
    JourneyItem,
    "image" | "imageSrcSet" | "width" | "height" | "photos"
> & {
    /** Folder under `client/public/` holding this collection's photos */
    dir: string
    /** Every photo in the collection, cover first */
    files: PhotoFile[]
}

const collections: CollectionSource[] = [
    {
        id: 3,
        slug: "hexafall-2-0",
        coverTitle: "HexaFall 2.0",
        title: "Memories from HexaFall 2.0",
        category: "Hackathons",
        date: "July 2026",
        year: 2026,
        month: "Jul",
        location: "Kolkata, India",
        role: "Selected Participant",
        hideOnHome: true,
        description:
            "A hackathon of innovation and collaborative problem-solving — taking an idea from its early stages to a working solution against the clock.",
        longDescription:
            "Took part in HexaFalls 2.0, a hackathon that brought together innovation, technology and collaborative problem-solving. It was a chance to take an idea from its early stages, work through technical challenges and build a solution against the clock. The experience pushed me past familiar approaches and towards building something meaningful — an important step in my journey as a developer and aspiring entrepreneur.",
        size: "wide",
        externalUrl: "https://hexafall.example.com",
        externalLabel: "Event Page",
        dir: "hexafall-2-0",
        files: [
            ["cover.jpeg", 1280, 960],
            ["IMG_20260725_121405.jpg", 3000, 4000],
            ["wa-01.jpeg", 1280, 575],
            ["IMG_20260725_121339.jpg", 4000, 3000],
            ["IMG_20260725_214548.jpg", 3000, 4000],
            ["wa-05.jpeg", 575, 1280],
            ["IMG_20260726_010508.jpg", 12000, 9000],
            ["IMG_20260725_121412.jpg", 3000, 4000],
            ["wa-02.jpeg", 1280, 575],
            ["IMG_20260725_211158.jpg", 4000, 3000],
            ["IMG_20260726_170954.jpg", 3000, 4000],
            ["wa-07.jpeg", 575, 1280],
            ["IMG_20260726_073122.jpg", 3264, 2448],
            ["wa-03.jpeg", 1280, 575],
            ["IMG_20260726_084356.jpg", 4000, 3000],
            ["1785169078341.jpg", 4032, 3024],
            ["wa-04.jpeg", 1280, 575],
            ["IMG_20260726_094108.jpg", 5184, 3888],
            ["wa-06.jpeg", 1280, 575],
            ["IMG_20260726_150113.jpg", 4000, 3000],
        ],
    },
    {
        id: 2,
        slug: "acehack-5-0",
        coverTitle: "AceHack 5.0",
        title: "Memories from AceHack 5.0",
        category: "Hackathons",
        date: "July 2026",
        year: 2026,
        month: "Jul",
        location: "UEM Jaipur",
        role: "Participant",
        description:
            "Taking my developer journey beyond my hometown — AceHack 5.0 at UEM Jaipur and the energy of Jaipur's tech community.",
        longDescription:
            "Taking my developer journey beyond my hometown and into Jaipur's tech community made AceHack 5.0 particularly special. The event and its Hacktoberfest community brought together developers, innovators and open-source enthusiasts, opening up new perspectives beyond familiar circles. More than just another event, it was a reminder that learning and building have no geographical boundaries, and that some of the best takeaways come from the people you meet along the way.",
        dir: "acehack-5-0",
        files: [
            ["cover.jpeg", 2560, 1440],
            ["ah-02.jpeg", 1440, 2560],
            ["ah-11.jpeg", 960, 1280],
            ["ah-01.jpeg", 2560, 1440],
            ["ah-04.jpeg", 1440, 2560],
            ["ah-03.jpeg", 2560, 1440],
            ["ah-12.jpeg", 960, 1280],
            ["ah-05.jpeg", 1440, 2560],
            ["ah-08.jpeg", 1280, 960],
            ["ah-14.jpeg", 960, 1280],
            ["ah-09.jpeg", 1280, 960],
            ["ah-06.jpeg", 1440, 2560],
            ["ah-15.jpeg", 960, 1280],
            ["ah-07.jpeg", 2560, 1440],
            ["ah-16.jpeg", 960, 1280],
            ["ah-10.jpeg", 1280, 960],
            ["ah-17.jpeg", 960, 1280],
            ["ah-13.jpeg", 1280, 720],
            ["ah-18.jpeg", 960, 1280],
        ],
    },
    {
        id: 4,
        slug: "react-kolkata",
        coverTitle: "React Kolkata",
        title: "Memories from React Kolkata",
        category: "Events",
        date: "August 2026",
        year: 2026,
        month: "Aug",
        location: "Kolkata, India",
        role: "Attendee",
        description:
            "A collection of memories from the React Kolkata community meetup — talks, a full auditorium, and developers worth meeting.",
        longDescription:
            "React Kolkata's August 2026 edition was a room full of people who build for the web, gathered for an evening of talks and conversation. Between the sessions came the part I remember most — meeting developers from across the city, swapping notes on what everyone was working on, and realising how much of this community had been within reach the whole time. This gallery captures the hall, the stage, the people and the ordinary moments in between.",
        // latest: true,
        hideOnHome: true,
        size: "wide",
        dir: "react-kolkata",
        files: [
            ["cover.jpeg", 1600, 1200],
            ["rk-01.jpeg", 963, 1280],
            ["rk-02.jpeg", 1280, 960],
            ["rk-03.jpeg", 960, 1280],
            ["rk-04.jpeg", 1280, 960],
            ["rk-05.jpeg", 1280, 960],
        ],
    },
    {
        id: 5,
        slug: "hackrit",
        coverTitle: "HackRIT",
        title: "Memories from HackRIT",
        category: "Hackathons",
        date: "September 2026",
        year: 2026,
        month: "Sep",
        location: "Techno India University, Kolkata",
        role: "Participant",
        hideOnHome: true,
        description:
            "A hackathon at Techno India University — thinking on my feet, working under pressure and turning an idea into something real.",
        longDescription:
            "Participated in HackRIT at Techno India University, a hackathon that challenged me to think creatively, work under pressure and approach real-world problems with a solution-first mindset. It meant collaborating, experimenting and turning an idea into something tangible within a tight timeframe, making technical decisions along the way. More than a competition, it was a lesson in the pace of hackathon development and a push to keep building.",
        size: "wide",
        dir: "Hackrit 2.0",
        files: [
            ["hackrit-img-1", 1040, 585],
            ["hackrit-img-2", 720, 1280],
            ["hackrit-img-3", 1152, 648],
            ["hackrit-img-4", 1280, 720],
            ["hackrit-img-5", 960, 1280],
            ["hackrit-img-6", 4080, 2296],
            ["hackrit-img-7", 1152, 648],
            ["hackrit-img-8", 1805, 1023],
            ["hackrit-img-9", 720, 1280],
            ["hackrit-img-10", 1152, 648],
            ["hackrit-img-11", 1805, 1023],
            ["hackrit-img-12", 1805, 1023],
            ["hackrit-img-13", 1805, 1023],
            ["hackrit-img-14", 2296, 4080],
            ["hackrit-img-15", 960, 1280],
            ["hackrit-img-16", 1536, 817],
            ["hackrit-img-17", 1536, 812],
            ["hackrit-img-18", 1536, 816],
        ],
    },
    {
        id: 6,
        slug: "hacktoberfest-x-jis",
        coverTitle: "Hacktoberfest x JIS",
        title: "Memories from Hacktoberfest x JIS",
        category: "Hackathons",
        alsoIn: ["Achievements"],
        date: "October 2026",
        year: 2026,
        month: "Oct",
        location: "JIS University, Kolkata",
        role: "Participant",
        result: "Winner",
        description:
            "Won first place in the Cyber Security track at Hacktoberfest x JIS — a day of building against the clock alongside developers from across the city.",
        longDescription:
            "Our team won first place in the Cyber Security track at Hacktoberfest x JIS, held at JIS University — a memorable milestone in my journey with technology. The event brought developers and problem-solvers together to exchange ideas, collaborate and push creative boundaries. It was a chance to step outside my comfort zone and put my skills to work under real pressure. Beyond the recognition, it deepened my appreciation for collaboration, experimentation and the open-source spirit of the developer community.",
        size: "wide",
        dir: "hacktoberfest-x-jis",
        latest: true,
        files: [
            ["hacktoberfest-img-1.jpg", 1280, 960],
            ["hacktoberfest-img-2.jpeg", 720, 1280],
            ["hacktoberfest-img-3.jpg", 1280, 960],
            ["hacktoberfest-img-4.jpeg", 720, 1280],
            ["hacktoberfest-img-5.jpeg", 1152, 648],
            ["hacktoberfest-img-6.jpeg", 720, 1280],
            ["hacktoberfest-img-7.jpeg", 1280, 720],
            ["hacktoberfest-img-8.jpeg", 720, 1280],
            ["hacktoberfest-img-9.jpeg", 1152, 648],
            ["hacktoberfest-img-10.jpg", 1280, 960],
            ["hacktoberfest-img-11.jpeg", 1280, 720],
        ],
    },
    {
        id: 1,
        slug: "vision-x",
        coverTitle: "VISION X",
        title: "Winning VISION X",
        category: "Achievements",
        date: "September 2025",
        year: 2025,
        month: "Sep",
        location: "Iswar Chandra Vidyasagar Polytechnic, Jhargram",
        result: "Winner",
        description:
            "Won VISION X, a startup competition organized by ICV Polytechnic — an important milestone in my early entrepreneurial journey.",
        longDescription:
            "Won VISION X, a startup competition organized by ICV Polytechnic and an important milestone in my early entrepreneurial journey. It pushed me beyond conventional thinking — identifying real challenges, exploring innovative approaches and presenting ideas with confidence in a competitive room. More than a recognition of the effort, it was a learning experience that strengthened my interest in innovation, entrepreneurship and building things that make a difference.",
        size: "wide",
        dir: "vision-x",
        files: [
            ["cover.jpeg", 1280, 960],
            ["vx-01.jpg", 960, 1280],
            ["vx-11.jpeg", 1280, 960],
            ["vx-12.jpeg", 1280, 960],
            ["vx-04.jpeg", 1280, 960],
            ["vx-05.jpg", 864, 1152],
            ["vx-02.jpeg", 1280, 960],
            ["vx-13.jpeg", 1280, 960],
            ["vx-03.jpg", 1280, 960],
            ["vx-07.jpg", 1152, 864],
            ["vx-14.jpg", 1280, 960],
            ["vx-08.jpeg", 1280, 960],
            ["vx-10.jpg", 1280, 853],
        ],
    },

]

/**
 * Widths `scripts/optimize-images.mjs` emits for gallery directories. The
 * largest one an image is big enough for drops its suffix and becomes `src`;
 * the rest are `-<width>.webp` neighbours. Keep this in step with the RULES
 * entry in that script or srcset will point at files that do not exist.
 */
const VARIANT_WIDTHS: number[] = []

/** `["IMG_01.jpg", 3000]` -> `{ src, srcSet }` over the emitted WebP set. */
function buildSources(dir: string, file: string, intrinsicWidth: number) {
    const base = file.replace(/\.(jpe?g|png)$/i, "")
    // Encoded so a filename that slips through with a space still resolves.
    const url = (name: string) =>
        `/${encodeURIComponent(dir)}/${encodeURIComponent(name)}.webp`

    const available = VARIANT_WIDTHS.filter((width) => width <= intrinsicWidth)
    const src = url(base)

    // Narrower than every variant: the optimizer wrote a single file at the
    // image's own width, so that is the only candidate there is.
    if (available.length === 0) {
        return { src, srcSet: `${src} ${intrinsicWidth}w` }
    }

    const primary = Math.max(...available)

    const srcSet = available
        .map((width) =>
            width === primary
                ? `${src} ${width}w`
                : `${url(`${base}-${width}`)} ${width}w`
        )
        .join(", ")

    return { src, srcSet }
}

/** Expands a authored collection into the shape the Vault renders. */
function buildCollection({ dir, files, ...meta }: CollectionSource): JourneyItem {
    const photos: VaultPhoto[] = files.map(([file, width, height]) => ({
        id: `${dir}-${file}`,
        ...buildSources(dir, file, width),
        width,
        height,
    }))

    const [cover] = photos

    return {
        ...meta,
        image: cover.src,
        imageSrcSet: cover.srcSet,
        width: cover.width,
        height: cover.height,
        photos,
    }
}

// `id` runs oldest to newest, so sorting on it lists the Vault newest first
// whatever order the blocks above are written in.
export const journeyItems: JourneyItem[] = collections
    .map(buildCollection)
    .sort((a, b) => b.id - a.id)

/** Whether a collection files under `category`, as its main one or an extra. */
export const inCategory = (item: JourneyItem, category: JourneyCategory) =>
    item.category === category || Boolean(item.alsoIn?.includes(category))

// Canonical pill order; the bar only renders the ones actually in use.
const CATEGORY_ORDER: JourneyCategory[] = [
    "Hackathons",
    "Events",
    "Achievements",
    "Milestones",
]

/**
 * Filters shown on /vault — derived so a category pill can never lead to an
 * empty grid, and a new category lights up the moment a collection uses it.
 */
export const JOURNEY_FILTERS: JourneyFilter[] = [
    "All",
    ...CATEGORY_ORDER.filter((category) =>
        journeyItems.some((item) => inCategory(item, category))
    ),
]

/** Lookup used by the collection route. */
export const getCollectionBySlug = (slug: string) =>
    journeyItems.find((item) => item.slug === slug)
