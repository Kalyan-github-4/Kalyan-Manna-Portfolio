type WorkTechPillProps = {
  label: string
}

export default function WorkTechPill({ label }: WorkTechPillProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
      {label}
    </span>
  )
}