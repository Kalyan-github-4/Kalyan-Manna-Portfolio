"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { AboutOrbit } from "./AboutOrbit";
import {
  ArrowRight,
  ArrowUpRight,
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
import GradientText, { HEADING_GRADIENT } from "../components/shared/GradientText";
// The tech cloud is parked while the polaroids fill the right column. Restore
// this import and the <IconCloud /> below to bring it back.
// import { IconCloud } from "../components/about/IconCloud";
import PolaroidCarousel from "../components/about/PolaroidCarousel";
// import GithubSkyline from "../components/about/GithubSkyline";
import SilkBackground from "../components/shared/SilkBackground";
import EdgeStripes from "../components/shared/EdgeStripes";
import { faintDiagonalStripeStyle } from "../components/shared/stripeStyles";
import { journeyItems } from "@/data/journeyData";
import { workProjects } from "@/data/workProjects";
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
// make the cloud refetch on every pass. Kept while the cloud is parked.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// Counted from the data the rest of the site renders, so these can't go stale.
const facts = [
  { value: String(workProjects.length), label: "Featured projects" },
  {
    value: String(journeyItems.filter((item) => item.category === "Hackathons").length),
    label: "Hackathons entered",
  },
  {
    value: String(journeyItems.filter((item) => item.result === "Winners").length),
    label: "Hackathon wins",
  },
];

const deadweight = workProjects.find((project) => project.title === "Deadweight");

const socials = [
  { icon: GithubLogo, label: "GitHub", href: socialLinks.github },
  { icon: LinkedinLogo, label: "LinkedIn", href: socialLinks.linkedin },
  { icon: InstagramLogo, label: "Instagram", href: socialLinks.instagram },
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
        className="relative flex min-h-screen flex-col pb-10 pt-24"
      >
        <SilkBackground />

        <EdgeStripes />

        <div className="relative z-10 flex flex-1 flex-col items-center gap-6 px-10 sm:px-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-20 xl:px-28">
          {/* Left */}
          <div className="w-full max-w-2xl text-center lg:max-w-xl lg:text-left">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
            >
              About me
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display text-4xl font-medium leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent text-shadow-subtle">
                I&apos;m Kalyan, a <br />
                creative{" "}
              </span>

              <GradientText
                className="inline leading-[0.95]"
                colors={HEADING_GRADIENT}
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
              className="mt-6 text-base leading-relaxed text-zinc-200 sm:text-lg"
            >
              It started with curiosity: how do things work, and could I build them myself?
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-3 space-y-3 text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              <p>
                Today I&apos;m a Full-Stack Developer working across web, AI and product engineering, taking ideas
                from a blank screen to something people actually use.
              </p>
              <p>
                Hackathons, freelance work and side experiments got me here. Next: meaningful products, and giving
                back to the developer community.
              </p>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="/Kalyan_Manna_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View resume
                <ArrowRight
                  size={14}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <TooltipProvider>
                {socials.map(({ icon: Icon, href, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-zinc-300 transition-colors hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <Icon size={20} weight="duotone" aria-hidden="true" />
                      </a>
                    </TooltipTrigger>

                    <TooltipContent side="top" sideOffset={10}>
                      <p className="text-xs font-semibold text-zinc-600">{label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex w-full max-w-xs flex-col items-center justify-center sm:max-w-sm lg:max-w-md xl:max-w-lg"
          >
            {/* <IconCloud iconSlugs={techSlugs} /> */}
            <PolaroidCarousel />
          </motion.div>
        </div>

        {/* Same gutters as the bento wall, so the strip lands on the hatched
            EdgeStripes' inner border lines. */}
        <motion.dl
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 ml-8 mr-5 mt-8 grid grid-cols-2 gap-px border-y border-white/10 sm:ml-10 sm:mr-7 lg:ml-11 lg:mr-9 lg:grid-cols-4"
          style={faintDiagonalStripeStyle}
        >
          {facts.map(({ value, label }) => (
            <div key={label} className="bg-black/70 px-5 py-4 lg:px-6">
              <dt className="text-xs font-medium text-zinc-400 sm:text-sm">{label}</dt>
              <dd className="font-display text-3xl text-white sm:text-4xl">{value}</dd>
            </div>
          ))}

          {deadweight && (
            <div className="bg-black/70 px-5 py-4 lg:px-6">
              <dt className="text-xs font-medium text-zinc-400 sm:text-sm">My VS Code extension</dt>
              <dd>
                <a
                  href={deadweight.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-display text-3xl text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:text-4xl"
                >
                  Deadweight
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className="text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              </dd>
            </div>
          )}
        </motion.dl>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_60%,rgba(0,0,0,0.85)_100%)]" />
      </section>

      {/* <GithubSkyline /> */}
    </>
  );
}
