import { ArrowRight } from "@phosphor-icons/react"
import NeuralBackground from "./NeuralBackground"

const currentYear = new Date().getFullYear()

const diagonalStripeStyle = {
    backgroundImage:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)",
}

const generalLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
]

const specificLinks = [
    { label: "Guest Book", href: "/more/guestbook" },
    { label: "Bucket List", href: "/more/bucket-list" },
    { label: "Uses", href: "/more/uses" },
    { label: "Attribution", href: "/more/attribution" },
]

const moreLinks = [
    { label: "Book a call", href: "/contact" },
    { label: "Links", href: "/more/links" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
]

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#08080a] text-white">

            {/* Top animated CTA container */}

            <div className="mx-auto max-w-[calc(100%-48px)] px-0 pt-10 md:max-w-[calc(100%-80px)]">


                <div className="border border-dashed border-white/10 px-4 py-4 md:px-6 md:py-6">
                    {/* Inner gradient / neural container */}
                    <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-black md:min-h-[560px]">
                        <NeuralBackground
                            className="absolute inset-0"
                            color="#b4a0ff"
                            trailOpacity={0.12}
                            particleCount={700}
                            speed={0.8}
                        />

                        {/* Dark overlays for better text readability */}
                        {/* Purple GlowHorizon-style overlays */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(42,26,77,0.72)_0%,rgba(28,18,52,0.44)_28%,rgba(0,0,0,0)_72%)] opacity-90 blur-[70px]" />

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_48%,rgba(180,160,255,0.24)_0%,rgba(120,90,200,0.16)_22%,rgba(0,0,0,0)_58%)]" />

                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.22),rgba(0,0,0,0.88))]" />

                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28),transparent_34%,rgba(0,0,0,0.76))]" />

                        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center space-y-10 px-6 text-center">
                            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
                                Open to work
                            </p>

                            <h2 className="max-w-5xl text-balance font-sans text-3xl uppercase text-white md:text-5xl lg:text-6xl">
                                From concept to{" "}
                                <span>creation</span>
                                <br />
                                let&apos;s make it{" "}
                                <span>happen!</span>
                            </h2>

                            <button className="group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/10 py-1 pl-5 pr-1 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500">
                                {/* Animated Fill */}
                                <span className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:right-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />

                                {/* Text */}
                                <span className="relative z-10 text-sm transition-colors duration-500 group-hover:text-slate-900">
                                    Let&apos;s Connect
                                </span>

                                {/* Arrow */}
                                <span className="relative z-10 ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-500 group-hover:translate-x-1">
                                    <ArrowRight size={14} />
                                </span>
                            </button>

                            <div className="mt-12 max-w-2xl">
                                <p className="font-serif text-2xl font-semibold text-white md:text-3xl">
                                    I&apos;m available for full-time roles & freelance projects.
                                </p>
                                <p className="mt-5 text-[15px] leading-7 text-white/55 md:text-base">
                                    I craft modern web applications, polished interfaces, and
                                    seamless digital experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Small separator strip */}
            <div className="mx-auto max-w-[calc(100%-48px)] border-x border-dashed border-white/10 px-6 py-6 md:max-w-[calc(100%-80px)]">
                <p className="font-mono text-sm text-white/20">{"{/}"}</p>
            </div>

            {/* Main footer links */}
            <div className="mx-auto grid max-w-[calc(100%-48px)] border border-dashed border-white/10 md:max-w-[calc(100%-80px)] md:grid-cols-[1.15fr_1.4fr]">
                <div className="flex flex-col justify-between border-b border-dashed border-white/10 p-8 md:border-b-0 md:border-r md:p-10">
                    <div>
                        <img
                            src="/logo-white.png"
                            alt="Kalyan Manna logo"
                            className="h-12 w-auto object-contain"
                        />

                        <p className="mt-8 max-w-xs text-[15px] leading-6 text-zinc-400">
                            I&apos;m Kalyan — a full-stack developer, freelancer & problem
                            solver. Thanks for checking out my site!
                        </p>
                    </div>
                </div>

                <div className="grid gap-10 p-8 md:grid-cols-3 md:p-10">
                    <FooterColumn title="General" links={generalLinks} />
                    <FooterColumn title="Specifics" links={specificLinks} />
                    <FooterColumn title="More" links={moreLinks} />
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mx-auto  max-w-[calc(100%-48px)] border-x border-b border-dashed border-white/10 text-sm text-white/45 md:max-w-[calc(100%-80px)] md:grid-cols-[40px_1fr_40px]">

                {/* Bottom content */}
                <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
                    <p>© {currentYear} Kalyan Manna. All rights reserved</p>

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
            </div>
        </footer>
    )
}

function FooterColumn({
    title,
    links,
}: {
    title: string
    links: {
        label: string
        href: string
    }[]
}) {
    return (
        <div>
            <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-white/35">
                {title}
            </p>

            <ul className="space-y-5">
                {links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="group relative inline-block text-base text-white/85 transition-colors hover:text-white font-medium"
                        >
                            {link.label}

                            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}