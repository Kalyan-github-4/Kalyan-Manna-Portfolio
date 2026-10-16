import EdgeStripes from "@/components/shared/EdgeStripes"

// The built-out version of this page (hero, stats, grid) lives in git history —
// see the components under src/components/bucketList/ before they were removed.
const BucketList = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
          <EdgeStripes />

          <p className="relative z-10 uppercase max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
            This page is under construction. Please check back later for
            updates!
          </p>
      </section>
    </main>
  );
};

export default BucketList;