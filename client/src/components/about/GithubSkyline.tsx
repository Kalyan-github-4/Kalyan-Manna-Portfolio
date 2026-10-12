"use client"

import { useEffect, useState } from "react"

import ContributionSkyline, { type ContributionDay } from "@/components/ui/contribution-skyline"
import { socialLinks } from "@/config"

const USERNAME = socialLinks.github.split("/").filter(Boolean).pop()

// Public mirror of the GitHub contribution calendar; needs no token.
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`

/**
 * The last year of GitHub activity as a skyline. The chart falls back to a
 * generated sample year when it is given no data, so it is only mounted once
 * the real calendar has arrived — and not at all if the request fails.
 */
export default function GithubSkyline() {
  const [days, setDays] = useState<ContributionDay[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((body: { contributions?: ContributionDay[] }) => {
        if (!body.contributions?.length) throw new Error("empty")
        setDays(body.contributions.map(({ date, count }) => ({ date, count })))
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true)
      })
    return () => controller.abort()
  }, [])

  if (failed) return null

  return (
    <section className="relative px-6 pb-24 sm:px-8 md:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400 sm:text-xs sm:tracking-[0.35em] lg:text-left">
          A Year In Code
        </p>
        <h2 className="mb-8 text-center font-display text-3xl font-medium leading-none sm:text-4xl lg:text-left">
          <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent">
            My GitHub skyline
          </span>
        </h2>

        {days ? (
          <ContributionSkyline data={days} />
        ) : (
          // Holds the chart's place while the calendar loads.
          <div aria-hidden="true" className="h-90 w-full animate-pulse rounded-xl border border-white/10 bg-white/2" />
        )}
      </div>
    </section>
  )
}
