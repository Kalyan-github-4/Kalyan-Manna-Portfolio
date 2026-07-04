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
	blur: MotionValue<number>
}

export interface AboutRevealSlideProps {
	slide: Pick<AboutSlide, "title" | "subtitle">
	progress: MotionValue<number>
	start: number
	end: number
}

export interface ProfileRevealImageProps {
	image: string
	alt: string
	progress: MotionValue<number>
	start: number
	end: number
}

export interface AboutContentProps {
	slides: AboutSlide[]
	progress: MotionValue<number>
	opacity: MotionValue<number>
	y: MotionValue<number>
}

export interface ProfileImageProps {
	image: string
	alt: string
	slides: AboutSlide[]
	progress: MotionValue<number>
	top: MotionValue<string>
	x: MotionValue<string>
	y: MotionValue<string>
	width: MotionValue<string>
	height: MotionValue<string>
	borderRadius: MotionValue<string>
	opacity: MotionValue<number>
	baseImageOpacity: MotionValue<number>
}
