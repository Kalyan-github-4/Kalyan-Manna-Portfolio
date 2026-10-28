"use client"

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { ContactLink } from "./linksData";

type ContactLinkCardProps = {
  item: ContactLink;
  index: number;
  /** Mobile rows drop the subtitle and push the arrow to the edge. */
  compact?: boolean;
};

export default function ContactLinkCard({ item, index, compact = false }: ContactLinkCardProps) {
  const Icon = item.icon;

  const content = compact ? (
    <>
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
        <Icon size={20} />
      </div>
      <span className="flex-1 text-sm font-medium text-white">{item.title}</span>
      <ArrowUpRight size={16} className="text-zinc-500" />
    </>
  ) : (
    <>
      <div className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors group-hover:text-white">
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          <ArrowUpRight
            size={12}
            className="text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>
        <p className="line-clamp-1 font-mono text-[10px] text-zinc-500">{item.subtitle}</p>
      </div>
    </>
  );

  const className = compact
    ? "flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-transform duration-150 active:scale-[0.98]"
    : "group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]";

  const link = item.external ? (
    <a
      href={item.href}
      target="_blank"
      rel={item.identity ? "me noopener noreferrer" : "noopener noreferrer"}
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {link}
    </motion.div>
  );
}
