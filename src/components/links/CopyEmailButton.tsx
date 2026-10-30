"use client"

import { useEffect, useState } from "react";
import { Check, Copy, EnvelopeSimple } from "@phosphor-icons/react";
import { profileInfo } from "./linksData";

type CopyEmailButtonProps = {
  className?: string;
};

// Copies the address instead of opening a mail client, falling back to
// mailto when the clipboard is unavailable (insecure context, denied).
export default function CopyEmailButton({ className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(profileInfo.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profileInfo.email}`;
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/8 bg-linear-to-b from-zinc-700 to-zinc-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-blue-400">
        <EnvelopeSimple size={18} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          Email
        </span>
        <span aria-live="polite" className="block truncate text-sm font-medium text-white">
          {copied ? "Copied to clipboard" : profileInfo.email}
        </span>
      </span>
      {copied ? (
        <Check size={18} className="shrink-0 text-emerald-400" />
      ) : (
        <Copy size={18} className="shrink-0 text-zinc-500 transition-colors duration-300 group-hover:text-blue-400" />
      )}
    </button>
  );
}
