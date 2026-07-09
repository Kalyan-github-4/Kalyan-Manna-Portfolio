import { CaretRight } from "@phosphor-icons/react"
import { motion, useTransform } from "framer-motion"
import { HeroButtons } from "@/components/hero/HeroButtons"
import type { HeroContentProps } from "./types"
import { Link } from "react-router-dom"

export function HeroContent({ opacity, y, blur }: HeroContentProps) {
	return (
		<motion.section
			id="home"
			style={{
				opacity,
				y,
				filter: useTransform(blur, (value) => `blur(${value}px)`),
			}}
			className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center sm:px-6 md:px-8 lg:px-10"
		>
			<div className="w-full max-w-5xl">
				<Link
					to="/work"
					className="group mb-6 inline-flex items-center gap-3 rounded-2xl px-1 py-1 transition-all duration-300 hover:border hover:border-white/20 sm:mb-8"
				>
					<span className="flex h-5 min-w-10 items-center justify-center rounded-full bg-sky-600 px-2 text-[10px] font-medium text-white sm:min-w-10.5 sm:text-[11px]">
						New
					</span>

					<span className="relative inline-block overflow-hidden text-xs font-medium sm:text-sm">
						<span className="animate-text-shimmer bg-[linear-gradient(110deg,#a1a1aa_35%,#ffffff_50%,#a1a1aa_65%)] bg-size-[200%_100%] bg-clip-text text-transparent">
							Explore my latest projects
						</span>
					</span>

					<CaretRight
						size={14}
						className="-ml-1 mr-2 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
					/>
				</Link>

				<p className="text-shadow-subtle mx-auto mb-8 max-w-4xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-[2.4rem] leading-[1.12] text-transparent min-[390px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
					Build at the speed of thought.
					<span className="mt-2 block italic sm:mt-3">
						Deploy with absolute confidence.
					</span>
				</p>

				<h1 className="mx-auto mb-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 font-sans text-sm leading-relaxed sm:text-base md:text-xl">
					<span className="bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
						Hello, I&apos;m Kalyan Manna
					</span>

					<span className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-600 p-0.5 text-sm font-medium text-white transition-all duration-300 hover:from-zinc-300 hover:via-zinc-500 hover:to-zinc-700 sm:text-base">
						<img
							src="/kalyan-manna.jpg"
							alt="Kalyan Manna"
							className="h-[1.8em] w-[3.2em] rounded-full object-cover "
						/>

						<span className="pointer-events-none absolute -bottom-2 -left-7 scale-75  px-1.5 py-0.5 text-3xl opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
							👋
						</span>
					</span>

					<span className="bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
						a Fullstack Developer
					</span>
				</h1>
				<div className="mt-8 sm:mt-10 z-99">
					<HeroButtons />
				</div>
			</div>
		</motion.section>
	)
}
