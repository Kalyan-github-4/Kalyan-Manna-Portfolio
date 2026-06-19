export function Timeline() {
	const milestones = [
		{ year: "2022", label: "Freelance Era Began" },
		{ year: "2023", label: "Launched 10+ Projects" },
		{ year: "2024", label: "Full-stack Mastery" },
	]

	return (
		<div className="border-t border-border/10 pt-8">
			<div className="grid gap-6 md:grid-cols-3">
				{milestones.map((milestone) => (
					<div key={milestone.year} className="flex flex-col">
						<span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
							{milestone.year}
						</span>
						<span className="font-medium text-foreground">{milestone.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}
