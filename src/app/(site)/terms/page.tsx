import type { Metadata } from "next"

export { default } from "@/views/UnderConstruction"

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for kalyanmanna.com. This page is still being written.",
  // Placeholder copy only — nothing worth indexing until it is written.
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms | Kalyan Manna",
    description: "Terms of use for kalyanmanna.com. This page is still being written.",
    url: "/terms",
  },
}
