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
}

export const workProjects: WorkProject[] = [
    {
        number: "01",
        title: "EasyPG",
        category: "Mobile App",
        date: "2026",
        description:
            "A PG discovery and management platform built for students, owners, and real-world rental workflows.",
        image: projectImages.easyPg,
        href: "/work/easypg",
        githubUrl: socialLinks.github,
        liveUrl: "",
        tags: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
        accent: "from-violet-600 via-fuchsia-500 to-cyan-400",
        variant: "mobile",
        mobileImages: [...projectImages.easyPgScreens],
    },
    {
        number: "02",
        title: "Portfolio",
        category: "Web App",
        date: "2026",
        description:
            "A handcrafted personal portfolio with motion-driven storytelling, animated sections, and a guestbook experience.",
        image: projectImages.portfolio,
        href: "/work/portfolio",
        githubUrl: socialLinks.github,
        liveUrl: "",
        tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        accent: "from-cyan-500 via-blue-600 to-violet-600",
    },
    {
        number: "03",
        title: "CodeKing",
        category: "Learning Platform",
        date: "2025",
        description:
            "A coding learning platform concept focused on programming practice, structured content, and learner progress.",
        image: projectImages.codeking,
        href: "/work/codeking",
        githubUrl: socialLinks.github,
        liveUrl: "",
        tags: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
        accent: "from-orange-500 via-pink-500 to-purple-600",
    },
    {
        number: "04",
        title: "Guestbook Wall",
        category: "Interactive UI",
        date: "2026",
        description:
            "A playful guestbook wall where visitors can leave thoughts with gradient cards, avatars, and doodle-style interactions.",
        image: projectImages.guestbookWall,
        href: "/more/guestbook",
        githubUrl: socialLinks.github,
        liveUrl: "",
        tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
        accent: "from-purple-600 via-indigo-500 to-sky-500",
    },
]