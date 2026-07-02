"use client";

import { useRef } from "react";
import {
    motion,
    useTransform,
    useSpring,
    MotionValue,
    useScroll,
} from "framer-motion";

export interface ProjectItem {
    title: string;
    tags: string[];
    bgText: string;
    src: string;
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
    const scaleY = useTransform(localProgress, [-0.5, 0, 0.5], [0, 1, 0]);

    const marqueeText = Array(4).fill(text).join(" ");

    return (
        <motion.div
            style={{
                opacity,
                scaleY,
                x: "-50%",
                y: "-50%",
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 w-[200vw] overflow-hidden"
        >
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 30,
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap text-[max(4rem,7.5vw)] font-black uppercase leading-none tracking-tighter text-white/10 mix-blend-screen"
            >
                <span>{marqueeText}</span>
                <span>{marqueeText}</span>
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({
    project,
    index,
    progress,
}: {
    project: ProjectItem;
    index: number;
    progress: MotionValue<number>;
}) {
    const visibility = useTransform(progress, (p) => {
        return Math.abs(p - index) <= 1 ? "visible" : "hidden";
    });

    return (
        <motion.div
            style={{
                rotateX: index * 180,
                visibility,
            }}
            className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.55)] [backface-visibility:hidden] sm:rounded-[2rem]"
        >
            <img
                src={project.src}
                alt={project.title}
                className="h-full w-full object-cover opacity-90"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 flex w-full flex-col gap-3 p-6 sm:p-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                    {project.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md sm:text-base"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function PerspectiveScrollShowcase({
    projects,
}: PerspectiveScrollShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 26,
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

    if (!projects || projects.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{
                height: `${cardCount * 120}vh`,
            }}
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.14),transparent_45%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(30,64,175,0.1),transparent_50%)]" />

                {projects.map((project, index) => (
                    <BackgroundText
                        key={`bg-${project.title}`}
                        index={index}
                        progress={normalizedProgress}
                        text={project.bgText}
                    />
                ))}

                <motion.div
                    style={{
                        rotateX,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 aspect-[4/3] w-[90%] max-w-6xl sm:aspect-[16/9]"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            index={index}
                            progress={normalizedProgress}
                            project={project}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}