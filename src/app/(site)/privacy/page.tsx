import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/Privacy"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What this site collects, what it does not, and how any information you share through the contact form or guestbook is handled.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Kalyan Manna",
    description: "What this site collects, what it does not, and how any information you share through the contact form or guestbook is handled.",
    url: "/privacy",
    images: [siteConfig.shareImage],
  },
}
