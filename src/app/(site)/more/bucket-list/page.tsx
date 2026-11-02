import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export { default } from "@/views/BucketList"

export const metadata: Metadata = {
  title: "Bucket List",
  description: "Things I want to do, places I want to see, and versions of myself I want to become.",
  alternates: { canonical: "/more/bucket-list" },
  openGraph: {
    title: "Bucket List | Kalyan Manna",
    description: "Things I want to do, places I want to see, and versions of myself I want to become.",
    url: "/more/bucket-list",
    images: [siteConfig.shareImage],
  },
}
