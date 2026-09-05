"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
    ArrowRight,
    CheckIcon,
    CopyIcon,
    GithubLogo,
    InstagramLogo,
    LinkedinLogo,
    Mailbox,
    XIcon,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ContactActionCard from "@/components/contact/ContactActionCard"
import { contactConfig } from "@/config"
import { CaretLeft } from "@phosphor-icons/react"

interface ContactDialogProps {
    children: ReactNode
    email?: string
    name?: string
    imageSrc?: string
    imageAlt?: string
    calUrl?: string
    linkedinUrl?: string
    instagramUrl?: string
    githubUrl?: string
}

export function ContactDialog({
    children,
    email = contactConfig.email,
    name = contactConfig.name,
    imageSrc = contactConfig.imageSrc,
    imageAlt = contactConfig.imageAlt,
    linkedinUrl = contactConfig.linkedinUrl,
    instagramUrl = contactConfig.instagramUrl,
    githubUrl = contactConfig.githubUrl,
}: ContactDialogProps) {
    const [message, setMessage] = useState("")
    const [copied, setCopied] = useState(false)

    const mailHref = useMemo(() => {
        const subject = encodeURIComponent("Project Inquiry")
        const body = encodeURIComponent(message)

        return `mailto:${email}?subject=${subject}&body=${body}`
    }, [email, message])

    const hasMessage = message.trim().length > 0

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            console.error("Failed to copy email:", err)
        }
    }

    // Enter sends, Shift + Enter breaks the line — the hint under the
    // textarea promises this, so it has to be wired here.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== "Enter" || event.shiftKey) return

        event.preventDefault()
        if (hasMessage) {
            window.location.href = mailHref
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent
                data-lenis-prevent
                className="max-h-[90vh] max-w-[calc(100%-1.5rem)] overflow-y-auto border-0 bg-transparent p-0 text-white shadow-none ring-0 sm:max-w-xl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex h-12 flex-1 items-center rounded-2xl border border-white/10 bg-[#131316]/90 px-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:h-13 sm:px-5">
                            <DialogTitle className="font-sans text-[15px] font-semibold text-white sm:text-base flex items-center gap-2">
                                <CaretLeft size={16} />
                                <span>Reach out</span>
                            </DialogTitle>

                            <DialogDescription className="sr-only">
                                Send a message, book a call, or email me directly.
                            </DialogDescription>
                        </div>

                        <HeaderButton
                            onClick={handleCopy}
                            label={copied ? "Email copied" : "Copy email address"}
                        >
                            {copied ? (
                                <CheckIcon size={16} className="text-green-400" />
                            ) : (
                                <CopyIcon size={16} />
                            )}
                        </HeaderButton>

                        <DialogClose asChild>
                            <HeaderButton label="Close">
                                <XIcon size={16} />
                            </HeaderButton>
                        </DialogClose>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#101014]/95 p-2.5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:rounded-4xl sm:p-3">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-inner shadow-white/2 transition duration-500 hover:border-white/15 hover:bg-white/5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={36}
                                    height={36}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Send {name} a message
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        I usually reply within a day
                                    </p>
                                </div>
                            </div>

                            <textarea
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={`Hey ${name}, I have a project idea...`}
                                className="mt-4 min-h-28 w-full resize-none border-none bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-400"
                            />

                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                                <p className="hidden items-center gap-1.5 text-xs text-zinc-400 sm:flex">
                                    <Kbd>↵</Kbd>
                                    to continue
                                    <span className="text-zinc-600">·</span>
                                    <Kbd>⇧</Kbd>
                                    <Kbd>↵</Kbd>
                                    new line
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
                                        className="ml-auto inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/4 px-4 py-2 text-xs font-medium text-zinc-400"
                                    >
                                        Continue
                                        <ArrowRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                            <ContactActionCard
                                href="/contact?book-call"
                                title="Book a call"
                                description="30 min · no strings"
                                visual={
                                    <div className="flex items-center justify-center gap-3">
                                        <img
                                            src="/kalyan-manna.webp"
                                            alt="Kalyan Manna"
                                            width={52}
                                            height={52}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-13 w-13 rounded-full object-cover ring-2 ring-white/15"
                                        />

                                        <span className="text-xl font-medium text-zinc-400">+</span>

                                        <div className="flex h-13 w-13 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-zinc-300 shadow-inner shadow-white/5">
                                            You
                                        </div>
                                    </div>
                                }
                            />

                            <ContactActionCard
                                href={`mailto:${email}`}
                                title="Email me"
                                description={email}
                                visual={
                                    <Mailbox
                                        size={48}
                                        weight="light"
                                        className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                                    />
                                }
                            />
                        </div>

                        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                            <SocialLink
                                href={linkedinUrl}
                                icon={<LinkedinLogo size={16} />}
                                label="LinkedIn"
                            />

                            <SocialLink
                                href={githubUrl}
                                icon={<GithubLogo size={16} />}
                                label="GitHub"
                            />

                            <SocialLink
                                href={instagramUrl}
                                icon={<InstagramLogo size={16} />}
                                label="Instagram"
                            />
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

interface HeaderButtonProps extends React.ComponentProps<"button"> {
    label: string
    children: ReactNode
}

function HeaderButton({ label, children, ...props }: HeaderButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-[#131316]/90 text-zinc-300 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-500 ease-out hover:border-white/20 hover:bg-white/10 hover:text-white active:translate-y-0 sm:h-13 sm:w-13"
            {...props}
        >
            {children}
        </button>
    )
}

function Kbd({ children }: { children: ReactNode }) {
    return (
        <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 px-1 font-sans text-[10px] leading-none text-zinc-300">
            {children}
        </kbd>
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
            className="group inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.035] px-2 py-3 text-xs font-medium whitespace-nowrap text-zinc-400 transition-all duration-500 ease-out hover:border-white/15 hover:bg-white/[0.07] hover:text-white active:translate-y-0 sm:gap-2 sm:px-4"
        >
            <span className="transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
                {icon}
            </span>
            {label}
        </a>
    )
}
