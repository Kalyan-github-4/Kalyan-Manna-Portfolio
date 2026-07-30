// Single source of truth for project preview images.
// Imported by the home showcase (components/work/Project.tsx) and the
// work case-study list (components/work/workProjects.ts) so an image only
// ever needs to be updated in one place.
export const projectImages = {
  easyPg:
    "/projects/easyPG-1.jpeg",
  githubRoast:
    "/projects/github roast.png",
  portfolio:
    "/projects/portfolio.png",
  managementSystem:
    "/projects/gym-management-system.png",
  businessWebsite:
    "/projects/business website.png",
  guestbookWall:
    "/projects/guestbook-wall.png",
  // Paired screenshots shown as the tilted, stacked desktop preview.
  managementSystemScreens: [
    "/projects/gym-management-system-1.png",
    "/projects/gym-management-system-2.png",
  ],
  guthubRoastScreens: [
    "/projects/github roast 2.png",
    "/projects/github roast.png",
  ],
  portfolioScreens: [
    "/projects/portfolio-1.png",
    "/projects/portfolio.png",
  ],
  // EasyPG in-app screenshots shown inside the mobile device frame.
  easyPgScreens: [
    "/projects/easyPG-1.jpeg",
    "/projects/easyPG-2.jpeg",
    "/projects/easyPG-3.jpeg",
  ],
} as const
