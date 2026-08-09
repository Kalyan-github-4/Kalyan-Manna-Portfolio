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

	// Layers stack in slide order and only ever fade *in* — each one holds at
	// full once it arrives and is simply covered by the next. Fading out at the
	// end of a slide instead would leave every boundary with all layers at zero
	// for an instant, blinking the portrait circle empty. The last layer is
	// taken away by the section's own exit fade.
	const opacity = useTransform(progress, [start, start + ramp], [0, 1])

	// A gentle drift rather than a zoom — the old 1.08 start read as a lurch
	// next to the slower text.
	const scale = useTransform(progress, [start, start + ramp, end], [1.04, 1, 1.02])

	const blur = useTransform(
		progress,
		[start, start + ramp],
		["blur(10px)", "blur(0px)"]
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
				// Kept in the object even when skipped — see AboutRevealSlide: a
				// dropped `filter` key is never written again, so the last blur
				// would stay baked into the image.
				filter: simplify ? "none" : blur,
			}}
			className="absolute inset-0 h-full w-full object-cover"
		/>
	)
}
