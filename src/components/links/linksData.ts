import {
  CalendarBlank,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { siteConfig, socialLinks } from "@/config";
import { journeyItems } from "@/data/journeyData";
import { workProjects } from "@/data/workProjects";

export type LinkCardMedia =
  | { kind: "image"; src: string }
  | { kind: "logo" }
  | { kind: "envelope" }
  | { kind: "notes" };

export type LinkCardItem = {
  eyebrow: string;
  title: string;
  /** Muted first word(s) of the description, followed by the brighter detail. */
  lead?: string;
  detail: string;
  href: string;
  external?: boolean;
  /**
   * A profile that belongs to Kalyan, so the anchor gets rel="me". Only set it
   * on accounts that link back here — rel="me" asserts shared identity, and it
   * is wrong on an external link that merely happens to be interesting.
   */
  identity?: boolean;
  /** Illustration for the card's top panel; site cards use this. */
  media?: LinkCardMedia;
  /** Oversized ghost icon for the card's top panel; social cards use this. */
  icon?: Icon;
};

export const profileInfo = {
  name: siteConfig.name,
  role: "Full-stack developer",
  tagline: "Full-Stack Developer crafting fast, thoughtful web experiences.",
  location: "Kharagpur, India",
  email: siteConfig.email,
  image: siteConfig.profileImage,
};

const featuredProject = workProjects[0];
const latestCollection = journeyItems[0];
const deadweight = workProjects.find((project) => project.title === "Deadweight");

export const promo = {
  label: "Featured build",
  title: "Try Deadweight",
  href: deadweight?.liveUrl ?? "/work",
};

export const siteLinks: LinkCardItem[] = [
  {
    eyebrow: "The story",
    title: "About",
    lead: "Read",
    detail: "Journey, skills & experience",
    href: "/about",
    media: { kind: "logo" },
  },
  {
    eyebrow: `${workProjects.length} projects`,
    title: "Projects",
    lead: "Featured",
    detail: featuredProject.title,
    href: "/work",
    media: { kind: "image", src: featuredProject.image },
  },
  {
    eyebrow: `${journeyItems.length} collections`,
    title: "Vault",
    lead: "Latest",
    detail: latestCollection.coverTitle ?? latestCollection.title,
    href: "/vault",
    media: { kind: "image", src: latestCollection.image },
  },
  {
    eyebrow: "Say hello",
    title: "Contact",
    lead: "Write",
    detail: "Send a message or book a call",
    href: "/contact",
    media: { kind: "envelope" },
  },
  {
    eyebrow: "Sign it",
    title: "Guestbook",
    lead: "Open",
    detail: "Leave a note on the wall",
    href: "/more/guestbook",
    media: { kind: "notes" },
  },
];

export const connectLinks: LinkCardItem[] = [
  {
    eyebrow: "GitHub",
    title: "See the code",
    detail: "@Kalyan-github-4",
    href: socialLinks.github,
    icon: GithubLogo,
    external: true,
    identity: true,
  },
  {
    eyebrow: "LinkedIn",
    title: "Connect",
    detail: "in/kalyan-manna",
    href: socialLinks.linkedin,
    icon: LinkedinLogo,
    external: true,
    identity: true,
  },
  {
    eyebrow: "Twitter / X",
    title: "Follow along",
    detail: "@Kalyan_Manna_4",
    href: socialLinks.x,
    icon: XLogo,
    external: true,
    identity: true,
  },
  {
    eyebrow: "Instagram",
    title: "Off the clock",
    detail: "@kalyan_manna404",
    href: socialLinks.instagram,
    icon: InstagramLogo,
    external: true,
    identity: true,
  },
  {
    eyebrow: "Cal.com",
    title: "Pick a slot",
    detail: "cal.com/kalyanmanna",
    href: socialLinks.calendar,
    icon: CalendarBlank,
    external: true,
  },
];

export const resume = {
  label: "Resume",
  action: "View PDF",
  href: "/Kalyan_Manna_Resume.pdf",
};

export const bookCall = {
  label: "Book a call",
  href: "/contact",
};
