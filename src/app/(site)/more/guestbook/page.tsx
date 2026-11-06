import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/Guestbook"

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign the guestbook and leave a note on the wall — say hello before you go.",
  alternates: { canonical: "/more/guestbook" },
  openGraph: {
    title: "Guestbook | Kalyan Manna",
    description: "Sign the guestbook and leave a note on the wall — say hello before you go.",
    url: "/more/guestbook",
    images: [siteConfig.shareImage],
  },
}
