"use client"

import { motion } from "framer-motion"
import { useId } from "react"
import { VscVscode } from "react-icons/vsc"
import { GithubLogo as PhosphorGithubLogo } from "@phosphor-icons/react"
import Image from "next/image"

type LogoProps = { className?: string }

type Integration = {
  id: string
  label: string
  /** Brand colour for the icon, its tile glow and the pulse on its line. */
  color: string
  icon: React.ComponentType<LogoProps>
  /** Tile centre, in the 564×410 design space the paths are drawn in. */
  x: number
  y: number
  /** Connector from the hub out to the tile. */
  path: string
  /** Entrance stagger, and the start offset of the pulse along the line. */
  delay: number
}

// The design space every coordinate below is written in. Tiles are placed as
// percentages of it and the SVG stretches to the same box, so the lines stay
// attached to the tiles whatever shape the card is.
const VIEW_W = 564
const VIEW_H = 410

const FigmaLogo = ({ className }: LogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 28" fill="none" className={className}>
    <path
      d="M9.19782 13.7949C9.19782 7.6656 18.3948 7.6656 18.3948 13.7949C18.3948 19.9242 9.19782 19.9242 9.19782 13.7949ZM0.000862536 22.9918C0.000522523 22.3879 0.119222 21.7899 0.350175 21.2318C0.581128 20.6738 0.919805 20.1668 1.34684 19.7398C1.77388 19.3127 2.2809 18.9741 2.83891 18.7431C3.39692 18.5122 3.99499 18.3935 4.59891 18.3938H9.19695V22.9918C9.19695 29.1211 0 29.1211 0 22.9918H0.000862536ZM9.19782 -0.000113647V9.19684H13.7959C19.9252 9.19684 19.9252 -0.000113647 13.7959 -0.000113647H9.19782ZM0.000862536 4.59793C0.000522523 5.20185 0.119222 5.79992 0.350175 6.35793C0.581128 6.91594 0.919805 7.42296 1.34684 7.85C1.77388 8.27704 2.2809 8.61571 2.83891 8.84667C3.39692 9.07762 3.99499 9.19632 4.59891 9.19598H9.19695V-0.000975834H4.59891C3.99499 -0.00131585 3.39692 0.117384 2.83891 0.348337C2.2809 0.57929 1.77388 0.917967 1.34684 1.345C0.919805 1.77204 0.581128 2.27906 0.350175 2.83707C0.119222 3.39509 0.000522523 3.99315 0.000862536 4.59707V4.59793ZM0.000862536 13.7949C0.000522523 14.3988 0.119222 14.9969 0.350175 15.5549C0.581128 16.1129 0.919805 16.6199 1.34684 17.047C1.77388 17.474 2.2809 17.8127 2.83891 18.0436C3.39692 18.2746 3.99499 18.3941 4.59891 18.3938H9.19695V9.19598H4.59891C3.99499 9.19564 3.39692 9.31434 2.83891 9.54529C2.2809 9.77624 1.77388 10.1149 1.34684 10.542C0.919805 10.969 0.581128 11.476 0.350175 12.034C0.119222 12.592 0.000522523 13.1901 0.000862536 13.794V13.7949Z"
      fill="currentColor"
    />
  </svg>
)

const ClaudeLogo = ({ className }: LogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" className={className}>
    <path
      d="M5.488 18.62L11.004 15.54L11.088 15.26L11.004 15.12H10.724L9.8 15.064L6.664 14.98L3.92 14.84L1.26 14.7L0.588 14.56L0 13.72L0.056 13.3L0.616 12.936L1.428 12.992L3.192 13.132L5.852 13.3L7.784 13.412L10.64 13.748H11.088L11.144 13.552L11.004 13.44L10.892 13.328L8.12 11.48L5.152 9.52L3.584 8.372L2.744 7.812L2.324 7.252L2.156 6.076L2.912 5.236L3.948 5.32L4.2 5.376L5.236 6.188L7.476 7.896L10.36 10.08L10.78 10.416L10.948 10.304L10.976 10.22L10.78 9.912L9.24 7L7.56 4.088L6.804 2.884L6.608 2.156C6.524 1.876 6.496 1.596 6.496 1.316L7.336 0.14L7.84 0L9.016 0.168L9.464 0.56L10.192 2.24L11.34 4.844L13.16 8.372L13.72 9.436L14 10.388L14.084 10.668H14.28V10.528L14.42 8.512L14.7 6.076L14.98 2.94L15.064 2.044L15.512 0.98L16.352 0.42L17.08 0.728L17.64 1.54L17.556 2.044L17.248 4.2L16.52 7.588L16.1 9.884H16.352L16.632 9.576L17.78 8.064L19.712 5.656L20.552 4.676L21.56 3.64L22.204 3.136H23.408L24.276 4.452L23.884 5.824L22.652 7.392L21.616 8.708L20.132 10.696L19.236 12.292L19.32 12.404H19.516L22.876 11.676L24.668 11.368L26.796 11.004L27.776 11.452L27.888 11.9L27.496 12.852L25.2 13.412L22.512 13.972L18.508 14.896L18.452 14.924L18.508 15.008L20.3 15.176L21.084 15.232H22.988L26.516 15.512L27.44 16.072L27.972 16.828L27.888 17.388L26.46 18.116L24.556 17.668L20.076 16.604L18.564 16.24H18.34V16.352L19.628 17.612L21.952 19.712L24.92 22.428L25.06 23.1L24.696 23.66L24.304 23.604L21.728 21.644L20.72 20.804L18.48 18.9H18.34V19.096L18.844 19.852L21.588 23.968L21.728 25.228L21.532 25.62L20.804 25.9L20.048 25.732L18.424 23.492L16.744 20.972L15.428 18.676L15.288 18.788L14.476 27.244L14.112 27.664L13.272 28L12.572 27.44L12.18 26.6L12.572 24.864L13.02 22.624L13.384 20.832L13.72 18.62L13.916 17.892V17.836H13.72L12.04 20.16L9.52 23.604L7.504 25.732L7.028 25.928L6.188 25.508L6.272 24.724L6.72 24.08L9.52 20.496L11.2 18.284L12.32 16.996L12.292 16.856H12.208L4.816 21.672L3.5 21.84L2.94 21.28L2.996 20.44L3.276 20.16L5.516 18.62H5.488Z"
      fill="currentColor"
    />
  </svg>
)

