import { BlogCard } from "@/components/blog/BlogCard"

const posts = [
  {
    date: "2024-05-12",
    title: "Why I switched to a minimalist development stack.",
    description:
      "The philosophy of less is more when it comes to shipping production code.",
  },
  {
    date: "2024-03-28",
    title: "Mastering React Server Components in 2024.",
    description:
      "An in-depth look at performance gains and architectural shifts.",
  },
  {
    date: "2024-01-15",
    title: "The future of frontend: WebAssembly & Edge.",
    description:
      "Exploring the next frontier of high-speed web application delivery.",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Writing</p>
          <h2 className="mb-6 text-4xl md:text-5xl">Thoughts on <br />the web.</h2>
          <a className="inline-flex items-center gap-2 text-foreground-muted transition-colors hover:text-primary" href="#">
            Read all posts
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="space-y-0 lg:col-span-8">
          {posts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  )
}