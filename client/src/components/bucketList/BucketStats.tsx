"use client";

import { motion } from "framer-motion";
import type { BucketItem } from "./bucketItems";

type BucketStatsProps = {
  items: BucketItem[];
};

export default function BucketStats({ items }: BucketStatsProps) {
  const completed = items.filter((item) => item.status === "done").length;
  const progress = items.filter((item) => item.status === "progress").length;
  const planned = items.filter((item) => item.status === "planned").length;

  const stats = [
    {
      label: "Completed",
      value: completed,
    },
    {
      label: "In Progress",
      value: progress,
    },
    {
      label: "Planned",
      value: planned,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto grid max-w-5xl grid-cols-3 gap-3 px-4 sm:px-6 lg:px-8"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-xl"
        >
          <p className="text-3xl font-semibold text-white sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.section>
  );
}