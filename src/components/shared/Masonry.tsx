"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { gsap } from "gsap"

import { layoutMasonry, type MasonryItem, type MasonryTile } from "./masonryLayout"

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

/** Resolves the first matching media query to its paired value. */
const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = useCallback(() => {
    if (typeof window === "undefined") return defaultValue
    const index = queries.findIndex((q) => window.matchMedia(q).matches)
    return values[index] ?? defaultValue
  }, [queries, values, defaultValue])

  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    const handler = () => setValue(get())
    const lists = queries.map((q) => window.matchMedia(q))
    lists.forEach((list) => list.addEventListener("change", handler))
    handler()
    return () =>
      lists.forEach((list) => list.removeEventListener("change", handler))
  }, [queries, get])

  return value
}

/** Tracks an element's content-box width via ResizeObserver. */
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    setWidth(node.getBoundingClientRect().width)

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  return [ref, width] as const
}

/** Honours the OS "reduce motion" setting — animations collapse to snaps. */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const list = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduced(list.matches)
    handler()
    list.addEventListener("change", handler)
    return () => list.removeEventListener("change", handler)
  }, [])

  return reduced
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_BREAKPOINTS = [
  "(min-width:1500px)",
  "(min-width:1000px)",
  "(min-width:600px)",
  "(min-width:400px)",
]
const DEFAULT_COLUMNS = [5, 4, 3, 2]

export interface MasonryProps<T extends MasonryItem> {
  items: T[]
  /** Media queries, widest first. Paired index-for-index with `columns`. */
  breakpoints?: string[]
  /** Column count per breakpoint; falls back to `minColumns` below them all. */
  columns?: number[]
  /** Column count when no breakpoint matches (i.e. the narrowest screens). */
  minColumns?: number
  /** Gutter between tiles, in px. */
  gap?: number
  /** Renders a tile's contents. Receives the original, fully-typed item. */
  renderItem?: (item: T) => ReactNode
  onItemClick?: (item: T) => void
  /** Accessible label for each tile's button, e.g. `Open ${item.title}`. */
  itemLabel?: (item: T) => string
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random"
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  className?: string
}

const Masonry = <T extends MasonryItem>({
  items,
  breakpoints = DEFAULT_BREAKPOINTS,
  columns = DEFAULT_COLUMNS,
  minColumns = 1,
  gap = 16,
  renderItem,
  onItemClick,
  itemLabel,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 1.03,
  blurToFocus = true,
  className,
}: MasonryProps<T>) => {
  const columnCount = useMedia(breakpoints, columns, minColumns)
  const [containerRef, width] = useMeasure<HTMLDivElement>()
  const reduceMotion = usePrefersReducedMotion()

  // Live element handles keyed by item id — avoids global `[data-key=...]`
  // selectors so multiple grids can coexist on one page.
  const tileRefs = useRef(new Map<string | number, HTMLDivElement>())
  // Ids that have already played their entrance, so filtering a subset back in
  // only animates the genuinely new tiles.
  const enteredIds = useRef(new Set<string | number>())

  const { tiles, height } = useMemo(
    () => layoutMasonry(items, width, columnCount, gap),
    [items, width, columnCount, gap]
  )

  const getEntryOffset = useCallback(
    (tile: MasonryTile<T>) => {
      let direction = animateFrom
      if (direction === "random") {
        const dirs = ["top", "bottom", "left", "right"] as const
        direction = dirs[Math.floor(Math.random() * dirs.length)]
      }

      switch (direction) {
        case "top":
          return { x: tile.x, y: tile.y - 120 }
        case "left":
          return { x: tile.x - 120, y: tile.y }
        case "right":
          return { x: tile.x + 120, y: tile.y }
        case "center":
          return { x: tile.x, y: tile.y }
        case "bottom":
        default:
          return { x: tile.x, y: tile.y + 120 }
      }
    },
    [animateFrom]
  )

  useLayoutEffect(() => {
    if (!width) return

    tiles.forEach((tile, index) => {
      const el = tileRefs.current.get(tile.item.id)
      if (!el) return

      const target = { x: tile.x, y: tile.y, width: tile.w, height: tile.h }
      const isNew = !enteredIds.current.has(tile.item.id)

      if (reduceMotion) {
        gsap.set(el, { ...target, opacity: 1, filter: "none" })
      } else if (isNew) {
        const from = getEntryOffset(tile)
        gsap.fromTo(
          el,
          {
            ...target,
            ...from,
            opacity: 0,
            scale: animateFrom === "center" ? 0.85 : 1,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            ...target,
            opacity: 1,
            scale: 1,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease,
            delay: Math.min(index * stagger, 0.6),
            // Drop the filter afterwards: a lingering `blur(0px)` still forces
            // the tile onto its own compositor layer.
            onComplete: () => gsap.set(el, { clearProps: "filter" }),
          }
        )
      } else {
        gsap.to(el, { ...target, duration, ease, overwrite: "auto" })
      }

      enteredIds.current.add(tile.item.id)
    })
  }, [
    tiles,
    width,
    reduceMotion,
    getEntryOffset,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    stagger,
  ])

  // Forget tiles that have left so they replay their entrance if they come
  // back (e.g. the user switches a filter away and then returns to it).
  useEffect(() => {
    const live = new Set(items.map((item) => item.id))
    enteredIds.current.forEach((id) => {
      if (!live.has(id)) enteredIds.current.delete(id)
    })
    tileRefs.current.forEach((_, id) => {
      if (!live.has(id)) tileRefs.current.delete(id)
    })
  }, [items])

  const handleActivate = (item: T) => {
    if (onItemClick) {
      onItemClick(item)
    } else if (item.url) {
      window.open(item.url, "_blank", "noopener")
    }
  }

  // Hover scale lives on the inner card, never on the positioned wrapper — the
  // wrapper's transform belongs to the layout tween and the two would fight.
  const setHover = (el: HTMLElement | null, active: boolean) => {
    if (!scaleOnHover || reduceMotion || !el) return
    const card = el.firstElementChild
    if (!card) return
    gsap.to(card, {
      scale: active ? hoverScale : 1,
      duration: 0.35,
      ease: "power2.out",
    })
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full${className ? ` ${className}` : ""}`}
      // Absolutely-positioned children contribute nothing to flow, so the
      // packed height has to be applied explicitly.
      style={{ height }}
    >
      {tiles.map((tile) => (
        <div
          key={tile.item.id}
          ref={(node) => {
            if (node) tileRefs.current.set(tile.item.id, node)
            else tileRefs.current.delete(tile.item.id)
          }}
          className="absolute left-0 top-0 opacity-0"
          style={{ willChange: "transform, width, height, opacity" }}
          onMouseEnter={(e) => setHover(e.currentTarget, true)}
          onMouseLeave={(e) => setHover(e.currentTarget, false)}
        >
          <button
            type="button"
            onClick={() => handleActivate(tile.item)}
            aria-label={itemLabel?.(tile.item)}
            className="block h-full w-full cursor-pointer overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {renderItem ? (
              renderItem(tile.item)
            ) : (
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${tile.item.img})` }}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Masonry
