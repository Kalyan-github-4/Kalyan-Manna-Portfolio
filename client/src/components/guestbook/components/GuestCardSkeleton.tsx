// Loading placeholder that mirrors GuestCard's silhouette: a rounded card with
// a message area on top and a darker footer panel holding an avatar + name/date
// row. Shown while the guestbook entries are being fetched so the wall doesn't
// pop in from an empty grid.
export default function GuestCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] bg-white/[0.04] ring-1 ring-white/10"
      aria-hidden="true"
    >
      {/* message area — a few shimmer lines of varying width */}
      <div className="relative z-10 flex min-h-[150px] flex-col gap-3 px-6 pt-8 pb-3">
        <div className="h-3.5 w-[85%] animate-pulse rounded-full bg-white/10" />
        <div className="h-3.5 w-[70%] animate-pulse rounded-full bg-white/10" />
        <div className="h-3.5 w-[55%] animate-pulse rounded-full bg-white/10" />
      </div>

      {/* footer panel — darker strip with avatar + name/date placeholders */}
      <div className="relative z-10 min-h-[88px] bg-black/25">
        <div className="flex items-center gap-3 px-5 pb-4 pt-7">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-white/10" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}
