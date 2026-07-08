import { useEffect, useMemo, useState } from "react"

import GuestShowUpWall, { type Speaker } from "./GuestShowUpWall"
import GradientText from "../GradientText"
import { getFeedbackEntries, type FeedbackEntryResponse } from "@/lib/api"

function mapFeedbackToSpeaker(entry: FeedbackEntryResponse): Speaker {
  return {
    name: entry.user.name,
    role: entry.role,
    feedback: entry.feedback,
    rating: entry.rating ?? 5,
    src:
      entry.user.imageUrl ||
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=300&q=80",
  }
}

export default function GuestShowUp() {
  const [entries, setEntries] = useState<FeedbackEntryResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getFeedbackEntries()
      .then((response) => {
        if (cancelled) return

        console.log("Feedback wall entries:", response.entries)
        setEntries(response.entries)
      })
      .catch((error) => {
        console.error("Failed to load feedback wall:", error)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const speakers = useMemo(
    () => entries.map(mapFeedbackToSpeaker),
    [entries]
  )

  const title = (
    <>
      <GradientText
        className="inline-block overflow-visible pb-4"
        colors={["#FF3BD4", "#FFB5EF", "#FE98E8", "#FFEDA4", "#FF3BD4"]}
        animationSpeed={6}
      >
        Voices
      </GradientText>{" "}
      Matters
    </>
  )

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center px-5 text-center">
        <div>
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500">
            Client Feedback
          </p>

          <h2 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl">
            {title}
          </h2>

          <p className="mt-8 text-zinc-400">Loading real feedback...</p>
        </div>
      </section>
    )
  }

  if (speakers.length === 0) {
    return (
      <GuestShowUpWall
        eyebrow="Client Feedback"
        title={title}
        description="No feedback yet. Be the first one to share your experience."
        hint="scroll to read feedback"
        speakers={[]}
        showCaptions={false}
      />
    )
  }

  return (
    <GuestShowUpWall
      eyebrow="Client Feedback"
      title={title}
      description="Real feedback from people and businesses I’ve helped with websites, apps, dashboards, and digital systems."
      hint="scroll to read feedback"
      speakers={speakers}
      showCaptions={false}
    />
  )
}