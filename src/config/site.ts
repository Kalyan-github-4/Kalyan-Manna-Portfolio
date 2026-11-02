export const siteConfig = {
  name: "Kalyan Manna",
  shortName: "Kalyan",
  description: "Full-stack developer portfolio",
  email: "kalyanmanna439@gmail.com",
  logo: "/logo.webp",
  profileImage: "/kalyan-manna.webp",
  // Routes that set openGraph replace the layout's whole block, so each one has
  // to name this image itself or its link previews come up blank. Under 300KB:
  // WhatsApp and friends skip heavier images.
  shareImage: {
    url: "/og-logo.png",
    type: "image/png",
    width: 600,
    height: 600,
    alt: "Kalyan Manna logo",
  },
} as const