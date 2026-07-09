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
                className="flex whitespace-nowrap text-[5rem] font-black uppercase leading-none tracking-tighter text-white/[0.035] mix-blend-screen sm:text-[max(6rem,10vw)] sm:text-white/5"
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
        return dist <= 1 ? 1 - dist * 0.04 : 0.92;
    });

    const opacity = useTransform(progress, (p) => {
        const dist = Math.abs(p - index);
        return dist <= 1 ? 1 : 0.25;
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
            className="absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-4xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_70px_rgba(0,0,0,0.55)] backface-hidden sm:rounded-[2.5rem] sm:shadow-[0_0_100px_rgba(0,0,0,0.55)]"
        >
            <motion.img
                src={project.src}
                alt={project.title}
                className="h-full w-full object-cover"
                style={{
                    scale: useTransform(progress, (p) => {
                        const dist = Math.abs(p - index);
                        return dist <= 0.5 ? 1 + (0.5 - dist) * 0.12 : 1;
                    }),
                }}
            />

            <div className="pointer-events-none absolute inset-0 bg-black/20 sm:bg-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] bg-linear-to-t from-black via-black/80 to-transparent sm:h-3/4 sm:via-black/70" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/50 to-transparent sm:h-32" />

            <div className="absolute bottom-0 left-0 flex w-full flex-col gap-3 p-4 sm:gap-3 sm:p-10">
                <div className="flex items-center gap-2 text-xs font-medium text-white/45 sm:gap-3 sm:text-sm">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-sm sm:px-3">
                        {(index + 1).toString().padStart(2, "0")}
                    </span>

                    {project.year && (
                        <>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span>{project.year}</span>
                        </>
                    )}
                </div>

                <motion.h2
                    className="bg-linear-to-b from-zinc-200 via-zinc-50 to-zinc-400 bg-clip-text pb-1 text-3xl font-medium leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: isActive ? 1 : 0.7,
                        y: isActive ? 0 : 10,
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {project.title}
                </motion.h2>

                {project.description && (
                    <p className="line-clamp-3 max-w-lg text-sm leading-6 text-white/65 sm:line-clamp-none sm:text-base sm:leading-7">
                        {project.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.05 }}
                            className="group relative rounded-full border border-white/15 bg-white/90 px-3 py-1 text-[11px] font-semibold text-black transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white sm:px-4 sm:py-1.5 sm:text-sm"
                            style={{
                                backgroundColor: project.color
                                    ? `${project.color}26`
                                    : undefined,
                                borderColor: project.color
                                    ? `${project.color}45`
                                    : undefined,
                            }}
                        >
                            <span className="relative flex items-center gap-2">
                                {tag}
                            </span>
                        </motion.span>
                    ))}
                </div>

                <div className="mt-2 flex items-center gap-3 sm:mt-3">
                    {project.githubUrl && (
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            onClick={(event) => event.stopPropagation()}
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white hover:text-black"
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
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white hover:text-black"
                        >
                            <ArrowSquareOut size={20} weight="duotone" />
                        </motion.a>
                    )}
                </div>
            </div>

            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-zinc-50/20 via-zinc-50/40 to-zinc-50/20"
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
                height: `${cardCount * 105}vh`,
            }}
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-3 perspective-distant sm:px-0">
                {/* Background linear orb */}
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
                    className="relative z-10 aspect-4/3 w-[92%] max-w-6xl sm:aspect-video"
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