"use client"

import ContactLinkCard from "./ContactLinkCard";
import type { ContactSection } from "./linksData";

type LinkSectionProps = {
  section: ContactSection;
  sectionIndex: number;
  compact?: boolean;
};

export default function LinkSection({ section, sectionIndex, compact = false }: LinkSectionProps) {
  const cards = section.links.map((item, index) => (
    <ContactLinkCard
      key={item.title}
      item={item}
      index={index + sectionIndex * 2}
      compact={compact}
    />
  ));

  if (compact) {
    return (
      <div>
        <h3 className="mb-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
          {section.title}
        </h3>
        <div className="flex flex-col gap-3">{cards}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
          {section.title}
        </h3>
        <div className="h-px flex-1 border-t border-dashed border-white/10" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{cards}</div>
    </div>
  );
}
