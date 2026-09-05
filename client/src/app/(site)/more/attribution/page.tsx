import type { Metadata } from "next"

export { default } from "@/views/Attribution"

export const metadata: Metadata = {
  title: "Attribution",
  description: "Credits for the libraries, typefaces, and open source work this portfolio is built on.",
  alternates: { canonical: "/more/attribution" },
  openGraph: {
    title: "Attribution | Kalyan Manna",
    description: "Credits for the libraries, typefaces, and open source work this portfolio is built on.",
    url: "/more/attribution",
  },
}
