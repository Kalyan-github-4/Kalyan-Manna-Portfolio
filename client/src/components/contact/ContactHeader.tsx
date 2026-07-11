import { useRef } from "react"
import { motion, useInView } from "framer-motion"

import GradientText from "../shared/GradientText"
import { fadeUp } from "./contactMotion"

export default function ContactHeader() {
    const contentRef = useRef(null)

    const isInView = useInView(contentRef, {
        amount: 0.3,
        once: true,
    })

    return (
        <div
            ref={contentRef}
            className="relative z-10 mx-auto w-full max-w-3xl text-center"
        >
            <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500 sm:text-xs sm:tracking-[0.35em]"
            >
                Contact
            </motion.p>

            <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="font-display text-4xl font-medium leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
            >
                <span className="bg-linear-to-b from-zinc-400 via-zinc-200 to-white bg-clip-text text-transparent text-shadow-subtle">
                    Project, role, or{" "}
                </span>

                <GradientText
                    className="inline leading-[0.95]"
                    colors={["#1E40AF", "#9333EA", "#DB2777"]}
                    animationSpeed={6}
                >
                    just a hey?
                </GradientText>
            </motion.h1>

            <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base"
            >
                Book a quick call, send a project inquiry, or reach out directly.
                I usually reply within a day.
            </motion.p>
        </div>
    )
}