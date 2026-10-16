import type { Metadata } from "next"

import { journeyItems } from "@/data/journeyData"

import VaultCollection from "@/components/vault/VaultCollection"

export default function VaultCollectionPage() {
  return <VaultCollection />
}

/**
 * The vault is a fixed, code-authored set of collections, so every slug is
 * known at build time — this turns /vault/[slug] from an on-demand render into
 * prerendered HTML, and gives crawlers real pages to index.
 */
// The set is fixed and code-authored, and adding a collection already requires
// a rebuild — so anything outside generateStaticParams is a genuine 404 rather
// than a page to render on demand. Without this an unknown slug answered 200
// with a "not found" body, which search engines would happily index.
export const dynamicParams = false

export function generateStaticParams() {
  return journeyItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = journeyItems.find((item) => item.slug === slug)

  if (!collection) {
    return {
      title: "Collection not found",
      robots: { index: false, follow: false },
    }
  }

  const title = collection.coverTitle ?? collection.title
  const description = collection.longDescription ?? collection.description

  return {
    title,
    description,
    alternates: { canonical: `/vault/${collection.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | Kalyan Manna`,
      description,
      url: `/vault/${collection.slug}`,
      images: [
        {
          url: collection.image,
          width: collection.width,
          height: collection.height,
          alt: title,
        },
      ],
    },
  }
}
