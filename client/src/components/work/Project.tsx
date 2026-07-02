"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import GradientText from "@/components/GradientText";
// import LightRays from "../LightRays";
import PerspectiveScrollShowcase from "./PerspectiveScrollShowcase";
import type { ProjectItem } from "./PerspectiveScrollShowcase";

import { useRef } from "react";

const projects: ProjectItem[] = [
  {
    title: "EasyPG",
    tags: ["React Native", "Expo", "Startup", "Mobile App"],
    bgText: "EasyPG",
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Portfolio",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    bgText: "Portfolio",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Management System",
    tags: ["Node.js", "Express", "PostgreSQL", "Dashboard"],
    bgText: "Dashboard",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Business Website",
    tags: ["Frontend", "SEO", "Responsive", "UI Design"],
    bgText: "Business",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
];

// ScrollReveal component for bottom-to-top fade-up animation
const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"],
  });

  // Fade in only
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Slide up only
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const smoothOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div ref={ref} style={{ opacity: smoothOpacity, y: smoothY }}>
      {children}
    </motion.div>
  );
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
            {/* Wrap each heading with ScrollReveal */}
            <ScrollReveal>
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500">
                Selected Projects
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                I don&apos;t just build pages.
                <br />
                I build{" "}
                <GradientText
                  className="inline-block"
                  colors={["#1E40AF", "#9333EA", "#DB2777"]}
                  animationSpeed={6}
                >
                  products.
                </GradientText>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-10 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                A showcase of web apps, mobile apps, dashboards, and business
                systems built with modern full-stack technologies.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Cards come over heading */}
        <div className="relative z-20 -mt-[100vh] pt-[100vh]">
          <PerspectiveScrollShowcase projects={projects} />
        </div>
      </motion.div>
    </section>
  );
}