import type { ReactNode } from "react"

import { faintDiagonalStripeStyle } from "@/components/shared/stripeStyles"
import { VAULT_CARD_FRAME } from "@/components/vault/VaultFilterBar"

/** The words a muted heading leans on. */
export function Strong({ children }: { children: ReactNode }) {
    return <span className="text-white">{children}</span>
}

interface SplitSectionProps {
    title: ReactNode
    children: ReactNode
}

/**
 * A striped frame: the heading stays in view beside its longer content. The
 * sticky heading needs a page shell with `overflow-clip`, not `overflow-hidden`.
 */
export default function SplitSection({ title, children }: SplitSectionProps) {
    return (
        <section
            className={`${VAULT_CARD_FRAME} mb-6 grid grid-cols-1 gap-3 lg:grid-cols-[3fr_7fr]`}
            style={faintDiagonalStripeStyle}
        >
            <div className="px-2 pt-2 sm:px-4 sm:pt-6">
                <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-zinc-500 lg:sticky lg:top-28 xl:text-4xl">
                    {title}
                </h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#050507] p-5 sm:p-7">
                {children}
            </div>
        </section>
    )
}
