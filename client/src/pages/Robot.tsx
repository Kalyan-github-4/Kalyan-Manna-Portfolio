import { RobotHero } from "@/components/ui/robot"

/**
 * A standalone playground for the WebGL robot hero.
 *
 * Deliberately mounted outside RootLayout: RobotHero ships its own antenna
 * navbar and fills the viewport with `h-dvh`, so nesting it under the site
 * chrome would stack two navbars and push the scene below the fold.
 */
export default function Robot() {
  return (
    <RobotHero
      backgroundText="KALYAN"
      navItemsLeft={[
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "Vault", href: "/vault" },
        { label: "About", href: "/about" },
      ]}
      contactText="Contact"
      contactHref="/contact"
      ctaText="Let's build"
      onCtaClick={() => {
        window.location.href = "/contact"
      }}
    />
  )
}
