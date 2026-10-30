"use client"

import { ArrowsOut, ArrowUpRight, Pause, Play } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"

import MobileAppScreens from "./MobileAppScreens"
import type { CuratedProject } from "@/data/curatedWorkData"

type CuratedWorkCardProps = {
    project: CuratedProject
}

const EASE = [0.22, 1, 0.36, 1] as const

/** External projects open in a new tab; in-app case studies stay client-side. */
function CardShell({
    href,
    label,
    className,
    children,
}: {
    href: string
    label: string
    className: string
    children: ReactNode
}) {
    if (href.startsWith("http")) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={className}
            >
                {children}
            </a>
        )
    }

    return (
        <Link href={href} aria-label={label} className={className}>
            {children}
        </Link>
    )
}

/**
 * Plays the project's demo clip filling the card. Sits beside the link rather
 * than inside it, since a button can't live in an anchor. The clip only shows
 * once started, and drops back to the card when it ends.
 */
function CardVideo({ src, title }: { src: string; title: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [started, setStarted] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [fullscreen, setFullscreen] = useState(false)

    // Native controls only in fullscreen, where there is room for a scrubber
    // and the card's own buttons are out of reach.
    useEffect(() => {
        const onChange = () => {
            setFullscreen(document.fullscreenElement === videoRef.current)
        }

        document.addEventListener("fullscreenchange", onChange)
        return () => document.removeEventListener("fullscreenchange", onChange)
    }, [])

    // Scrolling the card away pauses it, so the clip never plays off-screen.
    // Fullscreen counts as away on some browsers, so it's exempt.
    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && !document.fullscreenElement) {
                    videoRef.current?.pause()
                }
            },
            { threshold: 0.25 },
        )

        observer.observe(wrapper)
        return () => observer.disconnect()
    }, [])

    const toggle = () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            setStarted(true)
            void video.play()
        } else {
            video.pause()
        }
    }

    // Starts the clip if needed, then hands it to the browser's fullscreen.
    // iOS Safari has no element fullscreen, only its own video player.
    const openFullscreen = () => {
        const video = videoRef.current as
            | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
            | null
        if (!video) return

        setStarted(true)
        void video.play()

        if (video.requestFullscreen) {
            void video.requestFullscreen()
        } else {
            video.webkitEnterFullscreen?.()
        }
    }

    return (
        <div ref={wrapperRef} className="pointer-events-none absolute inset-0 z-20">
            <video
                ref={videoRef}
                src={src}
                preload="none"
                playsInline
                controls={fullscreen}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                    setStarted(false)
                    const video = videoRef.current as
                        | (HTMLVideoElement & { webkitExitFullscreen?: () => void })
                        | null
                    if (!video) return

                    video.currentTime = 0

                    // Leaves fullscreen too, on iOS Safari via its own video player.
                    if (document.fullscreenElement === video) {
                        void document.exitFullscreen()
                    } else {
                        video.webkitExitFullscreen?.()
                    }
                }}
                onClick={fullscreen ? undefined : toggle}
                // Cropped to fill the card, but shown whole in fullscreen.
                className={`absolute inset-0 h-full w-full rounded-xl bg-black object-cover transition-opacity duration-500 [&:fullscreen]:rounded-none [&:fullscreen]:object-contain ${started ? "pointer-events-auto opacity-100" : "opacity-0"}`}
            />

            {/* Always shown until it plays; while playing it only appears on
                hover or focus, so it doesn't sit on top of the clip. */}
            <button
                type="button"
                onClick={toggle}
                aria-label={`${playing ? "Pause" : "Play"} ${title} demo`}
                className={`pointer-events-auto absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-linear-to-b from-zinc-700 to-zinc-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.45)] transition-[opacity,colors] duration-300 hover:from-zinc-600 hover:to-zinc-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:size-20 ${playing ? "opacity-0 group-hover/video:opacity-100" : "opacity-100"}`}
            >
                {playing ? (
                    <Pause size={26} weight="fill" aria-hidden="true" />
                ) : (
                    <Play size={26} weight="fill" aria-hidden="true" className="translate-x-0.5" />
                )}
            </button>

            {/* Always on hand in the corner — the card crops the clip, so
                this is the way to see all of it. */}
            <button
                type="button"
                onClick={openFullscreen}
                aria-label={`Watch ${title} demo in fullscreen`}
                className="pointer-events-auto absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.09] bg-zinc-900/85 px-3.5 py-2 text-xs font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:bg-zinc-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:bottom-5 sm:right-5"
            >
                <ArrowsOut size={15} weight="bold" aria-hidden="true" />
                Full screen
            </button>
        </div>
    )
}

