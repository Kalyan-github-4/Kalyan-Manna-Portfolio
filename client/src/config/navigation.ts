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

import type { NavItem } from "../components/navbar/navbar-types"

export const navigationItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "About",
    href: "/about",
    icon: User,
  },
  {
    name: "Work",
    href: "/work",
    icon: FolderOpen,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: FileText,
  },
  {
    name: "More",
    href: "/more",
    hasDropdown: true,
    items: [
      {
        name: "Guestbook",
        href: "/more/guestbook",
        icon: BookOpen,
      },
      {
        name: "Bucket List",
        href: "/more/bucket-list",
        icon: ListChecks,
      },
      {
        name: "Links",
        href: "/more/links",
        icon: LinkSimple,
      },
      {
        name: "Uses",
        href: "/more/uses",
        icon: Laptop,
      },
      {
        name: "Attribution",
        href: "/more/attribution",
        icon: Trophy,
      },
    ],
  },
]