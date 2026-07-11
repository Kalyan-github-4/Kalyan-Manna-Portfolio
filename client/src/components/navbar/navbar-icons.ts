import type { Icon } from "@phosphor-icons/react"
import {
  BookOpen,
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
  "/blog": FileText,
  "/more/guestbook": BookOpen,
  "/more/bucket-list": ListChecks,
  "/more/links": LinkSimple,
  "/more/uses": Laptop,
  "/more/attribution": Trophy,
}

export function resolveNavIcon(item: NavItem): Icon {
  return item.icon ?? FALLBACK_ICONS[item.href] ?? FileText
}