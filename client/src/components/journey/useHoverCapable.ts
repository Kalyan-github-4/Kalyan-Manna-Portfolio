import { useEffect, useState } from "react"

/**
 * Returns true only on devices that have a precise, hover-capable pointer
 * (i.e. a mouse/trackpad). Used to gate the mouse-move tilt so touch devices
 * never pay for a pointer animation they can't use.
 */
export function useHoverCapable(): boolean {
    const [canHover, setCanHover] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return
        }

        const query = window.matchMedia("(hover: hover) and (pointer: fine)")

        const update = () => setCanHover(query.matches)
        update()

        query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
    }, [])

    return canHover
}
