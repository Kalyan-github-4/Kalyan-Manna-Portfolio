import type { ReactNode } from "react"

type SocialLinkProps = {
	href: string
	label: string
	icon: ReactNode
}

export function SocialLink({ href, label, icon }: SocialLinkProps) {
	return (
		<a className="transition-colors hover:text-primary" href={href} aria-label={label}>
			{icon}
		</a>
	)
}
