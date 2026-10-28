"use client"

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import CopyEmailButton from "./CopyEmailButton";
import { bookCall, profileInfo, profileMeta, websiteLink } from "./linksData";

const secondaryButton =
  "flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10";

export function OnlineDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-zinc-950 ring-2 ring-zinc-800 ${className}`}
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
      </span>
    </span>
  );
}

export function Badges({ items }: { items: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {items.map((badge) => (
        <span
          key={badge}
          className="inline-flex h-5 items-center rounded-md border border-white/10 bg-white/5 px-2 font-mono text-xs text-zinc-400"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

export function BookCallButton({ className = "" }: { className?: string }) {
  const Icon = bookCall.icon;

  return (
    <Link
      href={bookCall.href}
      className={`group flex w-full items-center justify-center gap-2 rounded-lg bg-white font-medium text-black transition-colors hover:bg-zinc-200 ${className}`}
    >
      <Icon size={16} />
      <span>{bookCall.label}</span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export default function ProfileCard() {
  const WebsiteIcon = websiteLink.icon;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex justify-center">
        <div className="relative size-24">
          <img
            src={profileInfo.image}
            alt={profileInfo.name}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="size-24 rounded-full object-cover ring-4 ring-white/5"
          />
          <OnlineDot className="size-6" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-serif text-2xl text-white">{profileInfo.name}</h2>
        <Badges items={profileInfo.badges.slice(0, 2)} />
      </div>

      <address className="mt-6 space-y-3 border-t border-dashed border-white/10 pt-6 text-sm not-italic">
        {profileMeta.map((meta) => {
          const Icon = meta.icon;

          return (
            <div key={meta.label} className="flex items-center gap-3 text-zinc-400">
              <Icon size={16} className="shrink-0" />
              <span className="truncate">{meta.label}</span>
            </div>
          );
        })}
      </address>

      <div className="mt-6 flex flex-col gap-3">
        <BookCallButton className="py-2.5 text-sm" />

        <div className="grid grid-cols-2 gap-2">
          <Link href={websiteLink.href} className={secondaryButton}>
            <WebsiteIcon size={16} />
            {websiteLink.label}
          </Link>
          <CopyEmailButton className={secondaryButton} />
        </div>
      </div>
    </motion.aside>
  );
}
