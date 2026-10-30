import EdgeStripes from "@/components/shared/EdgeStripes"
import InteractiveCharacter from "@/components/shared/interactive-3d-character"

/** Placeholder for pages that aren't built yet: /terms, /more/uses, /more/bucket-list, /more/attribution. */
export default function UnderConstruction() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-9 py-28 text-center sm:px-11 lg:px-12">
        <EdgeStripes />

        <div className="relative z-10 aspect-square w-full max-w-sm md:max-w-md">
          <InteractiveCharacter />
        </div>

        <p className="relative z-10 mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-2xl md:leading-8">
          Nothing! I&apos;m just running on 0% creativity and 100% desperation. 
        </p>
      </section>
    </main>
  )
}
