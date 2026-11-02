// Dates come from the git history, the stack from package.json and the fonts
// from app/layout.tsx and styles/theme.css. Keep them in step when those change.

export const story: string[] = [
    "This site started in June 2026 as a hero section and a navbar I kept redesigning. Within days it had real pages and the first version of a guestbook.",
    "By July you could sign in and leave a note on the wall, and the Vault arrived to hold the hackathons and meetups I wanted to remember. The bento grid on the home page followed at the end of August.",
    "Then came the invisible work. In September the whole site moved from Vite and React Router to the Next.js App Router, and in October the separate Express API moved into Next.js route handlers, leaving one codebase at the root of the repo.",
    "Project pages, the bucket list, the uses page and this one came next. Almost 200 commits in, it's still a work in progress.",
]

export const milestones: { date: string; label: string }[] = [
    { date: "Jun 2026", label: "First commit" },
    { date: "Jun 2026", label: "Multi-page routing and guestbook UI" },
    { date: "Jul 2026", label: "Guestbook sign-in and saved messages" },
    { date: "Jul 2026", label: "The Vault replaces highlights" },
    { date: "Aug 2026", label: "Bento grid on the home page" },
    { date: "Sep 2026", label: "Migration from Vite to Next.js" },
    { date: "Oct 2026", label: "Express API moves to route handlers" },
    { date: "Nov 2026", label: "Project pages, bucket list and uses" },
]

export const people: { name: string; note: string; href: string; site: string }[] = [
    {
        name: "Apna College",
        note: "Where my coding journey began with python.",
        href: "https://www.youtube.com/@ApnaCollegeOfficial",
        site: "YouTube",
    },
    {
        name: "CodeWithHarry",
        note: "Made learning to code simpler, smarter and more fun.",
        href: "https://www.youtube.com/@CodeWithHarry",
        site: "YouTube",
    },
    {
        name: "Huxn WebDev",
        note: "Helped me explore modern web developement.",
        href: "https://www.youtube.com/@huxnwebdev",
        site: "YouTube",
    },
    {
        name: "Yousuf Mallik",
        note: "The senior who sparked my journey and inspired me to dream bigger.",
        href: "https://www.linkedin.com/in/yousuf-mallik/",
        site: "LinkedIn",
    },
]

export const stack: { group: string; items: string[] }[] = [
    { group: "Framework", items: ["Next.js", "React", "TypeScript"] },
    {
        group: "Styling & motion",
        items: ["Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Radix UI"],
    },
    {
        group: "3D & graphics",
        items: ["Three.js", "React Three Fiber", "Drei", "Cobe"],
    },
    {
        group: "Data & auth",
        items: ["PostgreSQL", "Drizzle ORM", "Clerk", "Zod"],
    },
    { group: "Services", items: ["Vercel", "Cal.com", "Nodemailer"] },
    {
        group: "Tooling",
        items: ["GitHub", "ESLint", "Prettier", "Sharp", "Deadweight", "Claude Code"],
    },
]

export const typefaces: {
    name: string
    role: string
    sample: string
    className: string
}[] = [
    {
        name: "Instrument Serif",
        role: "Headings and names",
        sample: "Moments worth keeping",
        className: "font-display text-3xl",
    },
    {
        name: "Poppins",
        role: "Body copy and interface",
        sample: "From idea to deployed",
        className: "font-sans text-2xl font-medium",
    },
    {
        name: "Caveat",
        role: "Handwriting on the bucket list",
        sample: "Things I'll do before I'm done",
        className: "font-hand text-3xl",
    },
    {
        name: "System monospace",
        role: "Small labels and code",
        sample: "const ship = () => {}",
        className: "font-mono text-xl",
    },
]

export const thanks: { name: string; note: string; href: string; site: string }[] = [
    {
        name: "shadcn/ui",
        note: "The component setup behind the dialogs and tooltips",
        href: "https://ui.shadcn.com",
        site: "ui.shadcn.com",
    },
    {
        name: "Google Fonts",
        note: "Where Instrument Serif, Poppins and Caveat come from",
        href: "https://fonts.google.com",
        site: "fonts.google.com",
    },
    {
        name: "Phosphor Icons",
        note: "Most of the interface icons",
        href: "https://phosphoricons.com",
        site: "phosphoricons.com",
    },
    {
        name: "React Icons",
        note: "The brand logos across the site",
        href: "https://react-icons.github.io/react-icons",
        site: "react-icons.github.io",
    },
    {
        name: "Radix UI",
        note: "Accessible primitives under the dialogs and menus",
        href: "https://www.radix-ui.com",
        site: "radix-ui.com",
    },
    {
        name: "Cobe",
        note: "The globe in the timezone card",
        href: "https://cobe.vercel.app",
        site: "cobe.vercel.app",
    },
    {
        name: "21st.dev",
        note: "The integration card behind the uses tile",
        href: "https://21st.dev",
        site: "21st.dev",
    },
    {
        name: "Unsplash",
        note: "Stock photos used around the site",
        href: "https://unsplash.com",
        site: "unsplash.com",
    },
]
