import type { Metadata } from "next"

export { default } from "@/views/Links"

export const metadata: Metadata = {
  title: "Links",
  description: "Every way to reach Kalyan Manna in one place — social profiles, project links, booking, and email.",
  alternates: { canonical: "/more/links" },
  openGraph: {
    title: "Links | Kalyan Manna",
    description: "Every way to reach Kalyan Manna in one place — social profiles, project links, booking, and email.",
    url: "/more/links",
  },
}
