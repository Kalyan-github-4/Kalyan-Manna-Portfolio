"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

import { DesktopNavbar } from "./DesktopNavbar"
import { MobileNavbar } from "./MobileNavbar"
import type { NavbarProps } from "./navbar-types"
import { useNavbarScroll } from "./useNavbarScroll"

export function NavBar({
  items,
  className,
}: NavbarProps) {
  const { pathname } = useLocation()

  const [moreOpen, setMoreOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  const { isScrolled, isVisible } = useNavbarScroll()

  const greeting = useMemo(() => {
    const hour = new Date().getHours()

    if (hour < 12) {
      return {
        text: "Good Morning",
        icon: "🌅",
      }
    }

    if (hour < 17) {
      return {
        text: "Good Afternoon",
        icon: "☀️",
      }
    }

    return {
      text: "Good Evening",
      icon: "🌙",
    }
  }, [])

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
    >
      <DesktopNavbar
        items={items}
        pathname={pathname}
        greeting={greeting}
        introDone={introDone}
        moreOpen={moreOpen}
        isScrolled={isScrolled}
        onMoreOpenChange={setMoreOpen}
      />

      <MobileNavbar
        items={items}
        pathname={pathname}
      />
    </motion.header>
  )
}

export type { NavItem, NavbarProps } from "./navbar-types"