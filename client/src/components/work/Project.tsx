"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import GradientText from "@/components/shared/GradientText";
import PerspectiveScrollShowcase from "./PerspectiveScrollShowcase";
import type { ProjectItem } from "./PerspectiveScrollShowcase";
import { useRef } from "react";

const projects: ProjectItem[] = [
  {
    title: "EasyPG",
    tags: ["React Native", "Expo", "Startup", "Mobile App"],
    bgText: "EasyPG",
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&auto=format&fit=crop&q=60",
    githubUrl: "https://github.com/Kalyan-github-4/easypg",
    liveUrl: "https://play.google.com/store/apps/details?id=com.easypg",
  },
  {
    title: "Portfolio",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    bgText: "Portfolio",
    src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1600&auto=format&fit=crop&q=60",
    githubUrl: "https://github.com/Kalyan-github-4/Kalyan-Manna-Portfolio",
    liveUrl: "https://kalyan-manna-portfolio.vercel.app/",
  },
  {
    title: "Management System",
    tags: ["Node.js", "Express", "PostgreSQL", "Dashboard"],
    bgText: "Dashboard",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=60",
    githubUrl: "https://github.com/Kalyan-github-4/Management-System",
    liveUrl: "https://management-system-eta.vercel.app/",
  },
  {
    title: "Business Website",
    tags: ["Frontend", "SEO", "Responsive", "UI Design"],
    bgText: "Business",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=60",
    githubUrl: "https://github.com/Kalyan-github-4/Business-Website",
    liveUrl: "https://business-website-eta.vercel.app/",
  },
];

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
              className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500"
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