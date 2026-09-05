import type { Metadata } from "next"

export { default } from "@/components/privacy/privacy"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What this site collects, what it does not, and how any information you share through the contact form or guestbook is handled.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Kalyan Manna",
    description: "What this site collects, what it does not, and how any information you share through the contact form or guestbook is handled.",
    url: "/privacy",
  },
}
