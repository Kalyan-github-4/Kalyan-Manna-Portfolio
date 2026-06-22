import { ProjectCard } from "@/components/projects/ProjectCard"

const projects = [
  {
    title: "Nexus Analytics",
    tags: ["Next.js", "Supabase"],
    description:
      "A real-time data orchestration platform for marketing teams. Optimized for speed and ultra-low latency.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAa8br4Ke8HhAWvT0LV7QkobhEl7nY5wO-6rz69Pnm65nZLFrlSOD0KD7r9oZ8-VYEZFHJo6VGIGVp6_c2R41bo-dYCRF_k9wVGdxfaVqGDCSwnEWdyLF-_2IArdodemrNCa_JWzBSuzg2JI5FRUExhdUppO65E_D9mutuhdNE3Sdmt1kiOajIoR5PhFxpCPBHA114rTHVfixq1swoCBuvQhAalF2wPS1FOlQ3Scy1UBW0uWAxOxXwf0t_-4-ti7ag3OiffVocBL5x",
  },
  {
    title: "Velo Commerce",
    tags: ["React", "Stripe"],
    description:
      "High-end e-commerce solution with focus on micro-interactions and cinematic product presentation.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPki2x-KT53w9gHNtXHVqY4_JvdtFQLLzX7jO6h6WCRfEYPFs78QVkktV_T16xMBjicTkacBrfJ1B_3cqCQ21SduCLz-yz1i3mI0sMTukPbqzVS-jWWl2eiyGrTJoiVYPvG2pma51uT2gmtYCE2bkz_bSBzeduf15_NSO3KJ3xWOJlFdfz9Y4GwuzUfzr4ys87TkB7tLBBot_AxfIRmrIx0MAFWwghlNW7o3smLU6gEHKg1lP5Ss0p3Wa1jDhHxx18-WJGiKl_QivL",
  },
  {
    title: "DevLayer Docs",
    tags: ["TypeScript", "Tailwind"],
    description:
      "A documentation engine for technical products, featuring full-text search and dark-first aesthetics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMRX7sJoPeZqhXrtYAf-7DEn1joOCoGYUhSG-FeMRcFLphxp-6UbNvrKV_ZgMnT-RjZIiGQIS1Z6cLhL2pLrh2stS7ZWzFCAWvrOv1TLsV7iRgvsuKZM-e4PQgyzDIG0ggE6S2yEjJ5fEmiHnMKEVMM7kjf-GDB7b1ura_ZonGxqcsp-DFaA08vp3Bv-3bA-6r0vlfitGwwe_7so858i-dYc9DfT_8_Bk0mrp5Ndn1VI_lipw-z5CKolKxik609R5EcZmSJ7waL0oc",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-background-secondary py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Portfolio</p>
            <h2 className="text-4xl md:text-5xl">Things I&apos;ve Built <span className="text-foreground-muted/50">(and shipped)</span></h2>
          </div>
          <a className="inline-flex w-fit border-b border-primary/30 pb-1 text-primary transition-colors hover:border-primary" href="#">
            View Archive →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}