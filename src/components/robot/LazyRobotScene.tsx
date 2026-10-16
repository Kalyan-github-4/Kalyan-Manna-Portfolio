"use client"

import { Suspense, lazy, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import type { RobotSceneProps } from "@/components/ui/robot"

// three + drei is by far the heaviest dependency in the project — bigger than
// the rest of the home page put together. Splitting it out keeps it off the
// initial bundle; the import only fires once the scene is close to view.
const RobotScene = lazy(() =>
  import("@/components/ui/robot").then((m) => ({ default: m.RobotScene })),
)

type LazyRobotSceneProps = RobotSceneProps & {
  /** Sizing for the wrapper the canvas fills. */
  wrapperClassName?: string
}

/**
 * Mounts the robot only once it is nearly on screen, so a page can host it
 * without paying for three.js up front. The wrapper positions itself so the
 * canvas inside has something to pin to; `cn` merges the classes rather than
 * concatenating them, so a caller passing `absolute` actually wins instead of
 * losing to the default `relative` further down the stylesheet.
 */
export default function LazyRobotScene({
  wrapperClassName = "",
  ...sceneProps
}: LazyRobotSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    // A viewport of lead time, so the chunk is fetched and the first frame is
    // drawn before the scene is actually visible.
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
    <div ref={wrapperRef} className={cn("relative", wrapperClassName)}>
      {shouldMount ? (
        <Suspense fallback={null}>
          <RobotScene {...sceneProps} />
        </Suspense>
      ) : null}
    </div>
  )
}
