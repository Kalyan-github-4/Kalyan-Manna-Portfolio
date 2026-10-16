"use client"

import { useMotionValue } from "framer-motion"

// import { AboutContent } from "@/components/hero/AboutContent"
import { HeroContent } from "@/components/hero/HeroContent"
// import { ProfileImage } from "@/components/hero/ProfileImage"
// import GradientText from "../components/shared/GradientText"

// import type { AboutSlide } from "@/components/hero/types"

// Commented out along with the about section — nothing here is used by the
// static hero. Restore with the useScroll timeline when about comes back.
// function useMediaQuery(query: string) {
//   // Resolved during the first render, not after it. Starting at `false` meant
//   // a phone rendered one frame as a desktop, which was long enough for the
//   // heavy-effect branch to write styles the light branch never takes back.
//   const [matches, setMatches] = useState(
//     () => typeof window !== "undefined" && window.matchMedia(query).matches
//   )
//
//   useEffect(() => {
//     const media = window.matchMedia(query)
//
//     const updateMatch = () => {
//       setMatches(media.matches)
//     }
//
//     updateMatch()
//     media.addEventListener("change", updateMatch)
//
//     return () => {
//       media.removeEventListener("change", updateMatch)
//     }
//   }, [query])
//
//   return matches
// }
//
// // ── Scroll timeline ───────────────────────────────────────────────────────
// //
// // Every number below is a fraction of the pinned section's scroll range
// // (~340vh of scrolling), so 0.01 ≈ 3.4vh — about a third of a wheel notch.
// //
// //   0.00 – 0.02   hero holds still and fully readable
// //   0.02 – 0.10   hero lifts up and fades out — no blur, no morph
// //   0.10 – 0.15   about arrives: heading, portrait, veil
// //   0.12 – 0.95   the five about slides
// //   0.95 – 1.00   about releases as the section unpins
// //
// // The whole hero → about handoff is ~34vh of scrolling (one gesture) instead
// // of the ~150vh it used to take, and there is no spring smoothing anywhere:
// // everything tracks the raw scroll position 1:1 with the wheel or finger.
// const HERO_HOLD = 0.02
// const HERO_OUT = 0.1
// // const ABOUT_IN_START = 0.1
// const ABOUT_IN_END = 0.15
// // const ABOUT_OUT_START = 0.95
//
// // const aboutSlides: AboutSlide[] = [
// //   {
// //     title: (
// //       <>
// //         Hi, I&apos;m{" "}
// //         <GradientText
// //           className="inline-block"
// //           colors={["#FF6B6B", "#FFA94D", "#FFD93D"]}
// //           animationSpeed={6}
// //         >
// //           Kalyan Manna.
// //         </GradientText>
// //       </>
// //     ),
// //     subtitle: (
// //       <>
// //         I write code that{" "}
// //         <span className="text-zinc-200">people actually want to use.</span>{" "}
// //         Full-stack developer with a bias for action.
// //       </>
// //     ),
// //     image: "/kalyan-manna.webp",
// //     alt: "Portrait of Kalyan Manna",
// //     start: 0.12,
// //     end: 0.29,
// //   },
// //   {
// //     title: (
// //       <>
// //         Building with the stack that{" "}
// //         <GradientText
// //           className="inline-block"
// //           colors={["#00D2FF", "#3A7BD5", "#6C5CE7"]}
// //           animationSpeed={6}
// //         >
// //           makes ideas real.
// //         </GradientText>
// //       </>
// //     ),
// //     subtitle: (
// //       <>
// //         React • Node • TypeScript • PostgreSQL —{" "}
// //         <span className="text-zinc-200">the tools I reach for every time.</span>{" "}
// //         Because great products deserve great foundations.
// //       </>
// //     ),
// //     image:
// //       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
// //     alt: "Developer skills and coding workspace",
// //     start: 0.29,
// //     end: 0.46,
// //   },
// //   {
// //     title: (
// //       <>
// //         Helping businesses{" "}
// //         <GradientText
// //           className="inline-block"
// //           colors={["#F093FB", "#F5576C", "#4FACFE"]}
// //           animationSpeed={6}
// //         >
// //           grow digitally.
// //         </GradientText>
// //       </>
// //     ),
// //     subtitle: (
// //       <>
// //         I ship MVPs, scale apps, and{" "}
// //         <span className="text-zinc-200">
// //           turn messy code into maintainable systems.
// //         </span>{" "}
// //         Your product, but faster and better.
// //       </>
// //     ),
// //     image:
// //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
// //     alt: "Modern city skyline representing digital growth",
// //     start: 0.46,
// //     end: 0.63,
// //   },
// //   {
// //     title: (
// //       <>
// //         Beyond coding,{" "}
// //         <GradientText
// //           className="inline-block"
// //           colors={["#11998E", "#38EF7D", "#FFD700"]}
// //           animationSpeed={6}
// //         >
// //           I train.
// //         </GradientText>
// //       </>
// //     ),
// //     subtitle: (
// //       <>
// //         Early mornings, heavy weights, and{" "}
// //         <span className="text-zinc-200">the discipline to keep going.</span>{" "}
// //         Same principle applies to code — show up and do the work.
// //       </>
// //     ),
// //     image:
// //       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
// //     alt: "Person training in a gym",
// //     start: 0.63,
// //     end: 0.79,
// //   },
// //   {
// //     title: (
// //       <>
// //         <GradientText
// //           className="inline-block"
// //           colors={["#FF512F", "#DD2475", "#FF6B6B"]}
// //           animationSpeed={6}
// //         >
// //           Anime
// //         </GradientText>{" "}
// //         &{" "}
// //         <GradientText
// //           className="inline-block"
// //           colors={["#F7971E", "#FFD200", "#FF6B35"]}
// //           animationSpeed={6}
// //         >
// //           football
// //         </GradientText>{" "}
// //         too.
// //       </>
// //     ),
// //     subtitle: (
// //       <>
// //         Epic storylines on screen,{" "}
// //         <span className="text-zinc-200">beautiful chaos on the pitch.</span>{" "}
// //         Because code isn&apos;t the only thing that needs heart.
// //       </>
// //     ),
// //     image:
// //       "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
// //     alt: "Football match under stadium lights",
// //     start: 0.79,
// //     end: 0.95,
// //   },
// // ]

export default function Hero() {
  // The about section is commented out for now, and with it the pinned scroll
  // timeline it needed. What is left is a plain, full-height hero: no 420vh of
  // scroll runway, no veil, no scroll-driven fade — just the content.
  //
  // The motion values below are constants only so HeroContent keeps its
  // existing MotionValue props; restore the useScroll timeline (see git
  // history) when the about section comes back.
  const heroOpacity = useMotionValue(1)
  const heroY = useMotionValue(0)
  const heroVisibility = useMotionValue<"visible" | "hidden">("visible")

  return (
    <section className="relative overflow-clip">
      {/* No background of its own: the page-wide GlowHorizon in Home renders
          fixed behind every section, and an opaque bg here would hide it. */}
      <div className="relative min-h-screen">
        <HeroContent
          opacity={heroOpacity}
          y={heroY}
          visibility={heroVisibility}
        />

        {/* <ProfileImage
          image="/kalyan-manna.webp"
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
        /> */}

        {/* <AboutContent
          slides={aboutSlides}
          progress={progress}
          simplify={isMobile}
          opacity={aboutOpacity}
          y={aboutY}
        /> */}
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