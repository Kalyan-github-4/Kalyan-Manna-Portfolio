import { memo, useRef } from "react"
import { motion, useInView } from "motion/react"

import FooterCTA from "./FooterCTA"
import FooterBrand from "./FooterBrand"
import FooterColumn from "./FooterColumn"
import FooterBottom from "./FooterBottom"

import { fadeUp } from "./footerMotion"
import { generalLinks, moreLinks, specificLinks } from "./footerData"

function Footer() {
    const footerRef = useRef<HTMLElement | null>(null)

    const isInView = useInView(footerRef, {
        amount: 0.25,
        once: true,
    })

    return (
        <footer
            ref={footerRef}
            className="relative w-full overflow-hidden border-t border-white/10 bg-[#08080a] text-white"
        >
            <FooterCTA isInView={isInView} />

            <motion.div
                variants={fadeUp}
                custom={4}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto max-w-[calc(100%-48px)] border-x border-dashed border-white/10 px-6 py-6 md:max-w-[calc(100%-80px)]"
            >
                <p className="font-mono text-sm text-white/20">{"{/}"}</p>
            </motion.div>

            <motion.div
                variants={fadeUp}
                custom={5}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto grid max-w-[calc(100%-48px)] border border-dashed border-white/10 md:max-w-[calc(100%-80px)] md:grid-cols-[1.15fr_1.4fr]"
            >
                <FooterBrand isInView={isInView} />

                <div className="grid gap-10 p-8 md:grid-cols-3 md:p-10">
                    <FooterColumn
                        title="General"
                        links={generalLinks}
                        isInView={isInView}
                        delay={0.75}
                    />

                    <FooterColumn
                        title="Specifics"
                        links={specificLinks}
                        isInView={isInView}
                        delay={0.9}
                    />

                    <FooterColumn
                        title="More"
                        links={moreLinks}
                        isInView={isInView}
                        delay={1.05}
                    />
                </div>
            </motion.div>

            <FooterBottom isInView={isInView} />
        </footer>
    )
}

export default memo(Footer)