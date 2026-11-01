"use client"

import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Link from "next/link"

import type { WorkProject } from "@/data/workProjects"
import WorkTechPill from "./WorkTechPill"
import MobileAppPreview from "./MobileAppPreview"
import DesktopAppPreview from "./DesktopAppPreview"

type WorkProjectCardProps = {
    project: WorkProject
    index: number
}

export default function WorkProjectCard({
    project,
    index,
}: WorkProjectCardProps) {
    const isRight = index % 2 !== 0

    return (
        <motion.article
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{ order: index }}
            className={["relative", isRight ? "md:pl-10" : "md:pr-10"].join(" ")}
        >
            {/* Horizontal connector line */}
            <div
                className={[
                    "absolute top-12 hidden h-px bg-white/10 md:block",
                    isRight ? "left-0 w-10" : "right-0 w-10",
                ].join(" ")}
            />

            {/* Timeline Dot */}
            <span
                className={[
                    "absolute top-10 hidden h-4 w-4 rounded-full border border-white/15 bg-black md:block",
                    "after:absolute after:left-1/2 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white/40",
                    isRight ? "-left-2" : "-right-2",
                ].join(" ")}
            />

            {/* Meta Row */}
            <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-xs font-bold text-white/70">
                        {project.number}
                    </span>

                    <span className="h-px w-8 bg-white/15" />

                    <span className="truncate text-sm font-medium text-zinc-400">
                        {project.category}
                    </span>
                </div>

                <span className="shrink-0 rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                    {project.date}
                </span>
            </div>

            {/* Title */}
            <h3 className="mb-5 font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {project.title}
            </h3>

            {/* Preview Card */}
            <Link
                href={`/work/${project.slug}`}
                aria-label={`View the ${project.title} project`}
                className="group block"
            >
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative overflow-hidden rounded-[28px] border border-white/15 bg-zinc-950 p-2 shadow-2xl shadow-black/40"
                >
                    <div
                        className={[
                            "relative min-h-105 overflow-hidden rounded-[22px] bg-linear-to-br p-7",
                            project.variant === "mobile" ? "min-h-125" : "min-h-105",
                            project.accent,
                        ].join(" ")}
                    >
                        {project.variant === "mobile" && project.mobileImages?.length ? (
                            <MobileAppPreview
                                description={project.description}
                                images={project.mobileImages}
                                label={project.title}
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.45))]" />

                                <div className="relative z-10 flex items-start justify-between gap-6">
                                    <p className="max-w-xl text-sm font-medium leading-relaxed text-zinc-200 md:text-base">
                                        {project.description}
                                    </p>

                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:translate-x-1">
                                        <ArrowRight size={21} weight="bold" />
                                    </span>
                                </div>

                                <DesktopAppPreview
                                    title={project.title}
                                    images={
                                        project.previewImages?.length
                                            ? project.previewImages
                                            : [project.image]
                                    }
                                />
                            </>
                        )}
                    </div>
                </motion.div>
            </Link>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <WorkTechPill key={tag} label={tag} />
                ))}
            </div>

            {/* Project Links */}
            <div className="mt-5 flex flex-wrap gap-2">
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                        Live Preview
                    </a>
                )}

                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/6 px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                        <GithubLogo size={16} weight="bold" aria-hidden="true" />
                        GitHub
                    </a>
                )}
            </div>
        </motion.article>
    )
}