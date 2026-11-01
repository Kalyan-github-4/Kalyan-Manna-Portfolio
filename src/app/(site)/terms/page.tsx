import type { Metadata } from "next"

export { default } from "@/views/Terms"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using kalyanmanna.com, including who owns what and how the guestbook works.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | Kalyan Manna",
    description: "The terms for using kalyanmanna.com, including who owns what and how the guestbook works.",
    url: "/terms",
  },
}
