export { siteConfig } from "./site"
export { socialLinks } from "./social-links"
export { media } from "./media"
// navigationItems is deliberately not re-exported: navigation.ts imports
// Phosphor icon components as values, which would drag every "@/config"
// consumer into the client bundle. Nothing reads it — the live navbar builds
// its items inline in components/layout/SiteChrome.tsx. Import it straight
// from "@/config/navigation" if that ever changes.
export { contactConfig } from "./contact"
export { projectImages } from "./project-images"