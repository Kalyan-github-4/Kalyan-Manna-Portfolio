"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import GradientText from "@/components/shared/GradientText";
import PerspectiveScrollShowcase from "./PerspectiveScrollShowcase";
import type { ProjectItem } from "./PerspectiveScrollShowcase";
import { workProjects } from "./workProjects";
import { useRef } from "react";

// Short marquee word + tint per project, keyed by workProjects title.
// Everything else (image, tags, copy, links) comes from workProjects so the
// home showcase and the work page can never drift apart again.
const showcaseMeta: Record<string, { bgText: string; color: string }> = {
  "GitHub Roast": { bgText: "Roast", color: "#F97316" },
  Portfolio: { bgText: "Portfolio", color: "#3B82F6" },
  EasyPG: { bgText: "EasyPG", color: "#A855F7" },
  "Gym Management System": { bgText: "Dashboard", color: "#6366F1" },
};

const projects: ProjectItem[] = workProjects.map((project) => {
  const isInternal = project.href.startsWith("/");
  const meta = showcaseMeta[project.title];

  return {
    title: project.title,
    tags: project.tags,
    bgText: meta?.bgText ?? project.title,
    src: project.image,
    description: project.description,
    year: project.date,
    color: meta?.color,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl || (isInternal ? undefined : project.href),
    workUrl: isInternal ? project.href : "/work",
  };
});

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Project() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-x-clip bg-black text-white"
    >
      <motion.div className="relative z-10" style={{ opacity: introOpacity }}>
        {/* Sticky heading */}
        <div className="sticky top-0 z-10 flex h-screen items-center justify-center px-5 py-24 sm:px-8 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-400"
            >
              Selected Projects
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-visible font-display text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              I don&apos;t just build pages
              <br />
              I build{" "}
              <GradientText
                className="inline-block overflow-visible pb-4 italic"
                colors={["#1E40AF", "#9333EA", "#DB2777"]}
                animationSpeed={6}
              >
                products
              </GradientText>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.8,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            >
              A showcase of web apps, mobile apps, dashboards, and business
              systems built with modern full-stack technologies.
            </motion.p>
          </div>
        </div>

        {/* Cards come over heading */}
        <div className="relative z-20 mt-[-100vh] pt-[100vh]">
          <PerspectiveScrollShowcase projects={projects} />
        </div>
      </motion.div>
    </section>
  );
}