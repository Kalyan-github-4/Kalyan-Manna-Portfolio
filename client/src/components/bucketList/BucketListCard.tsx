"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BucketItem, BucketStatus } from "./bucketItems";

type BucketListCardProps = {
  item: BucketItem;
  index: number;
};

const statusLabel: Record<BucketStatus, string> = {
  done: "Done",
  progress: "In Progress",
  planned: "Planned",
};

const statusClass: Record<BucketStatus, string> = {
  done: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  progress: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  planned: "border-white/10 bg-white/5 text-zinc-400",
};

export default function BucketListCard({ item, index }: BucketListCardProps) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 42,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        rotate: index % 2 === 0 ? -0.6 : 0.6,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.14),transparent_35%)]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.45) 1px, transparent 1px, transparent 8px)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <Icon size={22} weight="duotone" />
          </div>

          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
              statusClass[item.status]
            )}
          >
            {statusLabel[item.status]}
          </span>
        </div>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
          {item.category}
        </p>

        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {item.title}
        </h3>

        <p className="mt-4 min-h-[96px] text-sm leading-7 text-zinc-400">
          {item.description}
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
          <span>#{String(index + 1).padStart(2, "0")}</span>
          <span className="transition-colors group-hover:text-white">
            Keep moving
          </span>
        </div>
      </div>
    </motion.article>
  );
}