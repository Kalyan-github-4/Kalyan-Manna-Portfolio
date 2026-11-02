"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  ArrowUpRight,
  CalendarBlank,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  X,
  XLogo,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

import { socialLinks } from "@/config"
import { journeyItems } from "@/data/journeyData"
import { workProjects } from "@/data/workProjects"
import { cn } from "@/lib/utils"

import { navTone, resolveNavIcon } from "./navbar-icons"
import type { NavItem } from "./navbar-types"

type Group = "Latest" | "Pages" | "More" | "Projects" | "Collections" | "Socials"

interface SearchEntry {
  label: string
  href: string
  group: Group
  /** The muted tag on the right: Page, Project, Collection, Profile. */
  kind: string
  /** Extra words to match on that aren't shown, e.g. a project's category. */
  keywords?: string
  icon?: Icon
  /** Gradient for the icon tile; pages each get their own colour. */
  tone?: string
  /** A cover image in place of an icon, for projects and collections. */
  thumb?: string
  external?: boolean
}

const SOCIAL_ENTRIES: SearchEntry[] = [
  { label: "GitHub", href: socialLinks.github, group: "Socials", kind: "Profile", icon: GithubLogo, external: true },
  { label: "LinkedIn", href: socialLinks.linkedin, group: "Socials", kind: "Profile", icon: LinkedinLogo, external: true },
  { label: "Twitter / X", href: socialLinks.x, group: "Socials", kind: "Profile", icon: XLogo, external: true },
  { label: "Instagram", href: socialLinks.instagram, group: "Socials", kind: "Profile", icon: InstagramLogo, external: true },
]

const PROJECT_ENTRIES: SearchEntry[] = workProjects.map((project) => ({
  label: project.title,
  href: `/work/${project.slug}`,
  group: "Projects",
  kind: "Project",
  keywords: `${project.purpose} ${project.category}`,
  thumb: project.image,
}))

const COLLECTION_ENTRIES: SearchEntry[] = journeyItems.map((item) => ({
  label: item.coverTitle ?? item.title,
  href: `/vault/${item.slug}`,
  group: "Collections",
  kind: "Collection",
  keywords: `${item.title} ${item.category} ${item.date}`,
  thumb: item.image,
}))

// The newest of each, shown above the pages before anything is typed.
const latestCollectionIndex = Math.max(journeyItems.findIndex((item) => item.latest), 0)
const LATEST_ENTRIES: SearchEntry[] = [
  { ...PROJECT_ENTRIES[0], group: "Latest" },
  ...(COLLECTION_ENTRIES.length ? [{ ...COLLECTION_ENTRIES[latestCollectionIndex], group: "Latest" as const }] : []),
]

function buildPageEntries(items: NavItem[]): SearchEntry[] {
  const pages = [
    ...items.filter((item) => !item.hasDropdown).map((item) => ({ item, group: "Pages" as const })),
    ...items.flatMap((item) => (item.hasDropdown ? (item.items ?? []) : [])).map((item) => ({ item, group: "More" as const })),
  ]

  const entries = pages.map<SearchEntry>(({ item, group }, index) => ({
    label: item.name,
    href: item.href,
    group,
    kind: "Page",
    icon: resolveNavIcon(item),
    tone: navTone(index),
  }))

  return [
    ...entries,
    { label: "Book a Call", href: "/contact", group: "More", kind: "Page", icon: CalendarBlank, tone: navTone(entries.length) },
  ]
}

/** Every word has to appear somewhere in the entry, so "keythm fun" finds Keythm. */
function matches(entry: SearchEntry, words: string[]) {
  const haystack = `${entry.label} ${entry.kind} ${entry.keywords ?? ""} ${entry.href}`.toLowerCase()
  return words.every((word) => haystack.includes(word))
}

