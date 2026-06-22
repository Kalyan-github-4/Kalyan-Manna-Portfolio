import { useEffect } from "react"
import { HeroButtons } from "@/components/hero/HeroButtons"
import { NavBar } from "../layout/Navbar"
import GlowHorizon from "./GlowHorizon"
import { AboutOrbit } from "../ui/AboutOrbit"
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";
import ScrollReveal from "../ScrollReveal"

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
        {/* <TechMarquee /> */}
      </section>
      <section className="relative  gap-10 flex justify-center items-center">
        <div className="relative z-10">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium text-zinc-400 uppercase text-shadow-subtle">
              More About Me
            </p>

            <ScrollReveal textClassName="bg-gradient-to-r from-white via-zinc-200 to-cyan-400 bg-clip-text text-6xl font-display leading-[1.05] text-transparent">
              More than code.
              <br />
              Built with purpose.
            </ScrollReveal>

            <div className="mt-10 space-y-8 text-lg leading-8 text-zinc-400">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                I'm <span className="font-semibold text-white">Kalyan Manna</span>, a
                developer who loves turning <span className="font-medium text-white">ideas</span> into
                <span className="text-cyan-400 font-medium"> real products</span>. From a blank
                canvas to a polished launch, I enjoy creating experiences that people
                genuinely love to use.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                Beyond coding, you'll usually find me in the
                <span className="font-medium text-white"> gym</span>, out
                <span className="font-medium text-white"> running</span>, exploring new
                <span className="font-medium text-white"> places</span>, or
                <span className="font-medium text-white"> sketching</span> whenever
                inspiration strikes. These hobbies keep me disciplined, creative, and
                constantly curious.
              </ScrollReveal>

              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                I believe the best projects are the ones that get
                <span className="text-cyan-400 font-semibold"> shipped</span>. Whether I'm
                building personal products or working with
                <span className="font-medium text-white"> freelance clients</span>, I focus
                on solving real problems, refining every detail, and delivering work I'm
                proud to put my name on.
              </ScrollReveal>
            </div>



            <div className="mt-12 flex flex-wrap gap-4">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/Kalyan-github-4",
                  icon: GithubLogo,
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/YOUR_USERNAME",
                  icon: LinkedinLogo,
                },
                {
                  name: "Twitter",
                  href: "https://x.com/YOUR_USERNAME",
                  icon: XLogo,
                },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
        group
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        border-[#2A1A4D]/70
        bg-[#120B20]/60
        px-5
        py-3
        text-sm
        font-medium
        text-zinc-300
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-[#785AC8]
        hover:bg-[#2A1A4D]/70
        hover:text-white
        hover:shadow-[0_0_25px_rgba(120,90,200,0.35)]
      "
                >
                  <Icon
                    size={20}
                    weight="duotone"
                    className="transition-all duration-300 group-hover:scale-110 group-hover:text-[#C8BCFF]"
                  />

                  <span>{name}</span>

                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 p-20">
          <AboutOrbit />
        </div>

        {/* Background overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_58%,rgba(0,0,0,0.82)_100%)]" />
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
      `}</style>
    </>
  )
}