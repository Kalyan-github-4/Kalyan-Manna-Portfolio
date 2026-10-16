import type { Metadata } from "next"

export { default } from "@/components/contact/Contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project, book a call, or just say hello. Kalyan Manna is available for freelance web, app, and product work.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Kalyan Manna",
    description: "Start a project, book a call, or just say hello. Kalyan Manna is available for freelance web, app, and product work.",
    url: "/contact",
  },
}
