"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ArrowUpRight,
    CaretLeft,
    CaretRight,
    GithubLogo,
    MagnifyingGlassPlus,
} from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { caseStudies, type CuratedProject } from "@/data/curatedWorkData"
import type { VaultPhoto } from "@/data/journeyData"
import { PhotoLightbox } from "@/components/vault/PhotoLightbox"
import {
    VAULT_CARD_FRAME,
    VAULT_FRAME_GUTTERS,
} from "@/components/vault/VaultFilterBar"
import Breadcrumbs from "@/components/shared/Breadcrumbs"
import EdgeStripes from "@/components/shared/EdgeStripes"
import FourPointStar from "@/components/shared/FourPointStar"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import WorkTechPill from "./WorkTechPill"

const EASE = [0.22, 1, 0.36, 1] as const

const PANEL = "rounded-3xl border border-white/10 bg-[#050507] p-5 sm:p-7"

interface ProjectLinkProps {
    project: CuratedProject
    direction: "previous" | "next"
}

/** Walks to a neighbouring project, led by that project's screenshot. */
function ProjectLink({ project, direction }: ProjectLinkProps) {
    const isNext = direction === "next"

    return (
        <Link
            href={`/work/${project.slug}`}
            aria-label={`${isNext ? "Next" : "Previous"} project: ${project.title}`}
            className="group relative block h-36 overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-44"
        >
            <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width:640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-900 ease-out group-hover:scale-105"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20"
            />

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 p-4 sm:p-5",
                    isNext && "text-right"
                )}
            >
                <span
                    className={cn(
                        "flex items-center gap-1 text-xs font-medium text-zinc-200",
                        isNext && "justify-end"
                    )}
                >
                    {!isNext && <CaretLeft size={12} weight="bold" aria-hidden="true" />}
                    {isNext ? "Next" : "Previous"}
                    {isNext && <CaretRight size={12} weight="bold" aria-hidden="true" />}
                </span>

                <span className="mt-1 block font-sans text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {project.title}
                </span>
            </div>
        </Link>
    )
}

