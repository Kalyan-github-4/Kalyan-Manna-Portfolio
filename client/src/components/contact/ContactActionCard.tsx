import type { ReactNode } from "react"

interface ContactActionCardProps {
    href: string
    visual: ReactNode
    title: string
    description: string
}

export default function ContactActionCard({
    href,
    visual,
    title,
    description,
}: ContactActionCardProps) {
    const isExternal = href.startsWith("http")
    const isDisabled = !href || href === "#"

    const content = (
        <>
            <div className="flex min-h-16 items-center justify-center">
                {visual}
            </div>

            <h3 className="mt-4 font-sans text-base font-semibold text-white">
                {title}
            </h3>

            <p className="mt-1 break-all font-mono text-xs font-semibold text-zinc-500">
                {description}
            </p>
        </>
    )

    if (isDisabled) {
        return (
            <button
                type="button"
                disabled
                className="group min-h-47 cursor-not-allowed rounded-3xl border border-white/10 bg-white/2.5 p-6 text-center opacity-50"
            >
                {content}
            </button>
        )
    }

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="
                group flex min-h-47 flex-col items-center justify-center
                rounded-3xl border border-white/10
                bg-linear-to-b from-white/4 to-white/1.5
                p-6 text-center
                shadow-inner shadow-white/2
                transition-all duration-500 ease-out
                hover:-translate-y-1
                hover:border-white/15
                hover:from-white/7
                hover:to-white/2.5
                hover:shadow-xl hover:shadow-black/20
                active:translate-y-0
            "
        >
            {content}
        </a>
    )
}