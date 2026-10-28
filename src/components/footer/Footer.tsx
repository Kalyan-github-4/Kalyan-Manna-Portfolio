"use client"

import { memo, useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

import FooterCTA from "./FooterCTA"
import FooterBrand from "./FooterBrand"
import FooterColumn from "./FooterColumn"
import FooterBottom from "./FooterBottom"
import FooterGiantName from "./FooterGiantName"

import { fadeUp } from "./footerMotion"
import { generalLinks, moreLinks, specificLinks } from "./footerData"

/**
 * Curtain reveal: the CTA scrolls up like a cover, uncovering the rest of the
 * footer, which sits pinned to the bottom of the viewport. The wrapper keeps
 * the pinned layer's height in the flow and its clip-path limits the layer to
 * that box, so it only shows where the wrapper has scrolled into view.
 *
 * The pinned layer must fit on screen, or its top would be cut off — when it
 * doesn't (phones, short laptops) the footer simply scrolls normally.
 */
function Footer() {
    const footerRef = useRef<HTMLElement | null>(null)
    const revealRef = useRef<HTMLDivElement | null>(null)
    const layerRef = useRef<HTMLDivElement | null>(null)

    // Height of the pinned layer when the reveal is on; null scrolls normally.
    const [revealHeight, setRevealHeight] = useState<number | null>(null)

    const isInView = useInView(footerRef, {
        amount: 0.18,
        once: true,
    })

    useEffect(() => {
        const layer = layerRef.current
        if (!layer) return

        const measure = () => {
            const height = layer.offsetHeight
            setRevealHeight(height <= window.innerHeight ? height : null)
        }

        // Fires once on observe, then on every content resize.
        const observer = new ResizeObserver(measure)
        observer.observe(layer)
        window.addEventListener("resize", measure)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", measure)
        }
    }, [])

    return (
        <footer
            ref={footerRef}
            className="relative w-full overflow-hidden border-t border-white/10 bg-[#08080a] text-white"
        >
            {/* The cover — opaque, so nothing pinned shows through it. */}
            <div className="relative z-10 bg-[#08080a]">
                <FooterCTA isInView={isInView} />
            </div>

            <div
                ref={revealRef}
                className="relative"
                style={
                    revealHeight === null
                        ? undefined
                        : { height: revealHeight, clipPath: "inset(0)" }
                }
            >
                <div
                    ref={layerRef}
                    className="bg-[#08080a]"
                    style={
                        revealHeight === null
                            ? undefined
                            : { position: "fixed", left: 0, right: 0, bottom: 0 }
                    }
                >
                    <motion.div
                        variants={fadeUp}
                        custom={4}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="mx-auto max-w-[calc(100%-24px)] border-x border-dashed border-white/10 px-4 py-5 sm:max-w-[calc(100%-40px)] sm:px-6 md:max-w-[calc(100%-64px)] lg:max-w-[calc(100%-80px)]"
                    >
                        <p className="font-mono text-xs text-white/60 sm:text-sm">{"{/}"}</p>
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

                    <FooterGiantName targetRef={revealRef} />
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)
