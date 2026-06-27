// ── Hand-drawn doodle paths (stroke-only, white, sketch-style) ──────────

export type DoodleName =
  | "lightning"
  | "sparkle"
  | "heart"
  | "swirl"
  | "star"
  | "cloud"
  | "arrow"
  | "moon";

export interface Doodle {
  type: DoodleName;
  x: number; // 0-100, % of card width
  y: number; // 0-100, % of card height
  size: number; // px
  rotate: number; // deg
  opacity?: number;
}

interface DoodleSvgProps {
  type: DoodleName;
  size: number;
}

export default function DoodleSvg({ type, size }: DoodleSvgProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "white",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "lightning":
      return (
        <svg {...common}>
          <path d="M22 3 L9 22 L18 22 L15 37 L32 16 L21 16 Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M20 2 L20 14 M20 26 L20 38 M2 20 L14 20 M26 20 L38 20 M9 9 L15 15 M25 25 L31 31 M31 9 L25 15 M15 25 L9 31" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20 34 C8 25 3 17 7 11 C10 6 17 6 20 13 C23 6 30 6 33 11 C37 17 32 25 20 34 Z" />
        </svg>
      );
    case "swirl":
      return (
        <svg {...common}>
          <path d="M30 12 C30 6 23 4 17 8 C9 13 9 24 18 28 C25 31 31 26 29 20 C27 15 20 14 18 19" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M20 4 L24 16 L36 16 L26 23 L30 35 L20 27 L10 35 L14 23 L4 16 L16 16 Z" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M10 26 C5 26 4 19 10 18 C9 11 19 9 22 15 C29 13 32 22 27 25 C29 30 23 32 19 29 C16 32 10 31 10 26 Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 20 C15 8 28 8 35 18 M35 18 L27 16 M35 18 L31 26" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M27 6 C18 6 11 13 11 22 C11 31 18 37 26 36 C16 34 10 26 13 17 C15 11 21 7 27 6 Z" />
        </svg>
      );
  }
}