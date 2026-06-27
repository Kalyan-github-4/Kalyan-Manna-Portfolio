import type { GuestEntry } from "../components/GuestCard";

export const sampleEntries: GuestEntry[] = [
  {
    id: "1",
    message: "YO!! this just fires me up to make more effort in my projects. Love your work man",
    gradient: "purple",
    doodles: [
      { type: "sparkle", x: 80, y: 22, size: 26, rotate: -6 },
      { type: "cloud", x: 18, y: 78, size: 22, rotate: 4, opacity: 0.35 },
    ],
    author: "atharva supe",
    avatar: { kind: "emoji", value: "🙂" },
    date: "Jun 21, 2026",
    rotation: "-rotate-1",
  },
  {
    id: "2",
    message: ">>>>>>>>",
    gradient: "forest",
    doodles: [
      { type: "lightning", x: 16, y: 24, size: 34, rotate: -4 },
    ],
    author: "Yashas8gatty",
    avatar: { kind: "initials", value: "Y" },
    date: "Jun 24, 2026",
    emphasis: "loud",
    rotation: "rotate-1",
  },
  {
    id: "3",
    message: "Wohhhhhhh wohhhhhh wohhhhh just wohhhhhhhh!!!",
    gradient: "maroon",
    texture: true,
    doodles: [
      { type: "heart", x: 78, y: 70, size: 24, rotate: 10 },
      { type: "heart", x: 60, y: 85, size: 16, rotate: -8, opacity: 0.4 },
    ],
    author: "Cho Yamin Soe Moe",
    avatar: { kind: "emoji", value: "👩" },
    date: "Jun 19, 2026",
    rotation: "-rotate-2",
  },
  {
    id: "4",
    message: "This portfolio describes what actually perfection looks like 🤯",
    gradient: "navy",
    texture: true,
    doodles: [
      { type: "star", x: 85, y: 20, size: 20, rotate: 12 },
    ],
    author: "Abhijeet Singh Rajput",
    avatar: { kind: "photo", value: "/avatars/abhijeet.jpg" },
    date: "Jun 20, 2026",
    rotation: "-rotate-1",
  },
  {
    id: "5",
    message: "Great Website",
    gradient: "navy",
    doodles: [
      { type: "swirl", x: 78, y: 30, size: 28, rotate: -10 },
      { type: "arrow", x: 22, y: 78, size: 22, rotate: 15, opacity: 0.4 },
    ],
    author: "Thando Chipango",
    avatar: { kind: "initials", value: "TC" },
    date: "Jun 18, 2026",
    emphasis: "loud",
    rotation: "rotate-2",
  },
];