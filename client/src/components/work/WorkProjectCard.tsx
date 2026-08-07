import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import type { WorkProject } from "./workProjects"
import WorkTechPill from "./WorkTechPill"
import MobileAppPreview from "./MobileAppPreview"
import DesktopAppPreview from "./DesktopAppPreview"

type WorkProjectCardProps = {
    project: WorkProject
    index: number
}

/** External projects open in a new tab; in-app case studies stay client-side. */
function PreviewLink({
    href,
    label,
    children,
}: {
    href: string
    label: string
    children: ReactNode
}) {
    if (href.startsWith("http")) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group block"
                aria-label={label}
            >
                {children}
            </a>
        )
    }

    return (
        <Link to={href} className="group block" aria-label={label}>
            {children}
        </Link>
    )
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
            className={[
                "relative min-h-190 pb-20",
                isRight
                    ? "md:col-start-2 md:mt-65 md:pl-10"
                    : "md:col-start-1 md:pr-10",
            ].join(" ")}
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
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-white/80">
                        {project.number}
                    </span>

                    <span className="h-px w-12 bg-white/15" />

                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/55">
                        {project.category}
                    </span>
                </div>

                <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-mono text-xs font-semibold text-white/55">
                    {project.date}
                </span>
            </div>

            {/* Title */}
            <h3 className="mb-7 font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {project.title}
            </h3>

            {/* Preview Card */}
            <PreviewLink
                href={project.href}
                label={`View ${project.title} project`}
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

                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <ArrowUpRight size={21} weight="bold" />
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
            </PreviewLink>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                    <WorkTechPill key={tag} label={tag} />
                ))}
            </div>

            {/* Project Links */}
            <div className="mt-6 flex flex-wrap gap-3">
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/8 hover:text-white"
                    >
                        <GithubLogo size={18} weight="bold" />
                        GitHub
                    </a>
                )}

                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/8 hover:text-white"
                    >
                        <ArrowUpRight size={18} weight="bold" />
                        Live Preview
                    </a>
                )}
            </div>
        </motion.article>
    )
}