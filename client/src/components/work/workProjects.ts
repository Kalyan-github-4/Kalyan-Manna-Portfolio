import { projectImages, socialLinks } from "@/config"

export type WorkProject = {
    number: string
    title: string
    category: string
    date: string
    description: string
    image: string
    href: string
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
        title: "HopeBridge",
        category: "Website",
        date: "2026",
        description:
            "A multi-page site for an NGO working with vulnerable children across India — causes, impact reporting, and a donation flow front and centre.",
        image: projectImages.hopeBridge,
        previewImages: [...projectImages.hopeBridgeScreens],
        href: "https://ngo-portfolio-2.vercel.app",
        githubUrl: "https://github.com/Kalyan-github-4/NGO-portfolio-2",
        liveUrl: "https://ngo-portfolio-2.vercel.app",
        tags: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
        ],
        accent: "from-emerald-700 via-emerald-500 to-orange-500",
    },
    {
        number: "02",
        title: "GitHub Roast",
        category: "Web App",
        date: "2026",
        description:
            "A fun and interactive web app that analyzes GitHub profiles and generates witty roasts, humorous insights, and developer scores.",
        image: projectImages.githubRoast,
        previewImages: [...projectImages.githubRoastScreens],
        href: "https://git-hub-roast-mauve.vercel.app/",
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
        number: "03",
        title: "Portfolio",
        category: "Web App",
        date: "2026",
        description:
            "A handcrafted personal portfolio featuring motion-driven storytelling, interactive sections, project case studies, and a guestbook experience.",
        image: projectImages.portfolioScreens[0],
        previewImages: [...projectImages.portfolioScreens],
        href: "https://www.kalyanmanna.com",
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
        number: "04",
        title: "EasyPG",
        category: "Mobile App",
        date: "2026",
        description:
            "A PG discovery and management platform designed for students and property owners, covering real-world rental and booking workflows.",
        image: projectImages.easyPg,
        previewImages: [...projectImages.easyPgScreens],
        href: "https://github.com/Kalyan-github-4/EasyPG-App",
        githubUrl: socialLinks.github,
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
        number: "05",
        title: "Gym Management System",
        category: "Web App",
        date: "2026",
        description:
            "A full-stack gym management platform for managing members, memberships, payments, workouts, and administrative operations.",
        image: projectImages.managementSystem,
        previewImages: [...projectImages.managementSystemScreens],
        href: "/more/management-system",
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