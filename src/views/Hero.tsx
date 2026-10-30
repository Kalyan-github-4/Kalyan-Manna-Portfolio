"use client"

import { useMotionValue } from "framer-motion"
import { HeroContent } from "@/components/hero/HeroContent"

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