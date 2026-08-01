import { Suspense, lazy, type ReactNode } from "react"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. Please add it to your .env file."
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

type ClerkGateProps = {
  children: ReactNode
  /** Shown while the Clerk chunk is in flight. Defaults to nothing. */
  fallback?: ReactNode
}

/**
 * Mounts a ClerkProvider around just the subtree that needs auth.
 *
 * Never nest two of these — Clerk expects a single provider per tree.
 */
export default function ClerkGate({
  children,
  fallback = null,
}: ClerkGateProps) {
  return (
    <Suspense fallback={fallback}>
      <LazyClerkProvider publishableKey={publishableKey}>
        {children}
      </LazyClerkProvider>
    </Suspense>
  )
}
