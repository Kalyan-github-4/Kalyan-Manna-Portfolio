"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import {
  SiArc,
  SiClaude,
  SiCursor,
  SiFigma,
  SiGithub,
  SiNotion,
  SiPostman,
  SiSpotify,
  SiWarp,
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

import { BENTO_EASE } from "./bentoMotion"

type Tool = { id: string; icon: IconType; label: string; color: string }

// Everyday tools rather than the build stack — that lives in the stack tile.
// Simple Icons dropped the VS Code mark, so it comes from the Codicons set.
const TOOLS: Tool[] = [
  { id: "vscode", icon: VscVscode, label: "VS Code", color: "#22A6F2" },
  { id: "claude", icon: SiClaude, label: "Claude", color: "#D97757" },
  { id: "cursor", icon: SiCursor, label: "Cursor", color: "#FFFFFF" },
  { id: "figma", icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { id: "notion", icon: SiNotion, label: "Notion", color: "#FFFFFF" },
  { id: "github", icon: SiGithub, label: "GitHub", color: "#FFFFFF" },
  { id: "postman", icon: SiPostman, label: "Postman", color: "#FF6C37" },
  { id: "warp", icon: SiWarp, label: "Warp", color: "#01A4FF" },
  { id: "arc", icon: SiArc, label: "Arc", color: "#FCBFBD" },
  { id: "spotify", icon: SiSpotify, label: "Spotify", color: "#1ED760" },
]

// Centre-to-centre distance between tiles, in px.
const STEP = 100
// Slots further than this from the centre are faded out. The rail has more
// tools than visible slots, so the tile that wraps from one end to the other
// always makes the jump while invisible.
const VISIBLE_RADIUS = 3
const INTERVAL_MS = 2200

/** Signed distance of tool `i` from the centre slot, wrapped into the rail. */
function slotOffset(i: number, active: number, count: number) {
  let offset = (i - active) % count
  if (offset < -count / 2) offset += count
  if (offset >= count / 2) offset -= count
  return offset
}

/**
 * The uses tile's visual: a rail of app tiles that steps one place every couple
 * of seconds, with the tile in the centre lifted and enlarged. Reduced-motion
 * visitors get the same rail, standing still.
 */
export default function ToolRail() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const interval = window.setInterval(() => {
      setActive((previous) => (previous + 1) % TOOLS.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [reduceMotion])

  return (
    <div
      className="absolute inset-0 -mx-5 sm:-mx-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 22%, black 78%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 22%, black 78%, transparent)",
      }}
    >
      <ul className="relative h-full" aria-label="Tools I use">
        {TOOLS.map((tool, i) => {
          const offset = slotOffset(i, active, TOOLS.length)
          const isCentre = offset === 0
          const hidden = Math.abs(offset) > VISIBLE_RADIUS
          const Icon = tool.icon

          return (
            <motion.li
              key={tool.id}
              className="absolute left-1/2 top-1/2 -ml-10 -mt-10 size-20"
              initial={false}
              animate={{
                x: offset * STEP,
                scale: isCentre ? 1.18 : 1,
                opacity: hidden ? 0 : 1,
              }}
              transition={{ duration: 0.7, ease: BENTO_EASE }}
            >
              <div
                className={`size-full rounded-[22px] border p-1.5 transition-colors duration-700 ${
                  isCentre
                    ? "border-white/15 bg-white/4"
                    : "border-white/8 bg-white/2"
                }`}
              >
                <div className="grid size-full place-items-center rounded-2xl border border-white/8 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <Icon
                    size={30}
                    title={tool.label}
                    style={{ color: tool.color }}
                    className={`transition-opacity duration-700 ${
                      isCentre ? "opacity-100" : "opacity-80"
                    }`}
                  />
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
