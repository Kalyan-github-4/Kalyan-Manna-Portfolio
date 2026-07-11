import {
    CalendarBlank,
    ChatText,
    EnvelopeSimple,
    GithubLogo,
    LinkedinLogo,
    XLogo,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SocialIcon from "./SocialIcon"
import type { ContactTab } from "./contactTypes"

interface ContactTabsProps {
    activeTab: ContactTab
    onTabChange: (tab: ContactTab) => void
}

export default function ContactTabs({
    activeTab,
    onTabChange,
}: ContactTabsProps) {
    const activeIndex = activeTab === "book-call" ? 0 : 1

    return (
        <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3">
            <Tabs
                value={activeTab}
                onValueChange={(value) => onTabChange(value as ContactTab)}
                className="w-full max-w-xl"
            >
                <TabsList className="relative grid h-auto w-full grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-1">
                    <motion.div
                        className="absolute bottom-1 top-1 z-0 rounded-xl border border-white/10 bg-white/10 shadow-inner shadow-white/10"
                        initial={false}
                        animate={{
                            x: `${activeIndex * 100}%`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                            mass: 0.8,
                        }}
                        style={{
                            left: "0.25rem",
                            width: "calc((100% - 0.75rem) / 2)",
                        }}
                    />

                    <ContactTabTrigger
                        value="book-call"
                        active={activeTab === "book-call"}
                        icon={<CalendarBlank size={16} />}
                        label="Book a Call"
                    />

                    <ContactTabTrigger
                        value="message"
                        active={activeTab === "message"}
                        icon={<ChatText size={16} />}
                        label="Send Message"
                    />
                </TabsList>
            </Tabs>

            <div className="hidden shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/4] p-2 sm:flex">
                <SocialIcon href="mailto:kalyanmanna439@gmail.com">
                    <EnvelopeSimple size={15} />
                </SocialIcon>

                <SocialIcon href="https://www.linkedin.com/">
                    <LinkedinLogo size={15} />
                </SocialIcon>

                <SocialIcon href="https://github.com/Kalyan-github-4">
                    <GithubLogo size={15} />
                </SocialIcon>

                <SocialIcon href="https://x.com/">
                    <XLogo size={15} />
                </SocialIcon>
            </div>
        </div>
    )
}

interface ContactTabTriggerProps {
    value: ContactTab
    active: boolean
    icon: React.ReactNode
    label: string
}

function ContactTabTrigger({
    value,
    active,
    icon,
    label,
}: ContactTabTriggerProps) {
    return (
        <TabsTrigger
            value={value}
            className="relative z-10 inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 shadow-none transition-colors duration-300 hover:text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
        >
            <span className="inline-flex items-center gap-2">
                <motion.span
                    animate={{
                        scale: active ? 1.08 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    }}
                    className="inline-flex"
                >
                    {icon}
                </motion.span>

                <motion.span
                    animate={{
                        color: active ? "#ffffff" : "#a1a1aa",
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                </motion.span>
            </span>
        </TabsTrigger>
    )
}