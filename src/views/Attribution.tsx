"use client"

import { ArrowUpRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import {
    milestones,
    people,
    stack,
    story,
    thanks,
    typefaces,
} from "@/data/attributionData"
import SilkBackground from "@/components/shared/SilkBackground"
import EdgeStripes from "@/components/shared/EdgeStripes"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import Section, { Strong } from "@/components/shared/SplitSection"

const EASE = [0.22, 1, 0.36, 1] as const

function CreditList({ items }: { items: typeof thanks }) {
    return (
        <ul className="-my-4 divide-y divide-white/10">
            {items.map(({ name, note, href, site }) => (
                <li key={name}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid gap-1 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:grid-cols-[10rem_1fr_auto] md:items-center md:gap-6"
                    >
                        <span className="font-display text-2xl leading-tight text-white">
                            {name}
                        </span>

                        <span className="text-sm text-zinc-400">{note}</span>

                        <span className="flex items-center gap-1 text-sm text-zinc-400 transition-colors group-hover:text-white">
                            {site}
                            <ArrowUpRight
                                size={13}
                                weight="bold"
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default function Attribution() {
    return (
        <main className="min-h-screen bg-black">
            {/* Same shell and frames as /vault. */}
            <section className="relative overflow-clip bg-black px-4 pb-28 pt-24 text-white sm:px-8 lg:px-9">
                <SilkBackground />

                <EdgeStripes />

                <div className="relative z-10 mx-auto w-full">
                    <header className="mb-8 px-8 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
                        >
                            Attribution
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
                            className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-4xl text-transparent text-shadow-subtle sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            How this site{" "}
                            <GradientText
                                className="inline-block overflow-visible pb-2 italic"
                                colors={HEADING_GRADIENT}
                                animationSpeed={6}
                            >
                                came together
                            </GradientText>
                        </motion.h1>
                    </header>

                    <Section title={<>The <Strong>story</Strong>,<br />so far.</>}>
                        <div className="space-y-4 text-base leading-relaxed text-zinc-300">
                            {story.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <ol className="mt-7 divide-y divide-white/10 border-t border-white/10">
                            {milestones.map(({ date, label }) => (
                                <li key={label} className="flex gap-4 py-2.5 text-sm sm:gap-6">
                                    <time className="w-18 shrink-0 font-mono text-xs leading-5 text-zinc-400">
                                        {date}
                                    </time>
                                    <span className="font-medium text-zinc-200">{label}</span>
                                </li>
                            ))}
                        </ol>
                    </Section>

                    {people.length > 0 && (
                        <Section title={<>The people<br />I <Strong>learn from</Strong>.</>}>
                            <CreditList items={people} />
                        </Section>
                    )}

                    <Section title={<>What <Strong>runs</Strong><br />this site.</>}>
                        <dl className="space-y-5">
                            {stack.map(({ group, items }) => (
                                <div key={group}>
                                    <dt className="text-sm font-medium text-zinc-400">{group}</dt>
                                    <dd className="mt-2 flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-md bg-zinc-800/90 px-2 py-1 text-xs font-medium text-zinc-200"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Section>

                    <Section title={<>Four <Strong>faces</Strong>,<br />four jobs.</>}>
                        <ul className="divide-y divide-white/10">
                            {typefaces.map(({ name, role, sample, className }) => (
                                <li key={name} className="py-4 first:pt-0 last:pb-0">
                                    <p className={`leading-tight text-white ${className}`}>{sample}</p>
                                    <p className="mt-2 text-sm text-zinc-400">
                                        <span className="font-medium text-zinc-200">{name}</span> · {role}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title={<>The work<br />I owe <Strong>thanks</Strong> to.</>}>
                        <CreditList items={thanks} />
                    </Section>
                </div>
            </section>
        </main>
    )
}
