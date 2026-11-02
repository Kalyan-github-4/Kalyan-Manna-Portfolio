import { projectImages } from "@/config"

export type WorkProject = {
    number: string
    /** The project's page: /work/<slug> */
    slug: string
    title: string
    category: string
    /** Why it exists, shown as the card's pill: a dev tool, a design study, a fun build or client work. */
    purpose: "Dev tool" | "Design" | "Fun" | "Freelance"
    date: string
    description: string
    image: string
    githubUrl?: string
    liveUrl?: string
    tags: string[]
    accent: string
    variant?: "default" | "mobile"
    mobileImages?: string[]
    /** Up to two screenshots shown as the tilted, stacked desktop preview. */
    previewImages?: string[]
}

export const workProjects: WorkProject[] = [
    {
        number: "01",
        slug: "deadweight",
        title: "Deadweight",
        category: "VS Code Extension",
        purpose: "Dev tool",
        date: "2026",
        description:
            "A VS Code extension that finds unused dependencies, dead files, and exports — and removes them safely, with a preview and one-click undo.",
        image: projectImages.deadweight,
        previewImages: [...projectImages.deadweightScreens],
        githubUrl: "https://github.com/Kalyan-github-4/DeadWeight",
        liveUrl: "https://marketplace.visualstudio.com/items?itemName=kalyanmanna.deadweight",
        tags: [
            "TypeScript",
            "VS Code Extension API",
            "Node.js",
            "knip",
            "depcheck",
            "Cytoscape.js",
            "MCP",
        ],
        accent: "from-red-700 via-red-500 to-zinc-500",
    },
    {
        number: "02",
        slug: "student-placement-management-system",
        title: "Student Placement Management System",
        category: "Web App",
        purpose: "Design",
        date: "2026",
        description:
            "A centralized platform built as a Brainware University college project to manage student placements, company recruitment drives, eligibility criteria, applications, and placement records.",
        image: projectImages.placementSystemScreens[0],
        previewImages: [...projectImages.placementSystemScreens],
        githubUrl: "https://github.com/Kalyan-github-4/Student-Placement-Management-System",
        liveUrl: "https://student-placement-management-system-ivory.vercel.app",
        tags: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
            "Auth.js",
            "PostgreSQL",
            "Neon",
            "Drizzle ORM",
            "Zod",
            "Resend",
        ],
        accent: "from-blue-900 via-blue-700 to-red-600",
    },
    {
        number: "03",
        slug: "keythm",
        title: "Keythm",
        category: "Web App",
        purpose: "Fun",
        date: "2026",
        description:
            "A typing trainer built for the feel of it — customisable tests, live wpm and accuracy, and a mechanical keyboard that thocks under every keystroke.",
        image: projectImages.keythm,
        previewImages: [...projectImages.keythmScreens],
        githubUrl: "https://github.com/Kalyan-github-4/Keythm",
        liveUrl: "https://keythm-two.vercel.app",
        tags: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Web Audio API",
        ],
        accent: "from-amber-700 via-amber-500 to-stone-400",
    },
    {
        number: "04",
        slug: "hopebridge",
        title: "HopeBridge",
        category: "Website",
        purpose: "Design",
        date: "2026",
        description:
            "A multi-page site for an NGO working with vulnerable children across India — causes, impact reporting, and a donation flow front and centre.",
        image: projectImages.hopeBridge,
        previewImages: [...projectImages.hopeBridgeScreens],
        githubUrl: "https://github.com/Kalyan-github-4/NGO-portfolio-2",
        liveUrl: "https://ngo-portfolio-2.vercel.app",
        tags: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
        ],
        accent: "from-emerald-700 via-emerald-500 to-orange-500",
    },
    {
        number: "05",
        slug: "github-roast",
        title: "GitHub Roast",
        category: "Web App",
        purpose: "Fun",
        date: "2026",
        description:
            "A fun and interactive web app that analyzes GitHub profiles and generates witty roasts, humorous insights, and developer scores.",
        image: projectImages.githubRoast,
        previewImages: [...projectImages.githubRoastScreens],
        githubUrl: "https://github.com/Kalyan-github-4/GitHub-Roast",
        liveUrl: "https://git-hub-roast-mauve.vercel.app",
        tags: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "GitHub API",
        ],
        accent: "from-orange-500 via-pink-500 to-purple-600",
    },
    {
        number: "06",
        slug: "portfolio",
        title: "Portfolio",
        category: "Web App",
        purpose: "Design",
        date: "2026",
        description:
            "A handcrafted personal portfolio featuring motion-driven storytelling, interactive sections, project case studies, and a guestbook experience.",
        image: projectImages.portfolioScreens[0],
        previewImages: [...projectImages.portfolioScreens],
        githubUrl: "https://github.com/Kalyan-github-4/Kalyan-Manna-Portfolio",
        liveUrl: "https://www.kalyanmanna.com",
        tags: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "Neon",
            "Clerk"
        ],
        accent: "from-cyan-500 via-blue-600 to-violet-600",
    },
    {
        number: "07",
        slug: "easypg",
        title: "EasyPG",
        category: "Mobile App",
        purpose: "Design",
        date: "2026",
        description:
            "A PG discovery and management platform designed for students and property owners, covering real-world rental and booking workflows.",
        image: projectImages.easyPg,
        previewImages: [...projectImages.easyPgScreens],
        githubUrl: "https://github.com/Kalyan-github-4/EasyPG-App",
        liveUrl: "",
        tags: [
            "React Native",
            "Expo",
            "TypeScript",
            "NativeWind",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "Neon",
            "Leaflet.js",
        ],
        accent: "from-violet-600 via-fuchsia-500 to-cyan-400",
        variant: "mobile",
        mobileImages: [...projectImages.easyPgScreens],
    },
    {
        number: "08",
        slug: "gym-management-system",
        title: "Gym Management System",
        category: "Web App",
        purpose: "Freelance",
        date: "2026",
        description:
            "A full-stack gym management platform for managing members, memberships, payments, workouts, and administrative operations.",
        image: projectImages.managementSystem,
        previewImages: [...projectImages.managementSystemScreens],
        githubUrl: "https://github.com/Kalyan-github-4/Peak-Performance/tree/feature/neon-replace",
        liveUrl: "",
        tags: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "PostgreSQL",
            "Neon",
            "Prisma",
        ],
        accent: "from-purple-600 via-indigo-500 to-sky-500",
    },
];
