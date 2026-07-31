import { motion, useTransform } from "framer-motion"
import type { ProfileRevealImageProps } from "./types"

export function ProfileRevealImage({
	image,
	alt,
	progress,
	start,
	end,
	simplify = false,
}: ProfileRevealImageProps) {
	const ramp = 0.04

	const opacity = useTransform(
		progress,
		[start, start + ramp, end - ramp, end],
		[0, 1, 1, 0]
	)

	// A gentle drift rather than a zoom — the old 1.08 start read as a lurch
	// next to the slower text.
	const scale = useTransform(progress, [start, start + ramp, end], [1.04, 1, 1.02])

	const blur = useTransform(
		progress,
		[start, start + ramp, end - ramp, end],
		["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
	)

	return (
		<motion.img
			src={image}
			alt={alt}
			loading="lazy"
			decoding="async"
			style={{
				opacity,
				scale,
				...(simplify ? {} : { filter: blur }),
			}}
			className="absolute inset-0 h-full w-full object-cover"
		/>
	)
}
