import { useState } from "react"
import { ArrowRight, Check, Copy } from "@phosphor-icons/react"

import { ContactDialog } from "@/components/contact/ContactDialog"

export function HeroButtons() {
	const email = "kalyanmanna439@gmail.com"
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email)
			setCopied(true)

			setTimeout(() => {
				setCopied(false)
			}, 2000)
		} catch (err) {
			console.error("Failed to copy email:", err)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<ContactDialog
				email={email}
				name="Kalyan"
				imageSrc="/kalyan-manna.jpg"
				imageAlt="Kalyan Manna"
				calUrl="https://cal.com/kalyanmanna"
				linkedinUrl="https://www.linkedin.com/"
				xUrl="https://x.com/"
				githubUrl="https://github.com/Kalyan-github-4"
			>
				<button
					type="button"
					className="
		group relative inline-flex cursor-pointer items-center justify-between
		overflow-hidden rounded-full border border-white/20
		bg-white/10 py-1 pl-5 pr-1
		text-sm font-semibold text-white
		backdrop-blur-xl
		transition-all duration-500 ease-out
		hover:-translate-y-0.5
		hover:border-white/30
		hover:bg-white/15
		active:translate-y-0 active:scale-[0.98]
	"
				>
					<span
						aria-hidden="true"
						className="
			absolute right-1 top-1/2
			h-10 w-10 -translate-y-1/2
			rounded-full bg-white
			transition-all duration-700
			ease-[cubic-bezier(.19,1,.22,1)]
			group-hover:right-0
			group-hover:h-full
			group-hover:w-full
		"
					/>

					<span
						className="
			relative z-10 whitespace-nowrap
			transition-colors duration-500
			group-hover:text-slate-900
		"
					>
						Let&apos;s Connect
					</span>

					<span
						className="
			relative z-10 ml-2
			flex h-10 w-10 shrink-0
			items-center justify-center
			rounded-full text-slate-900
			transition-transform duration-500 ease-out
			group-hover:translate-x-0.5
		"
					>
						<ArrowRight
							size={14}
							weight="bold"
							className="
				transition-transform duration-500
				group-hover:-rotate-45
			"
						/>
					</span>
				</button>
			</ContactDialog>

			<button
				type="button"
				onClick={handleCopy}
				className="group inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-zinc-300 active:translate-y-0 active:scale-95"
			>
				<span className="relative flex h-5 w-5 items-center justify-center">
					<Copy
						size={18}
						className={`absolute transition-all duration-300 ${copied
								? "scale-0 rotate-90 opacity-0"
								: "scale-100 rotate-0 opacity-100"
							}`}
					/>

					<Check
						size={18}
						className={`absolute text-green-400 transition-all duration-300 ${copied
								? "scale-100 rotate-0 opacity-100"
								: "scale-0 -rotate-90 opacity-0"
							}`}
					/>
				</span>

				<span className="transition-all duration-300">
					{copied ? "Copied to clipboard" : "Copy email"}
				</span>
			</button>
		</div>
	)
}