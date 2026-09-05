import type { ReactNode } from "react"

/**
 * Chrome-free routes.
 *
 * /robot ships its own antenna navbar and fills the viewport with `h-dvh`, so
 * nesting it under SiteChrome would stack two navbars and push the scene below
 * the fold. Under React Router it was nested anyway, despite the comment in
 * Robot.tsx saying otherwise — this group makes the intent real.
 */
export default function BareLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
