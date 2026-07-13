import { ArrowLeft, ArrowUpRight, House } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import { Globe } from "./globe"

const ease = [0.22, 1, 0.36, 1] as const

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#08080a] text-white">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </div>

            <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex flex-col items-center"
                >
                    <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
                        Error / 404
                    </p>

                    {/* 4 · Globe · 4 */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                        <span className="select-none font-sans text-7xl font-semibold tracking-[-0.06em] text-white sm:text-8xl lg:text-9xl">
                            4
                        </span>

                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9, ease }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [-5, 5] }}
                                transition={{
                                    duration: 5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                                className="w-24 sm:w-32 lg:w-40"
                            >
                                <Globe />
                            </motion.div>
                            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_55%,#08080a_78%)]" />
                        </motion.div>

                        <span className="select-none font-sans text-7xl font-semibold tracking-[-0.06em] text-white sm:text-8xl lg:text-9xl">
                            4
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="mt-12 max-w-3xl font-sans text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl"
                >
                    Lost in
                    <span className="font-serif font-normal italic text-zinc-500">
                        {" "}
                        orbit.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.18, ease }}
                    className="mt-6 max-w-md text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8"
                >
                    The page you&apos;re looking for drifted off into deep space, or
                    perhaps it never existed. Let&apos;s get you back on course.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.26, ease }}
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Go back
                    </button>

                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <House size={16} weight="fill" />
                        Back to home
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </motion.div>
            </section>
        </main>
    )
}
