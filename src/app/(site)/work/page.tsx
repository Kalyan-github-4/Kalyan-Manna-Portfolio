import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/Work"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies — web apps, mobile apps, and digital products built with React, TypeScript, Node.js, PostgreSQL, and Expo.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Kalyan Manna",
    description: "Selected projects and case studies — web apps, mobile apps, and digital products built with React, TypeScript, Node.js, PostgreSQL, and Expo.",
    url: "/work",
    images: [siteConfig.shareImage],
  },
}
