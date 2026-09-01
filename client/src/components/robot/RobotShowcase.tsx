import { Suspense, lazy, useEffect, useRef, useState } from "react"

// three + drei is by far the heaviest dependency in the project — bigger than
// the rest of the home page put together. Splitting it out here keeps it off
// the initial home bundle; the import only fires once the section is close
// enough to matter.
const RobotScene = lazy(() =>
  import("@/components/ui/robot").then((m) => ({ default: m.RobotScene })),
)

/**
 * A full-viewport black stage holding nothing but the robot. It sits between
 * the case studies and the guestbook as a beat of pure interaction — drag or
 * tap the robot and it reacts.
 */
export default function RobotShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    // A viewport of lead time, so the chunk is fetched and the first frame is
    // rendered before the section is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldMount(true)
        observer.disconnect()
      },
      { rootMargin: "100% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Say hello to the robot"
      className="relative h-svh min-h-[600px] w-full overflow-hidden bg-black"
    >
      {shouldMount ? (
        <Suspense fallback={null}>
          <RobotScene />
        </Suspense>
      ) : null}
    </section>
  )
}
