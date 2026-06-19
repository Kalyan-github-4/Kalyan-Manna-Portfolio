type SkillBadgeProps = {
	label: string
	size: "sm" | "md" | "lg" | "xl"
	accent?: boolean
	logo?: string
}

const sizeMap = {
	sm: "px-5 py-2 text-sm",
	md: "px-6 py-3 text-base",
	lg: "px-8 py-4 text-lg",
	xl: "px-10 py-5 text-xl",
} as const

export function SkillBadge({ label, size, accent }: SkillBadgeProps) {
	return (
		<span
			className={`inline-flex items-center rounded-full border border-border bg-card/70 font-semibold tracking-wide transition-transform hover:scale-110 ${sizeMap[size]} ${accent ? "text-primary shadow-[0_0_20px_rgba(167,139,250,0.12)]" : "text-foreground"}`}
		>
			{label}
		</span>
	)
}
