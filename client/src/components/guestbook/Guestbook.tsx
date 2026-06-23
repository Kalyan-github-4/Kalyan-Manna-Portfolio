import { GuestbookCard } from "@/components/guestbook/GuestbookCard"
import { GuestbookForm } from "@/components/guestbook/GuestbookForm"

const guestbookEntries = [
  {
    name: "Alex Rivera",
    time: "2 days ago",
    message:
      "Your portfolio is incredible! Love the aesthetic and the fast loading times.",
    featured: true,
  },
  {
    name: "Sarah Chen",
    time: "1 week ago",
    message:
      "The attention to detail in your work is inspiring. Let's collab soon!",
    muted: true,
  },
  {
    name: "Mark Wilson",
    time: "2 weeks ago",
    message: "Checked out your projects, the dashboard is top-tier work.",
    faded: true,
  },
]

export default function Guestbook() {
  return (
    <section id="guestbook" className="bg-background-secondary py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Community</p>
          <h2 className="text-4xl md:text-5xl">Leave a Message</h2>
        </div>
        <GuestbookForm />
        <div className="space-y-4">
          {guestbookEntries.map((entry) => (
            <GuestbookCard key={entry.name} {...entry} />
          ))}
        </div>
      </div>
    </section>
  )
}