// "use client";

// import BucketHero from "./BucketHero";
// import BucketListGrid from "./BucketListGrid";
// import BucketStats from "./BucketStats";
// import { bucketItems } from "./bucketItems";

// const BucketList = () => {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-black text-white">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.2),transparent_32%),radial-gradient(circle_at_20%_40%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(to_bottom,#050505,#000000)]"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05]"
//         style={{
//           backgroundImage:
//             "repeating-linear-gradient(45deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 9px)",
//         }}
//       />

//       <BucketHero />
//       <BucketStats items={bucketItems} />
//       <BucketListGrid items={bucketItems} />
//     </main>
//   );
// };

// export default BucketList;

const BucketList = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
          <p className="uppercase max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
            This page is under construction. Please check back later for
            updates!
          </p>
      </section>
    </main>
  );
};

export default BucketList;