import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Instrument_Serif, Poppins } from "next/font/google"

import "@/styles/index.css"
import SmoothScroll from "@/components/shared/SmoothScroll"

// Replaces the Google Fonts <link> the old index.html carried: next/font
// self-hosts the files, so there is no render-blocking round trip to
// fonts.googleapis.com and no layout shift while they arrive.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const SITE_URL = "https://www.kalyanmanna.com"

const TITLE = "Kalyan Manna | Full Stack Developer & Freelancer"
const DESCRIPTION =
  "Kalyan Manna is a full stack developer and freelancer from Kharagpur, India, building modern websites, web apps, mobile apps, and digital products with React, TypeScript, Node.js, PostgreSQL, and Expo."

export const metadata: Metadata = {
  // Lets every route express canonicals and OG images as relative paths.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Route titles read "About | Kalyan Manna" without repeating the tagline.
    template: "%s | Kalyan Manna",
  },
  description: DESCRIPTION,
  keywords: [
    "Kalyan Manna",
    "full stack developer",
    "freelance web developer",
    "React developer",
    "TypeScript developer",
    "Node.js developer",
    "app developer India",
    "web developer Kharagpur",
    "portfolio developer",
  ],
  authors: [{ name: "Kalyan Manna", url: SITE_URL }],
  creator: "Kalyan Manna",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description:
      "I build fast, modern, and scalable websites, web apps, mobile apps, and digital products for businesses and startups.",
    url: SITE_URL,
    siteName: "Kalyan Manna",
    locale: "en_US",
    // 1200x630 and under 300KB: WhatsApp and friends skip heavier images, and
    // the explicit dimensions let crawlers lay the card out on first scrape
    // instead of waiting until they have fetched the file.
    images: [
      {
        url: "/og-image.jpg",
        secureUrl: `${SITE_URL}/og-image.jpg`,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Kalyan Manna Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Full stack developer building modern websites, web apps, mobile apps, and digital products.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "Kalyan Manna Full Stack Developer Portfolio",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
}

/**
 * A @graph rather than a lone Person: the three nodes reference each other by
 * @id, which marks this page as the entity home for "Kalyan Manna" and tells
 * Google which of the several people by that name this site is about. sameAs is
 * the corroboration list — every URL here must be a profile that links back, or
 * it weakens rather than strengthens the association.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Kalyan Manna",
      alternateName: "Kalyan",
      url: `${SITE_URL}/`,
      description:
        "Full stack developer and freelancer from Kharagpur, India, building websites, web apps, mobile apps, and digital products.",
      jobTitle: "Full Stack Developer",
      email: "mailto:kalyanmanna439@gmail.com",
      image: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#profile-image`,
        url: `${SITE_URL}/kalyan-manna.webp`,
        caption: "Kalyan Manna",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kharagpur",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Developer",
        occupationalCategory: "15-1254.00",
        occupationLocation: {
          "@type": "City",
          name: "Kharagpur",
          containedInPlace: { "@type": "State", name: "West Bengal" },
        },
        skills:
          "React, TypeScript, Node.js, Express.js, PostgreSQL, React Native, Expo, Tailwind CSS",
      },
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kharagpur",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
      },
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      sameAs: [
        "https://github.com/Kalyan-github-4",
        "https://www.linkedin.com/in/kalyan-manna",
        "https://www.instagram.com/kalyan_manna404",
        "https://x.com/Kalyan_Manna_4",
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Express.js",
        "React Native",
        "Expo",
        "Full Stack Development",
        "Web Development",
        "Mobile App Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Kalyan Manna",
      alternateName: "Kalyan Manna Portfolio",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#profile-image` },
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // The site is dark-only: the class is static rather than applied by JS, so
  // there is no flash of unstyled colours before hydration.
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Serialised by us from a literal above — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Lenis + scroll-reset, previously mounted in main.tsx. */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
