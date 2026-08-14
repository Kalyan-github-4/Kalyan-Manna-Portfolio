import { useEffect, useMemo, useRef, useState } from "react"

// Drives the canvas by assigning window.TagCanvas. react-icon-cloud's own
// <Cloud> keeps this library as a string and eval()s it, which our production
// CSP blocks — and it swallows the resulting error by hiding the canvas, so the
// cloud just vanished on the deployed site. Importing a real module keeps it
// under script-src 'self'.
import "@/lib/tagcanvas"
import {
    contrastRatio,
    fetchSimpleIcons,
    iconToSvgDataUri,
    type SimpleIcon,
} from "@/lib/simple-icons"

// https://www.goat1000.com/tagcanvas-options.php
const tagCanvasOptions: Record<string, unknown> = {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    textFont: null,
    textColour: null,
}

const ICON_SIZE = 40

// The site is dark-only, so the contrast reference is fixed: --background-secondary.
const BACKGROUND_HEX = "#080510"
const FALLBACK_HEX = "#ffffff"
const MIN_CONTRAST_RATIO = 2

/**
 * TagCanvas reads the canvas' child anchors, so each icon is a real <a> with an
 * inline SVG image. Brand colours that disappear into the page background fall
 * back to a neutral one.
 */
const renderIcon = (icon: SimpleIcon) => {
    const isReadable =
        contrastRatio(BACKGROUND_HEX, icon.hex) > MIN_CONTRAST_RATIO

    return (
        <a
            key={icon.slug}
            title={icon.title}
            style={{ cursor: "pointer" }}
            onClick={(event) => event.preventDefault()}
        >
            <img
                alt={icon.title}
                height={ICON_SIZE}
                width={ICON_SIZE}
                src={iconToSvgDataUri({
                    icon,
                    hex: isReadable ? icon.hex : FALLBACK_HEX,
                    size: ICON_SIZE,
                })}
            />
        </a>
    )
}

export type DynamicCloudProps = {
    iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    // TagCanvas addresses the canvas by id, so each instance needs its own.
    const [canvasId] = useState(
        () => `icon-cloud-${Math.random().toString(36).slice(2)}`,
    )

    // Keyed on the slugs themselves rather than the array, so a caller passing
    // an inline literal cannot spin this into a refetch loop.
    const slugKey = iconSlugs.join(",")

    useEffect(() => {
        let active = true

        fetchSimpleIcons({ slugs: slugKey.split(",") }).then((icons) => {
            if (active) setData(icons)
        })

        return () => {
            active = false
        }
    }, [slugKey])

    const renderedIcons = useMemo(() => {
        if (!data) return null

        return Object.values(data).map((icon) => renderIcon(icon))
    }, [data])

    // Start once the icons are in the DOM; tear down and re-read the tags
    // rather than animating stale ones.
    useEffect(() => {
        const tagCanvas = window.TagCanvas

        if (!renderedIcons || !tagCanvas) return

        try {
            tagCanvas.Start(canvasId, null, {
                ...tagCanvasOptions,
                // Touch devices get to spin it by hand; pointer devices keep
                // hover, which dragControl would otherwise take over.
                dragControl:
                    "ontouchstart" in window || navigator.maxTouchPoints > 0,
            })
        } catch (error) {
            // Thrown when the browser cannot back the canvas — leave the space
            // empty rather than showing a dead square.
            if (containerRef.current) {
                containerRef.current.style.display = "none"
            }
            console.error("IconCloud: TagCanvas failed to start", error)
            return
        }

        return () => {
            try {
                tagCanvas.Delete(canvasId)
            } catch {
                // Already torn down.
            }
        }
    }, [renderedIcons, canvasId])

    // Idle the animation while the cloud is scrolled out of view.
    useEffect(() => {
        const container = containerRef.current

        if (!renderedIcons || !container) return

        const observer = new IntersectionObserver(
            (entries) => {
                const isVisible = entries.some((entry) => entry.isIntersecting)

                try {
                    if (isVisible) window.TagCanvas?.Resume(canvasId)
                    else window.TagCanvas?.Pause(canvasId)
                } catch {
                    // Canvas never started; nothing to toggle.
                }
            },
            { threshold: 0.1 },
        )

        observer.observe(container)

        return () => observer.disconnect()
    }, [renderedIcons, canvasId])

    // The marks are fetched from a CDN, so hold the layout until they land.
    if (!renderedIcons) {
        return <div className="size-full" aria-hidden="true" />
    }

    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingTop: 40,
            }}
        >
            <canvas
                id={canvasId}
                width={1000}
                height={1000}
                // The library defaults this to min(container, 70vh); lifting the
                // ceiling lets a tall viewport be what limits the cloud.
                style={{ width: "100%", maxWidth: "75vh" }}
            >
                {renderedIcons}
            </canvas>
        </div>
    )
}
