type BlogCardProps = {
	date: string
	title: string
	description: string
}

export function BlogCard({ date, title, description }: BlogCardProps) {
	return (
		<a className="group flex items-start gap-8 border-b border-border/10 py-4 transition-colors hover:text-primary" href="#">
			<span className="pt-2 font-mono text-sm text-foreground-muted/40">{date}</span>
			<div className="flex-1">
				<h3 className="text-lg font-semibold transition-colors group-hover:text-primary">{title}</h3>
				<p className="mt-2 text-foreground-muted/60">{description}</p>
			</div>
		</a>
	)
}
