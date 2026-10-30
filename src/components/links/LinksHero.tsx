"use client"

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Graph } from "@phosphor-icons/react";
import Link from "next/link";
import CopyEmailButton from "./CopyEmailButton";
import DeadweightPromo from "./DeadweightPromo";
import { RuleMarkers } from "./LinkSection";
import { bookCall, profileInfo, promo, resume } from "./linksData";

const panelRow =
  "group flex w-full items-center gap-4 rounded-[1.35rem] border border-transparent px-3 py-3 transition-all duration-300 hover:border-white/8 hover:bg-linear-to-b hover:from-zinc-800 hover:to-zinc-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_3px_rgba(0,0,0,0.5)]";
const rowIcon =
  "flex size-11 shrink-0 items-center justify-center rounded-full border border-white/8 bg-linear-to-b from-zinc-700 to-zinc-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-blue-400";
const rowLabel = "block font-mono text-[11px] uppercase tracking-widest text-zinc-500";
const rowArrow =
  "shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400";

export default function LinksHero() {
  return (
    <header>
      {/* Open band that lets the ripple grid show; clicks pass through to its cells. */}
      <div className="pointer-events-none relative -mx-9 h-44 border-b border-white/10 sm:-mx-11 md:h-85 lg:-mx-12">
        <RuleMarkers className="-bottom-1" />
        <DeadweightPromo className="pointer-events-auto absolute right-10 top-24 hidden md:block lg:right-20 xl:right-28" />
      </div>

      <div className="relative grid gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12 lg:px-6 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-14"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
            <div className="w-fit shrink-0 rounded-[1.75rem] border border-white/10 bg-zinc-950 p-1.5 md:p-2">
              <img
                src={profileInfo.image}
                alt={profileInfo.name}
                width={176}
                height={176}
                decoding="async"
                className="size-28 rounded-[1.35rem] object-cover md:size-44"
              />
            </div>

            <div className="min-w-0 pb-1">
              <h1 className="font-display text-5xl leading-none tracking-tight text-white md:text-7xl">
                {profileInfo.name}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400 md:text-lg">
                <span className="font-medium text-zinc-200">{profileInfo.role}</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-zinc-600" />
                <span>{profileInfo.location}</span>
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-zinc-400 md:text-xl">
            {profileInfo.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1 rounded-[1.75rem] border border-white/10 bg-linear-to-b from-zinc-900 to-zinc-950 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.5)] lg:mt-8 lg:self-start"
        >
          <CopyEmailButton className={panelRow} />

          <a href={resume.href} target="_blank" rel="noopener noreferrer" className={panelRow}>
            <span className={rowIcon}>
              <FileText size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className={rowLabel}>{resume.label}</span>
              <span className="block truncate text-sm font-medium text-white">{resume.action}</span>
            </span>
            <ArrowUpRight size={18} className={rowArrow} />
          </a>

          <a href={promo.href} target="_blank" rel="noopener noreferrer" className={`${panelRow} md:hidden`}>
            <span className={rowIcon}>
              <Graph size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className={rowLabel}>{promo.label}</span>
              <span className="block truncate text-sm font-medium text-white">{promo.title}</span>
            </span>
            <ArrowUpRight size={18} className={rowArrow} />
          </a>

          <Link
            href={bookCall.href}
            className="mt-1 flex items-center justify-center gap-3 rounded-full border border-white/8 bg-linear-to-b from-zinc-700 to-zinc-800 py-2 pl-2 pr-5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(0,0,0,0.5)] transition-[filter] hover:brightness-110"
          >
            <img
              src={profileInfo.image}
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="size-10 rounded-full border-2 border-white object-cover"
            />
            {bookCall.label}
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
