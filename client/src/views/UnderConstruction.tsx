import EdgeStripes from "@/components/shared/EdgeStripes"

/** Lifted out of the old App.tsx, which no longer exists. Serves /terms. */
export default function UnderConstruction() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
        <EdgeStripes />

        <p className="relative z-10 max-w-2xl text-sm uppercase leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
          This page is under construction. Please check back later for updates!
        </p>
      </section>
    </main>
  )
}
