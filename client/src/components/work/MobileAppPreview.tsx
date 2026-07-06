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
                <p className="max-w-xl text-lg font-medium leading-relaxed text-white md:text-xl">
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
                                "relative h-[300px] w-[150px] shrink-0 overflow-hidden rounded-[28px] border border-white/25 bg-zinc-950 shadow-2xl shadow-black/50 transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]",
                                "sm:h-[330px] sm:w-[165px]",
                                "md:h-[350px] md:w-[175px]",
                                positionClass,
                            ].join(" ")}
                        >
                            <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15" />

                            <div className="absolute left-1/2 top-2 z-20 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />

                            <img
                                src={image}
                                alt={`EasyPG app screen ${index + 1}`}
                                className="h-full w-full object-cover object-top"
                            />

                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_18%,transparent_80%,rgba(0,0,0,0.25))]" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}