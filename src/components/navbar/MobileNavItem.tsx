"use client"

import { createElement } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

import { DrawerClose } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

import { resolveNavIcon } from "./navbar-icons"
import type { NavItem } from "./navbar-types"

interface MobileNavItemProps {
  item: NavItem
  pathname: string
  /** Gradient for the icon tile — the same one the search gives this page. */
  tone: string
  /** Position in the menu, for the staggered entrance. */
  index: number
}

export function MobileNavItem({ item, pathname, tone, index }: MobileNavItemProps) {
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <DrawerClose asChild>
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors active:bg-white/10",
            isActive ? "bg-white/10 text-white" : "text-zinc-200"
          )}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-b text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
              tone
            )}
          >
            {createElement(resolveNavIcon(item), { size: 16, weight: "fill", "aria-hidden": true })}
          </span>

          <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{item.name}</span>

          {isActive && <span className="shrink-0 text-xs font-medium text-blue-400">Current</span>}
        </Link>
      </DrawerClose>
    </motion.div>
  )
}
