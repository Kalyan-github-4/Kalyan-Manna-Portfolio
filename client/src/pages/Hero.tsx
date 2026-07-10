import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

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
    start: 0.35,
    end: 0.45,
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
    start: 0.45,
    end: 0.55,
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
    start: 0.55,
    end: 0.65,
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
    start: 0.65,
    end: 0.78,
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
    start: 0.78,
    end: 0.92,
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  })

  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(smoothProgress, [0, 0.25], [0, -80])
  const heroBlur = useTransform(smoothProgress, [0, 0.25], [0, 18])

  const finalImageX = isMobile ? "0vw" : isTablet ? "20vw" : "28vw"
  const middleImageX = isMobile ? "0vw" : isTablet ? "12vw" : "18vw"

  const finalImageTop = isMobile ? "31%" : isTablet ? "52%" : "57%"
  const middleImageTop = isMobile ? "45%" : isTablet ? "58%" : "61%"

  const finalImageSize = isMobile ? "180px" : isTablet ? "340px" : "460px"

  const imageX = useTransform(
    smoothProgress,
    [0, 0.18, 0.36, 1],
    ["0vw", middleImageX, finalImageX, finalImageX]
  )

  const imageY = useTransform(
    smoothProgress,
    [0, 0.12, 0.36, 1],
    ["0vh", "0vh", isMobile ? "-4vh" : "-2vh", isMobile ? "-4vh" : "-2vh"]
  )

  const imageWidth = useTransform(
    smoothProgress,
    [0, 0.12, 0.36, 1],
    ["2.9em", "3.4em", finalImageSize, finalImageSize]
  )

  const imageHeight = useTransform(
    smoothProgress,
    [0, 0.12, 0.36, 1],
    ["1.7em", "2em", finalImageSize, finalImageSize]
  )

  const imageRadius = useTransform(
    smoothProgress,
    [0, 0.12, 0.36, 1],
    ["999px", "999px", "50%", "50%"]
  )

  const imageTop = useTransform(
    smoothProgress,
    [0, 0.12, 0.36, 1],
    ["58%", middleImageTop, finalImageTop, finalImageTop]
  )

  const imageOpacity = useTransform(
    smoothProgress,
    [0, 0.32, 0.38, 1],
    [0, 0, 1, 1]
  )

  const baseImageOpacity = useTransform(
    smoothProgress,
    [0, 0.32, 0.38, 0.42],
    [0, 0, 1, 0]
  )

  const aboutTextOpacity = useTransform(
    smoothProgress,
    [0.35, 0.4, 0.96, 1],
    [0, 1, 1, 0]
  )

  const aboutTextY = useTransform(smoothProgress, [0.3, 0.4], [40, 0])

  const veilOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 0.45])

  return (
    <section
      ref={sectionRef}
      className="relative h-[470vh] overflow-clip bg-black md:h-[500vh]"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <GlowHorizon />

        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-2 bg-black"
        />

        <HeroContent opacity={heroOpacity} y={heroY} blur={heroBlur} />

        <ProfileImage
          image="/kalyan-manna.jpg"
          alt="Kalyan Manna portrait"
          slides={aboutSlides}
          progress={smoothProgress}
          top={imageTop}
          x={imageX}
          y={imageY}
          width={imageWidth}
          height={imageHeight}
          borderRadius={imageRadius}
          opacity={imageOpacity}
          baseImageOpacity={baseImageOpacity}
        />

        <AboutContent
          slides={aboutSlides}
          progress={smoothProgress}
          opacity={aboutTextOpacity}
          y={aboutTextY}
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