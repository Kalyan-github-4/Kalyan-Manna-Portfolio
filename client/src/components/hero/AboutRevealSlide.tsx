import { motion, useTransform } from "framer-motion"
import type { AboutRevealSlideProps } from "./types"

export function AboutRevealSlide({
	slide,
	progress,
	start,
	end,
	simplify = false,
}: AboutRevealSlideProps) {
	const mid = (start + end) / 2

	// A slide reads in over its first ~4% of scroll rather than 2.5%, so the
	// heading is legible while the gesture is still in progress instead of
	// snapping in at the end of it.
	const ramp = 0.04
	const travel = simplify ? 26 : 42

	const opacity = useTransform(
		progress,
		[start, start + ramp, end - ramp, end],
		[0, 1, 1, 0]
	)

	const y = useTransform(
		progress,
		[start, start + ramp, end - ramp, end],
		[travel, 0, 0, -travel]
	)

	const scale = useTransform(progress, [start, mid, end], [0.98, 1, 0.98])

	const blur = useTransform(
		progress,
		[start, start + ramp, end - ramp, end],
		["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
	)

	return (
		<motion.div
			style={{
				opacity,
				y,
				// Blur and scale on a full-width display heading are the two things
				// that make this feel heavy on a phone — opacity and position alone
				// carry the same reading there.
				...(simplify ? {} : { scale, filter: blur }),
			}}
			className="absolute inset-0 flex flex-col items-center justify-start text-center sm:items-start sm:justify-center sm:text-left"
		>
			<h2 className="text-shadow-subtle max-w-4xl font-display text-[2.6rem] font-medium leading-[1.05] text-white min-[390px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
				{slide.title}
			</h2>

			<p className="mt-5 max-w-xl text-base leading-7 tracking-wide text-zinc-400 sm:mt-6 sm:max-w-2xl sm:text-xl sm:leading-8">
				{slide.subtitle}
			</p>
		</motion.div>
	)
}