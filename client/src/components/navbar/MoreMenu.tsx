"use client";

import { LinkSimple, BookOpenText, IdentificationCard } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const bigCards = [
  {
    title: "Guestbook",
    subtitle: "Let me know you were here",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
    href: "/more/guestbook",
  },
  {
    title: "Bucket List",
    subtitle: "Dreams with a deadline",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
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
  const MotionLink = motion(Link);

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 p-3">
      {/* Left Cards */}
      {bigCards.map((card) => (
        <MotionLink
          key={card.title}
          to={card.href}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="group relative h-55 overflow-hidden rounded-3xl"
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-5 z-10">
            <p className="text-base font-medium text-white">
              {card.title}
            </p>

            <p className=" text-zinc-300 text-xs">
              {card.subtitle}
            </p>
          </div>
        </MotionLink>
      ))}

      {/* Right Column */}
      <div className="flex flex-col gap-3">
        {smallCards.map((card) => {
          const Icon = card.icon;

          return (
            <MotionLink
              key={card.title}
              to={card.href}
              className="
                group flex flex-1 items-center gap-4
                rounded-2xl
                border border-white/10
                bg-white/5
                px-4
                transition-colors
                group-hover:bg-white/5
                group-hover:backdrop-blur-sm
                group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]
                group-hover:border-white/20
              "
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 group-hover:bg-white/10 transition-colors">
                <Icon size={18} className="text-zinc-300" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  {card.title}
                </p>

                <p className="text-[10px] text-zinc-400">
                  {card.subtitle}
                </p>
              </div>
            </MotionLink>
          );
        })}
      </div>
    </div>
  );
}