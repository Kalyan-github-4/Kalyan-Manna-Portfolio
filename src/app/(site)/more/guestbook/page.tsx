import type { Metadata } from "next"

export { default } from "@/views/Guestbook"

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Let me know you were here. Sign the guestbook and leave a note on the wall.",
  alternates: { canonical: "/more/guestbook" },
  openGraph: {
    title: "Guestbook | Kalyan Manna",
    description: "Let me know you were here. Sign the guestbook and leave a note on the wall.",
    url: "/more/guestbook",
  },
}
