export default function Footer() {
  return (
    <footer className="w-full border-t border-border/10 bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <p className="mb-2 text-lg font-semibold tracking-tight text-foreground md:text-2xl">Kalyan Manna</p>
          <p className="text-sm text-foreground-muted">© 2024 Built with React, TS & Tailwind</p>
        </div>
        <div className="flex items-center gap-8 text-sm text-secondary">
          <a className="transition-transform hover:scale-110 hover:opacity-100" href="#">Twitter</a>
          <a className="transition-transform hover:scale-110 hover:opacity-100" href="#">GitHub</a>
          <a className="transition-transform hover:scale-110 hover:opacity-100" href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}