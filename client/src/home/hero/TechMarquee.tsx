const labels = ["REACT", "TYPESCRIPT", "NODE.JS", "NEXT.JS", "TAILWIND", "POSTGRES", "FRAMER MOTION"]

export function TechMarquee() {
	return (
		<div className="pointer-events-none absolute bottom-16 w-full overflow-hidden opacity-30 grayscale transition-all duration-700 hover:grayscale-0">
			<div className="flex gap-16 whitespace-nowrap">
				{Array.from({ length: 2 }).map((_, index) => (
					<div
						key={index}
						className="flex min-w-full shrink-0 animate-[scroll_30s_linear_infinite] justify-around gap-16"
					>
						{labels.map((label) => (
							<span key={label} className="text-3xl font-semibold uppercase tracking-[0.2em] text-foreground-muted">
								{label}
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
