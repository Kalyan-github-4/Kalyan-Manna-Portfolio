import { useId, type ReactNode } from "react"

const PAPER = "#efeadd"
// Stamp sizes are multiples of the hole spacing, so a hole lands on every edge
// and each corner comes out evenly perforated.
const HOLE_SPACING = 7

interface SignedStripProps {
    faces: { id: string; imageUrl: string }[]
    noteCount: number
    /** While notes load, holds the strip's shape with placeholder stamps and seal. */
    loading?: boolean
    /** The call to action at the end of the strip. */
    children: ReactNode
}

function Stamp({ src, index }: { src: string; index: number }) {
    return (
        <div
            className="relative -ml-2.5 shrink-0 drop-shadow-[0_3px_4px_rgba(0,0,0,0.6)] transition-transform duration-300 first:ml-0 hover:z-10 hover:-translate-y-1 hover:rotate-0"
            style={{
                width: HOLE_SPACING * 7,
                height: HOLE_SPACING * 8,
                rotate: `${[-4, 3, -2, 4, -3, 2][index % 6]}deg`,
                backgroundImage: `radial-gradient(circle, transparent 2px, ${PAPER} 2.5px)`,
                backgroundSize: `${HOLE_SPACING}px ${HOLE_SPACING}px`,
                backgroundPosition: `-${HOLE_SPACING / 2}px -${HOLE_SPACING / 2}px`,
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element -- avatar URLs come from the database, so their hosts can't be allowlisted */}
            <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] object-cover"
            />
        </div>
    )
}

/** A round postmark: the count in the middle, the wording around the rim. */
function Seal({ noteCount }: { noteCount: number }) {
    const pathId = useId()

    return (
        <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="relative z-10 -ml-5 size-26 shrink-0 -rotate-12 rounded-full bg-black/80"
        >
            <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.45)" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(255,255,255,0.45)" />

            <path id={pathId} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" fill="none" />
            <text fill="#d4d4d8" fontSize="10.5" letterSpacing="1.8" className="font-mono uppercase">
                <textPath href={`#${pathId}`}>Signed on the wall · Since 2026 ·</textPath>
            </text>

            <text x="60" y="62" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="600" className="font-sans">
                {noteCount}
            </text>
            <text x="60" y="76" textAnchor="middle" fill="#a1a1aa" fontSize="8" letterSpacing="1.5" className="font-mono uppercase">
                Notes
            </text>
        </svg>
    )
}

/** A blank stamp and seal the same size as the real ones, shown while loading. */
function StampSkeleton({ index }: { index: number }) {
    return (
        <div
            aria-hidden="true"
            className={`relative -ml-2.5 shrink-0 animate-pulse bg-white/10 first:ml-0 ${index >= 3 ? "hidden sm:block" : ""}`}
            style={{ width: HOLE_SPACING * 7, height: HOLE_SPACING * 8, rotate: `${[-4, 3, -2, 4, -3, 2][index % 6]}deg` }}
        />
    )
}

/** The proof-of-life strip under the guestbook heading. */
export function SignedStrip({ faces, noteCount, loading = false, children }: SignedStripProps) {
    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {loading && (
                <>
                    <div className="flex items-center">
                        {Array.from({ length: 7 }, (_, index) => (
                            <StampSkeleton key={index} index={index} />
                        ))}
                        <div aria-hidden="true" className="relative z-10 -ml-5 size-26 shrink-0 animate-pulse rounded-full border border-white/20 bg-black/80" />
                    </div>

                    <p className="max-w-52 text-left font-hand text-[1.7rem] leading-7 text-zinc-300">
                        from visitors who stopped by and signed
                    </p>
                </>
            )}

            {!loading && noteCount > 0 && (
                <>
                    <div className="flex items-center">
                        {/* Fewer stamps on phones, so the row and seal fit on one line. */}
                        {faces.map((face, index) => (
                            <div key={face.id} className={index >= 3 ? "hidden sm:contents" : "contents"}>
                                <Stamp src={face.imageUrl} index={index} />
                            </div>
                        ))}
                        <Seal noteCount={noteCount} />
                    </div>

                    <p className="max-w-52 text-left font-hand text-[1.7rem] leading-7 text-zinc-300">
                        from visitors who stopped by and signed
                    </p>
                </>
            )}

            {children}
        </div>
    )
}
