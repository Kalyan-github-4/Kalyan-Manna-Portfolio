import type { Icon } from "@phosphor-icons/react"
import {
  BookOpen,
  Compass,
  FileText,
  FolderOpen,
  House,
  Laptop,
  LinkSimple,
  ListChecks,
  Trophy,
  User,
} from "@phosphor-icons/react"

import type { NavItem } from "./navbar-types"

const FALLBACK_ICONS: Record<string, Icon> = {
  "/": House,
  "/about": User,
  "/work": FolderOpen,
  "/vault": Compass,
  "/more/guestbook": BookOpen,
  "/more/bucket-list": ListChecks,
  "/more/links": LinkSimple,
  "/more/uses": Laptop,
  "/more/attribution": Trophy,
}

// Tile colours, one per page in nav order. Shared by the search and the mobile
// menu so a page keeps the same colour in both.
const NAV_TONES = [
  "from-blue-400 to-blue-600",
  "from-teal-400 to-teal-600",
  "from-violet-400 to-violet-600",
  "from-orange-400 to-orange-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-sky-400 to-sky-600",
  "from-fuchsia-400 to-fuchsia-600",
  "from-lime-400 to-lime-600",
  "from-indigo-400 to-indigo-600",
]

export function navTone(index: number): string {
  return NAV_TONES[index % NAV_TONES.length]
}

export function resolveNavIcon(item: NavItem): Icon {
  return item.icon ?? FALLBACK_ICONS[item.href] ?? FileText
}