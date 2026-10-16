import type { Metadata } from "next"

export { default } from "@/auth/SSOCallback"

export const metadata: Metadata = {
  title: "Signing you in",
  description: "Completing sign in.",
  // Auth surfaces carry no content worth indexing, and the SSO callback is a
  // transient redirect target — keeping them out of the index also keeps them
  // out of sitelinks.
  robots: { index: false, follow: false },
}
