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
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center", // Mobile app/phone
        href: "/work/easypg",
        githubUrl: "https://github.com/Kalyan-github-4",
        liveUrl: "",
        tags: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL"],
        accent: "from-violet-600 via-fuchsia-500 to-cyan-400",
        variant: "mobile",
        mobileImages: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=600&fit=crop&crop=center",
        ],
    },
    {
        number: "02",
        title: "Portfolio",
        category: "Web App",
        date: "2026",
        description:
            "A handcrafted personal portfolio with motion-driven storytelling, animated sections, and a guestbook experience.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center", // Portfolio/design
        href: "/work/portfolio",
        githubUrl: "https://github.com/Kalyan-github-4",
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
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center", // Code/Programming
        href: "/work/codeking",
        githubUrl: "https://github.com/Kalyan-github-4",
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
        image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&h=600&fit=crop&crop=center", // Notes/messages
        href: "/more/guestbook",
        githubUrl: "https://github.com/Kalyan-github-4",
        liveUrl: "",
        tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
        accent: "from-purple-600 via-indigo-500 to-sky-500",
    },
]