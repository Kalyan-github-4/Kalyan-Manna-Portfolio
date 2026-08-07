// Single source of truth for project preview images.
// Imported by the home showcase (components/work/Project.tsx) and the
// work case-study list (components/work/workProjects.ts) so an image only
// ever needs to be updated in one place.
export const projectImages = {
  easyPg:
    "/projects/easyPG-banner.webp",
  githubRoast:
    "/projects/github roast.webp",
  portfolio:
    "/projects/portfolio.webp",
  managementSystem:
    "/projects/gym-management-system.webp",
  // Paired screenshots shown as the tilted, stacked desktop preview.
  managementSystemScreens: [
    "/projects/gym-management-system-2.webp",
    "/projects/gym-management-system-1.webp",
  ],
  githubRoastScreens: [
    "/projects/github roast.webp",
    "/projects/github roast 2.webp",
  ],
  portfolioScreens: [
    "/projects/portfolio.webp",
    "/projects/portfolio-1.webp",
  ],
  // EasyPG in-app screenshots shown inside the mobile device frame.
  easyPgScreens: [
    "/projects/easyPG-2.webp",
    "/projects/easyPG-1.webp",
    "/projects/easyPG-3.webp",
  ],
} as const
