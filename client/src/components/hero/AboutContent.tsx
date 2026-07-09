import { motion } from "framer-motion"
import { AboutRevealSlide } from "./AboutRevealSlide"
import type { AboutContentProps } from "./types"

export function AboutContent({
	slides,
	progress,
	opacity,
	y,
}: AboutContentProps) {
	return (
		<motion.div
			style={{
				opacity,
				y,
			}}
			className="pointer-events-none absolute inset-0 z-30 min-h-screen px-5 sm:px-8 lg:px-16"
		>
			<motion.p
				style={{
					opacity,
					y,
				}}
				className="absolute left-1/2 top-[10%] -translate-x-1/2 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500 sm:top-[12%] sm:text-[11px] sm:tracking-[0.35em] lg:top-[14%]"
			>
				A BIT ABOUT ME
			</motion.p>

			<div className="flex min-h-screen w-full items-end justify-center pb-16 sm:items-center sm:justify-start sm:pb-0">
				<div className="relative h-77.5 w-full max-w-xl sm:h-105 sm:max-w-2xl lg:max-w-3xl">
					{slides.map((slide, index) => (
						<AboutRevealSlide
							key={`about-${index}`}
							slide={slide}
							progress={progress}
							start={slide.start}
							end={slide.end}
						/>
					))}
				</div>
			</div>
		</motion.div>
	)
}