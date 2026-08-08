"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { AboutOrbit } from "./AboutOrbit";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GradientText from "../components/shared/GradientText";
import { IconCloud } from "../components/about/IconCloud";
import BackgroundRipple from "../components/shared/BackgroundRipple";
import EdgeStripes from "../components/shared/EdgeStripes";
import { socialLinks } from "@/config";

// Transition now lives INSIDE the variant, driven by `custom` (stagger index)
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 * custom, // staggers based on the index you pass in
      ease: [0.25, 1, 0.5, 1] as const, // easeOutCubic
    },
  }),
};
// simple-icons slugs. Module scope on purpose: a fresh array each render would
// make the cloud refetch on every pass.
const techSlugs = [
  "react",
  "nextdotjs",
  "vite",
  "typescript",
  "javascript",
  "tailwindcss",
  "nodedotjs",
  "express",
  "postgresql",
  "drizzle",
  "prisma",
  "neondatabase",
  "clerk",
  "expo",
  "git",
  "github",
  "vercel",
  "render",
  "openai",
  "claude",
  "python",
  "pytorch",
  "opencv",
  "mediapipe",
  "cloudinary",
  "postman",
  "figma",
  "framer",
  "threedotjs",
  "visualstudiocode",
];
export default function About() {
  const contentRef = useRef(null);

  const isInView = useInView(contentRef, {
    amount: 0.3,
    once: true, // Trigger only once when the section comes into view
  });
  return (
    <>
      <section
        ref={contentRef}
        className="relative flex min-h-screen flex-col-reverse items-center justify-center gap-16 px-6 py-24 sm:px-8 md:px-10 lg:flex-row lg:justify-between lg:gap-24 lg:px-20"
      >
        <BackgroundRipple
          rows={7}
          cols={30} />

        <EdgeStripes />

        {/* Left */}
        <div
          className="relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left"
        >

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-zinc-400"
          >
            Know About Me
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-medium text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-6xl"
          >
            <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent text-shadow-subtle">
              I'm Kalyan, a <br />
              creative{" "}
            </span>

            <GradientText
              className="inline leading-[0.95]"
              colors={["#1E40AF", "#9333EA", "#DB2777"]}
              animationSpeed={6}
            >
              engineer
            </GradientText>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
          >
            I'm <span className="font-semibold text-white">Kalyan Manna</span>, a
            full-stack developer passionate about building modern web and mobile
            applications. My focus is on creating fast, scalable, and intuitive
            experiences with clean architecture and maintainable code.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
          >
            When I'm not immersed in work, I'm exploring new ideas and staying curious. Life's about balance, and I love embracing every part of it.
          </motion.p>
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
          >
            I believe in waking up each day eager to make a difference!
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <TooltipProvider>
              <div className="mt-5 sm:mt-7 flex justify-center lg:justify-start items-center gap-6 sm:gap-8">
                {[
                  {
                    icon: GithubLogo,
                    label: "GitHub",
                    href: socialLinks.github,
                  },
                  {
                    icon: LinkedinLogo,
                    label: "LinkedIn",
                    href: socialLinks.linkedin,
                  },
                  {
                    icon: InstagramLogo,
                    label: "Instagram",
                    href: socialLinks.instagram,
                  },

                ].map(({ icon: Icon, href, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 transition-all duration-300 hover:scale-110 hover:text-violet-300"
                      >
                        <Icon size={24} className="sm:w-6 sm:h-6" weight="duotone" />
                      </a>
                    </TooltipTrigger>

                    <TooltipContent side="top" sideOffset={10}>
                      <p className="text-xs font-semibold text-zinc-600">{label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>
        </div>

        {/* Right */}

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex w-full max-w-140 flex-col items-center justify-center overflow-hidden"
        >
          <IconCloud iconSlugs={techSlugs} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_60%,rgba(0,0,0,0.85)_100%)]" />
      </section>
    </>
  );
}