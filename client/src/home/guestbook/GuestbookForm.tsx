import { useState } from "react"

export function GuestbookForm() {
	const [submitted, setSubmitted] = useState(false)

	return (
		<form
			className="mb-12 space-y-6 rounded-xl border border-border bg-card/70 p-8"
			onSubmit={(event) => {
				event.preventDefault()
				setSubmitted(true)
			}}
		>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<label className="flex flex-col gap-2">
					<span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground-muted">Your Name</span>
					<input className="rounded-lg border border-border bg-background px-3 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="John Doe" type="text" />
				</label>
				<label className="flex flex-col gap-2">
					<span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground-muted">Message</span>
					<input className="rounded-lg border border-border bg-background px-3 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Write something nice..." type="text" />
				</label>
			</div>
			<button className="w-full rounded-lg bg-primary py-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95" type="submit">
				{submitted ? "Signed!" : "Sign the Guestbook"}
			</button>
		</form>
	)
}
