type DesktopAppPreviewProps = {
    images: string[]
    title: string
}

/**
 * Stacked desktop screenshots: two overlapping, tilted browser shots with a
 * white border. Falls back to a single centred shot when only one image
 * is provided.
 */
export default function DesktopAppPreview({
    images,
    title,
}: DesktopAppPreviewProps) {
    const safeImages = images.slice(0, 2)
    const isPair = safeImages.length > 1

    return (
        <div className="pointer-events-none absolute inset-x-0 -bottom-14 z-10 flex justify-center">
            <div className="relative h-62 w-[92%] max-w-3xl sm:h-72 md:h-80">
                {safeImages.map((image, index) => {
                    const isFront = index === 1

                    const positionClass = !isPair
                        ? "left-1/2 top-4 w-[86%] -translate-x-1/2 -rotate-[6deg] group-hover:-translate-y-2"
                        : isFront
                            ? "right-0 top-14 z-20 w-[74%] rotate-[7deg] group-hover:z-10 group-hover:translate-x-3 group-hover:rotate-[5deg]"
                            : "left-0 top-0 z-10 w-[74%] -rotate-[7deg] group-hover:z-30 group-hover:-translate-x-3 group-hover:-rotate-[5deg]"

                    return (
                        <div
                            key={image}
                            className={[
                                "absolute overflow-hidden rounded-sm border-3 border-white/75 bg-black",
                                "shadow-2xl shadow-black/60 transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)]",
                                positionClass,
                            ].join(" ")}
                        >
                            <img
                                src={image}
                                alt={`${title} preview ${index + 1}`}
                                className="h-44 w-full object-cover object-top sm:h-52 md:h-60"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
