import { useEffect } from "react"
import { HeroButtons } from "@/components/hero/HeroButtons"
import GlowHorizon from "./GlowHorizon"
import { CaretRight } from "@phosphor-icons/react"

export default function Hero() {
  useEffect(() => {
    // no-op: retained in case future mount-time logic is needed
    return undefined
  }, [])

  return (
    <>

      <GlowHorizon />
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 sm:px-6 md:px-8 lg:px-10 text-center"
      >
        <div className="relative z-10 w-full max-w-5xl">
          <a
            href="#projects"
            className="group mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-2xl px-1 py-1 transition-all duration-300 hover:border hover:border-white/20"
          >
            <span className="flex h-5 min-w-[40px] sm:min-w-[42px] items-center justify-center rounded-full bg-sky-600 px-2 text-[10px] sm:text-[11px] font-medium text-white">
              New
            </span>

            <span className="relative inline-block overflow-hidden text-xs sm:text-sm font-medium">
              <span className="bg-[linear-gradient(110deg,#a1a1aa_35%,#ffffff_50%,#a1a1aa_65%)] bg-size-[200%_100%] bg-clip-text text-transparent animate-text-shimmer group-hover:animation-duration-[1.5s]">
                Explore my latest projects
              </span>
            </span>
            <CaretRight
              size={14}
              className="mr-1 sm:mr-2 -ml-1 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
            />
          </a>
          <p className="mx-auto mb-8 max-w-4xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-transparent text-shadow-subtle leading-[1.3]">
            Build at the speed of thought.
            <span className="block mt-2 sm:mt-3 italic ">
              Deploy with absolute confidence.
            </span>
          </p>
          <h1 className="mb-6 text-base sm:text-lg md:text-xl font-sans bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-relaxed">
            Hello, I&apos;m Kalyan Manna{" "}
            <span className="group relative inline-flex items-center align-middle cursor-pointer">
              <img
                src="/kalyan-manna.jpg"
                alt="Kalyan Manna"
                className="h-[1.6em] w-[2.8em] sm:h-[1.8em] sm:w-[3.2em] rounded-full border border-white/20 object-cover transition-transform duration-300 group-hover:rotate-6"
              />
              <span
                className=" pointer-events-none absolute -bottom-1 -left-3 sm:-left-4 -20 text-lg sm:text-2xl text-white not-italic bg-none opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-wave-shake"
              >
                👋
              </span> {" "}
            </span>
            {" "}a Fullstack Developer
          </h1>

          <div className="mt-8 sm:mt-10">
            <HeroButtons />
          </div>

        </div>
      </section>
      <style>{`
        .text-shadow-subtle {
          text-shadow: 0 2px 12px rgba(255, 255, 255, 0.12);
        }

        @keyframes wave-shake {
          0% {
            transform: rotate(0deg);
          }
          15% {
            transform: rotate(18deg);
          }
          30% {
            transform: rotate(-12deg);
          }
          45% {
            transform: rotate(16deg);
          }
          60% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(8deg);
          }
          90% {
            transform: rotate(-4deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .animate-wave-shake {
          animation: wave-shake 0.9s ease-in-out infinite;
          transform-origin: 70% 70%;
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
    </>
  )
}