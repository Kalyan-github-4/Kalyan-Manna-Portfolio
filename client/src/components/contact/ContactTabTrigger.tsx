import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { TabsTrigger } from "@/components/ui/tabs"
import type { ContactTab } from "./contactTypes"

interface ContactTabTriggerProps {
    value: ContactTab
    active: boolean
    icon: ReactNode
    label: string
}

export default function ContactTabTrigger({
    value,
    active,
    icon,
    label,
}: ContactTabTriggerProps) {
    return (
        <TabsTrigger
            value={value}
            className="relative h-9 flex-1 overflow-hidden rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 shadow-none transition-colors duration-300 hover:text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
        >
            {active && (
                <motion.span
                    layoutId="contact-tab-overlay"
                    className="absolute inset-0 z-0 rounded-xl border border-white/10 bg-white/10 shadow-inner shadow-white/10"
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                        mass: 0.8,
                    }}
                />
            )}

            <span className="relative z-10 inline-flex items-center justify-center gap-2">
                <motion.span
                    animate={{
                        scale: active ? 1.08 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 24,
                    }}
                    className="inline-flex"
                >
                    {icon}
                </motion.span>

                <motion.span
                    animate={{
                        color: active ? "#ffffff" : "#a1a1aa",
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    {label}
                </motion.span>
            </span>
        </TabsTrigger>
    )
}