import type { Icon } from "@phosphor-icons/react"

export interface NavItem {
  name: string
  href: string
  hasDropdown?: boolean
  items?: NavItem[]
  icon?: Icon
}

export interface NavbarProps {
  items: NavItem[]
  className?: string
}