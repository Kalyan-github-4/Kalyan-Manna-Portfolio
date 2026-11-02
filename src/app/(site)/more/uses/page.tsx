import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/Uses"

export const metadata: Metadata = {
  title: "Uses",
  description: "A peek into the digital setup — the editor, hardware, and everyday tools Kalyan Manna builds with.",
  alternates: { canonical: "/more/uses" },
  openGraph: {
    title: "Uses | Kalyan Manna",
    description: "A peek into the digital setup — the editor, hardware, and everyday tools Kalyan Manna builds with.",
    url: "/more/uses",
    images: [siteConfig.shareImage],
  },
}
