import { useMemo, useState, type ReactNode } from "react"
import {
    ArrowRight,
    CalendarBlank,
    EnvelopeSimple,
    GithubLogo,
    LinkedinLogo,
    XLogo,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ContactDialogProps {
    children: ReactNode
    email?: string
    name?: string
    imageSrc?: string
    imageAlt?: string
    calUrl?: string
    linkedinUrl?: string
    xUrl?: string
    githubUrl?: string
}

export function ContactDialog({
    children,
    email = "kalyanmanna439@gmail.com",
    name = "Kalyan",
    imageSrc = "/kalyan-manna.jpg",
    imageAlt = "Kalyan Manna",
    calUrl = "#",
    linkedinUrl = "https://www.linkedin.com/",
    xUrl = "https://x.com/",
    githubUrl = "https://github.com/Kalyan-github-4",
}: ContactDialogProps) {
    const [message, setMessage] = useState("")

    const mailHref = useMemo(() => {
        const subject = encodeURIComponent("Project Inquiry")
        const body = encodeURIComponent(message)

        return `mailto:${email}?subject=${subject}&body=${body}`
    }, [email, message])

    const hasMessage = message.trim().length > 0

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#101014]/95 p-0 text-white shadow-2xl shadow-black/50 backdrop-blur-2xl sm:max-w-xl sm:rounded-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative overflow-hidden rounded-[inherit]"
                >
                    <div className="relative p-4 sm:p-5">
                        <DialogHeader className="mb-4 text-left">
                            <DialogTitle className="font-sans text-xl font-semibold text-white">
                                Reach out
                            </DialogTitle>

                            <DialogDescription className="text-sm text-zinc-500">
                                Send a message, book a call, or email me directly.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-inner shadow-white/2 transition duration-500 hover:border-white/15 hover:bg-white/5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={imageSrc}
                                    alt={imageAlt}
                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Send {name} a message
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        I usually reply within a day
                                    </p>
                                </div>
                            </div>

                            <textarea
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder={`Hey ${name}, I have a project idea...`}
                                className="mt-4 min-h-28 w-full resize-none border-none bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
                            />

                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                                <p className="hidden text-xs text-zinc-500 sm:block">
                                    Press Ctrl + Enter to continue
                                </p>

                                {hasMessage ? (
                                    <a
                                        href={mailHref}
                                        className="group ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-black active:translate-y-0"
                                    >
                                        Continue
                                        <ArrowRight
                                            size={14}
                                            className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                                        />
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="ml-auto inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/4 px-4 py-2 text-xs font-medium text-zinc-600"
                                    >
                                        Continue
                                        <ArrowRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <ContactActionCard
                                href={calUrl}
                                icon={<CalendarBlank size={26} />}
                                title="Book a call"
                                description="30 min · no strings"
                            />

                            <ContactActionCard
                                href={mailHref}
                                icon={<EnvelopeSimple size={26} />}
                                title="Email me"
                                description={email}
                            />
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                            <SocialLink
                                href={linkedinUrl}
                                icon={<LinkedinLogo size={16} />}
                                label="LinkedIn"
                            />

                            <SocialLink
                                href={xUrl}
                                icon={<XLogo size={16} />}
                                label="X / Twitter"
                            />

                            <SocialLink
                                href={githubUrl}
                                icon={<GithubLogo size={16} />}
                                label="GitHub"
                            />
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

interface ContactActionCardProps {
    href: string
    icon: ReactNode
    title: string
    description: string
}

function ContactActionCard({
    href,
    icon,
    title,
    description,
}: ContactActionCardProps) {
    const isExternal = href.startsWith("http")

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/20 active:translate-y-0"
        >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                {icon}
            </div>

            <h3 className="mt-4 font-sans font-semibold text-white">{title}</h3>
            <p className="mt-1 break-all text-xs text-zinc-500">{description}</p>
        </a>
    )
}

interface SocialLinkProps {
    href: string
    icon: ReactNode
    label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-medium text-zinc-400 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:text-white active:translate-y-0"
        >
            <span className="transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
                {icon}
            </span>
            {label}
        </a>
    )
}