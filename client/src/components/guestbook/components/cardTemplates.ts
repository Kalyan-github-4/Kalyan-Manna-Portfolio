import type { Doodle } from "./DoodleSvg";

// ── Card templates ────────────────────────────────────────────────────────
//
// Guests no longer design their own card — they write a message, and the
// system hands them a finished one. Every visual decision a card can make
// (gradient, doodle arrangement, texture) lives here as a named template, so
// the wall stays art-directed instead of drifting with whatever each visitor
// picked.
//
// A template's id doubles as the value stored in `guestbook_entries.gradient`,
// which is why the ids are colour words: entries written before templates
// existed already carry one of these six values, so they map straight onto a
// template with no migration and no orphaned rows.

export type TemplateId =
  | "purple"
  | "forest"
  | "maroon"
  | "navy"
  | "ocean"
  | "sunset";

export interface CardTemplate {
  id: TemplateId;
  /** Human-facing name, used in the composer's "style picked for you" hint. */
  label: string;
  gradient: string;
  doodles: Doodle[];
  /** Faint diagonal hatch over the whole card. */
  texture: boolean;
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: "purple",
    label: "Aurora",
    gradient: "linear-gradient(160deg, #7C4FE0 0%, #4A2E9E 55%, #2B1862 100%)",
    texture: false,
    doodles: [
      { type: "sparkle", x: 88, y: 16, size: 32, rotate: 12, opacity: 0.35 },
      { type: "star", x: 12, y: 46, size: 22, rotate: -18, opacity: 0.22 },
    ],
  },
  {
    id: "forest",
    label: "Grove",
    gradient: "linear-gradient(160deg, #1F6B4F 0%, #134634 60%, #0B2B20 100%)",
    texture: true,
    doodles: [
      { type: "cloud", x: 84, y: 20, size: 36, rotate: -8, opacity: 0.28 },
      { type: "swirl", x: 16, y: 52, size: 26, rotate: 24, opacity: 0.2 },
    ],
  },
  {
    id: "maroon",
    label: "Ember",
    gradient: "linear-gradient(160deg, #8C2A2A 0%, #5E1717 55%, #390D0D 100%)",
    texture: false,
    doodles: [
      { type: "heart", x: 87, y: 18, size: 30, rotate: 16, opacity: 0.32 },
      { type: "lightning", x: 14, y: 50, size: 24, rotate: -12, opacity: 0.22 },
    ],
  },
  {
    id: "navy",
    label: "Midnight",
    gradient: "linear-gradient(160deg, #2A3A8C 0%, #18225E 55%, #0E1338 100%)",
    texture: true,
    doodles: [
      { type: "moon", x: 86, y: 17, size: 34, rotate: -14, opacity: 0.3 },
      { type: "star", x: 15, y: 48, size: 20, rotate: 10, opacity: 0.24 },
    ],
  },
  {
    id: "ocean",
    label: "Tide",
    gradient: "linear-gradient(160deg, #1C7C8C 0%, #114F5E 55%, #0A323D 100%)",
    texture: false,
    doodles: [
      { type: "swirl", x: 85, y: 19, size: 34, rotate: 20, opacity: 0.3 },
      { type: "cloud", x: 13, y: 49, size: 26, rotate: -6, opacity: 0.2 },
    ],
  },
  {
    id: "sunset",
    label: "Dusk",
    gradient: "linear-gradient(160deg, #C2542E 0%, #8C3221 55%, #531A10 100%)",
    texture: true,
    doodles: [
      { type: "lightning", x: 88, y: 18, size: 30, rotate: 8, opacity: 0.3 },
      { type: "arrow", x: 14, y: 51, size: 26, rotate: -22, opacity: 0.22 },
    ],
  },
];

const TEMPLATES_BY_ID = new Map<string, CardTemplate>(
  CARD_TEMPLATES.map((template) => [template.id, template])
);

const FALLBACK_TEMPLATE = CARD_TEMPLATES[0] as CardTemplate;

/** Stable numeric hash, so a given string always lands on the same template. */
function hash(value: string) {
  let h = 0;
  for (const ch of value) h = (h * 31 + ch.charCodeAt(0)) % 99991;
  return h;
}

/**
 * Resolve the template an entry was assigned. Falls back to a hash of the
 * entry id (rather than a fixed default) so any row carrying an unknown or
 * missing value still spreads across the full set instead of turning the wall
 * monochrome.
 */
export function resolveTemplate(
  assignedId: string | null | undefined,
  entryId: string
): CardTemplate {
  const assigned = assignedId ? TEMPLATES_BY_ID.get(assignedId) : undefined;
  if (assigned) return assigned;

  return (
    CARD_TEMPLATES[hash(entryId) % CARD_TEMPLATES.length] ?? FALLBACK_TEMPLATE
  );
}

/**
 * Template shown in the composer before the entry exists. Keyed by the signed-in
 * guest so the preview at least stays put while they type — the real card is
 * assigned by the server on submit.
 */
export function previewTemplate(seed: string): CardTemplate {
  return CARD_TEMPLATES[hash(seed) % CARD_TEMPLATES.length] ?? FALLBACK_TEMPLATE;
}
