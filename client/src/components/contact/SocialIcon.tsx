import type { ReactNode } from "react"

interface SocialIconProps {
    href: string
    children: ReactNode
}

export default function SocialIcon({ href, children }: SocialIconProps) {
    const isExternal = href.startsWith("http")

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
        >
            {children}
        </a>
    )
}