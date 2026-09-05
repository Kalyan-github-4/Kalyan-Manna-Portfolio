import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NextConfig } from "next"

// Everything the app is allowed to talk to. Kept as one list so the directives
// below stay readable.
const CLERK = "https://*.clerk.accounts.dev"
const TURNSTILE = "https://challenges.cloudflare.com"
const CAL = "https://app.cal.com https://cal.com"
const API = "https://kalyan-manna-developer.onrender.com"
// @react-three/drei fetches its <Environment preset> HDRIs from here — see
// node_modules/@react-three/drei/core/useEnvironment.js. The old vercel.json
// allowed raw.githubusercontent.com and cdn.jsdelivr.net instead, neither of
// which drei actually uses, so the robot's studio lighting always failed and
// fell back to plain lights via SceneErrorBoundary.
const DREI_ASSETS = "https://raw.githack.com"

// React needs eval() in development for callstack reconstruction and other
// debugging features; it never uses it in production. The old CSP lived in
// vercel.json and so only ever applied to deployments, which is why this never
// came up before.
const isDev = process.env.NODE_ENV !== "production"

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // 'unsafe-inline' is required by the App Router: Next streams the RSC payload
  // through inline <script> tags (self.__next_f.push) whose contents change
  // every build, so neither 'self' nor a hash allowlist can cover them. The
  // strict alternative is a per-request nonce from middleware, but reading
  // headers() in the root layout opts every route out of static generation —
  // all 19 prerendered pages would become on-demand renders. Revisit if this
  // app ever renders user-supplied HTML.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${CLERK} ${TURNSTILE} ${CAL}`,
  "style-src 'self' 'unsafe-inline'",
  // next/font self-hosts the faces, so fonts.gstatic.com is no longer needed.
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  `connect-src 'self' ${API} ${CLERK} https://clerk-telemetry.com https://api.cal.com ${CAL} ${DREI_ASSETS} https://cdn.jsdelivr.net https://raw.githubusercontent.com`,
  `frame-src 'self' ${CLERK} ${TURNSTILE} ${CAL}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
]

const nextConfig: NextConfig = {
  // There are lockfiles both here and at the repo root, and Next picks the
  // wrong one when left to infer.
  // __dirname is not defined here: package.json sets "type": "module".
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },

  async headers() {
    // No Cache-Control rule here: vercel.json used to set one on /assets/*,
    // which was Vite's output directory. Next serves hashed assets from
    // /_next/static and already marks them immutable itself.
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
