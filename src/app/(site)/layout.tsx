import type { ReactNode } from "react"

import SiteChrome from "@/components/layout/SiteChrome"

/** Every route that wears the site navbar and footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
