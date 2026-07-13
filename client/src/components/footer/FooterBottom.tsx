import { memo } from "react"
import { motion } from "motion/react"

import { currentYear, diagonalStripeStyle } from "./footerData"
import { fadeUp } from "./footerMotion"

type FooterBottomProps = {
    isInView: boolean
}

function FooterBottom({ isInView }: FooterBottomProps) {
    return (
        <motion.div
            variants={fadeUp}
            custom={8}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto max-w-[calc(100%-48px)] border-x border-b border-dashed border-white/10 text-sm text-white/45 md:max-w-[calc(100%-80px)] md:grid-cols-[40px_1fr_40px]"
        >
            <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
                <p>© {currentYear} <span className="font-bold">Kalyan Manna</span>. All rights reserved</p>

                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a href="/privacy" className="transition-colors hover:text-white">
                        Privacy Policy
                    </a>

                    <a href="/terms" className="transition-colors hover:text-white">
                        Terms of Use
                    </a>

                    <a href="/sitemap.xml" className="transition-colors hover:text-white">
                        Sitemap
                    </a>
                </div>
            </div>

            <div
                className="col-span-3 h-8 border-t border-dashed border-white/10 md:h-10"
                style={diagonalStripeStyle}
            />
        </motion.div>
    )
}

export default memo(FooterBottom)