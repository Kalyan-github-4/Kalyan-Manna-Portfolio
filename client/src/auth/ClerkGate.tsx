"use client"

import { Suspense, lazy, useEffect, useState, type ReactNode } from "react"

const rawPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!rawPublishableKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. Please add it to your .env file."
  )
}

// The throw above narrows it here, but that narrowing does not survive into the
// component body, where `process.env.X` is still `string | undefined`.
const publishableKey: string = rawPublishableKey

// Clerk is the single largest dependency in the app and only three surfaces
// need it: the guestbook, the auth pages, and the feedback dialog on the home
// page. Importing it through lazy() keeps it out of the entry chunk so the
// rest of the site never pays for it.
const LazyClerkProvider = lazy(async () => {
  const { ClerkProvider } = await import("@clerk/clerk-react")

  return { default: ClerkProvider }
})

type ClerkGateProps = {
  children: ReactNode
  /** Shown while the Clerk chunk is in flight. Defaults to nothing. */
  fallback?: ReactNode
}

/**
 * Mounts a ClerkProvider around just the subtree that needs auth.
 *
 * Never nest two of these — Clerk expects a single provider per tree.
 *
 * Renders nothing until the browser has it. `@clerk/clerk-react` is the
 * client-side SDK: it establishes no context during a server render, so any
 * `useAuth`/`useUser` below this point throws "can only be used within
 * <ClerkProvider />" while Next prerenders the route. Gating on mount keeps the
 * whole Clerk subtree out of the server pass. The trade-off is that everything
 * inside is absent from the prerendered HTML — fine here, since all of it is
 * interactive, auth-dependent, and not content we want indexed.
 */
export default function ClerkGate({
  children,
  fallback = null,
}: ClerkGateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <>{fallback}</>

  return (
    <Suspense fallback={fallback}>
      <LazyClerkProvider publishableKey={publishableKey}>
        {children}
      </LazyClerkProvider>
    </Suspense>
  )
}
