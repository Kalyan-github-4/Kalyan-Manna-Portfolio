import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/Links"

export const metadata: Metadata = {
  title: "Links",
  description: "Every way to reach Kalyan Manna in one place — social profiles, project links, booking, and email.",
  alternates: { canonical: "/more/links" },
  openGraph: {
    title: "Links | Kalyan Manna",
    description: "Every way to reach Kalyan Manna in one place — social profiles, project links, booking, and email.",
    url: "/more/links",
    images: [siteConfig.shareImage],
  },
}
