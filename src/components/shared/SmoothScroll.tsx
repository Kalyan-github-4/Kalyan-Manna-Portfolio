"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import type Lenis from "lenis"

/**
 * Smooth wheel scrolling, desktop only.
 *
 * Lenis is created imperatively after the page is idle instead of through
 * <ReactLenis>, for three reasons:
 *  - Its init reads scrollHeight and attaches ResizeObservers to the whole
 *    document, forcing a full synchronous layout of the home page right in the
 *    middle of hydration (~1.8s of main-thread time on a throttled phone).
 *  - Touch devices never use it (touch scrolling stays native), so phones were
 *    paying for a rAF loop that did nothing.
 *  - Switching between <ReactLenis> and a fragment on reduced-motion changed
 *    the element type above the whole app and remounted every page.
 *
 * The component tree is now identical on every device, and Lenis is loaded
 * only where it is actually used: a fine pointer with motion allowed.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const wantsSmooth =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!wantsSmooth) return

    let cancelled = false
    let rafId = 0
    let lenis: Lenis | null = null

    const start = async () => {
      const { default: LenisCtor } = await import("lenis")
      if (cancelled) return

      lenis = new LenisCtor({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenisRef.current = lenis

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    // Wait until hydration and first-load work are done before touching layout.
    // Safari has no requestIdleCallback.
    const hasIdle = typeof window.requestIdleCallback === "function"
    const idle = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 2500 })
      : globalThis.setTimeout(() => void start(), 1500)

    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(idle as number)
      else globalThis.clearTimeout(idle)
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  // Reset scroll on route change.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return <>{children}</>
}
