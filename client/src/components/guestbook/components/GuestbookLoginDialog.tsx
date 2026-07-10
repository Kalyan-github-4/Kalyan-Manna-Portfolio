import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useSignIn } from "@clerk/clerk-react"
import {
  LinkedinLogoIcon,
  GoogleLogoIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react"

const REDIRECT_URL = `${window.location.origin}/more/guestbook/sso-callback`
const REDIRECT_COMPLETE_URL = "/more/guestbook"

export default function GuestbookLoginDialog() {
  const { signIn, isLoaded } = useSignIn()
  const [loadingProvider, setLoadingProvider] = useState<
    "Linkedin" | "google" | null
  >(null)

  const handleOAuth = async (provider: "Linkedin" | "google") => {
    if (!isLoaded || !signIn) return

    setLoadingProvider(provider)

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider === "Linkedin" ? "oauth_linkedin_oidc" : "oauth_google",
        redirectUrl: REDIRECT_URL,
        redirectUrlComplete: REDIRECT_COMPLETE_URL,
      })
    } catch (error) {
      console.error("OAuth sign in failed:", error)
      setLoadingProvider(null)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur transition hover:bg-white/15">
          <PencilSimpleIcon size={18} weight="bold" />
          Write a message...
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden border border-white/10 bg-[#121214] p-0 text-white shadow-2xl sm:max-w-107.5 [&>button]:text-white [&>button]:opacity-80 [&>button:hover]:opacity-100">
        <div className="relative overflow-hidden rounded-[22px]">
          <div className="relative overflow-hidden bg-[linear-gradient(160deg,#7C4FE0_0%,#5123A3_52%,#281357_100%)] px-6 pb-12 pt-10 text-center">
            <div className="absolute right-14 top-6 h-8 w-8 opacity-30">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white" />
              <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
              <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
            </div>

            <div className="absolute bottom-8 left-7 h-12 w-12 opacity-25">
              <svg viewBox="0 0 80 80" fill="none">
                <path
                  d="M46 3L18 38H42L30 77L64 30H40L46 3Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <PencilSimpleIcon size={29} weight="bold" />
            </div>

            <h3 className="font-serif text-3xl italic leading-none text-white">
              Leave your mark
            </h3>

            <p className="mt-3 text-sm font-medium text-white/65">
              Sign in to pin a note on the wall
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
                className="cursor-pointer flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
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
                className="cursor-pointer flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <GoogleLogoIcon size={20} weight="bold" />
                {loadingProvider === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-white/35">
              We only access your name, avatar, and email for the guestbook.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}