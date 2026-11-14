type DeviceNavigator = Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
}

let cached: boolean | null = null

/**
 * True on devices where continuous canvas/shader animation costs more than it
 * is worth: touch-first devices (phones, tablets), machines with 4 or fewer
 * CPU threads or 4GB or less of memory, and anyone with Data Saver on.
 * Browser only — returns false during server rendering.
 */
export function isLowPowerDevice(): boolean {
    if (typeof window === "undefined") return false
    if (cached !== null) return cached

    const nav = navigator as DeviceNavigator
    cached =
        nav.connection?.saveData === true ||
        (nav.hardwareConcurrency ?? 8) <= 4 ||
        (nav.deviceMemory ?? 8) <= 4 ||
        window.matchMedia("(hover: none), (pointer: coarse)").matches

    return cached
}
