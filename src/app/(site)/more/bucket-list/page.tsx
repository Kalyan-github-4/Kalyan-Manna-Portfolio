import type { Metadata } from "next"

export { default } from "@/views/BucketList"

export const metadata: Metadata = {
  title: "Bucket List",
  description: "Dreams with a deadline — the things Kalyan Manna intends to build, visit, and try, tracked in the open.",
  alternates: { canonical: "/more/bucket-list" },
  openGraph: {
    title: "Bucket List | Kalyan Manna",
    description: "Dreams with a deadline — the things Kalyan Manna intends to build, visit, and try, tracked in the open.",
    url: "/more/bucket-list",
  },
}
