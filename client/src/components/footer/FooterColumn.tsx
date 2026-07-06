import { memo } from "react"
import { motion } from "motion/react"

import { linkItem } from "./footerMotion"

type FooterColumnProps = {
    title: string
    links: {
        label: string
        href: string
    }[]
    isInView: boolean
    delay?: number
}

function FooterColumn({ title, links, isInView, delay = 0 }: FooterColumnProps) {
    return (
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: delay,
                    },
                },
            }}
        >
            <motion.p
                variants={linkItem}
                className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-white/35"
            >
                {title}
            </motion.p>

            <ul className="space-y-5">
                {links.map((link) => (
                    <motion.li key={link.href} variants={linkItem}>
                        <motion.a
                            href={link.href}
                            whileHover={{ x: 4 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeOut",
                            }}
                            className="group relative inline-block text-base font-medium text-white/85 transition-colors hover:text-white"
                        >
                            {link.label}

                            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </motion.a>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    )
}

export default memo(FooterColumn)