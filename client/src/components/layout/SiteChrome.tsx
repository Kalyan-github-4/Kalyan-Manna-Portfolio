import type { ReactNode } from "react"

import { NavBar } from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

/**
 * The site shell — navbar, main slot, footer.
 *
 * Lives in its own component rather than directly in `app/(site)/layout.tsx`
 * because `app/not-found.tsx` has to sit at the app root to catch unmatched
 * URLs, and would otherwise render outside the (site) group without chrome.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Work", href: "/work" },
          { name: "Vault", href: "/vault" },
          {
            name: "More",
            href: "#",
            hasDropdown: true,
            items: [
              { name: "Guestbook", href: "/more/guestbook" },
              { name: "Bucket List", href: "/more/bucket-list" },
              { name: "Links", href: "/more/links" },
              { name: "Uses", href: "/more/uses" },
              { name: "Attribution", href: "/more/attribution" },
            ],
          },
        ]}
      />

      <main>{children}</main>

      <Footer />
    </>
  )
}
