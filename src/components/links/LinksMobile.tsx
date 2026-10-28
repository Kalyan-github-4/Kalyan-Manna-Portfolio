"use client"

import Link from "next/link";
import CopyEmailButton from "./CopyEmailButton";
import LinkSection from "./LinkSection";
import { Badges, BookCallButton, OnlineDot } from "./ProfileCard";
import { contactSections, profileInfo, websiteLink } from "./linksData";

const secondaryButton =
  "flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10";

// Link-in-bio layout for phones: profile first, then one stacked column of links.
export default function LinksMobile() {
  const WebsiteIcon = websiteLink.icon;

  return (
    <div className="relative z-10 mx-auto max-w-md px-4 md:hidden">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="size-28 overflow-hidden rounded-full border-4 border-zinc-900">
            <img
              src={profileInfo.image}
              alt={profileInfo.name}
              width={112}
              height={112}
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <OnlineDot className="size-7" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-serif text-3xl font-bold text-white">{profileInfo.name}</h2>
          <p className="max-w-[280px] text-balance text-sm text-zinc-400">{profileInfo.tagline}</p>
          <Badges items={profileInfo.badges} />
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <CopyEmailButton className={secondaryButton} />
          <Link href={websiteLink.href} className={secondaryButton}>
            <WebsiteIcon size={16} />
            Full Website
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-8">
        <BookCallButton className="py-4 text-base shadow-md" />

        <div className="space-y-6">
          {contactSections.map((section, index) => (
            <LinkSection key={section.title} section={section} sectionIndex={index} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
