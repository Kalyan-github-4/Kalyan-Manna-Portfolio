"use client"

import { useState } from "react"
import { useSignIn } from "@clerk/clerk-react"
import { LinkedinLogo } from "@phosphor-icons/react"
import { FcGoogle } from "react-icons/fc"

import { getSsoCallbackUrl, SSO_COMPLETE_URL } from "@/auth/ssoRedirect"

type Provider = "linkedin" | "google"

const BUTTON =
  "inline-flex h-11 min-w-28 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"

// Clerk throws a ClerkAPIResponseError whose `.errors[]` holds the useful
// details (e.g. provider not enabled, misconfigured credentials). Surface that
// to the visitor instead of failing silently.
function getClerkErrorMessage(error: unknown, provider: Provider) {
  const label = provider === "linkedin" ? "LinkedIn" : "Google"

  if (error && typeof error === "object" && "errors" in error) {
    const first = (error as { errors?: Array<{ longMessage?: string; message?: string }> })
      .errors?.[0]
    if (first?.longMessage || first?.message) {
      return first.longMessage ?? first.message ?? ""
    }
  }

  if (error instanceof Error && error.message) return error.message

  return `Couldn't continue with ${label}. Please try again.`
}

/** One click to sign in or create an account; Clerk handles either case. */
export default function GuestbookLoginButtons() {
  const { signIn, isLoaded } = useSignIn()
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOAuth = async (provider: Provider) => {
    if (!isLoaded || !signIn) return

    setError(null)
    setLoadingProvider(provider)

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider === "linkedin" ? "oauth_linkedin_oidc" : "oauth_google",
        redirectUrl: getSsoCallbackUrl(),
        redirectUrlComplete: SSO_COMPLETE_URL,
      })
    } catch (error) {
      console.error("OAuth sign in failed:", error)
      setError(getClerkErrorMessage(error, provider))
      setLoadingProvider(null)
    }
  }

  const disabled = !isLoaded || loadingProvider !== null

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleOAuth("linkedin")}
          className={`${BUTTON} bg-zinc-900 text-white hover:bg-zinc-700`}
        >
          <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
          {loadingProvider === "linkedin" ? "Connecting…" : "LinkedIn"}
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => handleOAuth("google")}
          className={`${BUTTON} bg-white text-zinc-800 hover:bg-zinc-100`}
        >
          <FcGoogle size={18} aria-hidden="true" />
          {loadingProvider === "google" ? "Connecting…" : "Google"}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
