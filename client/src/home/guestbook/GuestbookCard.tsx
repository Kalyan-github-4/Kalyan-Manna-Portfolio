type GuestbookCardProps = {
	name: string
	time: string
	message: string
	featured?: boolean
	muted?: boolean
	faded?: boolean
}

export function GuestbookCard({ name, time, message, featured, muted, faded }: GuestbookCardProps) {
	return (
		<div className={`rounded-lg border border-border bg-card/60 p-6 ${featured ? "border-l-4 border-l-primary/40" : ""} ${muted ? "opacity-80" : ""} ${faded ? "opacity-60" : ""}`}>
			<div className="mb-2 flex items-center justify-between gap-4">
				<span className="font-semibold text-foreground">{name}</span>
				<span className="font-mono text-[12px] text-foreground-muted/40">{time}</span>
			</div>
			<p className="text-foreground-muted">{message}</p>
		</div>
	)
}
