import type { Metadata } from "next"

export { default } from "@/auth/SignIn"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to write on the guestbook wall.",
  // Auth surfaces carry no content worth indexing, and the SSO callback is a
  // transient redirect target — keeping them out of the index also keeps them
  // out of sitelinks.
  robots: { index: false, follow: false },
}
