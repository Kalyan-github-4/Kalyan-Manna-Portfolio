"use client"

import { useMotionValue } from "framer-motion"
import { HeroContent } from "@/components/hero/HeroContent"
import GlowHorizon from "@/components/shared/GlowHorizon"

export default function Hero() {
  // The about section is commented out for now, and with it the pinned scroll
  // timeline it needed. What is left is a plain hero that fills exactly one
  // screen, with the bento starting below the fold: no 420vh of scroll
  // runway, no veil, no scroll-driven fade — just the content.
  //
  // The motion values below are constants only so HeroContent keeps its
  // existing MotionValue props; restore the useScroll timeline (see git
  // history) when the about section comes back.
  const heroOpacity = useMotionValue(1)
  const heroY = useMotionValue(0)
  const heroVisibility = useMotionValue<"visible" | "hidden">("visible")

  return (
    <section className="relative overflow-clip">
      <GlowHorizon />

      <div className="relative">
        <HeroContent
          opacity={heroOpacity}
          y={heroY}
          visibility={heroVisibility}
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