import { motion } from "framer-motion"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { MobileNavItem } from "./MobileNavItem"
import type { NavItem } from "./navbar-types"

interface MobileNavbarProps {
  items: NavItem[]
  pathname: string
}

export function MobileNavbar({
  items,
  pathname,
}: MobileNavbarProps) {
  const mobileItems = items.flatMap((item) =>
    item.hasDropdown ? (item.items ?? []) : [item]
  )

  return (
    <div className="flex cursor-pointer justify-center md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            aria-label="Open navigation menu"
            className="
              flex items-center gap-20
              rounded-full border border-white/10
              bg-zinc-950/45 px-3 py-1.5
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_20px_rgba(255,255,255,0.06)]
              backdrop-blur-3xl backdrop-saturate-150
            "
          >
            <img
              src="/logo-white.png"
              alt="Kalyan Manna Logo"
              className="h-8 w-8 object-contain"
            />

            <span className="pr-1 text-sm font-semibold uppercase tracking-wide text-white">
              Kalyan
            </span>
          </motion.button>
        </DrawerTrigger>

        <DrawerContent
          className="
            mx-auto w-[88vw] max-w-sm
            rounded-3xl border border-white/10
            bg-zinc-900/90 pb-4 backdrop-blur-3xl
          "
        >
          <div className="space-y-5 px-5 pt-2">
            <h2 className="text-center text-base font-medium text-zinc-400">
              Navigate
            </h2>

            <nav
              aria-label="Mobile navigation"
              className="grid grid-cols-2 gap-3"
            >
              {mobileItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}