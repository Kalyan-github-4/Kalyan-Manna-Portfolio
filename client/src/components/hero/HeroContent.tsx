import { CaretRight } from "@phosphor-icons/react"
import { motion, useTransform } from "framer-motion"
import { HeroButtons } from "@/components/hero/HeroButtons"
import type { HeroContentProps } from "./types"

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
				<a
					href="#projects"
					className="group mb-6 inline-flex items-center gap-3 rounded-2xl px-1 py-1 transition-all duration-300 hover:border hover:border-white/20 sm:mb-8"
				>
					<span className="flex h-5 min-w-[40px] items-center justify-center rounded-full bg-sky-600 px-2 text-[10px] font-medium text-white sm:min-w-[42px] sm:text-[11px]">
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
				</a>

				<p className="text-shadow-subtle mx-auto mb-8 max-w-4xl bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text font-display text-3xl leading-[1.3] text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
					Build at the speed of thought.
					<span className="mt-2 block italic sm:mt-3">
						Deploy with absolute confidence.
					</span>
				</p>

				<h1 className="mb-6 text-base leading-relaxed bg-linear-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text font-sans text-transparent sm:text-lg md:text-xl">
					Hello, I&apos;m Kalyan Manna
					<span className="inline-flex h-[1.6em] w-[2.8em] align-middle sm:h-[1.8em] sm:w-[3.2em]" />
					{" "}a Fullstack Developer
				</h1>

				<div className="mt-8 sm:mt-10 z-99">
					<HeroButtons />
				</div>
			</div>
		</motion.section>
	)
}
