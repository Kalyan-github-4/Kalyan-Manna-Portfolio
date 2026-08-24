import {
  FileText,
  Copyright,
  Warning,
  ArrowUpRight,
} from "@phosphor-icons/react"
import EdgeStripes from "../shared/EdgeStripes"

const Section = ({
  number,
  title,
  subtitle,
  children,
}: {
  number: string
  title: string
  subtitle: string
  children: React.ReactNode
}) => (
  <section className="grid border-t border-white/10 lg:grid-cols-[380px_1fr]">
    <div className="border-r border-white/10 px-6 py-12 lg:px-7 lg:py-16">
      <span className="text-xs font-semibold tracking-widest text-zinc-600">
        {number}
      </span>

      <h2 className="mt-5 font-serif text-3xl leading-tight text-white">
        {title}
      </h2>

      <p className="mt-2 font-serif text-2xl leading-tight text-zinc-600">
        {subtitle}
      </p>
    </div>

    <div className="px-6 py-12 lg:px-12 lg:py-16">
      {children}
    </div>
  </section>
)

export default function Terms() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      <EdgeStripes />

      <div className="pointer-events-none fixed inset-0 opacity-[0.025] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
      />

      <div className="relative z-10 mx-auto max-w-[1530px] px-5">
        {/* Hero */}
        <header className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-x border-white/10 px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_55%)]" />

          <div className="relative">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
              Legal
            </p>

            <h1 className="font-serif text-6xl leading-none tracking-tight sm:text-7xl md:text-8xl">
              Terms{" "}
              <span className="font-serif italic text-pink-500">
                of Use
              </span>
            </h1>

            <p className="mt-7 text-sm text-zinc-600">
              Last updated · August 15, 2026
            </p>
          </div>
        </header>

        <div className="border-x border-white/10">
          {/* 01 */}
          <Section
            number="01"
            title="Use."
            subtitle="Keep It Respectful"
          >
            <p className="max-w-4xl text-base leading-8 text-zinc-300">
              By accessing this website, you agree to use it responsibly and
              only for lawful purposes. You must not attempt to disrupt,
              exploit, or gain unauthorized access to the website or its
              services.
            </p>
          </Section>

          {/* 02 */}
          <Section
            number="02"
            title="Content."
            subtitle="What You See Here"
          >
            <div className="rounded-2xl border border-white/10 bg-white/2 p-7">
              <FileText
                size={23}
                weight="regular"
                className="mb-5 text-zinc-300"
              />

              <h3 className="text-lg font-semibold text-white">
                Website Content
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Projects, designs, writing, graphics, and other original
                materials displayed on this website belong to Kalyan Manna
                unless otherwise stated.
              </p>
            </div>
          </Section>

          {/* 03 */}
          <Section
            number="03"
            title="Ownership."
            subtitle="Respect Original Work"
          >
            <div className="rounded-2xl border border-white/10 bg-white/2 p-7">
              <Copyright
                size={23}
                weight="regular"
                className="mb-5 text-zinc-300"
              />

              <h3 className="text-lg font-semibold text-white">
                Intellectual Property
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                You may view and reference the work presented here, but you may
                not reproduce, redistribute, or commercially use original
                content without permission.
              </p>
            </div>
          </Section>

          {/* 04 */}
          <Section
            number="04"
            title="External."
            subtitle="Third-Party Services"
          >
            <p className="text-base leading-8 text-zinc-300">
              This website may contain links to third-party websites and
              services. Those services operate independently and are governed
              by their own terms and privacy policies.
            </p>
          </Section>

          {/* 05 */}
          <Section
            number="05"
            title="Disclaimer."
            subtitle="Provided As Is"
          >
            <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/2 p-7">
              <Warning
                size={24}
                weight="regular"
                className="mt-1 shrink-0 text-zinc-300"
              />

              <p className="text-sm leading-7 text-zinc-400">
                This website is provided on an "as is" basis. I do not
                guarantee that the website will always be available, completely
                accurate, or free from errors.
              </p>
            </div>
          </Section>

          {/* 06 */}
          <Section
            number="06"
            title="Questions."
            subtitle="Get in Touch"
          >
            <p className="max-w-2xl text-base leading-8 text-zinc-300">
              If you have any questions about these Terms of Use, please reach
              out through the contact page.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-pink-400"
            >
              Contact Me
              <ArrowUpRight size={15} weight="regular" />
            </a>
          </Section>
        </div>

        {/* Footer */}
        <footer className="border-x border-t border-white/10 px-6 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} Kalyan Manna
          </p>
        </footer>
      </div>
    </main>
  )
}