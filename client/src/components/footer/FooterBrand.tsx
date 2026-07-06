import { memo } from "react"
import { motion } from "motion/react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"

import { fadeUp } from "./footerMotion"
import { socialLinks } from "./footerData"

type FooterBrandProps = {
    isInView: boolean
}

function FooterBrand({ isInView }: FooterBrandProps) {
    return (
        <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-8 md:border-b-0 md:border-r md:p-10">
            <div>
                <motion.img
                    src="/logo-white.png"
                    alt="Kalyan Manna logo"
                    className="h-12 w-auto object-contain"
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                <motion.p
                    variants={fadeUp}
                    custom={6}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-8 max-w-xs text-[15px] leading-6 text-zinc-400"
                >
                    I&apos;m Kalyan — a full-stack developer, freelancer & problem
                    solver. Thanks for checking out my site!
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    custom={7}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <TooltipProvider>
                        <div className="mt-5 flex items-center justify-center gap-6 sm:mt-7 sm:gap-8 lg:justify-start">
                            {socialLinks.map(({ icon: Icon, href, label }, index) => (
                                <Tooltip key={label}>
                                    <TooltipTrigger asChild>
                                        <motion.a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 12, scale: 0.9 }}
                                            animate={
                                                isInView
                                                    ? { opacity: 1, y: 0, scale: 1 }
                                                    : { opacity: 0, y: 12, scale: 0.9 }
                                            }
                                            transition={{
                                                duration: 0.45,
                                                delay: 0.85 + index * 0.1,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                y: -2,
                                            }}
                                            whileTap={{
                                                scale: 0.95,
                                            }}
                                            className="text-zinc-500 transition-colors duration-300 hover:text-violet-300"
                                        >
                                            <Icon
                                                size={16}
                                                className="sm:h-5 sm:w-5"
                                                weight="duotone"
                                            />
                                        </motion.a>
                                    </TooltipTrigger>

                                    <TooltipContent side="top" sideOffset={10}>
                                        <p className="text-xs font-semibold text-zinc-700">
                                            {label}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </motion.div>
            </div>
        </div>
    )
}

export default memo(FooterBrand)