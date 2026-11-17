import { Suspense } from "react"

import EdgeStripes from "../shared/EdgeStripes"
import SilkBackground from "../shared/SilkBackground"
import ContactLetter from "./ContactLetter"
import { siteConfig } from "@/config"

/**
 * /contact — the letter. The heading ships as static HTML; the letter itself
 * reads ?book-call and today's date, so it renders on the client.
 */
export default function ContactPage() {
    return (
        <main className="relative min-h-screen overflow-clip bg-black px-4 pb-16 pt-24 text-white">
            <SilkBackground />

            <EdgeStripes />

            <section className="relative z-10 mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Get in touch</p>

                    <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                        Tell me{" "}
                        <span className="bg-linear-to-r from-fuchsia-500 via-pink-500 to-orange-400 bg-clip-text pr-2 italic text-transparent">
                            what you&apos;re building
                        </span>
                    </h1>

                    <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                        I reply within 48 hours, and I read every message.
                    </p>

                    <p className="mt-1.5 text-sm text-zinc-500">
                        You can also email{" "}
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="font-medium text-white underline decoration-dotted underline-offset-4 hover:decoration-solid"
                        >
                            {siteConfig.email}
                        </a>
                        .
                    </p>
                </div>

                <Suspense fallback={<div className="min-h-180" />}>
                    <ContactLetter />
                </Suspense>
            </section>
        </main>
    )
}
