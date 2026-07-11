import { CaretDown } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

import type { NavItem } from "./navbar-types"

interface DesktopNavItemProps {
  item: NavItem
  isActive: boolean
  isMoreOpen: boolean
  onDropdownClick: () => void
  onDropdownMouseEnter: () => void
}

export function DesktopNavItem({
  item,
  isActive,
  isMoreOpen,
  onDropdownClick,
  onDropdownMouseEnter,
}: DesktopNavItemProps) {
  return (
    <Link
      to={item.href}
      onClick={() => {
        if (item.hasDropdown) {
          onDropdownClick()
        }
      }}
      onMouseEnter={() => {
        if (item.hasDropdown) {
          onDropdownMouseEnter()
        }
      }}
      className={cn(
        "relative flex items-center justify-center rounded-[30px]",
        "px-6 py-2.5 text-sm font-medium",
        "transition-all duration-300",
        "md:gap-2 hover:text-zinc-100"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
          className="
            absolute inset-0 rounded-full
            border border-white/10
            bg-linear-to-b from-zinc-600/70 to-zinc-700/40
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]
          "
        />
      )}

      <span
        className={cn(
          "relative z-10 hidden transition-colors duration-300 md:block",
          isActive ? "text-white" : "text-zinc-400",
          "hover:text-zinc-100"
        )}
      >
        {item.name}
      </span>

      {item.hasDropdown && (
        <motion.span
          animate={{
            rotate: isMoreOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="relative z-10"
        >
          <CaretDown size={14} className="text-zinc-400" />
        </motion.span>
      )}

      {isActive && (
        <motion.div
          layoutId="glow"
          className="
            absolute -top-1 left-1/2 h-1.5 w-8
            -translate-x-1/2 rounded-full
            bg-zinc-200 opacity-70
          "
        />
      )}
    </Link>
  )
}