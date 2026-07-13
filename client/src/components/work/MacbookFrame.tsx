type MacBookFrameProps = {
    image: string
    alt?: string
    className?: string
}

export default function MacBookFrame({
    image,
    alt = "Website preview",
    className = "",
}: MacBookFrameProps) {
    return (
        <div
            className={[
                "relative mx-auto w-full max-w-[720px] transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-2",
                className,
            ].join(" ")}
        >
            {/* Screen housing */}
            <div className="relative rounded-t-[14px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 p-[10px] pb-0 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[6px] bg-black ring-1 ring-white/5">
                    {/* Webcam */}
                    <div className="absolute left-1/2 top-[7px] z-20 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-zinc-800 ring-1 ring-black/60" />

                    <img
                        src={image}
                        alt={alt}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Glass sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.03)_100%)]" />
                </div>
            </div>

            {/* Hinge */}
            <div className="relative h-[9px] bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-900">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-black/40" />
            </div>

            {/* Keyboard deck / base */}
            <div className="relative h-[16px] rounded-b-[10px] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 shadow-[0_14px_24px_-10px_rgba(0,0,0,0.55)]">
                {/* Trackpad notch cutout */}
                <div className="absolute left-1/2 top-0 h-[6px] w-[90px] -translate-x-1/2 rounded-b-[8px] bg-zinc-700" />
            </div>
        </div>
    )
}