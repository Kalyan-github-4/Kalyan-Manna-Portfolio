"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function BucketHero() {
  return (
    <section className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-4 pt-32 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.45em] text-zinc-500"
        >
          Life Goals
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-6xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Bucket List
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.8,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
        >
          A living list of things I want to experience, build, learn, and
          remember. Some are wild. Some are quiet. All of them matter.
        </motion.p>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"
      />
    </section>
  );
}