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
        amount: 0.18,
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
                className="mx-auto max-w-[calc(100%-24px)] border-x border-dashed border-white/10 px-4 py-5 sm:max-w-[calc(100%-40px)] sm:px-6 md:max-w-[calc(100%-64px)] lg:max-w-[calc(100%-80px)]"
            >
                <p className="font-mono text-xs text-white/20 sm:text-sm">{"{/}"}</p>
            </motion.div>

            <motion.div
                variants={fadeUp}
                custom={5}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto grid max-w-[calc(100%-24px)] overflow-hidden border border-dashed border-white/10 sm:max-w-[calc(100%-40px)] md:max-w-[calc(100%-64px)] lg:max-w-[calc(100%-80px)] lg:grid-cols-[1.05fr_1.45fr] xl:grid-cols-[1.15fr_1.4fr]"
            >
                <FooterBrand isInView={isInView} />

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 p-6 sm:gap-x-10 sm:p-8 md:gap-x-12 lg:grid-cols-3 lg:p-10">
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