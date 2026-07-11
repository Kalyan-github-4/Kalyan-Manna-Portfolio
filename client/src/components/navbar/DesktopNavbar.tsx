import { motion } from "framer-motion"

import { ContactDialog } from "@/components/shared/ContactDialog"

import { DesktopNavMenu } from "./DesktopNavMenu"
import { NavbarLogo } from "./NavbarLogo"
import type { NavItem } from "./navbar-types"

interface Greeting {
  text: string
  icon: string
}

interface DesktopNavbarProps {
  items: NavItem[]
  pathname: string
  greeting: Greeting
  introDone: boolean
  moreOpen: boolean
  isScrolled: boolean
  onMoreOpenChange: (open: boolean) => void
}

const CONTACT_EMAIL = "kalyanmanna439@gmail.com"

export function DesktopNavbar({
  items,
  pathname,
  greeting,
  introDone,
  moreOpen,
  isScrolled,
  onMoreOpenChange,
}: DesktopNavbarProps) {
  return (
    <div className="hidden w-full grid-cols-[1fr_auto_1fr] items-start gap-4 md:grid">
      <NavbarLogo isScrolled={isScrolled} />

      <DesktopNavMenu
        items={items}
        pathname={pathname}
        greeting={greeting}
        introDone={introDone}
        moreOpen={moreOpen}
        onMoreOpenChange={onMoreOpenChange}
      />

      <motion.div
        className="flex h-13 items-center justify-end"
        animate={{
          opacity: isScrolled ? 0 : 1,
          scale: isScrolled ? 0.8 : 1,
          x: isScrolled ? 20 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={{
          pointerEvents: isScrolled ? "none" : "auto",
        }}
      >
        <ContactDialog
          email={CONTACT_EMAIL}
          name="Kalyan"
          imageSrc="/kalyan-manna.jpg"
          imageAlt="Kalyan Manna"
          calUrl="https://cal.com/kalyanmanna"
          linkedinUrl="https://www.linkedin.com/"
          xUrl="https://x.com/"
          githubUrl="https://github.com/Kalyan-github-4"
        >
          <button
            type="button"
            className="
              cursor-pointer items-center
              self-center justify-self-end
              rounded-full border border-white/10
              bg-zinc-950/45 bg-linear-to-b
              from-zinc-600/50 to-zinc-700/30
              px-4 py-2 text-xs font-medium text-white
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.08)]
              backdrop-blur-3xl backdrop-saturate-150
              transition hover:bg-zinc-800/70
            "
          >
            Book a Call
          </button>
        </ContactDialog>
      </motion.div>
    </div>
  )
}