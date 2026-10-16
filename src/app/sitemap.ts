import type { MetadataRoute } from "next"

import { journeyItems } from "@/data/journeyData"

const SITE_URL = "https://www.kalyanmanna.com"

/**
 * Replaces the hand-written public/sitemap.xml, which had drifted: it was
 * missing /privacy, /robot, and every /vault/<slug> collection.
 *
 * Deliberately absent: the Clerk auth routes and /terms, which are all
 * noindex — a sitemap should not advertise pages we ask crawlers to skip.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // `as const` keeps changeFrequency as its literal union rather than widening
  // to string, which MetadataRoute.Sitemap rejects.
  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: "/", changeFrequency: "monthly", priority: 1 },
    { url: "/about", changeFrequency: "monthly", priority: 0.9 },
    { url: "/work", changeFrequency: "monthly", priority: 0.9 },
    { url: "/vault", changeFrequency: "monthly", priority: 0.8 },
    { url: "/contact", changeFrequency: "yearly", priority: 0.8 },
    { url: "/robot", changeFrequency: "yearly", priority: 0.5 },
    { url: "/more/guestbook", changeFrequency: "weekly", priority: 0.6 },
    { url: "/more/links", changeFrequency: "monthly", priority: 0.6 },
    { url: "/more/bucket-list", changeFrequency: "monthly", priority: 0.5 },
    { url: "/more/uses", changeFrequency: "monthly", priority: 0.5 },
    { url: "/more/attribution", changeFrequency: "yearly", priority: 0.3 },
    { url: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ] as const).map((route) => ({
    ...route,
    url: `${SITE_URL}${route.url}`,
    lastModified: now,
  }))

  const vaultRoutes: MetadataRoute.Sitemap = journeyItems.map((item) => ({
    url: `${SITE_URL}/vault/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...vaultRoutes]
}
