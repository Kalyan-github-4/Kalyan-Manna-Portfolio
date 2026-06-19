export function AboutImage() {
	return (
		<div className="relative mx-auto flex w-64 flex-col items-center lg:mx-0">
			<div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_10s_linear_infinite]" />
			<div className="absolute inset-2 rounded-full border border-primary/10" />
			<img
				alt="Kalyan Manna Profile"
				className="h-64 w-64 rounded-full object-cover p-4 grayscale transition-all duration-500 hover:grayscale-0"
				src="/kalyan-manna.jpg"
			/>
			<div className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 whitespace-nowrap">
				<span aria-hidden>📍</span>
				<span className="text-[10px] font-semibold uppercase tracking-[0.35em]">Durgapur, India</span>
			</div>
		</div>
	)
}
