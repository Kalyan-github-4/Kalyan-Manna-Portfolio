import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

import GradientText from "../shared/GradientText"

export type LegalSection = {
  id: string
  label: string
  heading: string
  body: ReactNode
}

type LegalLayoutProps = {
  eyebrow: string
  title: string
  accentWord: string
  intro: string
  updated: string
  readingTime: string
  summary: string[]
  sections: LegalSection[]
  closing: ReactNode
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.08 * custom,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function LegalLayout({
  eyebrow,
  title,
  accentWord,
  intro,
  updated,
  readingTime,
  summary,
  sections,
  closing,
}: LegalLayoutProps) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
  const sectionsRef = useRef(sections)
  sectionsRef.current = sections

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    )

    sectionsRef.current.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[linear-gradient(90deg,#1E40AF,#9333EA,#DB2777)]"
      />

      {/* Ambient glow, sits behind everything */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-0 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,91,230,0.16),transparent_70%)] blur-3xl" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-28 sm:px-8 md:pt-32">
        {/* Header */}
        <header className="max-w-3xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-linear-to-b from-zinc-300 via-zinc-100 to-white bg-clip-text text-transparent">
              {title}{" "}
            </span>
            <GradientText
              className="inline leading-[0.95]"
              colors={["#1E40AF", "#9333EA", "#DB2777"]}
              animationSpeed={7}
            >
              {accentWord}
            </GradientText>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 text-lg leading-8 text-zinc-400 sm:text-xl sm:leading-9"
          >
            {intro}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-zinc-600"
          >
            <span>Updated {updated}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>{readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Written by a human</span>
          </motion.div>
        </header>

        {/* The short version */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
        >
          <p className="font-display text-2xl italic text-white sm:text-3xl">
            The short version
          </p>
          <ul className="mt-5 space-y-3">
            {summary.map((line) => (
              <li key={line} className="flex gap-3 text-zinc-400">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                />
                <span className="text-base leading-7 sm:text-[17px]">{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Body: sticky TOC + sections */}
        <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="mb-4 pl-3 text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                On this page
              </p>
              <ul className="space-y-0.5">
                {sections.map((section, i) => {
                  const active = section.id === activeId
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          active
                            ? "text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="legal-toc-active"
                            className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/[0.04]"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                        <span
                          className={`font-mono text-[11px] tabular-nums transition-colors ${
                            active ? "text-violet-300" : "text-zinc-600"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <div className="min-w-0">
            {sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="scroll-mt-28 border-t border-dashed border-white/10 py-12 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-5 space-y-4 text-[17px] leading-8 text-zinc-400 [&_a]:text-white [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_a:hover]:decoration-violet-300 [&_strong]:font-semibold [&_strong]:text-zinc-200">
                  {section.body}
                </div>
              </motion.section>
            ))}

            {/* Closing / signature */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 border-t border-dashed border-white/10 pt-12"
            >
              {closing}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.9))]" />
    </main>
  )
}
