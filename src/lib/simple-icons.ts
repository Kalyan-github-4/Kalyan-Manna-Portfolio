/**
 * Icon data for the tech cloud, vendored from react-icon-cloud@4.1.7
 * (src/utils/*). The package's barrel re-exports its <Cloud> renderer, which
 * contains a direct eval() — that defeats tree shaking, so importing anything
 * from the package drags a second copy of TagCanvas and five dead evals into
 * the bundle. These are the only pieces we actually need.
 *
 * Original: https://github.com/teaguestockwell/react-icon-cloud (MIT)
 */

const SIMPLE_ICONS_VERSION = "14.0.0"
const ICON_CDN = `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/`
const METADATA_URL = `https://raw.githubusercontent.com/simple-icons/simple-icons/${SIMPLE_ICONS_VERSION}/_data/simple-icons.json`

export type SimpleIcon = {
    slug: string
    path: string
    hex: string
    title: string
}

type IconMetadata = { title: string; hex?: string }

const FALLBACK_HEX = "#000"

export const addHash = (color: string) =>
    color[0] === "#" ? color : `#${color}`

// https://github.com/simple-icons/simple-icons/blob/14.0.0/scripts/utils.js
const TITLE_TO_SLUG_REPLACEMENTS: Record<string, string> = {
    "+": "plus",
    ".": "dot",
    "&": "and",
    đ: "d",
    ħ: "h",
    ı: "i",
    ĸ: "k",
    ŀ: "l",
    ł: "l",
    ß: "ss",
    ŧ: "t",
}

const TITLE_TO_SLUG_CHARS_REGEX = RegExp(
    `[${Object.keys(TITLE_TO_SLUG_REPLACEMENTS).join("")}]`,
    "g",
)

const TITLE_TO_SLUG_RANGE_REGEX = /[^a-z0-9]/g

const getSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(
            TITLE_TO_SLUG_CHARS_REGEX,
            (char) => TITLE_TO_SLUG_REPLACEMENTS[char],
        )
        .normalize("NFD")
        .replace(TITLE_TO_SLUG_RANGE_REGEX, "")

/** simple-icons ships one path per file, so the first `d=` is the whole mark. */
const svgToPath = (svg: string) => {
    const start = svg.indexOf('d="')
    const end = svg.indexOf('"', start + 3)

    return svg.substring(start + 3, end)
}

const pathCache: Record<string, string> = {}

const getSlugPath = async (slug: string) => {
    if (!pathCache[slug]) {
        try {
            const res = await fetch(`${ICON_CDN}${slug}.svg`, {
                cache: "force-cache",
            })
            pathCache[slug] = svgToPath(await res.text())
        } catch {
            // Leave the slug unresolved; fetchSimpleIcons drops it below.
        }
    }

    return pathCache[slug] ?? ""
}

type BrandCache = Record<string, { title: string; hex: string; slug: string }>

let brandCache: BrandCache | undefined

/** One request covers every brand colour, so prime it before resolving slugs. */
const primeBrandCache = async () => {
    if (brandCache) return

    try {
        const res = await fetch(METADATA_URL, { cache: "force-cache" })
        const icons: IconMetadata[] = await res.json()
        const next: BrandCache = {}

        icons.forEach((icon) => {
            const slug = getSlug(icon.title)
            next[slug] = {
                slug,
                title: icon.title,
                hex: addHash(icon.hex ?? FALLBACK_HEX),
            }
        })

        brandCache = next
    } catch {
        // Colours fall back to black below.
    }
}

export const fetchSimpleIcons = async ({ slugs }: { slugs: string[] }) => {
    const [paths] = await Promise.all([
        Promise.all(slugs.map(getSlugPath)),
        primeBrandCache(),
    ])

    const simpleIcons: Record<string, SimpleIcon> = {}

    slugs.forEach((slug, index) => {
        const path = paths[index]
        const brand = brandCache?.[slug]

        // A slug the CDN or the metadata does not know is silently skipped
        // rather than drawn as an empty tag.
        if (!path || !brand) return

        simpleIcons[slug] = { slug, path, hex: brand.hex, title: brand.title }
    })

    return simpleIcons
}

const hexToRgb = (hex: string) => {
    const value = parseInt(hex.slice(1), 16)

    return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/** WCAG 2.1 relative luminance. */
const luminance = (hex: string) => {
    const [r, g, b] = hexToRgb(hex).map((channel) => {
        const c = channel / 255

        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2.1 contrast ratio, 1 (identical) to 21 (black on white). */
export const contrastRatio = (a: string, b: string) => {
    const [la, lb] = [luminance(a), luminance(b)]

    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export const iconToSvgDataUri = ({
    icon,
    hex,
    size,
}: {
    icon: SimpleIcon
    hex: string
    size: number
}) => {
    const [r, g, b] = hexToRgb(hex)

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="fill: rgb(${r}, ${g}, ${b});" viewBox="0 0 24 24" height="${size}px" width="${size}px"> <title>${icon.title}</title> <path d="${icon.path}"></path> </svg>`
}
