import { siteConfig } from "./site"
import { socialLinks } from "./social-links"

export const contactConfig = {
  email: siteConfig.email,
  name: siteConfig.shortName,
  imageSrc: siteConfig.profileImage,
  imageAlt: `${siteConfig.name} profile image`,
  calUrl: socialLinks.calendar,
  linkedinUrl: socialLinks.linkedin,
  xUrl: socialLinks.x,
  githubUrl: socialLinks.github,
} as const