/** The colour banner — the project blurb over a cropped screenshot. */
export default function CuratedWorkCard({ project }: CuratedWorkCardProps) {
    const isMobile = project.variant === "mobile"

    const shots = isMobile
        ? (project.mobileImages?.length ? project.mobileImages : [project.image])
        : [project.previewImages?.[0] ?? project.image]

    return (
        // Doubles as the mat around the card: a hairline frame set a few pixels
        // off the artwork, radius sized to stay concentric with it.
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-[20px] border border-white/10 bg-white/4 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:rounded-[22px] lg:p-2.5"
        >
            <div className="group/video relative">
            <CardShell
                href={project.href}
                label={`View ${project.title}`}
                // Phones get a shorter card. The artwork is anchored to the
                // bottom edge, so trimming the height closes the dead band
                // between the blurb and the mockup rather than cropping either.
                className={`group relative block h-[46vh] max-h-110 min-h-78 overflow-hidden rounded-xl bg-linear-to-br p-6 sm:h-[58vh] sm:max-h-155 sm:min-h-95 sm:p-8 lg:h-[74vh] lg:max-h-176 lg:p-10 ${project.accent}`}
            >
                {/* Lifts the copy off the brighter gradient stops. Also
                    carries the top-edge highlight — on the card itself it would
                    sit under this layer's darkening and read muddy. Radius has
                    to match the card's so the hairline follows the corners. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.22),transparent_45%),linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.3))] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                />

                <div className="relative z-10 flex items-start justify-between gap-6">
                    {/* Same copy the /work banners carry, so a project reads
                        the same wherever it is shown. */}
                    <p className="max-w-[85%] text-sm font-medium leading-snug text-white sm:text-base lg:text-xl lg:leading-[1.3]">
                        {project.description}
                    </p>

                    <ArrowUpRight
                        size={26}
                        weight="bold"
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-white/85 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    />
                </div>

                {/* Runs off the bottom edge of the card rather than sitting
                    inside it — the crop is the point. App projects get the
                    same phone fan the work timeline uses. */}
                {isMobile ? (
                    <MobileAppScreens
                        images={shots}
                        label={project.title}
                        className="absolute inset-x-6 bottom-[-38px] z-10 flex items-end justify-center sm:inset-x-10"
                    />
                ) : (
                <div className="absolute inset-x-6 bottom-0 top-[20%] flex items-end sm:inset-x-10 sm:top-[28%]">
                    <div
                        className="
            relative w-full overflow-hidden
            rounded-[18px]
            border border-white/15
            bg-[#141217]
            p-2.5
            shadow-[0_35px_80px_rgba(0,0,0,.45),0_8px_24px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.08)]
            transition-all duration-700
            group-hover:-translate-y-2
        "
                    >
                        {/* Window chrome */}
                        <div className="mb-3 flex h-9 items-center justify-between rounded-[10px] border border-white/6 bg-[#1a1820] px-4">
                            <div className="flex gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                            </div>

                            <div className="h-2 w-28 rounded-full bg-white/8" />

                            <div className="h-7 w-20 rounded-full bg-white/6" />
                        </div>

                        {/* Screenshot */}
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                            <img
                                src={shots[0]}
                                alt={`${project.title} preview`}
                                loading="lazy"
                                decoding="async"
                                className="
                    h-full w-full object-cover object-top
                    transition-transform duration-700
                    group-hover:scale-[1.03]
                "
                            />
                        </div>

                        {/* Glass reflection */}
                        <div
                            aria-hidden
                            className="
                pointer-events-none absolute inset-0
                bg-[linear-gradient(120deg,rgba(255,255,255,.08),transparent_30%,transparent_70%,rgba(255,255,255,.03))]
            "
                        />

                        {/* Glow */}
                        <div
                            aria-hidden
                            className="
                absolute inset-0 rounded-[18px]
                shadow-[inset_0_1px_0_rgba(255,255,255,.12)]
            "
                        />
                    </div>
                </div>
                )}
            </CardShell>

            {project.video && <CardVideo src={project.video} title={project.title} />}
            </div>
        </motion.div>
    )
}
