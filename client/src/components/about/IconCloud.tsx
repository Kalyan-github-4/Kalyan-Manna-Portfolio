import { useEffect, useMemo, useState } from "react"
import {
    Cloud,
    fetchSimpleIcons,
    renderSimpleIcon,
    type ICloud,
    type SimpleIcon,
} from "react-icon-cloud"

import { useTheme } from "@/components/ui/theme-provider"

const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    // The canvas defaults to min(container, 70vh); this lifts the ceiling so a
    // tall viewport is what limits the cloud, not the library.
    canvasProps: {
        style: {
            width: "100%",
            maxWidth: "75vh",
        },
    },
    options: {
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
    },
}

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
    const minContrastRatio = theme === "dark" ? 2 : 1.2

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 45,
        aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (event: React.MouseEvent) => event.preventDefault(),
        },
    })
}

export type DynamicCloudProps = {
    iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

const DARK_QUERY = "(prefers-color-scheme: dark)"

/**
 * The provider stores "system" as-is, so resolve it here — the icons need a
 * concrete background to compute their contrast against.
 */
function useResolvedTheme(): "dark" | "light" {
    const { theme } = useTheme()
    const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() =>
        window.matchMedia(DARK_QUERY).matches ? "dark" : "light",
    )

    useEffect(() => {
        if (theme !== "system") return

        const media = window.matchMedia(DARK_QUERY)
        const sync = () => setSystemTheme(media.matches ? "dark" : "light")

        sync()
        media.addEventListener("change", sync)

        return () => media.removeEventListener("change", sync)
    }, [theme])

    return theme === "system" ? systemTheme : theme
}

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null)
    const resolvedTheme = useResolvedTheme()

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

        return Object.values(data.simpleIcons).map((icon) =>
            renderCustomIcon(icon, resolvedTheme),
        )
    }, [data, resolvedTheme])

    // The marks are fetched from a CDN, so hold the layout until they land.
    if (!renderedIcons) {
        return <div className="size-full" aria-hidden="true" />
    }

    return (
        <Cloud {...cloudProps}>
            <>{renderedIcons}</>
        </Cloud>
    )
}
