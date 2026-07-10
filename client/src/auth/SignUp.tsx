import { useState } from "react"
import { Link } from "react-router-dom"
import { useSignUp } from "@clerk/clerk-react"
import {
  LinkedinLogoIcon,
  GoogleLogoIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react"

const REDIRECT_URL = `${window.location.origin}/more/guestbook/sso-callback`
const REDIRECT_COMPLETE_URL = "/more/guestbook"

export default function SignUp() {
  const { signUp, isLoaded } = useSignUp()
  const [loadingProvider, setLoadingProvider] = useState<
    "Linkedin" | "google" | null
  >(null)

  const handleOAuth = async (provider: "Linkedin" | "google") => {
    if (!isLoaded || !signUp) return

    setLoadingProvider(provider)

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider === "Linkedin" ? "oauth_linkedin_oidc" : "oauth_google",
        redirectUrl: REDIRECT_URL,
        redirectUrlComplete: REDIRECT_COMPLETE_URL,
      })
    } catch (error) {
      console.error("OAuth sign up failed:", error)
      setLoadingProvider(null)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-28 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,79,224,0.28),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(33,146,218,0.16),transparent_30%)]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-14rem)] max-w-107.5 items-center justify-center">
        <div className="w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#121214] shadow-2xl">
          <div className="relative overflow-hidden bg-[linear-gradient(160deg,#7C4FE0_0%,#5123A3_52%,#281357_100%)] px-6 pb-12 pt-10 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <PencilSimpleIcon size={29} weight="bold" />
            </div>

            <h1 className="font-serif text-3xl italic leading-none text-white">
              Join the wall
            </h1>

            <p className="mt-3 text-sm font-medium text-white/65">
              Create your account to write on the guestbook
            </p>
          </div>

          <div className="relative -mt-5 h-8 bg-[#121214]">
            <svg
              className="absolute -top-px left-0 h-8 w-full text-[#121214]"
              viewBox="0 0 430 32"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 16C10 16 10 8 20 8C30 8 30 16 40 16C50 16 50 8 60 8C70 8 70 16 80 16C90 16 90 8 100 8C110 8 110 16 120 16C130 16 130 8 140 8C150 8 150 16 160 16C170 16 170 8 180 8C190 8 190 16 200 16C210 16 210 8 220 8C230 8 230 16 240 16C250 16 250 8 260 8C270 8 270 16 280 16C290 16 290 8 300 8C310 8 310 16 320 16C330 16 330 8 340 8C350 8 350 16 360 16C370 16 370 8 380 8C390 8 390 16 400 16C410 16 410 8 420 8C425 8 428 10 430 12V32H0V16Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="px-5 pb-7 pt-1">
            <div className="space-y-3">
              <button
                type="button"
                disabled={!isLoaded || loadingProvider !== null}
                onClick={() => handleOAuth("Linkedin")}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <LinkedinLogoIcon size={20} weight="fill" />
                {loadingProvider === "Linkedin"
                  ? "Connecting..."
                  : "Continue with Linkedin"}
              </button>

              <button
                type="button"
                disabled={!isLoaded || loadingProvider !== null}
                onClick={() => handleOAuth("google")}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <GoogleLogoIcon size={20} weight="bold" />
                {loadingProvider === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-white/45">
              Already have an account?{" "}
              <Link
                to="/more/guestbook/sign-in"
                className="font-semibold text-white hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-white/35">
              We only access your name, avatar, and email for the guestbook.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}