"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

import { playTap } from "@/lib/tap-sound"
import { cn } from "@/lib/utils"

import { DesktopNavbar } from "./DesktopNavbar"
import { MobileNavbar } from "./MobileNavbar"
import type { NavbarProps } from "./navbar-types"
import { useNavbarScroll } from "./useNavbarScroll"

interface Greeting {
  text: string
  icon: string
}

// The greeting only shows for the intro, so there is nothing to re-render on.
const subscribeNoop = () => () => {}

function getGreeting(hour: number): Greeting {
  if (hour < 12) {
    return { text: "Good Morning", icon: "🌅" }
  }

  if (hour < 17) {
    return { text: "Good Afternoon", icon: "☀️" }
  }

  return { text: "Good Evening", icon: "🌙" }
}

export function NavBar({
  items,
  className,
}: NavbarProps) {
  const pathname = usePathname() ?? "/"

  const [moreOpen, setMoreOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  const { isVisible } = useNavbarScroll()

  // Read on the client only, so it uses the visitor's local clock — during SSR
  // `new Date()` is the server's time zone, which baked a wrong greeting into
  // the HTML. The server snapshot is null, so the slot renders empty there and
  // hydration fills it in without a mismatch.
  const hour = useSyncExternalStore(
    subscribeNoop,
    () => new Date().getHours(),
    () => null
  )
  const greeting = hour === null ? null : getGreeting(hour)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroDone(true)
    }, 1800)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-6 z-50 px-4 md:px-6 lg:px-8",
        className
      )}
      initial={{
        y: 0,
        opacity: 1,
      }}
      animate={{
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      // One listener for every navbar control. React events bubble through
      // portals, so this also covers the mobile drawer and the search results.
      onPointerDown={(event) => {
        const target = event.target as HTMLElement
        if (target.closest("a, button, [role='option']")) {
          playTap()
        }
      }}
    >
      <DesktopNavbar
        items={items}
        pathname={pathname}
        greeting={greeting}
        introDone={introDone}
        moreOpen={moreOpen}
        onMoreOpenChange={setMoreOpen}
      />

      <MobileNavbar items={items} pathname={pathname} />
    </motion.header>
  )
}

export type { NavItem, NavbarProps } from "./navbar-types"