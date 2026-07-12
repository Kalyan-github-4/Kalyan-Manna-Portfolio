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

            <div className="absolute bottom-[-34px] left-1/2 z-10 flex h-[330px] w-full max-w-[620px] -translate-x-1/2 items-end justify-center">
                {safeImages.map((image, index) => {
                    const positionClass =
                        index === 0
                            ? "z-10 -mr-16 rotate-[-8deg] group-hover:-translate-x-20 group-hover:rotate-[-5deg] group-hover:-mr-4"
                            : index === 1
                                ? "z-20 translate-y-[-18px] scale-105 group-hover:translate-y-[-30px] group-hover:scale-110"
                                : "z-10 -ml-16 rotate-[8deg] group-hover:translate-x-20 group-hover:rotate-[5deg] group-hover:-ml-4"

                    return (
                        <div
                            key={image}
                            className={[
                                "relative h-[300px] w-[150px] shrink-0 transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]",
                                "sm:h-[330px] sm:w-[165px]",
                                "md:h-[350px] md:w-[175px]",
                                positionClass,
                            ].join(" ")}
                        >
                            {/* Phone Frame - Outer Bezel */}
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-2xl shadow-black/60">
                                {/* Inner Bezel */}
                                <div className="absolute inset-[3px] rounded-[29px] bg-black">
                                    {/* Screen with slight curve */}
                                    <div className="absolute inset-[2px] rounded-[27px] overflow-hidden bg-black">
                                        {/* Screen Content */}
                                        <img
                                            src={image}
                                            alt={`EasyPG app screen ${index + 1}`}
                                            className="h-full w-full object-cover object-top"
                                        />

                                        {/* Screen Reflection Effect */}
                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.05)_100%)]" />
                                        
                                        {/* Screen Glare */}
                                        <div className="pointer-events-none absolute -top-[50%] left-1/2 h-[200%] w-[60%] -translate-x-1/2 rotate-[-25deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

                                        {/* Status Bar Area */}
                                        <div className="absolute top-0 left-0 right-0 h-[30px] bg-gradient-to-b from-black/30 to-transparent" />
                                    </div>
                                </div>

                                {/* Side Buttons - Left */}
                                <div className="absolute left-[-2px] top-[100px] h-[30px] w-[4px] rounded-l-full bg-zinc-700 shadow-inner" />
                                <div className="absolute left-[-2px] top-[140px] h-[45px] w-[4px] rounded-l-full bg-zinc-700 shadow-inner" />
                                <div className="absolute left-[-2px] top-[195px] h-[45px] w-[4px] rounded-l-full bg-zinc-700 shadow-inner" />

                                {/* Side Buttons - Right */}
                                <div className="absolute right-[-2px] top-[100px] h-[60px] w-[4px] rounded-r-full bg-zinc-700 shadow-inner" />

                                {/* Power Button - Right */}
                                <div className="absolute right-[-2px] top-[180px] h-[40px] w-[4px] rounded-r-full bg-zinc-700 shadow-inner" />

                                {/* Notch / Dynamic Island */}
                                <div className="absolute left-1/2 top-[10px] z-20 -translate-x-1/2">
                                    <div className="h-[25px] w-[110px] rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)]">
                                        {/* Camera Dot */}
                                        <div className="absolute right-[18px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[#1a1a2e]">
                                            <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#2d2d44] to-[#0d0d1a]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Bar / Home Indicator */}
                                <div className="absolute bottom-[6px] left-1/2 z-20 -translate-x-1/2">
                                    <div className="h-[4px] w-[100px] rounded-full bg-white/30" />
                                </div>

                                {/* Volume Button Details */}
                                <div className="absolute left-[-2px] top-[230px] h-[30px] w-[3px] rounded-l-full bg-zinc-700 shadow-inner" />

                                {/* Earpiece Speaker (for notched design) */}
                                <div className="absolute left-1/2 top-[12px] -translate-x-1/2">
                                    <div className="h-[3px] w-[40px] rounded-full bg-zinc-800 opacity-50" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}