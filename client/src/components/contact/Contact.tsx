export default function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Get in touch</p>
        <h2 className="mb-8 text-5xl italic font-light leading-tight md:text-7xl">
          Let&apos;s build <br /> something <span className="not-italic font-bold text-primary">great</span>.
        </h2>
        <p className="mb-12 max-w-xl text-lg text-foreground-muted">
          Whether you have a specific project in mind or just want to say hi, my inbox is always open. I&apos;m currently available for freelance and full-time roles.
        </p>
        <a className="group relative overflow-hidden rounded-full border border-primary/40 bg-background px-10 py-5 text-xl text-primary transition-colors duration-500 hover:text-primary-foreground" href="mailto:hello@kalyan.dev">
          <span className="relative z-10 inline-flex items-center gap-3">
            Send a Message
            <span aria-hidden>→</span>
          </span>
          <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-out group-hover:translate-y-0" />
        </a>
        <div className="mt-20 grid grid-cols-1 gap-12 text-foreground-muted md:grid-cols-2">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-[10px] uppercase tracking-[0.35em]">Email me</span>
            <a className="underline decoration-primary/20 underline-offset-4 transition-colors hover:text-primary" href="mailto:contact@kalyanmanna.dev">
              contact@kalyanmanna.dev
            </a>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-[10px] uppercase tracking-[0.35em]">Based in</span>
            <span>Durgapur, WB, India</span>
          </div>
        </div>
      </div>
    </section>
  )
}