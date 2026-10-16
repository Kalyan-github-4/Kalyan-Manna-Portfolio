import { DesktopNavMenu } from "./DesktopNavMenu"
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
  onMoreOpenChange: (open: boolean) => void
}

export function DesktopNavbar({
  items,
  pathname,
  greeting,
  introDone,
  moreOpen,
  onMoreOpenChange,
}: DesktopNavbarProps) {
  return (
    <div className="hidden w-full justify-center md:flex">
      <DesktopNavMenu
        items={items}
        pathname={pathname}
        greeting={greeting}
        introDone={introDone}
        moreOpen={moreOpen}
        onMoreOpenChange={onMoreOpenChange}
      />
    </div>
  )
}