function isCurrent(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

interface NavSearchProps {
  items: NavItem[]
  className?: string
  /** Only one instance should own the ⌘K shortcut. */
  shortcut?: boolean
}

export function NavSearch({ items, className, shortcut = false }: NavSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const pageEntries = useMemo(() => buildPageEntries(items), [items])

  // An empty box browses: latest work, then pages. Typing searches everything,
  // and drops Latest so nothing shows up twice.
  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return [...LATEST_ENTRIES, ...pageEntries, ...SOCIAL_ENTRIES]
    return [...pageEntries, ...PROJECT_ENTRIES, ...COLLECTION_ENTRIES, ...SOCIAL_ENTRIES].filter((entry) =>
      matches(entry, words)
    )
  }, [pageEntries, query])

  useEffect(() => {
    if (!shortcut) return

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcut])

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setQuery("")
      setActiveIndex(0)
    }
  }

  const select = (entry: SearchEntry) => {
    handleOpenChange(false)
    if (entry.external) {
      window.open(entry.href, "_blank", "noopener,noreferrer")
    } else {
      router.push(entry.href)
    }
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault()
      select(results[activeIndex])
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          aria-label="Search the site"
          className={cn(
            // Same fill as the navbar's active pill (DesktopNavItem).
            "flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-linear-to-b from-zinc-700 to-zinc-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:from-zinc-600 hover:to-zinc-700",
            className
          )}
        >
          <MagnifyingGlass size={18} weight="bold" />
        </motion.button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        {/* Light dim only: the page should stay visible, blurred, behind the glass. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/30 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          data-lenis-prevent
          className="fixed left-1/2 top-4 z-[60] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-3xl border border-white/12 bg-zinc-900/55 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 outline-none sm:top-[14dvh] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <DialogPrimitive.Title className="sr-only">Search</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Jump to a page, project, collection or profile. Use the arrow keys to move and Enter to open.
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-white/10 px-4 sm:px-5">
            <MagnifyingGlass size={18} aria-hidden="true" className="shrink-0 text-zinc-400" />
            {/* 16px on phones: anything smaller makes iOS zoom the page on focus. */}
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search projects, collections, pages..."
              role="combobox"
              aria-expanded="true"
              aria-controls="nav-search-results"
              aria-activedescendant={results[activeIndex] ? `nav-search-${activeIndex}` : undefined}
              enterKeyHint="go"
              className="h-14 w-full bg-transparent text-base text-white placeholder:text-zinc-400 focus:outline-none sm:text-[15px]"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("")
                  setActiveIndex(0)
                }}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={15} weight="bold" aria-hidden="true" />
              </button>
            ) : (
              <DialogPrimitive.Close
                aria-label="Close search"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={15} weight="bold" aria-hidden="true" />
              </DialogPrimitive.Close>
            )}
          </div>

          <ul
            ref={listRef}
            id="nav-search-results"
            role="listbox"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2 sm:max-h-[min(28rem,60dvh)]"
          >
            {results.length === 0 && (
              <li className="px-3 py-10 text-center text-sm text-zinc-400">
                Nothing matches &ldquo;{query}&rdquo;. Try a page, project or event name.
              </li>
            )}

            {results.map((entry, index) => {
              const EntryIcon = entry.icon
              const active = index === activeIndex
              const current = !entry.external && isCurrent(entry.href, pathname)
              const showGroup = index === 0 || results[index - 1].group !== entry.group

              return (
                <li key={`${entry.group}-${entry.href}`} role="presentation">
                  {showGroup && (
                    <p className="px-3 pb-1 pt-3.5 text-xs font-medium text-zinc-400">{entry.group}</p>
                  )}
                  <div
                    id={`nav-search-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={active}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => select(entry)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-[15px] text-zinc-200 transition-colors",
                      active && "bg-white/10 text-white"
                    )}
                  >
                    {entry.thumb ? (
                      <Image
                        src={entry.thumb}
                        alt=""
                        width={40}
                        height={28}
                        className="h-7 w-10 shrink-0 rounded-md object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-lg text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
                          entry.tone ? `bg-linear-to-b ${entry.tone}` : "bg-zinc-700"
                        )}
                      >
                        {EntryIcon && <EntryIcon size={15} weight="fill" aria-hidden="true" />}
                      </span>
                    )}

                    <span className="min-w-0 flex-1 truncate font-medium">{entry.label}</span>

                    {current ? (
                      <span className="shrink-0 text-xs font-medium text-blue-400">Current</span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1 text-xs text-zinc-500">
                        {entry.kind}
                        {entry.external && <ArrowUpRight size={12} aria-hidden="true" />}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Keyboard help — desktop only, where there's a keyboard to use it. */}
          <div className="hidden items-center gap-4 border-t border-white/10 px-5 py-2.5 text-[11px] text-zinc-400 sm:flex">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              move
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              open
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd>
              close
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 px-1 font-mono text-[10px] text-zinc-300">
      {children}
    </kbd>
  )
}
