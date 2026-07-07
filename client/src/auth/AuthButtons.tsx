import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react"

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-full border border-white/15 bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
            Login to write
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}