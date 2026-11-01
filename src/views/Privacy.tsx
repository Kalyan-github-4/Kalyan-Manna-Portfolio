"use client"

import Link from "next/link"
import { ChartBarHorizontal, Cookie, Prohibit, Trash } from "@phosphor-icons/react"

import { siteConfig } from "@/config"
import LegalPage, {
    LegalProse,
    LegalRows,
    type LegalSummary,
} from "@/components/legal/LegalPage"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import Section, { Strong } from "@/components/shared/SplitSection"

const summary: LegalSummary[] = [
    {
        icon: Prohibit,
        title: "No ads, no selling",
        text: "Nothing here is sold, rented or used for advertising.",
    },
    {
        icon: ChartBarHorizontal,
        title: "No analytics",
        text: "This site doesn't add analytics or tracking scripts of its own.",
    },
    {
        icon: Cookie,
        title: "Minimal cookies",
        text: "Only what sign-in and booking a call need.",
    },
    {
        icon: Trash,
        title: "Delete on request",
        text: "Remove your own note within 24 hours, or email me anytime.",
    },
]

export default function Privacy() {
    return (
        <LegalPage
            heading={
                <>
                    Privacy{" "}
                    <GradientText
                        className="inline-block overflow-visible pb-2 italic"
                        colors={HEADING_GRADIENT}
                        animationSpeed={6}
                    >
                        Policy
                    </GradientText>
                </>
            }
            lastUpdated="Nov 1, 2026"
            summary={summary}
        >
            <Section title={<>What I <Strong>collect</Strong>,<br />and <Strong>why</Strong>.</>}>
                <LegalProse>
                    <p>
                        Most of this site works without you giving me anything. I only
                        receive personal data when you choose to sign in, leave a note,
                        send a message or book a call.
                    </p>
                </LegalProse>

                <div className="mt-5">
                    <LegalRows
                        rows={[
                            {
                                label: "Sign in",
                                text: "Your name, email address and profile photo from Google or LinkedIn, so your note shows who wrote it.",
                            },
                            {
                                label: "Guestbook",
                                text: "Your message and when you posted it. It appears on the public wall with your name and photo.",
                            },
                            {
                                label: "Feedback",
                                text: "Your role, feedback and rating, shown with your name and photo.",
                            },
                            {
                                label: "Contact form",
                                text: "Your name, email address and message. It's sent to my inbox as an email and isn't saved in the site's database.",
                            },
                            {
                                label: "Booking a call",
                                text: "Whatever you enter in the Cal.com scheduler, which Cal.com handles.",
                            },
                        ]}
                    />
                </div>
            </Section>

            <Section title={<>Who else<br /><Strong>handles</Strong> it.</>}>
                <LegalProse>
                    <p>
                        I don&apos;t sell your data. These services help run the site and
                        process data on its behalf, each under its own privacy policy.
                    </p>
                </LegalProse>

                <div className="mt-5">
                    <LegalRows
                        rows={[
                            { label: "Clerk", text: "Sign-in and account sessions." },
                            { label: "Google, LinkedIn", text: "The accounts you can sign in with." },
                            { label: "Neon", text: "The database that stores guestbook and feedback entries." },
                            { label: "Vercel", text: "Hosts the site, and may process technical request data such as IP addresses." },
                            { label: "Cal.com", text: "The call scheduling on the contact page." },
                            { label: "Email provider", text: "Delivers contact form messages to my inbox." },
                        ]}
                    />
                </div>
            </Section>

            <Section title={<>Cookies<br />and <Strong>storage</Strong>.</>}>
                <LegalProse>
                    <p>
                        This site doesn&apos;t set advertising cookies. Clerk uses cookies
                        to keep you signed in, and the Cal.com scheduler may set its own
                        when you use it.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Your <Strong>choices</Strong>,<br />and how long.</>}>
                <LegalProse>
                    <p>
                        You can delete your own guestbook note from the wall within 24
                        hours of posting it. After that, or to remove your feedback and
                        account details, email me at{" "}
                        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and
                        I&apos;ll take care of it.
                    </p>
                    <p>
                        Entries stay until they&apos;re deleted. Contact messages stay in
                        my inbox for as long as I need them to reply and keep in touch,
                        and you can ask me to delete those too.
                    </p>
                    <p>
                        You can also ask what I hold about you, or ask me to correct it.
                        This site isn&apos;t aimed at children.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Changes<br />and <Strong>questions</Strong>.</>}>
                <LegalProse>
                    <p>
                        If this policy changes, I&apos;ll update it here and change the
                        date at the top. For anything else, see the{" "}
                        <Link href="/terms">terms of use</Link> or{" "}
                        <Link href="/contact">get in touch</Link>.
                    </p>
                </LegalProse>
            </Section>
        </LegalPage>
    )
}
