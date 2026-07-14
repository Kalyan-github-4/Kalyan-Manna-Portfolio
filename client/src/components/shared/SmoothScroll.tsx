import { useEffect, type ReactNode } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import { useLocation } from "react-router-dom"
import { useReducedMotion } from "framer-motion"

function ScrollToTop() {
  const lenis = useLenis()
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, [lenis, pathname])

  return null
}

export default function SmoothScroll({
  children,
}: {
  children: ReactNode
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    )
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,

        // Touch scrolling
        syncTouch: true,
        syncTouchLerp: 0.08,
        touchMultiplier: 1.5,

        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollToTop />
      {children}
    </ReactLenis>
  )
}