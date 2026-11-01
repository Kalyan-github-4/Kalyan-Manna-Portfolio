// Loading placeholder with the rough shape of a note, so the wall doesn't pop
// in from nothing while entries are fetched.
export default function GuestCardSkeleton() {
  return (
    <div className="bg-white/4 p-6 pt-9 ring-1 ring-white/10" aria-hidden="true">
      <div className="flex flex-col gap-3">
        <div className="h-3.5 w-[85%] animate-pulse rounded-full bg-white/10" />
        <div className="h-3.5 w-[70%] animate-pulse rounded-full bg-white/10" />
        <div className="h-3.5 w-[55%] animate-pulse rounded-full bg-white/10" />
      </div>

      <div className="mt-8 h-3 w-24 animate-pulse rounded-full bg-white/10" />
    </div>
  );
}
