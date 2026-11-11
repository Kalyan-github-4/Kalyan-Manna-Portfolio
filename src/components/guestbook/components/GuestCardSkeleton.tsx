// Loading placeholder cut to a note's measurements — same padding, a stamp-sized
// photo box, three ruled lines and the signature row — so swapping in the real
// notes doesn't move anything on the wall.
// Pinned notes are 40+ characters, so they ask for more placeholder lines.
const LINE_WIDTHS = ["w-[85%]", "w-[70%]", "w-[78%]", "w-[62%]", "w-[55%]"];

export default function GuestCardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    // Same fixed height as a note from md up (min-h-56 / md:h-60 in NoteCard).
    <div className="flex min-h-56 flex-col overflow-hidden bg-white/4 pb-5 pl-6 pr-5 pt-9 ring-1 ring-white/10 md:h-60" aria-hidden="true">
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="float-right mb-1 ml-3 h-19 w-16 animate-pulse bg-white/10" />

        {/* Each bar sits in a leading-9 row, matching the note's text lines. */}
        {LINE_WIDTHS.slice(0, lines).map((width) => (
          <div key={width} className="flex h-9 items-center">
            <div className={`h-3.5 ${width} animate-pulse rounded-full bg-white/10`} />
          </div>
        ))}
      </div>

      <div className="pt-3">
        <div className="flex h-9 items-center">
          <div className="h-5 w-28 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="flex h-5 items-center">
          <div className="h-2.5 w-20 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
