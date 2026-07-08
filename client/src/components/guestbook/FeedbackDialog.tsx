import { useState } from "react"
import { useAuth, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { ArrowRight, Star } from "@phosphor-icons/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { createFeedbackEntry } from "@/lib/api"

export default function FeedbackDialog() {
  const { getToken } = useAuth()

  const [open, setOpen] = useState(false)
  const [role, setRole] = useState("")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const isDisabled =
    isSubmitting || role.trim().length < 2 || feedback.trim().length < 5

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isDisabled) return

    try {
      setIsSubmitting(true)
      setStatus(null)

      const token = await getToken()

      if (!token) {
        throw new Error("Please sign in again before submitting.")
      }

      await createFeedbackEntry(
        {
          role: role.trim(),
          feedback: feedback.trim(),
          rating,
        },
        token
      )

      setRole("")
      setFeedback("")
      setRating(5)
      setStatus("Thanks — your feedback has been added.")
      setOpen(false)
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to submit feedback."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 py-1 pl-5 pr-1 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500"
        >
          <span className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />

          <span className="relative z-10 text-sm transition-colors duration-500 group-hover:text-slate-900">
            Share your experience
          </span>

          <span className="relative z-10 ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-500 group-hover:translate-x-1">
            <ArrowRight size={14} />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Share your experience
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            A few words about working with me. Your feedback may appear in the
            client feedback section.
          </DialogDescription>
        </DialogHeader>

        <SignedOut>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <p className="mb-4 text-sm text-zinc-400">
              Please sign in first so your name and profile image can be attached
              to your feedback.
            </p>

            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Sign in to continue
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Your role / title
              </label>

              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Founder · Bloom Studio"
                maxLength={70}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Rating
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= rating

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`rounded-full p-1 transition ${
                        active
                          ? "text-amber-300"
                          : "text-white/20 hover:text-white/45"
                      }`}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star size={22} weight={active ? "fill" : "regular"} />
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Feedback
              </label>

              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Tell people what the experience was like..."
                rows={5}
                maxLength={500}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-white/25"
              />

              <div className="mt-2 flex justify-between text-xs text-zinc-500">
                <span>{status}</span>
                <span>{feedback.length}/500</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="cursor-pointer w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Submitting..." : "Submit feedback"}
            </button>
          </form>
        </SignedIn>
      </DialogContent>
    </Dialog>
  )
}