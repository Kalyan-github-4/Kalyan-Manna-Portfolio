"use client"

import Link from "next/link"
import { Code, Handshake, NotePencil, ShieldCheck } from "@phosphor-icons/react"

import { siteConfig } from "@/config"
import LegalPage, { LegalProse, type LegalSummary } from "@/components/legal/LegalPage"
import GradientText, { HEADING_GRADIENT } from "@/components/shared/GradientText"
import Section, { Strong } from "@/components/shared/SplitSection"

const summary: LegalSummary[] = [
    {
        icon: Handshake,
        title: "Using it is agreeing",
        text: "Browsing the site means you accept these terms.",
    },
    {
        icon: Code,
        title: "Learn, don't clone",
        text: "Take inspiration freely, but don't copy my work without asking.",
    },
    {
        icon: NotePencil,
        title: "Be kind on the wall",
        text: "Guestbook notes are public. Spam and abuse get removed.",
    },
    {
        icon: ShieldCheck,
        title: "Provided as is",
        text: "I do my best, but there are no guarantees.",
    },
]

export default function Terms() {
    return (
        <LegalPage
            heading={
                <>
                    <GradientText
                        className="inline-block overflow-visible pb-2 italic"
                        colors={HEADING_GRADIENT}
                        animationSpeed={6}
                    >
                        Terms
                    </GradientText>{" "}
                    of Use
                </>
            }
            lastUpdated="Nov 1, 2026"
            summary={summary}
        >
            <Section title={<>The <Strong>agreement</Strong>,<br />in brief.</>}>
                <LegalProse>
                    <p>
                        This site belongs to <strong>{siteConfig.name}</strong>. By using
                        it, you agree to these terms and to the{" "}
                        <Link href="/privacy">privacy policy</Link>. If you don&apos;t
                        agree, please don&apos;t use the site.
                    </p>
                    <p>
                        Use it responsibly and only for lawful purposes. Don&apos;t try to
                        disrupt it, exploit it or gain unauthorized access to it or its
                        services.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Who <Strong>owns</Strong><br />what.</>}>
                <LegalProse>
                    <p>
                        The projects, designs, writing, photos and other original material
                        here belong to me unless stated otherwise. You&apos;re welcome to
                        view them, reference them and take inspiration, but don&apos;t
                        reproduce, redistribute or commercially use them without my
                        permission.
                    </p>
                    <p>
                        Third-party libraries, fonts, logos and images belong to their
                        owners. The ones this site relies on are credited on the{" "}
                        <Link href="/more/attribution">attribution page</Link>.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>The <Strong>guestbook</Strong>,<br />and your words.</>}>
                <LegalProse>
                    <p>
                        What you post is yours, and it appears publicly with your name and
                        profile photo. By posting, you let me display it on this site.
                    </p>
                    <p>
                        Keep it respectful. Don&apos;t post spam, abuse, or anything
                        illegal or that isn&apos;t yours to share. I may remove any entry
                        at my discretion.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Links to<br /><Strong>elsewhere</Strong>.</>}>
                <LegalProse>
                    <p>
                        This site links to third-party websites and uses third-party
                        services such as Clerk and Cal.com. They operate independently
                        under their own terms and privacy policies, and I&apos;m not
                        responsible for them.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Provided<br /><Strong>as is</Strong>.</>}>
                <LegalProse>
                    <p>
                        This site is provided on an &quot;as is&quot; basis. I don&apos;t
                        guarantee it will always be available, completely accurate or free
                        from errors. To the extent the law allows, I&apos;m not liable for
                        losses that come from using it.
                    </p>
                </LegalProse>
            </Section>

            <Section title={<>Changes<br />and <Strong>questions</Strong>.</>}>
                <LegalProse>
                    <p>
                        If these terms change, I&apos;ll update them here and change the
                        date at the top. Questions are welcome through the{" "}
                        <Link href="/contact">contact page</Link>.
                    </p>
                </LegalProse>
            </Section>
        </LegalPage>
    )
}
