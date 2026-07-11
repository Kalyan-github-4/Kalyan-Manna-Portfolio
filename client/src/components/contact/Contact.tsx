import { useEffect, useState } from "react"
import { getCalApi } from "@calcom/embed-react"

import ContactHeader from "./ContactHeader"
import ContactTabs from "./ContactTabs"
import ContactPanel from "./ContactPanel"
import type { ContactTab } from "./contactTypes"

export default function Contact() {
    const [activeTab, setActiveTab] = useState<ContactTab>(() => {
        const searchParams = new URLSearchParams(window.location.search)

        return searchParams.has("book-call") ? "book-call" : "message"
    })

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
        <main className="min-h-screen overflow-hidden bg-[#08080a] px-4 py-28 text-white">
            <section className="mx-auto max-w-6xl">
                <ContactHeader />

                <ContactTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <ContactPanel activeTab={activeTab} />
            </section>
        </main>
    )
}