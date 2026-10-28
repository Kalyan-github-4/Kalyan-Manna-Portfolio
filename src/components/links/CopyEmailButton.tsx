"use client"

import { useEffect, useState } from "react";
import { Check, EnvelopeSimple } from "@phosphor-icons/react";
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
      {copied ? <Check size={16} /> : <EnvelopeSimple size={16} />}
      <span aria-live="polite">{copied ? "Copied" : "Email"}</span>
    </button>
  );
}
