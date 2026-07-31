import { AudioToggle } from "./AudioToggle"
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
  audioEnabled: boolean
  onToggleAudio: () => void
  onMoreOpenChange: (open: boolean) => void
}

export function DesktopNavbar({
  items,
  pathname,
  greeting,
  introDone,
  moreOpen,
  isScrolled,
  audioEnabled,
  onToggleAudio,
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

      {/*
        Unlike the CTA this replaced, the toggle does not fade out with the
        rest of the chrome on scroll: music the visitor cannot switch off
        after one screen of scrolling is a trap.
      */}
      <div className="flex h-13 items-center justify-end">
        <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
      </div>
    </div>
  )
}