import { motion, useTransform } from "framer-motion"
import type { ProfileRevealImageProps } from "./types"

export function ProfileRevealImage({
	image,
	alt,
	progress,
	start,
	end,
}: ProfileRevealImageProps) {
	const opacity = useTransform(
		progress,
		[start, start + 0.025, end - 0.025, end],
		[0, 1, 1, 0]
	)

	const scale = useTransform(
		progress,
		[start, start + 0.025, end],
		[1.08, 1, 1.04]
	)

	const blur = useTransform(
		progress,
		[start, start + 0.025, end - 0.025, end],
		["blur(18px)", "blur(0px)", "blur(0px)", "blur(18px)"]
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
				filter: blur,
			}}
			className="absolute inset-0 h-full w-full object-cover"
		/>
	)
}