const ShadcnLogo = ({ className }: LogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" className={className}>
    <path
      d="M22.5551 13.4553L13.4551 22.5553M20.7351 3.44531L3.44507 20.7353"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

const GitHubLogo = ({ className }: LogoProps) => (
  <PhosphorGithubLogo weight="fill" className={className} />
)

const MotionLogo = ({ className }: LogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" className={className}>
    <path
      d="M10.5829 8.74902L5.04503 19.2503H0L4.32469 11.0509C4.99494 9.77912 6.66706 8.74902 8.0605 8.74902H10.5829ZM22.955 11.3747C22.955 9.92415 24.0842 8.74924 25.4774 8.74924C26.8706 8.74924 28 9.92393 28 11.3747C28 12.8248 26.8708 13.9997 25.4774 13.9997C24.0842 13.9997 22.955 12.8252 22.955 11.3747ZM11.5288 8.74902H16.5738L11.0359 19.2503H5.99091L11.5288 8.74902ZM17.4871 8.74902H22.5321L18.209 16.9484C17.5385 18.2202 15.8651 19.2503 14.4718 19.2503H11.9492L17.4871 8.74902Z"
      fill="currentColor"
    />
  </svg>
)

/**
 * Where the Motion tile sits below the hub, in design-space units (hub is at
 * y=205, the bottom edge at 410). Its connector runs straight down to it, so
 * this one number sets the line's length — lower it to shorten, raise it to
 * lengthen.
 */
const MOTION_Y = 385

// Hub sits at the centre of the design space: 282, 205.
const INTEGRATIONS: Integration[] = [
  { id: "figma", label: "Figma", color: "#F24E1E", icon: FigmaLogo, x: 110, y: 90, path: "M 270 205 V 105 Q 270 90 255 90 H 110", delay: 0.1 },
  { id: "claude", label: "Claude", color: "#D97757", icon: ClaudeLogo, x: 360, y: 70, path: "M 294 205 V 85 Q 294 70 309 70 H 360", delay: 0.2 },
  { id: "shadcn", label: "shadcn/ui", color: "#FFFFFF", icon: ShadcnLogo, x: 160, y: 205, path: "M 250 205 H 160", delay: 0.3 },
  { id: "github", label: "GitHub", color: "#8957E5", icon: GitHubLogo, x: 480, y: 205, path: "M 314 205 H 480", delay: 0.4 },
  { id: "motion", label: "Motion", color: "#FFF312", icon: MotionLogo, x: 282, y: MOTION_Y, path: `M 282 205 V ${MOTION_Y}`, delay: 0.6 },
  { id: "vscode", label: "VS Code", color: "#22A6F2", icon: VscVscode, x: 460, y: 340, path: "M 314 215 V 325 Q 314 340 329 340 H 460", delay: 0.7 },
]

/** A faint connector with a bright dash travelling along it. */
function Connector({
  d,
  gradientId,
  delay,
  color,
}: {
  d: string
  gradientId: string
  delay: number
  color: string
}) {
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.1)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        // A fixed stagger rather than Math.random(), so server and client
        // render the same thing.
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: delay * 3 }}
      />
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="50%" stopColor={color} stopOpacity={0.9} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    </>
  )
}

/**
 * The uses tile's visual: the tools wired into a central hub, with a pulse
 * running along each line. Adapted from a 21st.dev integration card, restyled
 * to the bento palette and ported to framer-motion.
 */
export default function IntegrationHub() {
  // useId returns colons, which break url(#…) references.
  const baseId = useId().replace(/:/g, "")

  return (
    <div className="absolute inset-0 -mx-5 sm:-mx-6">
      {/* Dot grid, faded out towards the edges so it never meets the border. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        {INTEGRATIONS.map((item) => (
          <Connector
            key={item.id}
            d={item.path}
            gradientId={`${baseId}-${item.id}`}
            delay={item.delay}
            color={item.color}
          />
        ))}
      </svg>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0d0d0f] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="rounded-xl border border-white/10 bg-white/4 p-2">
          <Image
            src="/logo-white.webp"
            alt=""
            width={32}
            height={32}
            className="block size-8 object-contain"
          />
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl border-2 border-white/15"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Tools */}
      <ul aria-label="Tools I use">
        {INTEGRATIONS.map((item) => {
          const Icon = item.icon

          return (
            <motion.li
              key={item.id}
              title={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              style={{
                left: `${(item.x / VIEW_W) * 100}%`,
                top: `${(item.y / VIEW_H) * 100}%`,
                // Hex + alpha suffix: a faint wash of the brand colour behind
                // the icon and a soft glow around the tile.
                color: item.color,
                borderColor: `${item.color}33`,
                backgroundImage: `radial-gradient(circle at 50% 30%, ${item.color}26, transparent 70%)`,
                boxShadow: `0 0 24px ${item.color}1f, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
              className="absolute z-10 -ml-6 -mt-6 grid size-12 place-items-center rounded-xl border bg-[#141416]"
            >
              <Icon className="size-5" />
              <span className="sr-only">{item.label}</span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
