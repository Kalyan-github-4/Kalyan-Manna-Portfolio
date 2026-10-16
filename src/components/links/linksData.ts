import {
  BookOpen,
  CalendarBlank,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  XLogo,
  LinkSimple,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { siteConfig, socialLinks } from "@/config";

export type ContactLink = {
  title: string;
  subtitle: string;
  href: string;
  icon: Icon;
  external?: boolean;
  /**
   * A profile that belongs to Kalyan, so the anchor gets rel="me". Only set it
   * on accounts that link back here — rel="me" asserts shared identity, and it
   * is wrong on an external link that merely happens to be interesting.
   */
  identity?: boolean;
};

export type ContactSection = {
  title: string;
  links: ContactLink[];
};

export const profileInfo = {
  name: siteConfig.name,
  role: "Fullstack Developer",
  tag: "Freelancer",
  location: "Kharagpur, India",
  email: siteConfig.email,
  image: siteConfig.profileImage,
};

export const contactSections: ContactSection[] = [
  {
    title: "Code & Craft",
    links: [
      {
        title: "GitHub",
        subtitle: "@Kalyan-github-4",
        href: socialLinks.github,
        icon: GithubLogo,
        external: true,
        identity: true,
      },
      {
        title: "Guestbook",
        subtitle: "Leave a mark",
        href: "/more/guestbook",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        title: "LinkedIn",
        subtitle: "Connect professionally",
        href: socialLinks.linkedin,
        icon: LinkedinLogo,
        external: true,
        identity: true,
      },
      {
        title: "Instagram",
        subtitle: "@kalyan_manna404",
        href: socialLinks.instagram,
        icon: InstagramLogo,
        external: true,
        identity: true,
      },
      {
        title: "Twitter / X",
        subtitle: "@Kalyan_Manna_4",
        href: socialLinks.x,
        icon: XLogo,
        external: true,
        identity: true,
      },
      {
        title: "Portfolio",
        subtitle: "Explore my work",
        href: "/",
        icon: Globe,
      },
    ],
  },
];

export const quickActions = [
  {
    label: "Book a Call",
    href: "/contact",
    icon: CalendarBlank,
  },
  {
    label: "Website",
    href: "/",
    icon: Globe,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: EnvelopeSimple,
  },
];

export const profileMeta = [
  {
    label: profileInfo.location,
    icon: MapPin,
  },
  {
    label: profileInfo.email,
    icon: EnvelopeSimple,
  },
  {
    label: "All contact links in one place",
    icon: LinkSimple,
  },
];