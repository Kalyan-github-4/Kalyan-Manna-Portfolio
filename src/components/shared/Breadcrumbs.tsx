"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { House } from "@phosphor-icons/react"

/** "bucket-list" -> "Bucket List" */
const toLabel = (segment: string) =>
    decodeURIComponent(segment)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

interface BreadcrumbsProps {
    /** Name of the page itself, for when its URL slug doesn't read well. */
    currentLabel?: string
}

/** Home icon / work / deadweight — the trail is built from the current URL. */
export default function Breadcrumbs({ currentLabel }: BreadcrumbsProps) {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-zinc-400">
                <li>
                    <Link
                        href="/"
                        aria-label="Home"
                        className="flex h-5 w-5 items-center justify-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                        <House size={16} weight="fill" aria-hidden="true" />
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    const isCurrent = index === segments.length - 1

                    return (
                        <Fragment key={segment}>
                            <li aria-hidden="true" className="text-zinc-600">
                                /
                            </li>

                            <li>
                                {isCurrent ? (
                                    <span aria-current="page" className="text-white">
                                        {currentLabel ?? toLabel(segment)}
                                    </span>
                                ) : (
                                    <Link
                                        href={`/${segments.slice(0, index + 1).join("/")}`}
                                        className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                    >
                                        {toLabel(segment)}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}
