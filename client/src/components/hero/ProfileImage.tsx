import { motion } from "framer-motion"
import type { ProfileImageProps } from "./types"
import { ProfileRevealImage } from "./ProfileRevealImage"

export function ProfileImage({
	image,
	alt,
	slides,
	progress,
	top,
	x,
	y,
	width,
	height,
	borderRadius,
	opacity,
	baseImageOpacity,
}: ProfileImageProps) {
	return (
		<motion.div
			style={{
				top,
				x,
				y,
				width,
				height,
				borderRadius,
				opacity,
			}}
			className="pointer-events-none absolute left-[51%] z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/20 shadow-2xl shadow-black/50"
		>
			<motion.img
				src={image}
				alt={alt}
				loading="eager"
				decoding="async"
				style={{
					opacity: baseImageOpacity,
				}}
				className="absolute inset-0 h-full w-full object-cover"
			/>

			{slides.map((slide, index) => (
				<ProfileRevealImage
					key={`profile-${slide.image}-${index}`}
					image={slide.image}
					alt={slide.alt}
					progress={progress}
					start={slide.start}
					end={slide.end}
				/>
			))}
		</motion.div>
	)
}
