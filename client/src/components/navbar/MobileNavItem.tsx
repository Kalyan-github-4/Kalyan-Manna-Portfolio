import { createElement } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { DrawerClose } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

import { resolveNavIcon } from "./navbar-icons"
import type { NavItem } from "./navbar-types"

interface MobileNavItemProps {
  item: NavItem
  pathname: string
}

export function MobileNavItem({
  item,
  pathname,
}: MobileNavItemProps) {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href)

  const icon = resolveNavIcon(item)

  return (
    <DrawerClose asChild>
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 rounded-2xl p-2 transition-colors",
          isActive
            ? "bg-white/10 text-white"
            : "text-zinc-300 hover:bg-white/10 hover:text-white"
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            isActive ? "bg-white/15" : "bg-white/5"
          )}
        >
          {createElement(icon, {
            size: 16,
            weight: "regular",
          })}
        </span>

        <div className="flex flex-1 items-center justify-between">
          <span className="text-xs font-medium">
            {item.name}
          </span>

          {isActive && (
            <motion.span
              layoutId="mobile-active-dot"
              animate={{
                boxShadow: [
                  "0 0 6px rgba(255,255,255,0.5)",
                  "0 0 12px rgba(255,255,255,0.9)",
                  "0 0 6px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mr-2 h-2 w-2 rounded-full bg-white"
            />
          )}
        </div>
      </Link>
    </DrawerClose>
  )
}