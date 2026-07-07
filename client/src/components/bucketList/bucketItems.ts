import {
  AirplaneTilt,
  Campfire,
  CheckCircle,
  Compass,
  GlobeHemisphereWest,
  Mountains,
  SwimmingPool,
  Sparkle,
  Sword,
  Target,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export type BucketStatus = "done" | "progress" | "planned";

export type BucketItem = {
  title: string;
  description: string;
  category: string;
  status: BucketStatus;
  icon: Icon;
};

export const bucketItems: BucketItem[] = [
  {
    title: "Learn a martial art",
    description:
      "Boxing, jiu-jitsu, or muay thai — something that teaches discipline, timing, and confidence.",
    category: "Discipline",
    status: "planned",
    icon: Sword,
  },
  {
    title: "Meditate for 30 consecutive days",
    description:
      "A quiet reset. No excuses, no skipping — just showing up every single day.",
    category: "Mindset",
    status: "progress",
    icon: Sparkle,
  },
  {
    title: "Solo travel to another country",
    description:
      "No perfect plan, no safety net. A place where the language feels unfamiliar and the streets teach me.",
    category: "Travel",
    status: "planned",
    icon: AirplaneTilt,
  },
  {
    title: "3-month Eurotrip",
    description:
      "Prague, Berlin, Lisbon — working from cafés, collecting stories, and living with a backpack.",
    category: "Adventure",
    status: "planned",
    icon: GlobeHemisphereWest,
  },
  {
    title: "Scuba diving",
    description:
      "Breathing underwater and seeing a world that has always existed just below the surface.",
    category: "Experience",
    status: "planned",
    icon: SwimmingPool,
  },
  {
    title: "Camp solo under the stars",
    description:
      "No roof, no noise. Just a sleeping bag, silence, and the sky at 3 AM.",
    category: "Nature",
    status: "planned",
    icon: Campfire,
  },
  {
    title: "Complete a mountain trek",
    description:
      "Climb until the city disappears, the air gets thinner, and the only way is forward.",
    category: "Nature",
    status: "progress",
    icon: Mountains,
  },
  {
    title: "Build something used by thousands",
    description:
      "A real product with real users, real feedback, and real impact beyond my own screen.",
    category: "Career",
    status: "progress",
    icon: Target,
  },
  {
    title: "Get lost on purpose",
    description:
      "Pick a city, keep the phone away, and follow curiosity instead of directions.",
    category: "Wander",
    status: "planned",
    icon: Compass,
  },
  {
    title: "Finish one impossible-looking goal",
    description:
      "The kind of goal that feels too big at first, then becomes proof that I can do hard things.",
    category: "Life",
    status: "done",
    icon: CheckCircle,
  },
];