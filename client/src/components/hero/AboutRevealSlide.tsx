import { motion, useTransform } from "framer-motion"
import type { AboutRevealSlideProps } from "./types"

export function AboutRevealSlide({
	slide,
	progress,
	start,
	end,
}: AboutRevealSlideProps) {
	const mid = (start + end) / 2

	const opacity = useTransform(
		progress,
		[start, start + 0.025, end - 0.025, end],
		[0, 1, 1, 0]
	)

	const y = useTransform(
		progress,
		[start, start + 0.025, end - 0.025, end],
		[42, 0, 0, -42]
	)

	const scale = useTransform(progress, [start, mid, end], [0.96, 1, 0.96])

	const blur = useTransform(
		progress,
		[start, start + 0.025, end - 0.025, end],
		["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]
	)

	return (
		<motion.div
			style={{
				opacity,
				y,
				scale,
				filter: blur,
			}}
			className="absolute inset-0 flex flex-col items-start justify-center text-left"
		>
			<h2 className="text-shadow-subtle max-w-4xl font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
				{slide.title}
			</h2>

			<p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl md:text-2xl">
				{slide.subtitle}
			</p>
		</motion.div>
	)
}
