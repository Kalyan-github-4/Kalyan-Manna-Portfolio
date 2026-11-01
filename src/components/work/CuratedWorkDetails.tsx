"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"

import FourPointStar from "../shared/FourPointStar"
import WorkTechPill from "./WorkTechPill"
import type { CuratedProject } from "@/data/curatedWorkData"

type CuratedWorkDetailsProps = {
    project: CuratedProject
    /** Position in the showcase, 0 first. */
    index: number
    total: number
}

/** The write-up beside the banner — position, title, pitch, highlights, stack. */
export default function CuratedWorkDetails({
    project,
    index,
    total,
}: CuratedWorkDetailsProps) {
    return (
        <div>
            <div className="flex items-center gap-3">
                {/* Position marker: the current project's dash is longest and in
                    its colour, the rest shorten and fade with distance from it. */}
                <div aria-hidden="true" className="flex w-7 shrink-0 flex-col gap-1.5">
                    {Array.from({ length: total }, (_, step) => {
                        const distance = Math.abs(step - index)

                        return (
                            <span
                                key={step}
                                className="h-0.5 rounded-full bg-white transition-all duration-300"
                                style={{
                                    width: distance === 0 ? 28 : Math.max(20 - (distance - 1) * 6, 8),
                                    opacity: distance === 0 ? 1 : Math.max(0.5 - (distance - 1) * 0.15, 0.2),
                                    backgroundColor: distance === 0 ? project.mark : undefined,
                                }}
                            />
                        )
                    })}
                </div>

                <span className="sr-only">
                    Project {index + 1} of {total}
                </span>

                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {project.title}
                    </h3>

                    <span className="rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* The banner already carries the description, so this is the pitch. */}
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {project.tagline}
            </p>

            {project.highlights.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                    {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                            {/* 16px star centred on the first 24px line: (24 − 16) / 2 = 4px. */}
                            <FourPointStar
                                size={16}
                                style={{ color: project.mark }}
                                className="mt-1 shrink-0"
                            />

                            <span className="text-sm leading-6 text-zinc-400">
                                {highlight}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <WorkTechPill key={tag} label={tag} />
                ))}
            </div>

            <Link
                href={`/work/${project.slug}`}
                className="group mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
                View project
                <ArrowRight
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
            </Link>
        </div>
    )
}
