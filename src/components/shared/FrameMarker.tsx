/**
 * A small square where two of a section frame's hairlines cross. Place it on
 * a positioned frame with -1 offsets, e.g. "-left-1 -top-1".
 */
export default function FrameMarker({ className }: { className: string }) {
    return <span aria-hidden="true" className={`absolute z-10 size-[7px] bg-zinc-600 ${className}`} />
}
