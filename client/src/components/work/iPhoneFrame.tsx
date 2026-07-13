type IPhoneFrameProps = {
    image: string
    alt?: string
    className?: string
}

export default function IPhoneFrame({
    image,
    alt = "App screen",
    className = "",
}: IPhoneFrameProps) {
    return (
        <div
            className={[
                "relative mx-auto h-[560px] w-[280px] transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-2",
                className,
            ].join(" ")}
        >
            {/* Titanium outer frame */}
            <div className="absolute inset-0 rounded-[52px] bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-950 p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)]">
                <div className="h-full w-full rounded-[49px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px]">
                    {/* Screen */}
                    <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-black ring-1 ring-white/10">
                        <img
                            src={image}
                            alt={alt}
                            className="h-full w-full object-cover object-top"
                        />

                        {/* Dynamic Island */}
                        <div className="absolute left-1/2 top-[14px] z-20 h-[32px] w-[100px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                            <div className="absolute right-[14px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-gradient-to-br from-zinc-600 to-black" />
                        </div>

                        {/* Glass sheen */}
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.04)_100%)]" />

                        {/* Home indicator */}
                        <div className="absolute bottom-[8px] left-1/2 z-20 h-[4px] w-[110px] -translate-x-1/2 rounded-full bg-white/30" />
                    </div>
                </div>
            </div>

            {/* Side buttons */}
            <div className="absolute -left-[2px] top-[110px] h-[28px] w-[3px] rounded-l-full bg-zinc-700 shadow-inner" />
            <div className="absolute -left-[2px] top-[150px] h-[46px] w-[3px] rounded-l-full bg-zinc-700 shadow-inner" />
            <div className="absolute -left-[2px] top-[204px] h-[46px] w-[3px] rounded-l-full bg-zinc-700 shadow-inner" />
            <div className="absolute -right-[2px] top-[160px] h-[70px] w-[3px] rounded-r-full bg-zinc-700 shadow-inner" />
        </div>
    )
}