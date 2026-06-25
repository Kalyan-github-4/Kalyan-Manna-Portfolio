"use client";

import { motion } from "framer-motion";
import { AboutOrbit } from "./AboutOrbit";
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

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 1, 0.5, 1] as const, // Custom cubic-bezier easing
    },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className=" relative flex min-h-screen flex-col-reverse items-center justify-center gap-16 px-6 py-24 sm:px-8 md:px-10 lg:flex-row lg:justify-between lg:gap-24 lg:px-20 "
    >
      {/* Left */}

      <div
        className="relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left"
      >

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-zinc-500"
        >
          More About Me
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.15}
          className="font-display font-medium leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl"
        >
          <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-4xl sm:text-5xl md:text-6xl text-transparent text-shadow-subtle">More than code.</span>
          <br />

          <GradientText
            className="inline-block"
            colors={[
              "#1E40AF", // blue-800
              "#9333EA", // purple-600
              "#DB2777", // pink-600

            ]}
            animationSpeed={6}
          >
            Built with purpose.
          </GradientText>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.3}
          className="mt-8 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
        >
          I'm <span className="font-semibold text-white">Kalyan Manna</span>,
          a full-stack developer who enjoys transforming ideas into polished,
          scalable products. I love building experiences that are fast,
          accessible, and visually engaging.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.45}
          className="mt-6 sm:mt-8 text-base sm:text-lg leading-8 sm:leading-9 text-zinc-400"
        >
          Beyond programming you'll usually find me in the gym, sketching,
          travelling, or experimenting with new technologies. Every project is
          an opportunity to learn something new.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.6}
        >
          <TooltipProvider>
            <div className=" mt-10 sm:mt-12 flex justify-center lg:justify-start items-center gap-6 sm:gap-8">
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
                      <Icon size={24} className="sm:w-7 sm:h-7" weight="duotone"/>
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
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={0.3}
        className=" relative z-10 flex justify-center w-full lg:w-auto shrink-0"
      >
        <AboutOrbit />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_60%,rgba(0,0,0,0.85)_100%)]" />
    </section>
  );
}