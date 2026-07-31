import { SpeakerSimpleHigh, SpeakerSimpleSlash } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

interface AudioToggleProps {
  enabled: boolean
  onToggle: () => void
  className?: string
}

export function AudioToggle({
  enabled,
  onToggle,
  className,
}: AudioToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute background music" : "Play background music"}
      title={enabled ? "Mute background music" : "Play background music"}
      className={cn(
        `
          grid h-9 w-9 shrink-0 cursor-pointer place-items-center
          rounded-full border border-white/10
          bg-zinc-950/45 bg-linear-to-b
          from-zinc-600/50 to-zinc-700/30
          text-white
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]
          backdrop-blur-3xl backdrop-saturate-150
          transition hover:bg-zinc-800/70
        `,
        className
      )}
    >
      <span className="relative flex h-4.5 w-4.5 items-center justify-center">
        <SpeakerSimpleHigh
          size={18}
          weight="fill"
          className={cn(
            "absolute transition-all duration-300",
            enabled ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        />

        <SpeakerSimpleSlash
          size={18}
          weight="fill"
          className={cn(
            "absolute text-zinc-400 transition-all duration-300",
            enabled ? "scale-50 opacity-0" : "scale-100 opacity-100"
          )}
        />
      </span>
    </button>
  )
}
