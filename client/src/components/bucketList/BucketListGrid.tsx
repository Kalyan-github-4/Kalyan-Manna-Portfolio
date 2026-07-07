"use client";

import { motion } from "framer-motion";
import BucketListCard from "./BucketListCard";
import type { BucketItem } from "./bucketItems";

type BucketListGridProps = {
  items: BucketItem[];
};

export default function BucketListGrid({ items }: BucketListGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-12 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500">
            The List
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Things I want to do before life gets too predictable.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-zinc-400">
          Not a checklist for perfection — just a reminder to stay curious,
          uncomfortable, and alive.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <BucketListCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}