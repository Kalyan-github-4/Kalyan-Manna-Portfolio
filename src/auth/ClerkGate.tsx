"use client"

import { Suspense, lazy, useSyncExternalStore, type ReactNode } from "react"

// Read at module scope so Next inlines it, but never validated here: this
// module is evaluated during the server prerender of /more/guestbook, so a
// throw at this level fails `next build` outright rather than degrading the
// one route that needs auth. The key is checked in the component instead,
// where the blast radius is the Clerk subtree.
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey && typeof window !== "undefined") {
  console.error(
    "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY — auth surfaces are disabled. Set it in the build environment."
  )
}

// Clerk is the single largest dependency in the app and only three surfaces
// need it: the guestbook, the auth pages, and the feedback dialog on the home
// page. Importing it through lazy() keeps it out of the entry chunk so the
// rest of the site never pays for it.
const LazyClerkProvider = lazy(async () => {
  const { ClerkProvider } = await import("@clerk/clerk-react")

  return { default: ClerkProvider }
})

// "Have we hydrated yet?" as an external store rather than the usual
// useState + useEffect(() => setMounted(true)) pair. The store never changes,
// so it never subscribes; the snapshots differ across the hydration boundary,
// which is the whole point. React lints the setState-in-an-effect version as a
// cascading render, and this expresses the same thing without one.
const subscribeToNothing = () => () => {}
const getHydratedSnapshot = () => true
const getServerSnapshot = () => false

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
 *
 * Without NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY the gate stays on its fallback
 * forever and logs once. NEXT_PUBLIC_* values are inlined at build time, so
 * the variable has to exist wherever `next build` runs — the deploy host's
 * environment, not just the local .env.
 */
export default function ClerkGate({
  children,
  fallback = null,
}: ClerkGateProps) {
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    getHydratedSnapshot,
    getServerSnapshot
  )

  if (!hydrated || !publishableKey) return <>{fallback}</>

  return (
    <Suspense fallback={fallback}>
      <LazyClerkProvider publishableKey={publishableKey}>
        {children}
      </LazyClerkProvider>
    </Suspense>
  )
}
