"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState, type ComponentType } from "react"

/**
 * The homepage sections below the hero, loaded only when the visitor scrolls
 * near them.
 *
 * Rendering all five on load meant ~1,800 DOM nodes, ~400 KB of JS and one
 * ~1s hydration task before the page could respond — on a phone, for content
 * that starts a full screen below the fold. Each section is now its own chunk,
 * fetched and mounted once it is within about a screen and a half of the
 * viewport, so first load only pays for the hero.
 *
 * Every placeholder reserves the section's measured height at each breakpoint,
 * so the footer and scrollbar stay put while sections stream in.
 */

// Heights measured at 390px / 800px / 1440px wide (bento includes its top margin).
// The same box is the loading state, so nothing collapses while a chunk downloads.
const section = (load: () => Promise<{ default: ComponentType }>, placeholder: string) => ({
  placeholder,
  Component: dynamic(load, {
    ssr: false,
    loading: () => <div aria-hidden="true" className={placeholder} />,
  }),
})

const SECTIONS: { Component: ComponentType; placeholder: string }[] = [
  section(() => import("@/components/bento/BentoGrid"), "h-[1566px] md:h-[1663px] lg:h-[814px]"),
  section(() => import("@/components/work/CuratedWorkShowcase"), "h-[4857px] md:h-[4954px] lg:h-[4077px]"),
  section(() => import("@/components/about/HomeAbout"), "h-[1338px] md:h-[1353px] lg:h-[784px]"),
  section(() => import("@/components/vault/VaultShowcase"), "h-[1381px] md:h-[1058px] lg:h-[766px]"),
  section(() => import("@/components/explore/ExploreShowcase"), "h-[1255px] md:h-[954px] lg:h-[647px]"),
]

const INTENT_EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const

/**
 * Resolves `true` once the page is worth building below the hero: the visitor
 * scrolls, touches or types, or — for anyone who never does (crawlers, a tab
 * left open) — the browser has been idle for a while after load. Waiting for
 * one of these keeps all of this work out of the initial load, where it
 * competed with the hero for the main thread.
 */
function useReadyForBelowFold() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId = 0
    let timeoutId = 0
    const go = () => setReady(true)

    INTENT_EVENTS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }))

    const startIdleFallback = () => {
      timeoutId = window.setTimeout(() => {
        idleId =
          typeof window.requestIdleCallback === "function"
            ? window.requestIdleCallback(go, { timeout: 3000 })
            : window.setTimeout(go, 0)
      }, 4000)
    }
    if (document.readyState === "complete") startIdleFallback()
    else window.addEventListener("load", startIdleFallback, { once: true })

    return () => {
      INTENT_EVENTS.forEach((e) => window.removeEventListener(e, go))
      window.removeEventListener("load", startIdleFallback)
      window.clearTimeout(timeoutId)
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId)
    }
  }, [])

  return ready
}

function DeferredSection({
  Component,
  placeholder,
  ready,
}: (typeof SECTIONS)[number] & { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!ready || !node || show) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true)
      },
      // Starts loading about a screen early so it is ready before it scrolls in.
      { rootMargin: "100% 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ready, show])

  if (show) return <Component />
  return <div ref={ref} aria-hidden="true" className={placeholder} />
}

export default function DeferredSections() {
  const ready = useReadyForBelowFold()

  return (
    <>
      {SECTIONS.map((section, i) => (
        <DeferredSection key={i} {...section} ready={ready} />
      ))}
    </>
  )
}
