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
        id: 1,
        slug: "hexafall-2-0",
        coverTitle: "HexaFall 2.0",
        title: "Memories from HexaFall 2.0",
        category: "Hackathons",
        date: "July 2026",
        year: 2026,
        month: "Jul",
        location: "Kolkata, India",
        role: "Selected Participant",
        description:
            "A collection of memories from HexaFall 2.0—filled with teamwork, coding, new connections and unforgettable hackathon moments.",
        longDescription:
            "HexaFall 2.0 was more than just a hackathon; it became a collection of memories I will always value. From brainstorming ideas and building alongside my teammates to late-night debugging, meeting passionate developers and presenting our work, every moment contributed to an unforgettable experience. This gallery captures the energy, friendships, challenges and small moments that made HexaFall 2.0 a meaningful chapter in my journey as a developer.",
        latest: true,
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
        role: "Participant",
        description:
            "A collection of memories from AceHack 5.0 — long build hours, a team that kept going, and the people met along the way.",
        longDescription:
            "AceHack 5.0 was another round of building against the clock: scoping an idea down to what could actually ship, splitting the work, and holding it together through the hours where nothing compiles. This gallery is what stayed with me — the workspace, the whiteboards, the teammates and the moments between the deadlines.",
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
]

/**
 * Widths `scripts/optimize-images.mjs` emits for gallery directories. The
 * largest one an image is big enough for drops its suffix and becomes `src`;
 * the rest are `-<width>.webp` neighbours. Keep this in step with the RULES
 * entry in that script or srcset will point at files that do not exist.
 */
const VARIANT_WIDTHS = [640, 1024, 1400]

/** `["IMG_01.jpg", 3000]` -> `{ src, srcSet }` over the emitted WebP set. */
function buildSources(dir: string, file: string, intrinsicWidth: number) {
    const base = file.replace(/\.(jpe?g|png)$/i, "")
    // Encoded so a filename that slips through with a space still resolves.
    const url = (name: string) => `/${dir}/${encodeURIComponent(name)}.webp`

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

export const journeyItems: JourneyItem[] = collections.map(buildCollection)

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
        journeyItems.some((item) => item.category === category)
    ),
]

/** Lookup used by the collection route. */
export const getCollectionBySlug = (slug: string) =>
    journeyItems.find((item) => item.slug === slug)
