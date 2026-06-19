type ProjectCardProps = {
	title: string
	tags: string[]
	description: string
	image: string
}

export function ProjectCard({ title, tags, description, image }: ProjectCardProps) {
	return (
		<article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/60">
			<div className="flex items-center gap-1.5 border-b border-border/10 bg-card/40 p-4">
				<span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
				<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
				<span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
			</div>
			<div className="relative h-48 overflow-hidden">
				<img
					alt={`${title} preview`}
					className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
					src={image}
				/>
			</div>
			<div className="flex flex-1 flex-col p-6">
				<div className="mb-4 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span key={tag} className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
							{tag}
						</span>
					))}
				</div>
				<h3 className="mb-2 text-2xl font-semibold">{title}</h3>
				<p className="mb-6 text-foreground-muted">{description}</p>
				<div className="mt-auto flex items-center gap-4 text-sm font-semibold">
					<a className="text-primary transition-transform hover:-translate-y-0.5" href="#">
						Live →
					</a>
					<a className="text-foreground-muted transition-colors hover:text-foreground" href="#">
						Code
					</a>
				</div>
			</div>
		</article>
	)
}
