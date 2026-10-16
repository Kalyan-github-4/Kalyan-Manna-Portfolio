import type { Metadata } from "next"

export { default } from "@/views/Robot"

export const metadata: Metadata = {
  title: "Robot",
  description: "An interactive WebGL playground — a real-time 3D robot scene built with three.js and React Three Fiber.",
  alternates: { canonical: "/robot" },
  openGraph: {
    title: "Robot | Kalyan Manna",
    description: "An interactive WebGL playground — a real-time 3D robot scene built with three.js and React Three Fiber.",
    url: "/robot",
  },
}
