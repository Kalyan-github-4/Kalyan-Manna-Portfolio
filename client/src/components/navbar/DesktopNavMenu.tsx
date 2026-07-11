import { AnimatePresence, motion } from "framer-motion"

import { MoreMenu } from "./MoreMenu"
import { DesktopNavItem } from "./DesktopNavItem"
import type { NavItem } from "./navbar-types"

interface Greeting {
  text: string
  icon: string
}

interface DesktopNavMenuProps {
  items: NavItem[]
  pathname: string
  greeting: Greeting
  introDone: boolean
  moreOpen: boolean
  onMoreOpenChange: (open: boolean) => void
}

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.hasDropdown) {
    return pathname.startsWith("/more")
  }

  if (item.href === "/") {
    return pathname === "/"
  }

  return pathname.startsWith(item.href)
}

export function DesktopNavMenu({
  items,
  pathname,
  greeting,
  introDone,
  moreOpen,
  onMoreOpenChange,
}: DesktopNavMenuProps) {
  return (
    <motion.div
      layout
      animate={{
        width: !introDone ? 250 : moreOpen ? 800 : 465,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
      }}
      onMouseLeave={() => onMoreOpenChange(false)}
      className="
        overflow-hidden rounded-[30px]
        border border-white/10
        bg-zinc-950/45
        shadow-[0_0_30px_rgba(255,255,255,0.08)]
        backdrop-blur-3xl backdrop-saturate-150
      "
    >
      <div className="relative flex h-13 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!introDone ? (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.35,
              }}
              className="flex items-center gap-3 font-medium text-white"
            >
              <span aria-hidden="true">{greeting.icon}</span>
              <span>{greeting.text}</span>
            </motion.div>
          ) : (
            <motion.nav
              key="navbar"
              aria-label="Main navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                staggerChildren: 0.07,
                delayChildren: 0.05,
              }}
              className="flex items-center justify-center p-1.5"
            >
              {items.map((item) => (
                <DesktopNavItem
                  key={item.href}
                  item={item}
                  isActive={isNavItemActive(item, pathname)}
                  isMoreOpen={moreOpen}
                  onDropdownClick={() => {
                    onMoreOpenChange(!moreOpen)
                  }}
                  onDropdownMouseEnter={() => {
                    if (!moreOpen) {
                      onMoreOpenChange(true)
                    }
                  }}
                />
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {moreOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden border-t border-white/10"
          >
            <MoreMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}