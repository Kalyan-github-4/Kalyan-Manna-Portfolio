"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getCalApi } from "@calcom/embed-react"

import ContactHeader from "./ContactHeader"
import ContactTabs from "./ContactTabs"
import ContactPanel from "./ContactPanel"
import EdgeStripes from "../shared/EdgeStripes"
import type { ContactTab } from "./contactTypes"

/**
 * The half of the page that depends on ?book-call.
 *
 * Split out because useSearchParams() opts its subtree out of prerendering —
 * everything inside this component is a client-side render. Keeping it to the
 * tabs and the panel means the heading above still ships in the HTML.
 */
function ContactTabsPanel() {
    // Read through the router rather than window.location: a "use client"
    // component is still prerendered on the server, where the lazy useState
    // initialiser that used to live here ran without a `window`.
    const searchParams = useSearchParams()

    const [activeTab, setActiveTab] = useState<ContactTab>(
        searchParams.has("book-call") ? "book-call" : "message",
    )

    useEffect(() => {
        ;(async function () {
            const cal = await getCalApi()

            cal("ui", {
                theme: "dark",
                hideEventTypeDetails: false,
                layout: "month_view",
            })
        })()
    }, [])

    return (
        <>
            <ContactTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <ContactPanel activeTab={activeTab} />
        </>
    )
}

export default function Contact() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#08080a] px-4 py-28 text-white">
            <EdgeStripes />

            <section className="relative z-10 mx-auto max-w-6xl">
                <ContactHeader />

                {/* Reserves the panel's height so the heading does not jump
                    when the client-rendered half arrives. */}
                <Suspense fallback={<div className="min-h-150" />}>
                    <ContactTabsPanel />
                </Suspense>
            </section>
        </main>
    )
}
