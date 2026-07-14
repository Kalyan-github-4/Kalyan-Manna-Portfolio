// Single source of truth for project preview images.
// Imported by the home showcase (components/work/Project.tsx) and the
// work case-study list (components/work/workProjects.ts) so an image only
// ever needs to be updated in one place.
export const projectImages = {
  easyPg:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&auto=format&fit=crop&q=60",
  portfolio:
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1600&auto=format&fit=crop&q=60",
  managementSystem:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=60",
  businessWebsite:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=60",
  codeking:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=60",
  guestbookWall:
    "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1600&auto=format&fit=crop&q=60",
  // EasyPG in-app screenshots shown inside the mobile device frame.
  easyPgScreens: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=600&fit=crop&crop=center",
  ],
} as const
