import type { MotionValue } from "framer-motion"
import type { ReactNode } from "react"

export interface AboutSlide {
	title: ReactNode
	subtitle: ReactNode
	image: string
	alt: string
	start: number
	end: number
}

export interface HeroContentProps {
	opacity: MotionValue<number>
	y: MotionValue<number>
	/** Flips to "hidden" once the hero has faded, so it stops catching clicks. */
	visibility: MotionValue<"visible" | "hidden">
}

export interface AboutRevealSlideProps {
	slide: Pick<AboutSlide, "title" | "subtitle">
	progress: MotionValue<number>
	start: number
	end: number
	/** Drop blur and scale — set on phones, where they cost the most and read the least. */
	simplify?: boolean
}

export interface ProfileRevealImageProps {
	image: string
	alt: string
	progress: MotionValue<number>
	start: number
	end: number
	simplify?: boolean
}

export interface AboutContentProps {
	slides: AboutSlide[]
	progress: MotionValue<number>
	opacity: MotionValue<number>
	y: MotionValue<number>
	simplify?: boolean
}

export interface ProfileImageProps {
	image: string
	alt: string
	slides: AboutSlide[]
	progress: MotionValue<number>
	simplify?: boolean
	/** Static placement — the portrait no longer morphs out of the hero avatar. */
	top: string
	x: string
	y: string
	size: string
	opacity: MotionValue<number>
	baseImageOpacity: MotionValue<number>
}
