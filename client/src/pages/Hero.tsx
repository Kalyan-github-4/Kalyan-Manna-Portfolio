import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import GlowHorizon from "@/components/hero/GlowHorizon"
import { AboutContent } from "@/components/hero/AboutContent"
import { HeroContent } from "@/components/hero/HeroContent"
import { ProfileImage } from "@/components/hero/ProfileImage"
import GradientText from "../components/shared/GradientText"

import type { AboutSlide } from "@/components/hero/types"

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const updateMatch = () => {
      setMatches(media.matches)
    }

    updateMatch()
    media.addEventListener("change", updateMatch)

    return () => {
      media.removeEventListener("change", updateMatch)
    }
  }, [query])

  return matches
}

// ── Scroll timeline ───────────────────────────────────────────────────────
//
// Every number below is a fraction of the pinned section's scroll range
// (~340vh of scrolling), so 0.01 ≈ 3.4vh — about a third of a wheel notch.
//
//   0.00 – 0.02   hero holds still and fully readable
//   0.02 – 0.10   hero lifts up and fades out — no blur, no morph
//   0.10 – 0.15   about arrives: heading, portrait, veil
//   0.12 – 0.95   the five about slides
//   0.95 – 1.00   about releases as the section unpins
//
// The whole hero → about handoff is ~34vh of scrolling (one gesture) instead
// of the ~150vh it used to take, and there is no spring smoothing anywhere:
// everything tracks the raw scroll position 1:1 with the wheel or finger.
const HERO_HOLD = 0.02
const HERO_OUT = 0.1
const ABOUT_IN_START = 0.1
const ABOUT_IN_END = 0.15
const ABOUT_OUT_START = 0.95

const aboutSlides: AboutSlide[] = [
  {
    title: (
      <>
        Hi, I&apos;m{" "}
        <GradientText
          className="inline-block"
          colors={["#FF6B6B", "#FFA94D", "#FFD93D"]}
          animationSpeed={6}
        >
          Kalyan Manna.
        </GradientText>
      </>
    ),
    subtitle: (
      <>
        I write code that{" "}
        <span className="text-zinc-200">people actually want to use.</span>{" "}
        Full-stack developer with a bias for action.
      </>
    ),
    image: "/kalyan-manna.jpg",
    alt: "Portrait of Kalyan Manna",
    start: 0.12,
    end: 0.29,
  },
  {
    title: (
      <>
        Building with the stack that{" "}
        <GradientText
          className="inline-block"
          colors={["#00D2FF", "#3A7BD5", "#6C5CE7"]}
          animationSpeed={6}
        >
          makes ideas real.
        </GradientText>
      </>
    ),
    subtitle: (
      <>
        React • Node • TypeScript • PostgreSQL —{" "}
        <span className="text-zinc-200">the tools I reach for every time.</span>{" "}
        Because great products deserve great foundations.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    alt: "Developer skills and coding workspace",
    start: 0.29,
    end: 0.46,
  },
  {
    title: (
      <>
        Helping businesses{" "}
        <GradientText
          className="inline-block"
          colors={["#F093FB", "#F5576C", "#4FACFE"]}
          animationSpeed={6}
        >
          grow digitally.
        </GradientText>
      </>
    ),
    subtitle: (
      <>
        I ship MVPs, scale apps, and{" "}
        <span className="text-zinc-200">
          turn messy code into maintainable systems.
        </span>{" "}
        Your product, but faster and better.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    alt: "Modern city skyline representing digital growth",
    start: 0.46,
    end: 0.63,
  },
  {
    title: (
      <>
        Beyond coding,{" "}
        <GradientText
          className="inline-block"
          colors={["#11998E", "#38EF7D", "#FFD700"]}
          animationSpeed={6}
        >
          I train.
        </GradientText>
      </>
    ),
    subtitle: (
      <>
        Early mornings, heavy weights, and{" "}
        <span className="text-zinc-200">the discipline to keep going.</span>{" "}
        Same principle applies to code — show up and do the work.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    alt: "Person training in a gym",
    start: 0.63,
    end: 0.79,
  },
  {
    title: (
      <>
        <GradientText
          className="inline-block"
          colors={["#FF512F", "#DD2475", "#FF6B6B"]}
          animationSpeed={6}
        >
          Anime
        </GradientText>{" "}
        &{" "}
        <GradientText
          className="inline-block"
          colors={["#F7971E", "#FFD200", "#FF6B35"]}
          animationSpeed={6}
        >
          football
        </GradientText>{" "}
        too.
      </>
    ),
    subtitle: (
      <>
        Epic storylines on screen,{" "}
        <span className="text-zinc-200">beautiful chaos on the pitch.</span>{" "}
        Because code isn&apos;t the only thing that needs heart.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    alt: "Football match under stadium lights",
    start: 0.79,
    end: 0.95,
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")

  // No spring: a pinned section that eases toward the scroll position is what
  // reads as "slow scroll". Everything below tracks scrollYProgress directly.
  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // The hero does one thing on the way out — it travels up and fades. No blur,
  // no scale, and it is gone inside HERO_OUT so the about can start.
  const heroOpacity = useTransform(
    progress,
    [0, HERO_HOLD, HERO_OUT],
    [1, 1, 0]
  )

  const heroY = useTransform(
    progress,
    [0, HERO_HOLD, HERO_OUT],
    [0, 0, isMobile ? -70 : -110]
  )

  // opacity: 0 still paints and still hit-tests — an invisible hero would keep
  // catching clicks meant for the about section below it. Taking it out of the
  // box entirely once it has faded is both the correct behaviour and cheaper.
  const heroVisibility = useTransform(heroOpacity, (value) =>
    value > 0.01 ? "visible" : "hidden"
  )

  // The portrait no longer morphs out of the hero's inline avatar — it simply
  // sits where the about section needs it and fades in with the rest.
  const imageX = isMobile ? "0vw" : isTablet ? "20vw" : "28vw"
  const imageY = isMobile ? "-4vh" : "-2vh"
  const imageTop = isMobile ? "31%" : isTablet ? "52%" : "57%"
  const imageSize = isMobile ? "180px" : isTablet ? "340px" : "460px"

  // Held at full until the first slide's own copy of the portrait is fully in,
  // so the handoff between two copies of the same image never dips.
  const baseImageOpacity = useTransform(
    progress,
    [0, 0.16, 0.2],
    [1, 1, 0]
  )

  const aboutOpacity = useTransform(
    progress,
    [ABOUT_IN_START, ABOUT_IN_END, ABOUT_OUT_START, 1],
    [0, 1, 1, 0]
  )

  const aboutY = useTransform(
    progress,
    [ABOUT_IN_START, ABOUT_IN_END],
    [isMobile ? 24 : 40, 0]
  )

  const veilOpacity = useTransform(
    progress,
    [HERO_HOLD, ABOUT_IN_END],
    [0, 0.45]
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] overflow-clip bg-black md:h-[440vh]"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <GlowHorizon />

        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-2 bg-black"
        />

        <HeroContent
          opacity={heroOpacity}
          y={heroY}
          visibility={heroVisibility}
        />

        <ProfileImage
          image="/kalyan-manna.jpg"
          alt="Kalyan Manna portrait"
          slides={aboutSlides}
          progress={progress}
          simplify={isMobile}
          top={imageTop}
          x={imageX}
          y={imageY}
          size={imageSize}
          opacity={aboutOpacity}
          baseImageOpacity={baseImageOpacity}
        />

        <AboutContent
          slides={aboutSlides}
          progress={progress}
          simplify={isMobile}
          opacity={aboutOpacity}
          y={aboutY}
        />
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