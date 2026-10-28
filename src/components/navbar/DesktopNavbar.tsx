import { DesktopNavMenu } from "./DesktopNavMenu"
import { NavSearch } from "./NavSearch"
import type { NavItem } from "./navbar-types"

interface Greeting {
  text: string
  icon: string
}

interface DesktopNavbarProps {
  items: NavItem[]
  pathname: string
  greeting: Greeting | null
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
    <div className="hidden w-full items-start justify-center gap-3 md:flex">
      <DesktopNavMenu
        items={items}
        pathname={pathname}
        greeting={greeting}
        introDone={introDone}
        moreOpen={moreOpen}
        onMoreOpenChange={onMoreOpenChange}
      />
      {/* Slightly smaller than the 54px pill and centred on its top row, so it
          stays put when the More menu grows the pill downward. */}
      <NavSearch items={items} shortcut className="mt-[5px] size-11" />
    </div>
  )
}
