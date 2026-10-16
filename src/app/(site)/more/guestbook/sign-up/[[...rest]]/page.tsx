import type { Metadata } from "next"

export { default } from "@/auth/SignUp"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account to write on the guestbook wall.",
  // Auth surfaces carry no content worth indexing, and the SSO callback is a
  // transient redirect target — keeping them out of the index also keeps them
  // out of sitelinks.
  robots: { index: false, follow: false },
}
