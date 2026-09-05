import type { Metadata } from "next"

export { default } from "@/views/About"

export const metadata: Metadata = {
  title: "About",
  description: "The story behind the code — how Kalyan Manna went from curious tinkerer to full stack developer, and the tools and ideas that shaped the way he builds.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Kalyan Manna",
    description: "The story behind the code — how Kalyan Manna went from curious tinkerer to full stack developer, and the tools and ideas that shaped the way he builds.",
    url: "/about",
  },
}
