import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProjectDetail from "@/components/work/ProjectDetail"
import { workProjects } from "@/data/workProjects"

// The projects are a fixed, code-authored set, so anything outside
// generateStaticParams is a genuine 404 — same arrangement as /vault/[slug].
export const dynamicParams = false

export function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = workProjects.find((item) => item.slug === slug)

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    }
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | Kalyan Manna`,
      description: project.description,
      url: `/work/${project.slug}`,
      images: [{ url: project.image, alt: project.title }],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!workProjects.some((project) => project.slug === slug)) notFound()

  return <ProjectDetail slug={slug} />
}
