import type { CSSProperties } from "react"
import type { IconType } from "react-icons"
import {
    SiClerk,
    SiCloudinary,
    SiDrizzle,
    SiExpo,
    SiExpress,
    SiFigma,
    SiFramer,
    SiGit,
    SiGithub,
    SiJavascript,
    SiLeaflet,
    SiMongodb,
    SiNeon,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiReact,
    SiShadcnui,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
    SiVite,
} from "react-icons/si"
import { Code } from "@phosphor-icons/react"

type WorkTechPillProps = {
    label: string
}

type TechBrand = {
    icon: IconType
    /** Official brand colour, or white where the real mark is black. */
    color: string
}

// Each tech is defined once and shared by all of its aliases below, so a
// spelling variant can never drift away from its icon or its colour.
//
// Brands whose real mark is black — Next.js, Vercel, Expo, shadcn, GitHub,
// Express, Prisma — get white instead. That is how they ship their own dark
// theme, and a #000 glyph on this card would simply be a hole.
const OFF_WHITE = "#F4F4F5"

const REACT: TechBrand = { icon: SiReact, color: "#61DAFB" }
const NEXT: TechBrand = { icon: SiNextdotjs, color: OFF_WHITE }
const TYPESCRIPT: TechBrand = { icon: SiTypescript, color: "#3178C6" }
const JAVASCRIPT: TechBrand = { icon: SiJavascript, color: "#F7DF1E" }
const TAILWIND: TechBrand = { icon: SiTailwindcss, color: "#38BDF8" }
const NODE: TechBrand = { icon: SiNodedotjs, color: "#5FA04E" }
const EXPRESS: TechBrand = { icon: SiExpress, color: OFF_WHITE }
const POSTGRES: TechBrand = { icon: SiPostgresql, color: "#4E8FCC" }
const NEON: TechBrand = { icon: SiNeon, color: "#00E599" }
const MONGODB: TechBrand = { icon: SiMongodb, color: "#47A248" }
const EXPO: TechBrand = { icon: SiExpo, color: OFF_WHITE }
const PRISMA: TechBrand = { icon: SiPrisma, color: OFF_WHITE }
const DRIZZLE: TechBrand = { icon: SiDrizzle, color: "#C5F74F" }
const VITE: TechBrand = { icon: SiVite, color: "#A259FF" }
const VERCEL: TechBrand = { icon: SiVercel, color: OFF_WHITE }
const CLOUDINARY: TechBrand = { icon: SiCloudinary, color: "#3448C5" }
const LEAFLET: TechBrand = { icon: SiLeaflet, color: "#5BC236" }
const FIGMA: TechBrand = { icon: SiFigma, color: "#F24E1E" }
const FRAMER: TechBrand = { icon: SiFramer, color: "#0099FF" }
const SHADCN: TechBrand = { icon: SiShadcnui, color: OFF_WHITE }
const GITHUB: TechBrand = { icon: SiGithub, color: OFF_WHITE }
const GIT: TechBrand = { icon: SiGit, color: "#F05032" }
const CLERK: TechBrand = { icon: SiClerk, color: "#6C47FF" }

const FALLBACK: TechBrand = { icon: Code, color: "#A1A1AA" }

const techBrands: Record<string, TechBrand> = {
    react: REACT,
    "react.js": REACT,
    reactjs: REACT,
    "react native": REACT,

    next: NEXT,
    nextjs: NEXT,
    "next.js": NEXT,

    typescript: TYPESCRIPT,
    javascript: JAVASCRIPT,

    tailwind: TAILWIND,
    "tailwind css": TAILWIND,
    // NativeWind has no brand glyph of its own — it is Tailwind for React
    // Native, so it borrows Tailwind's rather than falling back to <Code />.
    nativewind: TAILWIND,

    node: NODE,
    nodejs: NODE,
    "node.js": NODE,

    express: EXPRESS,
    "express.js": EXPRESS,

    postgresql: POSTGRES,
    postgres: POSTGRES,

    neon: NEON,
    "neon db": NEON,
    "neon postgres": NEON,

    mongodb: MONGODB,

    github: GITHUB,
    "github api": GITHUB,
    git: GIT,

    clerk: CLERK,

    expo: EXPO,

    prisma: PRISMA,
    "prisma orm": PRISMA,

    drizzle: DRIZZLE,
    "drizzle orm": DRIZZLE,

    vite: VITE,
    vercel: VERCEL,
    cloudinary: CLOUDINARY,
    leaflet: LEAFLET,
    "leaflet.js": LEAFLET,
    figma: FIGMA,
    "framer motion": FRAMER,
    shadcn: SHADCN,
    "shadcn/ui": SHADCN,
}

export default function WorkTechPill({
    label,
}: WorkTechPillProps) {
    const normalizedLabel = label.trim().toLowerCase()
    const { icon: Icon, color } = techBrands[normalizedLabel] ?? FALLBACK

    return (
        <span
            // Exposed as a custom property so the border and background tints
            // stay in step with the icon without repeating the hex three times.
            style={{ "--tech": color } as CSSProperties}
            className="group/pill inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--tech)_38%,transparent)] hover:bg-[color-mix(in_srgb,var(--tech)_10%,transparent)] hover:text-white"
        >
            <Icon
                size={14}
                aria-hidden="true"
                className="shrink-0 text-[color:var(--tech)] opacity-85 transition-opacity duration-300 group-hover/pill:opacity-100"
            />

            <span>{label}</span>
        </span>
    )
}
