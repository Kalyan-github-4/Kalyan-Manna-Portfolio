"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { AboutOrbit } from "./AboutOrbit";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GradientText from "../GradientText";
import { AboutCarousel } from "./AboutCarousel";

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
const images = [
  {
    src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&auto=format&fit=crop&q=60",
    alt: "Code on dark screen with vibrant syntax highlighting",
    title: "I Code",
  },
  {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=900&auto=format&fit=crop",
    alt: "MacBook with code and coffee",
    title: "I Build",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=60",
    alt: "Diverse team collaborating around table",
    title: "I Collaborate",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop",
    alt: "Developer thinking at desk",
    title: "I Solve",
  },
  {
    src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=900&auto=format&fit=crop",
    alt: "Developer workspace with code",
    title: "I Create",
  },
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
        className=" relative flex min-h-screen flex-col-reverse items-center justify-center gap-16 px-6 py-24 sm:px-8 md:px-10 lg:flex-row lg:justify-between lg:gap-24 lg:px-20 "
      >
        {/* Left */}

        <div
          className="relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left"
        >

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-zinc-500"
          >
            Know About Me
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-medium leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl"
          >
            <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-4xl sm:text-5xl md:text-6xl text-transparent text-shadow-subtle">
              Turning ideas into
            </span>
            <br />

            <GradientText
              className="inline-block"
              colors={[
                "#1E40AF",
                "#9333EA",
                "#DB2777",
              ]}
              animationSpeed={6}
            >
              Scalable digital products.
            </GradientText>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
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
            className="mt-6 sm:mt-8 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
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
                    href: "https://github.com/Kalyan-github-4",
                  },
                  {
                    icon: LinkedinLogo,
                    label: "LinkedIn",
                    href: "#",
                  },
                  {
                    icon: XLogo,
                    label: "Twitter (X)",
                    href: "#",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 transition-all duration-300 hover:scale-110 hover:text-violet-300"
                      >
                        <Icon size={24} className="sm:w-7 sm:h-7" weight="duotone" />
                      </a>
                    </TooltipTrigger>

                    <TooltipContent side="top" sideOffset={10}>
                      <p className="text-xs font-semibold text-zinc-700">{label}</p>
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
          className="relative flex w-full max-w-[560px] flex-col items-center justify-center overflow-hidden"
        >
          <AboutCarousel images={images} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_60%,rgba(0,0,0,0.85)_100%)]" />
      </section>
    </>
  );
}