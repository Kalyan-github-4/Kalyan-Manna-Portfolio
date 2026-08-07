
import { ArrowUpRight } from "@phosphor-icons/react"

import MobileAppScreens from "./MobileAppScreens"

type MobileAppPreviewProps = {
    description: string
    images: string[]
    label: string
}

export default function MobileAppPreview({
    description,
    images,
    label,
}: MobileAppPreviewProps) {
    return (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.45))]" />

            <div className="relative z-20 flex items-start justify-between gap-6">
                <p className="max-w-xl text-base font-medium leading-relaxed text-zinc-200 md:text-lg">
                    {description}
                </p>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={21} weight="bold" />
                </span>
            </div>

            <MobileAppScreens
                images={images}
                label={label}
                className="absolute bottom-[-38px] left-1/2 z-10 flex h-[340px] w-full max-w-[620px] -translate-x-1/2 items-end justify-center"
            />
        </>
    )
}
