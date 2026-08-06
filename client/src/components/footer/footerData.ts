import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"

import { socialLinks as socialProfiles } from "@/config"

export const currentYear = new Date().getFullYear()

export { diagonalStripeStyle } from "@/components/shared/stripeStyles"

export const generalLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Vault", href: "/vault" },
]

export const specificLinks = [
    { label: "Guest Book", href: "/more/guestbook" },
    { label: "Bucket List", href: "/more/bucket-list" },
    { label: "Uses", href: "/more/uses" },
    { label: "Attribution", href: "/more/attribution" },
]

export const moreLinks = [
    { label: "Book a call", href: "/contact" },
    { label: "Links", href: "/more/links" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
]

export const socialLinks = [
    {
        icon: GithubLogo,
        label: "GitHub",
        href: socialProfiles.github,
    },
    {
        icon: LinkedinLogo,
        label: "LinkedIn",
        href: socialProfiles.linkedin,
    },
    {
        icon: XLogo,
        label: "Twitter (X)",
        href: socialProfiles.x,
    },
]