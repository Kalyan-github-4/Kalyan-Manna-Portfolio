"use client"

import { ArrowUpRight } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import EdgeStripes from "@/components/shared/EdgeStripes"
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
    <section className="relative pb-24 pl-11 pr-8 sm:pl-14 sm:pr-11 md:pl-16 md:pr-14 lg:px-20">
      <EdgeStripes />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400 sm:text-xs sm:tracking-[0.35em] lg:text-left">
          A Year In Code
        </p>
        <h2 className="mb-8 text-center font-display text-3xl font-medium leading-none sm:text-4xl lg:text-left">
          <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent">
            My GitHub skyline
          </span>
        </h2>

        {days ? (
          <ContributionSkyline
            data={days}
            showStats={false}
            footer={null}
            eyebrow={
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex w-fit items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github.com/${USERNAME}.png?size=112`}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 rounded-xl sm:size-14"
                />
                <span>
                  <span className="block font-semibold text-white">@{USERNAME}</span>
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-zinc-400">
                    GitHub <ArrowUpRight size={12} aria-hidden="true" />
                  </span>
                </span>
              </a>
            }
          />
        ) : (
          // Holds the chart's place while the calendar loads.
          <div aria-hidden="true" className="h-90 w-full animate-pulse rounded-xl border border-white/10 bg-white/2" />
        )}
      </div>
    </section>
  )
}
