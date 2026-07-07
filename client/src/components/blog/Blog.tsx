"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, CalendarBlank, Clock } from "@phosphor-icons/react"
import GradientText from "@/components/GradientText"

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: custom * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const categories = [
  "All Posts",
  "React",
  "Next.js",
  "TypeScript",
  "Frontend",
  "Backend",
  "Career",
  "Projects",
]

const featuredPost = {
  title: "How I Build Modern Full-Stack Products",
  excerpt:
    "A practical breakdown of my process for designing, building, and shipping scalable web and mobile applications with clean architecture.",
  category: "Full Stack",
  date: "Jul 07, 2026",
  readTime: "8 min read",
  href: "#",
  tags: ["React", "Node.js", "PostgreSQL"],
}

const posts = [
  {
    title: "Designing Better Portfolio Sections",
    excerpt:
      "Small UI decisions that make a portfolio feel premium, readable, and conversion-focused.",
    category: "Design",
    date: "Jun 28, 2026",
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Why Clean Component Structure Matters",
    excerpt:
      "How splitting UI into smaller components improves readability, performance, and long-term maintainability.",
    category: "React",
    date: "Jun 18, 2026",
    readTime: "7 min read",
    href: "#",
  },
  {
    title: "Building Apps That Feel Fast",
    excerpt:
      "Performance principles I follow while building modern React and mobile applications.",
    category: "Performance",
    date: "May 30, 2026",
    readTime: "5 min read",
    href: "#",
  },
]
const diagonalStripeStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)",
}
const Blog = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen flex-col px-6 py-28 sm:px-8 md:px-10 lg:px-13">

        {/* Left diagonal stripe border */}
        <div
          aria-hidden="true"
          style={diagonalStripeStyle}
          className=" pointer-events-none absolute bottom-0 left-4 top-0 z-0 w-9 border-x border-white/10"
        />

        {/* Right diagonal stripe border */}
        <div
          aria-hidden="true"
          style={diagonalStripeStyle}
          className="pointer-events-none absolute bottom-0 right-4 top-0 z-0 w-9 border-x border-white/10"
        />

        <div className="relative mb-28 flex min-h-[280px] items-center justify-center text-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/50"
            >
              The Journal
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display"
            >
              Handpick{" "}
              <GradientText
                className="inline-block overflow-visible"
                colors={["#1E40AF", "#9333EA", "#DB2777"]}
                animationSpeed={6}
              >
                Insights
              </GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.75,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8"
            >
              A curated space where I write about development, design decisions,
              product thinking, and the lessons I learn while building real-world
              digital experiences.
            </motion.p>
          </div>
        </div>

        {/* Category chips + Search */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 flex w-full flex-col gap-6 border-y border-white/10 py-6 px-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
                  index === 0
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-white",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[320px]">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-violet-400/50"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-500">
              ⌘ K
            </span>
          </div>
        </motion.div>

        {/* Featured */}
        <div className="w-full px-6">
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="mb-8 flex items-center justify-between"
          >
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Featured Article
            </h2>
          </motion.div>

          <motion.a
            href={featuredPost.href}
            custom={5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="group relative mb-20 block w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-6 transition-all duration-500 hover:border-white/25 sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(30,64,175,0.16),transparent_34%)] opacity-80" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    Featured
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                    {featuredPost.category}
                  </span>
                </div>

                <h3 className="max-w-3xl font-serif text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                  {featuredPost.title}
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5 lg:items-end">
                <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarBlank size={18} />
                    {featuredPost.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={18} />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="inline-flex items-center gap-3 text-sm font-semibold text-white">
                  Read article
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={18} weight="bold" />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        </div>

        {/* Latest Articles */}
        <div className="w-full px-6">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="mb-8 flex items-center justify-between"
          >
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Latest Articles
            </h2>
          </motion.div>

          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.a
                key={post.title}
                href={post.href}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                className="group flex min-h-[320px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                      {post.category}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={17} weight="bold" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium leading-tight text-white">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-zinc-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
export default Blog