import { AboutImage } from "@/home/about/AboutImage"
import { Timeline } from "@/home/about/Timeline"

export default function About() {
  return (
    <section id="about" className="bg-background-secondary py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <AboutImage />
        </div>
        <div className="space-y-6 lg:col-span-7">
          <h2 className="text-4xl font-medium md:text-5xl">
            Engineering digital <span className="text-primary">solutions</span>.
          </h2>
          <p className="text-lg text-foreground-muted">
            I started building websites at 17, driven by curiosity about how the internet actually functions. Today, I specialize in building robust full-stack applications that prioritize user experience and performance above all else.
          </p>
          <p className="text-lg text-foreground-muted">
            My approach is clinical but creative: I believe every line of code should serve a purpose, and every interface should feel intuitive. When I&apos;m not coding, you can find me exploring new tech stacks or contributing to open-source projects.
          </p>
          <Timeline />
        </div>
      </div>
    </section>
  )
}