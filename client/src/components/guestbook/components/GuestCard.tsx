import { useMemo } from "react";
import DoodleSvg from "./DoodleSvg";
import type { Doodle } from "./DoodleSvg";
import tornEdgePath from "./tornEdgePath";
import { ShareNetworkIcon, TrashIcon } from "@phosphor-icons/react";

// ── Types ────────────────────────────────────────────────────────────────

type GradientName =
  | "purple"
  | "forest"
  | "maroon"
  | "navy"
  | "ocean"
  | "sunset";

interface Avatar {
  kind: "emoji" | "initials" | "photo";
  value: string; // emoji char, initials text, or image url
}

export interface GuestEntry {
  id: string;
  message: string;
  gradient: GradientName;
  doodles?: Doodle[];
  texture?: boolean; // faint diagonal hatch
  author: string;
  avatar: Avatar;
  date: string;
  createdAtIso?: string;
  ownerClerkUserId?: string | null;
  rotation?: string; // optional rotation class for the card
  emphasis?: "quiet" | "loud"; // loud = bigger/bolder text, for short punchy messages
}

interface GuestCardProps {
  entry: GuestEntry;
  onShare?: (id: string) => void;
  onOpen?: (id: string) => void;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

// ── Gradient + texture tokens ────────────────────────────────────────────

const GRADIENTS: Record<GradientName, string> = {
  purple: "linear-gradient(160deg, #7C4FE0 0%, #4A2E9E 55%, #2B1862 100%)",
  forest: "linear-gradient(160deg, #1F6B4F 0%, #134634 60%, #0B2B20 100%)",
  maroon: "linear-gradient(160deg, #8C2A2A 0%, #5E1717 55%, #390D0D 100%)",
  navy: "linear-gradient(160deg, #2A3A8C 0%, #18225E 55%, #0E1338 100%)",
  ocean: "linear-gradient(160deg, #1C7C8C 0%, #114F5E 55%, #0A323D 100%)",
  sunset: "linear-gradient(160deg, #C2542E 0%, #8C3221 55%, #531A10 100%)",
};

// ── Message typography sizing ────────────────────────────────────────────

function messageSizeClass(message: string, emphasis?: "quiet" | "loud") {
  const len = message.length;
  if (emphasis === "loud" || len <= 24) return "text-2xl font-semibold leading-snug";
  if (len <= 70) return "text-lg font-medium leading-relaxed";
  return "text-base font-normal leading-relaxed";
}

function messageAlignClass(message: string) {
  return message.length <= 24 ? "text-left" : "text-left";
}

// ── Avatar ────────────────────────────────────────────────────────────────

function AvatarBadge({ avatar, name }: { avatar: Avatar; name: string }) {
  if (avatar.kind === "photo") {
    return (
      <img
        src={avatar.value}
        alt={name}
        className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15"
      />
    );
  }
  if (avatar.kind === "emoji") {
    return (
      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg ring-1 ring-white/15">
        {avatar.value}
      </div>
    );
  }
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-semibold text-white/90 ring-1 ring-white/15">
      {avatar.value}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function GuestCard({
  entry,
  onShare,
  onOpen,
  onDelete,
  canDelete = false,
}: GuestCardProps) {
  const seed = useMemo(() => {
    // stable numeric seed derived from id, so the tear shape doesn't
    // reshuffle on every re-render
    let h = 0;
    for (const ch of entry.id) h = (h * 31 + ch.charCodeAt(0)) % 99991;
    return h || 1;
  }, [entry.id]);

  // tornEdgePath returns { d, panelD, xs, ys } — `d` is the open curve
  // (used for the highlight stroke), `panelD` is the same curve closed
  // off into a fillable shape (used for the dark footer panel). Pulling
  // both from one call guarantees the stroke traces exactly where the
  // fill's edge actually is. edge:"top" places the wave near the TOP of
  // its own coordinate box, so it reads as the dividing line between the
  // message area and a tall footer panel beneath it — not a sliver
  // squeezed against the card's bottom corner.
  const tear = useMemo(
    () => tornEdgePath(seed, { edge: "top", teeth: 7, depth: 8 }),
    [seed]
  );

  return (
    <div
      id={`guest-card-${entry.id}`}
      className={`group relative overflow-hidden rounded-[20px] cursor-pointer
                 transition-transform duration-300 ease-out
                 hover:-translate-y-1 ${entry.rotation || ""}`}
      style={{ background: GRADIENTS[entry.gradient] }}
      onClick={() => onOpen?.(entry.id)}
    >
      {/* optional diagonal hatch texture */}
      {entry.texture && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 9px)",
          }}
        />
      )}

      {/* hand-drawn doodles, asymmetric placement */}
      {entry.doodles?.map((d, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: `translate(-50%, -50%) rotate(${d.rotate}deg)`,
            opacity: d.opacity ?? 0.55,
          }}
        >
          <DoodleSvg type={d.type} size={d.size} />
        </div>
      ))}

      {/* message content, sits above the tear */}
      <div className="relative z-10 flex min-h-[150px] flex-col px-6 pt-7 pb-3">
        <p
          className={`${messageAlignClass(entry.message)} ${messageSizeClass(
            entry.message,
            entry.emphasis
          )} text-white drop-shadow-sm`}
        >
          {entry.message}
        </p>
      </div>

      {/* torn paper edge + footer panel — ONE continuous shape: the wave
          IS the top boundary of this panel, and the panel is tall
          enough (min-h-[88px]) to actually hold the avatar row beneath
          it. This is not a thin strip glued to the card's bottom edge —
          that's what produced the squeezed sliver in the broken render. */}
      <div className="relative z-10 min-h-[88px]">
        <svg
          className="absolute inset-x-0 top-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* dark panel beneath the tear — fill + highlight share one
              path so the stroke always traces exactly where the fill's
              edge actually is */}
          <path d={tear.panelD} fill="#0b0b0d" />
          <path
            d={tear.d}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between px-5 pb-4 pt-7">
          <div className="flex items-center gap-3">
            <AvatarBadge avatar={entry.avatar} name={entry.author} />
            <div className="leading-tight">
              <p className="text-sm font-medium text-white/90">{entry.author}</p>
              <p className="text-xs text-white/45">{entry.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {canDelete && (
              <button
                type="button"
                aria-label={`Delete ${entry.author}'s memory`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(entry.id);
                }}
                className="rounded-full p-2 text-white/40 opacity-0 transition
                       hover:bg-white/10 hover:text-white/80 group-hover:opacity-100
                       focus-visible:opacity-100 focus-visible:outline-none
                       focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <TrashIcon size={16} weight="bold" />
              </button>
            )}

            <button
              type="button"
              aria-label={`Share ${entry.author}'s memory`}
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(entry.id);
              }}
              className="rounded-full p-2 text-white/40 opacity-0 transition
                       hover:bg-white/10 hover:text-white/80 group-hover:opacity-100
                       focus-visible:opacity-100 focus-visible:outline-none
                       focus-visible:ring-1 focus-visible:ring-white/40"
            >
              <ShareNetworkIcon size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}