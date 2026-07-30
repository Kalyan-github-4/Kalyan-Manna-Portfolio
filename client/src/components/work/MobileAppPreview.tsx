
import { ArrowUpRight } from "@phosphor-icons/react"

type MobileAppPreviewProps = {
    description: string
    images: string[]
}

export default function MobileAppPreview({
    description,
    images,
}: MobileAppPreviewProps) {
    const safeImages = images.slice(0, 3)

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

            <div className="absolute bottom-[-38px] left-1/2 z-10 flex h-[340px] w-full max-w-[620px] -translate-x-1/2 items-end justify-center">
                {safeImages.map((image, index) => {
                    const positionClass =
                        index === 0
                            ? "z-10 -mr-12 rotate-[-7deg] group-hover:-translate-x-16 group-hover:-mr-2 group-hover:rotate-[-4deg]"
                            : index === 1
                              ? "z-20 -translate-y-4 scale-[1.04] group-hover:-translate-y-7 group-hover:scale-[1.08]"
                              : "z-10 -ml-12 rotate-[7deg] group-hover:translate-x-16 group-hover:-ml-2 group-hover:rotate-[4deg]"

                    return (
                        <div
                            key={`${image}-${index}`}
                            className={[
                                "relative h-[292px] w-[142px] shrink-0 transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]",
                                "sm:h-[320px] sm:w-[156px]",
                                "md:h-[342px] md:w-[166px]",
                                positionClass,
                            ].join(" ")}
                        >
                            {/* Physical phone body */}
                            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-zinc-500 via-zinc-800 to-black p-[2px] shadow-[0_28px_55px_rgba(0,0,0,0.55)]">
                                {/* Black bezel */}
                                <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black p-[3px]">
                                    {/* Display */}
                                    <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-zinc-950">
                                        <img
                                            src={image}
                                            alt={`EasyPG app screen ${index + 1}`}
                                            className="h-full w-full object-cover object-top"
                                        />

                                        {/* Subtle screen shading */}
                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_25%,transparent_75%,rgba(255,255,255,0.03))]" />

                                        {/* Top status-area shadow */}
                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/25 to-transparent" />

                                        {/* Dynamic Island */}
                                        <div className="absolute left-1/2 top-[7px] z-30 -translate-x-1/2">
                                            <div className="relative h-[16px] w-[48px] rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_1px_3px_rgba(0,0,0,0.5)]">
                                                {/* Front camera */}
                                                <div className="absolute right-[6px] top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full bg-[#111827]">
                                                    <div className="absolute inset-[1px] rounded-full bg-[#24314d]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Home indicator */}
                                        <div className="absolute bottom-[5px] left-1/2 z-30 h-[3px] w-[52px] -translate-x-1/2 rounded-full bg-white/55" />
                                    </div>
                                </div>

                                {/* Silent switch */}
                                <div className="absolute -left-[2px] top-[58px] h-[16px] w-[3px] rounded-l-full bg-zinc-600" />

                                {/* Volume up */}
                                <div className="absolute -left-[2px] top-[86px] h-[30px] w-[3px] rounded-l-full bg-zinc-600" />

                                {/* Volume down */}
                                <div className="absolute -left-[2px] top-[124px] h-[30px] w-[3px] rounded-l-full bg-zinc-600" />

                                {/* Power button */}
                                <div className="absolute -right-[2px] top-[92px] h-[52px] w-[3px] rounded-r-full bg-zinc-600" />

                                {/* Metal edge highlight */}
                                <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-white/10" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

