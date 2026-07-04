"use client";

import { useRef, useEffect, useState } from "react";
import {
    motion,
    useTransform,
    useSpring,
    MotionValue,
    useScroll,
    AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GithubLogo, ArrowSquareOut } from "@phosphor-icons/react";

export interface ProjectItem {
    title: string;
    tags: string[];
    bgText: string;
    src: string;
    description?: string;
    year?: string;
    color?: string;
    githubUrl?: string;
    liveUrl?: string;
    workUrl?: string;
}

interface PerspectiveScrollShowcaseProps {
    projects: ProjectItem[];
}

function BackgroundText({
    text,
    index,
    progress,
}: {
    text: string;
    index: number;
    progress: MotionValue<number>;
}) {
    const localProgress = useTransform(progress, (p) => p - index);

    const opacity = useTransform(localProgress, [-0.5, 0, 0.5], [0, 1, 0]);
    const scaleY = useTransform(localProgress, [-0.5, 0, 0.5], [0.7, 1, 0.7]);
    const blur = useTransform(
        localProgress,
        [-0.5, 0, 0.5],
        ["blur(10px)", "blur(0px)", "blur(10px)"]
    );

    const marqueeText = Array(6).fill(text).join(" • ");

    return (
        <motion.div
            style={{
                opacity,
                scaleY,
                filter: blur,
                x: "-50%",
                y: "-50%",
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 w-[200vw] overflow-hidden"
        >
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 25 + index * 5,
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap text-[max(6rem,10vw)] font-black uppercase leading-none tracking-[-0.05em] text-white/5 mix-blend-screen"
            >
                <span className="mr-[2em]">{marqueeText}</span>
                <span>{marqueeText}</span>
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({
    project,
    index,
    progress,
    isActive,
    onOpenProject,
}: {
    project: ProjectItem;
    index: number;
    progress: MotionValue<number>;
    isActive: boolean;
    onOpenProject: () => void;
}) {
    const visibility = useTransform(progress, (p) => {
        return Math.abs(p - index) <= 1.5 ? "visible" : "hidden";
    });

    const scale = useTransform(progress, (p) => {
        const dist = Math.abs(p - index);
        return dist <= 1 ? 1 - dist * 0.05 : 0.9;
    });

    const opacity = useTransform(progress, (p) => {
        const dist = Math.abs(p - index);
        return dist <= 1 ? 1 : 0.3;
    });

    return (
        <motion.div
            role="button"
            tabIndex={0}
            onClick={onOpenProject}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpenProject();
                }
            }}
            style={{
                rotateX: index * 180,
                scale,
                opacity,
                visibility,
            }}
            className="absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.55)] backface-hidden sm:rounded-[2.5rem]"
        >
            {/* Image with zoom effect */}
            <motion.img
                src={project.src}
                alt={project.title}
                className="h-full w-full object-cover"
                style={{
                    scale: useTransform(progress, (p) => {
                        const dist = Math.abs(p - index);
                        return dist <= 0.5 ? 1 + (0.5 - dist) * 0.2 : 1;
                    }),
                }}
            />

            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

            {/* Project content */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col gap-3 p-6 sm:p-10">
                {/* Project number indicator */}
                <div className="flex items-center gap-3 text-sm font-medium text-white/40">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {project.year && (
                        <>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span>{project.year}</span>
                        </>
                    )}
                </div>

                {/* Title with animation */}
                <motion.h2
                    className="text-4xl tracking-tight bg-linear-to-b from-zinc-400 via-zinc-100 to-zinc-50 bg-clip-text text-transparent sm:text-5xl lg:text-6xl pb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.5 }}
                >
                    {project.title}
                </motion.h2>

                {/* Description */}
                {project.description && (
                    <p className="max-w-lg text-sm text-white/60 sm:text-base">
                        {project.description}
                    </p>
                )}

                {/* Tags with glass-morphism */}
                <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag, tagIndex) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.05 }}
                            className="group relative rounded-full border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-black bg-white transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20"
                            style={{
                                backgroundColor: project.color ? `${project.color}20` : undefined,
                                borderColor: project.color ? `${project.color}40` : undefined,
                            }}
                        >
                            <span className="relative flex items-center gap-2">
                                {tag}
                            </span>
                        </motion.span>
                    ))}
                </div>

                {/* Project actions */}
                <div className="mt-3 flex items-center gap-3">
                    {project.githubUrl && (
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            onClick={(event) => event.stopPropagation()}
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white hover:text-black"
                        >
                            <GithubLogo size={20} weight="duotone" />
                        </motion.a>
                    )}

                    {project.liveUrl && (
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live preview`}
                            onClick={(event) => event.stopPropagation()}
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white hover:text-black"
                        >
                            <ArrowSquareOut size={20} weight="duotone" />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Progress indicator bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-zinc-50/20 via-zinc-50/40 to-zinc-50/20"
                style={{
                    width: useTransform(progress, (p) => {
                        const dist = Math.abs(p - index);
                        return dist <= 0.5 ? `${(1 - dist * 2) * 100}%` : "0%";
                    }),
                }}
            />
        </motion.div>
    );
}

export default function PerspectiveScrollShowcase({
    projects,
}: PerspectiveScrollShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const cardCount = projects.length;
    const maxIndex = Math.max(0, cardCount - 1);

    const rotateX = useTransform(springProgress, [0, 1], [0, maxIndex * 180]);

    const normalizedProgress = useTransform(
        springProgress,
        [0, 1],
        [0, maxIndex]
    );

    // Track active index
    useEffect(() => {
        return normalizedProgress.onChange((value) => {
            const index = Math.round(value);
            if (index >= 0 && index < projects.length) {
                setActiveIndex(index);
            }
        });
    }, [normalizedProgress, projects.length]);

    if (!projects || projects.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{
                height: `${cardCount * 120}vh`,
            }}
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden perspective-distant">
                {/* Background gradient orb */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-[80vh] w-[80vh] rounded-full bg-linear-to-r from-blue-500/5 to-purple-500/5 blur-3xl" />
                </div>

                {/* Background texts */}
                {projects.map((project, index) => (
                    <BackgroundText
                        key={`bg-${project.title}`}
                        index={index}
                        progress={normalizedProgress}
                        text={project.bgText}
                    />
                ))}

                {/* Navigation dots */}
                <div className="absolute right-8 top-1/2 z-20 -translate-y-1/2 flex-col gap-3 hidden sm:flex">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? 'w-12 bg-white'
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                            onClick={() => {
                                const targetScroll = (index / (projects.length - 1)) * containerRef.current!.scrollHeight;
                                containerRef.current?.scrollTo({
                                    top: targetScroll,
                                    behavior: 'smooth',
                                });
                            }}
                        />
                    ))}
                </div>

                {/* Main 3D container */}
                <motion.div
                    style={{
                        rotateX,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 aspect-[4/3] w-[92%] max-w-6xl sm:aspect-[16/9]"
                >
                    <AnimatePresence mode="wait">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                index={index}
                                progress={normalizedProgress}
                                project={project}
                                isActive={activeIndex === index}
                                onOpenProject={() => navigate(project.workUrl || "/work")}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}