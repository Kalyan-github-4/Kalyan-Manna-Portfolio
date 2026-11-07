"use client"

import { ArrowRight, GithubLogo, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { siteConfig, socialLinks } from "@/config"

import { MobileNavItem } from "./MobileNavItem"
import { navTone } from "./navbar-icons"
import type { NavItem } from "./navbar-types"

interface MobileNavbarProps {
  items: NavItem[]
  pathname: string
}

const SOCIALS = [
  { label: "GitHub", href: socialLinks.github, icon: GithubLogo },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedinLogo },
  { label: "X", href: socialLinks.x, icon: XLogo },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramLogo },
]

function GroupLabel({ children }: { children: string }) {
  return <p className="px-2.5 pb-1 pt-3 text-xs font-medium text-zinc-400">{children}</p>
}

export function MobileNavbar({ items, pathname }: MobileNavbarProps) {
  const mainItems = items.filter((item) => !item.hasDropdown)
  const moreItems = items.flatMap((item) => (item.hasDropdown ? (item.items ?? []) : []))

  return (
    <div className="relative flex cursor-pointer items-center justify-center gap-2.5 md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            aria-label="Kalyan, open navigation menu"
            className="
              flex items-center gap-5.5
              rounded-full border border-white/[0.09]
              bg-zinc-900/85 px-5 py-1.5
              shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.45)]
              backdrop-blur-xl backdrop-saturate-150
            "
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-white">
              Kalyan
            </span>

            <Image
              src="/logo-white.webp"
              alt=""
              aria-hidden="true"
              width={27}
              height={27}
              loading="eager"
              className="h-6.75 w-auto object-contain"
            />
          </motion.button>
        </DrawerTrigger>

        {/* Same glass as the search: the page stays visible, blurred, behind it. */}
        <DrawerContent
          className="
            mx-auto w-[calc(100%-1.5rem)] max-w-sm
            rounded-3xl border border-white/12
            bg-zinc-900/60 pb-3 backdrop-blur-2xl backdrop-saturate-150
            shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.6)]
            data-[vaul-drawer-direction=bottom]:bottom-[max(0.75rem,env(safe-area-inset-bottom))]
          "
        >
          <div className="flex items-center gap-3 px-5 pb-1 pt-3">
            <Image
              src={siteConfig.profileImage}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-xl object-cover ring-1 ring-white/15"
            />
            <div className="min-w-0">
              <DrawerTitle className="truncate font-display text-xl leading-6 text-white">{siteConfig.name}</DrawerTitle>
              <DrawerDescription className="truncate text-xs text-zinc-400">Full-stack developer</DrawerDescription>
            </div>
          </div>

          <nav aria-label="Mobile navigation" className="overflow-y-auto px-2.5">
            <GroupLabel>Pages</GroupLabel>
            <div className="grid grid-cols-2 gap-1">
              {mainItems.map((item, index) => (
                <MobileNavItem key={item.href} item={item} pathname={pathname} tone={navTone(index)} index={index} />
              ))}
            </div>

            <GroupLabel>More</GroupLabel>
            <div className="grid grid-cols-2 gap-1">
              {moreItems.map((item, index) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  tone={navTone(mainItems.length + index)}
                  index={mainItems.length + index}
                />
              ))}
            </div>
          </nav>

          <div className="mx-5 mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <DrawerClose asChild>
              <Link
                href="/contact"
                className="group inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-zinc-950 transition-colors active:bg-zinc-200"
              >
                Book a call
                <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform group-active:translate-x-0.5" />
              </Link>
            </DrawerClose>

            {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors active:bg-white/15 active:text-white"
              >
                <SocialIcon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
