"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  ArrowUpRight,
  CalendarBlank,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  XLogo,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

import { socialLinks } from "@/config"
import { cn } from "@/lib/utils"

import { resolveNavIcon } from "./navbar-icons"
import type { NavItem } from "./navbar-types"

interface SearchEntry {
  label: string
  href: string
  group: "Pages" | "Socials"
  icon: Icon
  external?: boolean
}

const SOCIAL_ENTRIES: SearchEntry[] = [
  { label: "GitHub", href: socialLinks.github, group: "Socials", icon: GithubLogo, external: true },
  { label: "LinkedIn", href: socialLinks.linkedin, group: "Socials", icon: LinkedinLogo, external: true },
  { label: "Twitter / X", href: socialLinks.x, group: "Socials", icon: XLogo, external: true },
  { label: "Instagram", href: socialLinks.instagram, group: "Socials", icon: InstagramLogo, external: true },
]

function buildEntries(items: NavItem[]): SearchEntry[] {
  const pages = items
    .flatMap((item) => (item.hasDropdown ? (item.items ?? []) : [item]))
    .map<SearchEntry>((item) => ({
      label: item.name,
      href: item.href,
      group: "Pages",
      icon: resolveNavIcon(item),
    }))

  return [
    ...pages,
    { label: "Book a Call", href: "/contact", group: "Pages", icon: CalendarBlank },
    ...SOCIAL_ENTRIES,
  ]
}

interface NavSearchProps {
  items: NavItem[]
  className?: string
  /** Only one instance should own the ⌘K shortcut. */
  shortcut?: boolean
}

export function NavSearch({ items, className, shortcut = false }: NavSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const entries = useMemo(() => buildEntries(items), [items])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) || entry.href.toLowerCase().includes(q)
    )
  }, [entries, query])

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
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[15vh] z-[60] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 text-white shadow-2xl backdrop-blur-3xl outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <DialogPrimitive.Title className="sr-only">Search</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Jump to a page or profile. Use the arrow keys to move and Enter to open.
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <MagnifyingGlass size={18} className="shrink-0 text-zinc-500" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search pages and links..."
              role="combobox"
              aria-expanded="true"
              aria-controls="nav-search-results"
              aria-activedescendant={results[activeIndex] ? `nav-search-${activeIndex}` : undefined}
              className="h-13 w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <kbd className="hidden rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:block">
              ESC
            </kbd>
          </div>

          <ul
            ref={listRef}
            id="nav-search-results"
            role="listbox"
            className="max-h-[50vh] overflow-y-auto p-2"
          >
            {results.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-zinc-500">
                No results for &ldquo;{query}&rdquo;
              </li>
            )}

            {results.map((entry, index) => {
              const Icon = entry.icon
              const showGroup = index === 0 || results[index - 1].group !== entry.group

              return (
                <li key={`${entry.group}-${entry.href}`} role="presentation">
                  {showGroup && (
                    <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {entry.group}
                    </p>
                  )}
                  <div
                    id={`nav-search-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => select(entry)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300",
                      index === activeIndex && "bg-white/10 text-white"
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="flex-1">{entry.label}</span>
                    {entry.external && <ArrowUpRight size={14} className="text-zinc-500" />}
                  </div>
                </li>
              )
            })}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
