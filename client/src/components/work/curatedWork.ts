import { workProjects, type WorkProject } from "./workProjects"

type CuratedMeta = {
    /** The one-sentence pitch printed large inside the coloured card. */
    tagline: string
    /** Bulleted capability list beside the card. */
    highlights: string[]
    /** Single colour lifted out of the card gradient, for the bullet marks. */
    mark: string
}

export type CuratedProject = WorkProject & CuratedMeta

// Copy that only this showcase needs, keyed by title so it stays alongside
// workProjects without widening the shape every other card has to carry —
// the same arrangement Project.tsx uses for its marquee text.
const curatedMeta: Record<string, CuratedMeta> = {
    "GitHub Roast": {
        tagline:
            "Hand it a GitHub username and it reads your commit history back to you — with jokes",
        highlights: [
            "Reads any public profile straight from the GitHub API.",
            "Turns what it finds into a roast, developer score, and shareable insights.",
            "Motion-driven reveals as each verdict lands.",
            "Built on Next.js and TypeScript, styled with Tailwind.",
        ],
        mark: "#FB923C",
    },
    Portfolio: {
        tagline:
            "A personal site built like a product — motion, case studies, and a guestbook visitors actually sign",
        highlights: [
            "Motion-driven storytelling from the hero through every section.",
            "Interactive project case studies with live previews.",
            "A guestbook where visitors leave a card on the wall.",
            "Hand-built in React and TypeScript — no template underneath.",
        ],
        mark: "#38BDF8",
    },
    EasyPG: {
        tagline:
            "PG hunting for students and listing management for owners, in one mobile app",
        highlights: [
            "Map-based discovery of nearby PGs, drawn with Leaflet.",
            "Real-world rental and booking workflows end to end.",
            "React Native and Expo client, styled with NativeWind.",
            "Node and Express API backed by PostgreSQL on Neon.",
        ],
        mark: "#D946EF",
    },
    "Gym Management System": {
        tagline:
            "Members, memberships, payments, and workouts — one dashboard for the whole gym",
        highlights: [
            "Member records and membership plans in a single view.",
            "Payment tracking and day-to-day administrative operations.",
            "Workout programmes assigned per member.",
            "Prisma over PostgreSQL, hosted on Neon.",
        ],
        mark: "#818CF8",
    },
}

// A project with no entry above still renders — it just leans on its own
// description instead of a written pitch.
const fallback = (project: WorkProject): CuratedMeta => ({
    tagline: project.description,
    highlights: [],
    mark: "#A1A1AA",
})

export const curatedProjects: CuratedProject[] = workProjects.map((project) => ({
    ...project,
    ...(curatedMeta[project.title] ?? fallback(project)),
}))
