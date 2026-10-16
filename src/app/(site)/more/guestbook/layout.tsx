import type { ReactNode } from "react"

import ClerkGate from "@/auth/ClerkGate"

/**
 * The only subtree that mounts Clerk.
 *
 * Under React Router each guestbook route wrapped itself in its own ClerkGate;
 * as a layout the provider mounts once and survives navigation between the
 * guestbook, sign-in, sign-up and SSO callback.
 */
export default function GuestbookLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkGate fallback={<div className="min-h-screen bg-black" />}>
      {children}
    </ClerkGate>
  )
}
