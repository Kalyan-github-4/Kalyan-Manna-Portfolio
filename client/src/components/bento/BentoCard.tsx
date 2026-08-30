import { motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

import { bentoFadeUp } from "./bentoMotion"

type BentoCardProps = {
  /** Small mono label above the title. */
  eyebrow: string
  title: string
  /** Where the copy sits relative to the visual. */
  titlePosition?: "top" | "bottom"
  /** Optional route — renders the round arrow affordance and links the tile. */
  href?: string
  /** Stagger order within the grid. */
  index?: number
  /** Grid placement + any per-tile sizing. */
  className?: string
  /** Sizing/overflow for the visual slot, when a tile needs more than the default. */
  visualClassName?: string
  /** Sizing for the copy block, for tiles that want the heading to sit in more space. */
  copyClassName?: string
  /** The tile's visual. Left empty until each one is designed. */
  children?: React.ReactNode
  /**
   * A layer stretched over the whole card, above the copy. For visuals that
   * have to escape the visual slot — the stack tile's draggable magnifier
   * roams the full tile, heading included.
   */
  overlay?: React.ReactNode
}

/**
 * The shell every bento tile shares: border, radius, padding, entrance and the
 * eyebrow/title block. Tiles pass their visual as children and decide nothing
 * about the chrome, so the grid stays visually uniform as tiles are filled in.
 */
export default function BentoCard({
  eyebrow,
  title,
  titlePosition = "top",
  href,
  index = 0,
  className = "",
  visualClassName = "",
  copyClassName = "",
  children,
  overlay,
}: BentoCardProps) {
  const copy = (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[11px]">
          {eyebrow}
        </p>

        <h3 className="mt-2.5 font-display text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
      </div>

      {href ? (
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
          <ArrowRight size={16} weight="bold" />
        </span>
      ) : null}
    </div>
  )

  const body = (
    <>
      {titlePosition === "top" ? (
        <div className={copyClassName}>{copy}</div>
      ) : null}

      {/* Visual slot — each tile fills this in its own pass. */}
      <div className={`relative min-h-32 flex-1 ${visualClassName}`}>
        {children}
      </div>

      {titlePosition === "bottom" ? (
        <div className={copyClassName}>{copy}</div>
      ) : null}

      {/* Inert by default so it never swallows clicks on the copy; whatever
          inside needs pointer events opts back in. */}
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-30">
          {overlay}
        </div>
      ) : null}
    </>
  )

  const card = (
    <motion.article
      custom={index}
      variants={bentoFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/2 p-5 text-center transition-colors duration-300 hover:border-white/20 sm:p-6"
    >
      {body}
    </motion.article>
  )

  // The grid placement always lands on the outer node so a linked tile and a
  // static one occupy the same cell.
  if (!href) return <div className={className}>{card}</div>

  return href.startsWith("http") ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {card}
    </a>
  ) : (
    <Link to={href} className={className}>
      {card}
    </Link>
  )
}