export default function ProjectDetail({ slug }: { slug: string }) {
    const reduceMotion = useReducedMotion()
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const index = caseStudies.findIndex((item) => item.slug === slug)
    const project = caseStudies[index]

    if (!project) return null

    const isMobile = project.variant === "mobile"
    const allScreens = isMobile
        ? (project.mobileImages ?? [])
        : (project.previewImages ?? [project.image])
    const heroImage = allScreens[0] ?? project.image

    // The hero already shows the first screenshot unless a demo clip takes its
    // place, so the gallery only repeats it when that happens. Phone shots are
    // too tall for the hero, so they always live down here.
    const screens =
        project.video || isMobile ? allScreens : allScreens.slice(1)

    // The lightbox only reads the id and src; screenshots have no WebP set.
    const photos: VaultPhoto[] = screens.map((src, screenIndex) => ({
        id: src,
        src,
        srcSet: src,
        width: isMobile ? 9 : 16,
        height: isMobile ? 19 : 10,
        caption: `${project.title} screenshot ${screenIndex + 1}`,
    }))

    const previous =
        caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
    const next = caseStudies[(index + 1) % caseStudies.length]

    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frame gutters as /vault/[slug]. */}
            <section className="relative overflow-hidden bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    {/* Inset by the frame's padding, so the text lines up with
                        the edge of the panels below. */}
                    <motion.header
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={cn(VAULT_FRAME_GUTTERS, "mb-8 px-3")}
                    >
                        <Breadcrumbs currentLabel={project.title} />

                        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="mr-1 font-mono text-xs font-bold text-white/70">
                                        {project.number}
                                    </span>
                                    <span className="rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                                        {project.category}
                                    </span>
                                    <span className="rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200">
                                        {project.date}
                                    </span>
                                </div>

                                <h1 className="-ml-2 mt-3 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
                                    <GradientText
                                        colors={HEADING_GRADIENT}
                                        animationSpeed={6}
                                    >
                                        {project.title}
                                    </GradientText>
                                </h1>
                            </div>

                            <div>
                                <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
                                    {project.tagline}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
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
                            </div>
                        </div>
                    </motion.header>

                    {/* Hero: the demo clip when there is one, else a screenshot,
                        on the same gradient the project's card uses. */}
                    <div className={VAULT_CARD_FRAME} style={faintDiagonalStripeStyle}>
                        <div
                            className={cn(
                                "rounded-3xl bg-linear-to-br p-3 sm:p-6 lg:p-10",
                                project.accent
                            )}
                        >
                            <div
                                className={cn(
                                    "relative mx-auto overflow-hidden rounded-xl border border-white/30 bg-black shadow-2xl shadow-black/50 sm:rounded-2xl",
                                    // App clips are portrait, so they get a phone-shaped box.
                                    isMobile
                                        ? "aspect-9/19 h-[70vh] w-auto"
                                        : "aspect-video max-h-[75vh] w-full"
                                )}
                            >
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        poster={heroImage}
                                        controls
                                        playsInline
                                        preload="none"
                                        aria-label={`${project.title} demo`}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <Image
                                        src={heroImage}
                                        alt={`${project.title} screenshot`}
                                        fill
                                        priority
                                        sizes="100vw"
                                        className="object-cover object-top"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Write-up and stack */}
                    <div
                        className={cn(VAULT_CARD_FRAME, "mt-6 grid gap-3 lg:grid-cols-[3fr_2fr]")}
                        style={faintDiagonalStripeStyle}
                    >
                        <section aria-labelledby="project-overview" className={PANEL}>
                            <h2
                                id="project-overview"
                                className="font-sans text-xl font-semibold text-white sm:text-2xl"
                            >
                                Overview
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                                {project.description}
                            </p>

                            {project.highlights.length > 0 && (
                                <ul className="mt-5 space-y-3">
                                    {project.highlights.map((highlight) => (
                                        <li key={highlight} className="flex gap-3">
                                            <FourPointStar
                                                size={16}
                                                style={{ color: project.mark }}
                                                className="mt-1 shrink-0"
                                            />
                                            <span className="text-sm leading-6 text-zinc-200 sm:text-base">
                                                {highlight}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        <section aria-labelledby="project-stack" className={PANEL}>
                            <h2
                                id="project-stack"
                                className="font-sans text-xl font-semibold text-white sm:text-2xl"
                            >
                                Built with
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <WorkTechPill key={tag} label={tag} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Screens */}
                    {screens.length > 0 && (
                        <section
                            aria-label={`${project.title} screenshots`}
                            className={cn(
                                VAULT_CARD_FRAME,
                                "mt-6 grid gap-3",
                                isMobile
                                    ? "grid-cols-2 sm:grid-cols-3"
                                    : screens.length > 1 && "md:grid-cols-2"
                            )}
                            style={faintDiagonalStripeStyle}
                        >
                            {screens.map((src, screenIndex) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setOpenIndex(screenIndex)}
                                    aria-label={`Open screenshot ${screenIndex + 1} of ${screens.length}`}
                                    className={cn(
                                        "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition-colors duration-500 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                                        isMobile ? "aspect-9/19" : "aspect-16/10",
                                        // A lone screenshot shouldn't outsize the hero above it.
                                        !isMobile && screens.length === 1 && "w-full md:mx-auto md:w-2/3"
                                    )}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        sizes={isMobile ? "(min-width:640px) 33vw, 50vw" : "(min-width:768px) 50vw, 100vw"}
                                        className={cn(
                                            "transition-transform duration-900 ease-out group-hover:scale-105",
                                            isMobile ? "object-contain" : "object-cover object-top"
                                        )}
                                    />

                                    <span
                                        aria-hidden="true"
                                        className="absolute right-3 top-3 flex h-8 w-8 -translate-x-1 items-center justify-center rounded-full bg-white text-zinc-950 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <MagnifyingGlassPlus size={14} weight="bold" />
                                    </span>
                                </button>
                            ))}
                        </section>
                    )}

                    {/* Prev / next project */}
                    <nav
                        aria-label="Project navigation"
                        className={cn(VAULT_CARD_FRAME, "mt-6 grid gap-3 sm:grid-cols-2")}
                        style={faintDiagonalStripeStyle}
                    >
                        <ProjectLink project={previous} direction="previous" />
                        <ProjectLink project={next} direction="next" />
                    </nav>
                </div>
            </section>

            <PhotoLightbox
                photos={photos}
                index={openIndex}
                collectionTitle={project.title}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
        </main>
    )
}
