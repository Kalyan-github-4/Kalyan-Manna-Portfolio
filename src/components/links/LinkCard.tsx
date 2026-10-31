"use client"

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { denseDiagonalStripeStyle } from "../shared/stripeStyles";
import type { LinkCardItem, LinkCardMedia } from "./linksData";

function EnvelopeArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 110"
      className="w-1/2 text-white/70 transition-transform duration-500 group-hover:-translate-y-1"
      fill="#0c0c0e"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="152" height="102" rx="9" />
      <path d="M4 16 72 62a14 14 0 0 0 16 0l68-46" fill="none" />
      <path d="m4 100 52-52M156 100l-52-52" fill="none" opacity={0.45} />
    </svg>
  );
}

function NotesArt() {
  return (
    <div aria-hidden="true" className="relative h-3/5 w-3/5">
      <div className="absolute inset-y-[6%] left-0 w-3/5 -rotate-6 rounded-sm bg-stone-200 p-3 shadow-lg transition-transform duration-500 group-hover:-rotate-9">
        <div className="mt-2 space-y-2">
          <div className="h-px bg-stone-400" />
          <div className="h-px w-4/5 bg-stone-400" />
          <div className="h-px bg-stone-400" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex w-3/5 rotate-3 items-center justify-center rounded-sm bg-stone-100 p-2 shadow-xl transition-transform duration-500 group-hover:rotate-6">
        <span className="font-display text-base italic text-stone-700">your note here</span>
      </div>
    </div>
  );
}

function CardMedia({ media }: { media: LinkCardMedia }) {
  switch (media.kind) {
    case "image":
      return (
        <Image
          src={media.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      );
    case "logo":
      return (
        <Image
          src="/logo-white.webp"
          alt=""
          width={128}
          height={128}
          className="w-1/4 transition-transform duration-500 group-hover:scale-105"
        />
      );
    case "envelope":
      return <EnvelopeArt />;
    case "notes":
      return <NotesArt />;
  }
}

type LinkCardProps = {
  item: LinkCardItem;
  index: number;
};

export default function LinkCard({ item, index }: LinkCardProps) {
  const Icon = item.icon;

  const content = (
    <>
      <div
        className="relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-zinc-950 bg-clip-content p-0.5"
        style={denseDiagonalStripeStyle}
      >
        {item.media && <CardMedia media={item.media} />}
        {Icon && (
          <Icon
            aria-hidden="true"
            weight="regular"
            className="absolute -bottom-3 -right-3 size-32 text-white/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-white/20"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            {item.eyebrow}
          </span>
          <ArrowUpRight
            size={15}
            className="shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>
        <h3 className="mt-3 font-display text-3xl leading-tight text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          {item.lead && <span className="text-zinc-500">{item.lead} </span>}
          {item.detail}
        </p>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-2xl border border-white/10 bg-black p-2.5 transition-colors hover:border-white/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {item.external ? (
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
      )}
    </motion.div>
  );
}
