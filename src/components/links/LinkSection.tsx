"use client"

import LinkCard from "./LinkCard";
import type { LinkCardItem } from "./linksData";
import { faintDiagonalStripeStyle } from "../shared/stripeStyles";
const markerClass = "absolute size-1.75 border border-white/40 bg-black";

/**
 * Small squares where a full-bleed rule crosses the inner edge of EdgeStripes.
 * Offsets mirror the stripes' own widths at each breakpoint.
 */
export function RuleMarkers({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-x-0 h-1.75 ${className}`}>
      <span className={`${markerClass} left-8 -translate-x-1/2 sm:left-10 lg:left-11`} />
      <span className={`${markerClass} right-5 translate-x-1/2 sm:right-7 lg:right-9`} />
    </div>
  );
}

type LinkSectionProps = {
  title: string;
  links: LinkCardItem[];
};

export default function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <section aria-labelledby={`links-${title}`}>
      <div className="relative -mx-9 border-y border-white/10 py-6 text-center sm:-mx-11 lg:-mx-12">
        <RuleMarkers className="-top-1" />
        <RuleMarkers className="-bottom-1" />
        <h2
          id={`links-${title}`}
          className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400"
        >
          {title}
        </h2>
      </div>

      <div className="m-0.5 grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      style={faintDiagonalStripeStyle}>
        {links.map((item, index) => (
          <LinkCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
