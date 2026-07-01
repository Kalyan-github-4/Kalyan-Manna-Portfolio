import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import GlowHorizon from "@/components/hero/GlowHorizon"
import { HeroButtons } from "@/components/hero/HeroButtons"
import { CaretRight } from "@phosphor-icons/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import GradientText from "../GradientText"
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"

export default function HeroAboutTransition() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  })
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(10px)",
    },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: delay * 0.08,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    }),
  }
  /**
   * Hero content: fade, blur, and move slightly up
   */
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0])
  const heroY = useTransform(smoothProgress, [0, 0.35], [0, -80])
  const heroBlur = useTransform(smoothProgress, [0, 0.35], [0, 18])

  /**
   * Profile image: starts inside hero text visually,
   * then moves right and becomes large.
   */
  const imageX = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    ["0vw", "22vw", "28vw"]
  )

  const imageY = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 1],
    ["0vh", "0vh", "-2vh", "-2vh"]
  )

  const imageWidth = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 1],
    ["3.2em", "3.4em", "380px", "460px"]
  )

  const imageHeight = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 1],
    ["1.8em", "2em", "380px", "460px"]
  )

  const imageRadius = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 1],
    ["999px", "999px", "50%", "50%"]
  )
  const imageTop = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 1],
    ["62%", "62%", "50%", "57%"]
  )
  const imageOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    [1, 1, 1]
  )

  /**
   * About content appears from left after hero starts disappearing.
   */
  const aboutOpacity = useTransform(smoothProgress, [0.28, 0.55], [0, 1])
  const aboutX = useTransform(smoothProgress, [0.28, 0.55], [-80, 0])
  const aboutBlur = useTransform(smoothProgress, [0.28, 0.55], [14, 0])

  /**
   * Optional dark overlay to help hero vanish cleanly.
   */
  const veilOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 0.45])

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] overflow-clip bg-black"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <GlowHorizon />

        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-[2] bg-black"
        />

        {/* ================= HERO CONTENT ================= */}
        <motion.section
          id="home"
          style={{
            opacity: heroOpacity,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
          }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center sm:px-6 md:px-8 lg:px-10"
        >
          <div className="w-full max-w-5xl">
            <a
              href="#projects"
              className="group mb-6 inline-flex items-center gap-3 rounded-2xl px-1 py-1 transition-all duration-300 hover:border hover:border-white/20 sm:mb-8"
            >
              <span className="flex h-5 min-w-[40px] items-center justify-center rounded-full bg-sky-600 px-2 text-[10px] font-medium text-white sm:min-w-[42px] sm:text-[11px]">
                New
              </span>

              <span className="relative inline-block overflow-hidden text-xs font-medium sm:text-sm">
                <span className="animate-text-shimmer bg-[linear-gradient(110deg,#a1a1aa_35%,#ffffff_50%,#a1a1aa_65%)] bg-size-[200%_100%] bg-clip-text text-transparent">
                  Explore my latest projects
                </span>
              </span>

              <CaretRight
                size={14}
                className="-ml-1 mr-2 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
              />
            </a>

            <p className="text-shadow-subtle mx-auto mb-8 max-w-4xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-3xl leading-[1.3] text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
              Build at the speed of thought.
              <span className="mt-2 block italic sm:mt-3">
                Deploy with absolute confidence.
              </span>
            </p>

            <h1 className="mb-6 text-base leading-relaxed bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text font-sans text-transparent sm:text-lg md:text-xl">
              Hello, I&apos;m Kalyan Manna
              <span className="inline-flex h-[1.6em] w-[2.8em] align-middle sm:h-[1.8em] sm:w-[3.2em]" />
              {" "}a Fullstack Developer
            </h1>

            <div className="mt-8 sm:mt-10">
              <HeroButtons />
            </div>
          </div>
        </motion.section>

        {/* ================= MOVING PROFILE IMAGE ================= */}
        <motion.div
          style={{
            top: imageTop,
            x: imageX,
            y: imageY,
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
            opacity: imageOpacity,
          }}
          className="pointer-events-none absolute left-[51%] z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/20 shadow-2xl shadow-black/50"
        >
          <img
            src="/kalyan-manna.jpg"
            alt="Kalyan Manna"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* ================= ABOUT CONTENT ================= */}
        {/* ================= ABOUT CONTENT ================= */}
        <motion.div
          style={{
            opacity: aboutOpacity,
            x: aboutX,
            filter: useTransform(aboutBlur, (v) => `blur(${v}px)`),
          }}
          className="pointer-events-auto absolute left-0 top-0 z-30 flex min-h-screen w-full items-center px-5 sm:px-8 lg:px-16"
        >
          <div className="pointer-events-auto relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500 sm:text-xs sm:tracking-[0.35em]"
            >
              Know About Me
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl font-medium leading-tight sm:text-5xl md:text-6xl lg:text-6xl"
            >
              <span className="text-shadow-subtle mx-auto mb-8 max-w-4xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-3xl leading-[1.3] text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
                Full-stack developer & <br/>a little bit of {" "}
              </span>
              <GradientText
                className="inline-block"
                colors={["#1E40AF", "#9333EA", "#DB2777"]}
                animationSpeed={6}
              >
                everything.
              </GradientText>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            >
             I'm Kalyan Manna, a proactive full-stack developer passionate about creating dynamic web experiences. From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans React, Next.js, and Node.js, and I'm always eager to learn more.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            >
              When I'm not immersed in work, I'm exploring new ideas and staying curious. Life's about balance, and I love embracing every part of it.
            </motion.p>
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            >
              I believe in waking up each day eager to make a difference!
            </motion.p>


            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <TooltipProvider>
                <div className="mt-8 flex items-center justify-center gap-6 sm:mt-10 sm:gap-8 lg:justify-start">
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
                          <Icon size={24} className="sm:h-7 sm:w-7" weight="duotone" />
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
        </motion.div>
      </div>

      <style>{`
        .text-shadow-subtle {
          text-shadow: 0 2px 12px rgba(255, 255, 255, 0.12);
        }

        @keyframes text-shimmer {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }

        .animate-text-shimmer {
          animation: text-shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  )
}