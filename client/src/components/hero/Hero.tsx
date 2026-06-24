import { useEffect } from "react"
import { HeroButtons } from "@/components/hero/HeroButtons"
import { NavBar } from "../layout/Navbar"
import GlowHorizon from "./GlowHorizon"
import About from "../about/About"
// import CustomCursor from "../ui/CustomCursor"

export default function Hero() {
  useEffect(() => {
    // no-op: retained in case future mount-time logic is needed
    return undefined
  }, [])

  return (
    <>
      <NavBar
        items={[
          { name: "Home", href: "#home" },
          { name: "About", href: "#about" },
          { name: "Projects", href: "#projects" },
          { name: "Skills", href: "#skills" },
          { name: "Contact", href: "#contact" },
        ]}
      />
      <GlowHorizon />
      {/* <CustomCursor /> */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground-muted">
              Available for work
            </span>
          </div>
          <p className="pb-1 mx-auto mb-8 max-w-3xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-6xl font-display text-transparent text-shadow-subtle">
            Build at the speed of thought.<br />
            <span className="italic">Deploy with absolute confidence.</span>
          </p>
          <h1 className="mb-6 text-xl font-sans bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Hello, I&apos;m Kalyan Manna{" "}
            <span className="group relative inline-flex items-center align-middle">
              <img
                src="/kalyan-manna.jpg"
                alt="Kalyan Manna"
                className="h-[1.8em] w-[3.2em] rounded-full border border-white/20 object-cover transition-transform duration-300 group-hover:rotate-6"
              />
              <span className="pointer-events-none absolute -top-6 -right-6 z-20 text-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-wave-shake">
                👋
              </span> {" "}
            </span>
            {" "}a Fullstack Developer
          </h1>

          <HeroButtons />

        </div>
      </section>

      <About />
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
      `}</style>
    </>
  )
}