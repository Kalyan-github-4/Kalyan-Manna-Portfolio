// Copy for the bento tiles. The visuals live in each tile's own component —
// this file only owns the words, so wording changes never touch layout.
export const bentoCopy = {
  collaborate: {
    eyebrow: "let's build together",
    title: "Clear communication, fast iterations, no surprises",
    href: "/contact",
  },
  techStack: {
    eyebrow: "tech stack",
    title: "The stack behind everything I ship",
  },
  whatYouGet: {
    eyebrow: "what you get",
    title: "Clean code, pixel-perfect UI, deployed & scaling",
  },
  timezones: {
    eyebrow: "flexible with timezones",
    title: "Based in India, available globally",
  },
  uses: {
    eyebrow: "uses",
    title: "Check out my favorite tools",
    href: "/more/uses",
  },
} as const
