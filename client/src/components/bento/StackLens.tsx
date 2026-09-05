"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useRef } from "react"
import type { IconType } from "react-icons"
import {
  SiClerk,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si"

import { cn } from "@/lib/utils"

type Tag = { id: string; icon: IconType; label: string; color: string }

// Three rows that drift in alternating directions. Each row is rendered three
// times back to back, so the -33.333% loop lands on an identical frame.
const TAG_ROWS: Tag[][] = [
  [
    { id: "react", icon: SiReact, label: "React", color: "#61DAFB" },
    { id: "next", icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF" },
    { id: "typescript", icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { id: "tailwind", icon: SiTailwindcss, label: "Tailwind", color: "#38BDF8" },
    { id: "vite", icon: SiVite, label: "Vite", color: "#A855F7" },
  ],
  [
    { id: "node", icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
    { id: "express", icon: SiExpress, label: "Express.js", color: "#E5E5E5" },
    { id: "postgres", icon: SiPostgresql, label: "PostgreSQL", color: "#4C8ED9" },
    { id: "prisma", icon: SiPrisma, label: "Prisma ORM", color: "#7C8AF5" },
    { id: "drizzle", icon: SiDrizzle, label: "Drizzle ORM", color: "#C5F74F" },
  ],
  [
    { id: "vercel", icon: SiVercel, label: "Vercel", color: "#FFFFFF" },
    { id: "docker", icon: SiDocker, label: "Docker", color: "#2496ED" },
    { id: "clerk", icon: SiClerk, label: "Clerk", color: "#8B6BFF" },
    { id: "motion", icon: SiFramer, label: "Motion", color: "#4D7BFF" },
    { id: "figma", icon: SiFigma, label: "Figma", color: "#F24E1E" },
    { id: "git", icon: SiGit, label: "Git", color: "#F05032" },
  ],
]

const LENS_SIZE = 92

// The band the marquee occupies, pinned to the bottom of the tile. Everything
// that has to agree on a centre — the rows, the clip, the mask and the lens's
// rest position — lives inside it.
const ROWS_BAND = "absolute inset-x-0 bottom-0 h-[188px] sm:h-[220px]"

/**
 * The stack marquee with a magnifier the visitor can drag anywhere on the
 * tile, heading included.
 *
 * Renders as a layer over the whole card rather than inside the visual slot,
 * which is what lets the glass roam past the pills. Both row copies are also
 * stretched over the whole card, so `calc(50% + x)` in the clip and the mask
 * resolves against the same origin the lens is positioned from — that shared
 * coordinate space is what keeps the magnified circle glued to the glass.
 */
export default function StackLens() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lensX = useMotionValue(0)
  const lensY = useMotionValue(0)

  // Both shapes track the same circle. The -10px nudges it onto the glass,
  // which is not quite centred inside the magnifier artwork.
  const clipPath = useMotionTemplate`circle(30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`
  const inverseMask = useMotionTemplate`radial-gradient(circle 30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`

  const rows = (reveal = false) =>
    TAG_ROWS.map((row, rowIndex) => (
      <motion.div
        key={`${reveal ? "reveal-" : ""}row-${rowIndex}`}
        className="flex w-max gap-3"
        animate={{
          x: rowIndex % 2 === 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[...row, ...row, ...row].map((tag, index) => {
          const TagIcon = tag.icon

          return (
            <div
              key={`${tag.id}-${index}-${reveal ? "reveal" : "base"}`}
              className={cn(
                "flex w-fit items-center gap-2.5 whitespace-nowrap rounded-md border px-3 py-2 font-mono text-[13px] tracking-tight",
                reveal
                  ? "ml-6 scale-125 border-white/25 bg-zinc-900 font-semibold text-white shadow-lg shadow-black/50"
                  : "border-white/10 bg-zinc-950/90 text-white/70",
              )}
            >
              <TagIcon size={16} style={{ color: tag.color }} />
              <span>{tag.label}</span>
            </div>
          )
        })}
      </motion.div>
    ))

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* The rail. `calc(50% + x)` in the clip and the mask now resolves
          against this band, and the lens rests at its centre — so the glass
          starts over the pills rather than in the middle of the card. Drag
          constraints still point at the full-card container above. */}
      <div className={ROWS_BAND}>
        <motion.div
          style={{ WebkitMaskImage: inverseMask, maskImage: inverseMask }}
          className="absolute inset-0 flex flex-col justify-end gap-5 pb-5 sm:pb-6"
        >
          {rows()}
        </motion.div>

        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 flex select-none flex-col justify-end gap-5 pb-5 sm:pb-6"
        >
          {rows(true)}
        </motion.div>

        {/* Fades to black rather than to the tile colour — the tile is nearly
            transparent, so black is what actually sits behind the pills. */}
        <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black to-transparent" />

        {/* Snaps back to centre the moment the visitor lets go, so the tile is
            never left with the glass parked in a corner. */}
        <motion.div
          drag
          dragMomentum={false}
          dragSnapToOrigin
          dragConstraints={containerRef}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          style={{ x: lensX, y: lensY }}
          className="pointer-events-auto absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab drop-shadow-xl active:cursor-grabbing"
        >
          <div className="relative">
            <MagnifyingLens size={LENS_SIZE} />
            <div className="pointer-events-none absolute left-1.5 top-1.5 size-15 rounded-full bg-white/10" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MagnifyingLens({ size = 92 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M365.424 335.392L342.24 312.192L311.68 342.736L334.88 365.936L365.424 335.392Z" fill="#B0BDC6" />
      <path d="M358.08 342.736L334.88 319.552L319.04 335.392L342.24 358.584L358.08 342.736Z" fill="#DFE9EF" />
      <path d="M352.368 321.808L342.752 312.192L312.208 342.752L321.824 352.36L352.368 321.808Z" fill="#B0BDC6" />
      <path d="M332 332C260 404 142.4 404 69.6001 332C-2.3999 260 -2.3999 142.4 69.6001 69.6C141.6 -3.20003 259.2 -2.40002 332 69.6C404.8 142.4 404.8 260 332 332ZM315.2 87.2C252 24 150.4 24 88.0001 87.2C24.8001 150.4 24.8001 252 88.0001 314.4C151.2 377.6 252.8 377.6 315.2 314.4C377.6 252 377.6 150.4 315.2 87.2Z" fill="#DFE9EF" />
      <path d="M319.2 319.2C254.4 384 148.8 384 83.2001 319.2C18.4001 254.4 18.4001 148.8 83.2001 83.2C148 18.4 253.6 18.4 319.2 83.2C384 148.8 384 254.4 319.2 319.2ZM310.4 92C250.4 32 152 32 92.0001 92C32.0001 152 32.0001 250.4 92.0001 310.4C152 370.4 250.4 370.4 310.4 310.4C370.4 250.4 370.4 152 310.4 92Z" fill="#7A858C" />
      <path d="M484.104 428.784L373.8 318.472L318.36 373.912L428.672 484.216L484.104 428.784Z" fill="#333333" />
      <path d="M471.664 441.224L361.344 330.928L330.8 361.48L441.12 471.76L471.664 441.224Z" fill="#575B5E" />
      <path d="M495.2 423.2C504 432 432.8 504 423.2 495.2L417.6 489.6C408.8 480.8 480 408.8 489.6 417.6L495.2 423.2Z" fill="#B0BDC6" />
      <path d="M483.2 435.2C492 444 444.8 492 435.2 483.2L429.6 477.6C420.8 468.8 468 420.8 477.6 429.6L483.2 435.2Z" fill="#DFE9EF" />
    </svg>
  )
}
