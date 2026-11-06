"use client";

import { LinkSimple, BookOpenText, IdentificationCard } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const bigCards = [
  {
    title: "Guestbook",
    subtitle: "Sign the wall, say hello",
    image: "/more/guestbook-card.webp",
    href: "/more/guestbook",
  },
  {
    title: "Bucket List",
    subtitle: "Things I want to do, one by one",
    image: "/more/bucket-list-card.webp",
    href: "/more/bucket-list",
  },
];

const smallCards = [
  {
    title: "Links",
    subtitle: "All my links are here",
    icon: LinkSimple,
    href: "/more/links",
  },
  {
    title: "Uses",
    subtitle: "A peek into my digital setup",
    icon: BookOpenText,
    href: "/more/uses",
  },
  {
    title: "Attribution",
    subtitle: "Journey to create this site",
    icon: IdentificationCard,
    href: "/more/attribution",
  },
];

export function MoreMenu() {

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 p-3">
      {/* Left Cards */}
      {bigCards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group relative h-55 overflow-hidden rounded-3xl border border-white/10 transition-colors duration-300 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-4">
            <p className="text-lg font-semibold leading-tight text-white">
              {card.title}
            </p>

            <p className="mt-0.5 text-xs text-zinc-200">
              {card.subtitle}
            </p>
          </div>
        </Link>
      ))}

      {/* Right Column */}
      <div className="flex flex-col gap-3">
        {smallCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="
                group flex flex-1 items-center gap-3
                rounded-2xl
                border border-white/10
                bg-linear-to-br from-white/8 to-white/2
                px-3
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                transition-[border-color,background-color,box-shadow] duration-300
                hover:border-white/25
                hover:bg-white/5
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(255,255,255,0.08)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/50
              "
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                <Icon size={18} weight="duotone" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight text-white">
                  {card.title}
                </p>

                <p className="mt-0.5 text-[11px] leading-snug text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}