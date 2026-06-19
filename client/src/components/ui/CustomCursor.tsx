import { useEffect, useRef } from "react"

type Props = {
  size?: number
  interactiveSelector?: string
}

export default function CustomCursor({ size = 20, interactiveSelector = "a, button" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const shouldShow = window.matchMedia("(pointer: fine)").matches
    if (!shouldShow) {
      el.style.display = "none"
      return undefined
    }

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX - size / 2}px`
      el.style.top = `${e.clientY - size / 2}px`
    }

    const targets = Array.from(document.querySelectorAll(interactiveSelector))
    const handleEnter = () => (el.style.transform = "scale(2.5)")
    const handleLeave = () => (el.style.transform = "scale(1)")

    document.addEventListener("mousemove", onMove)
    targets.forEach((t) => {
      t.addEventListener("mouseenter", handleEnter)
      t.addEventListener("mouseleave", handleLeave)
    })

    return () => {
      document.removeEventListener("mousemove", onMove)
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", handleEnter)
        t.removeEventListener("mouseleave", handleLeave)
      })
    }
  }, [size, interactiveSelector])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full border border-primary transition-transform duration-100 md:block"
      style={{ width: size, height: size }}
    />
  )
}
