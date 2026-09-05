import type { Metadata } from "next"

export { default } from "@/views/Vault"

export const metadata: Metadata = {
  title: "Vault",
  description: "A photo vault of hackathons, meetups, and milestones — the moments behind the work, collected as browsable photo sets.",
  alternates: { canonical: "/vault" },
  openGraph: {
    title: "Vault | Kalyan Manna",
    description: "A photo vault of hackathons, meetups, and milestones — the moments behind the work, collected as browsable photo sets.",
    url: "/vault",
  },
}
