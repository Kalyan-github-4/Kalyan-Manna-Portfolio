"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import FeedbackDialog from "./FeedbackDialog"
import Speaker from "./GuestShowUp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Speaker {
  name: string;
  role: string;
  rating: number;
  feedback: string;
  src: string;
}

export interface ScrollPortraitWallProps {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  date?: React.ReactNode;
  hint?: React.ReactNode;
  speakers?: Speaker[];
  columns?: number;
  showCaptions?: boolean;
  className?: string;
}

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let i = 0;
  let r = 0;

  while (i < count) {
    const row = new Array<number>(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;

    row[a] = i++;

    if (r % 3 === 0 && i < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = i++;
    }

    rows.push(row);
    r++;
  }

  return rows;
}

function useResponsiveColumns(desired: number): number {
  const [cols, setCols] = React.useState(1)

  React.useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)")
    const lg = window.matchMedia("(min-width: 1024px)")

    const update = () => {
      if (lg.matches) {
        setCols(desired)
      } else if (sm.matches) {
        setCols(Math.min(desired, 2))
      } else {
        setCols(1)
      }
    }

    update()

    sm.addEventListener("change", update)
    lg.addEventListener("change", update)

    return () => {
      sm.removeEventListener("change", update)
      lg.removeEventListener("change", update)
    }
  }, [desired])

  return cols
}

function FeedbackCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="group relative flex h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b10]/95 p-4 text-white shadow-2xl shadow-black/30 backdrop-blur sm:p-5 lg:rounded-4xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-fuchsia-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative z-10 flex min-h-52.5 w-full flex-col justify-between sm:min-h-60">
        <div>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={speaker.src}
                alt={speaker.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/15 sm:h-12 sm:w-12"
              />

              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium tracking-wide text-white">
                  {speaker.name}
                </h3>

                <p className="mt-1 truncate text-[10px] uppercase tracking-[0.16em] text-white/40 sm:text-[11px]">
                  {speaker.role}
                </p>
              </div>
            </div>

            <div className="shrink-0 whitespace-nowrap text-[11px] tracking-tight text-yellow-200/80 sm:text-xs">
              {Array.from({ length: Math.min(speaker.rating ?? 5, 5) }).map(
                (_, index) => (
                  <span key={index}>★</span>
                )
              )}
            </div>
          </div>

          <p className="line-clamp-5 text-sm leading-6 text-white/72 sm:line-clamp-none sm:text-[15px] sm:leading-7 lg:text-base">
            “{speaker.feedback}”
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
            Client Feedback
          </span>

          <span className="rounded-full border border-white/10 bg-white/30 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
            Verified
          </span>
        </div>
      </div>
    </article>
  )
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export function ScrollPortraitWall({
  eyebrow = "Client Feedback",
  title = "Voice Matters",
  description = "Real feedback from people and businesses I’ve helped with websites, apps, dashboards, and digital systems.",
  // hint = "scroll down to read feedback",
  speakers = [] as Speaker[],
  columns = 4,
  showCaptions = false,
  className,
}: ScrollPortraitWallProps) {
  const root = React.useRef<HTMLElement | null>(null);
  const hintRef = React.useRef<HTMLDivElement | null>(null);

  const cols = useResponsiveColumns(Math.max(1, columns));

  const layout = React.useMemo(
    () => buildLayout(speakers.length, cols),
    [speakers.length, cols],
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const items = gsap.utils.toArray<HTMLElement>(".spw-item");

      if (reduce) {
        gsap.set(items, { scale: 1 });
        return;
      }

      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=40%",
          scrub: true,
        },
      });

      items.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(
            el,
            { scale: 0 },
            { scale: 1, ease: "power2.out", duration: 0.5 },
          )
          .to(el, { scale: 0, ease: "power2.in", duration: 0.5 });
      });
    },
    { scope: root, dependencies: [cols], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("relative w-full text-foreground", className)}
    >
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center px-5 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-500"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-visible font-display text-5xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: 0.8,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      <div className="relative z-30 mb-[32vh] mt-[72vh] space-y-5 px-4 sm:space-y-6 sm:px-6 lg:space-y-8 lg:px-10">
        {layout.map((row, ri) => (
          <div
            key={ri}
            className="grid w-full gap-5 sm:gap-6 lg:gap-8"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {row.map((idx, ci) => {
              if (idx === -1) {
                return <div key={ci} className="hidden sm:block" />
              }

              const speaker = speakers[idx]
              const origin = ci < cols / 2 ? "right bottom" : "left bottom"

              return (
                <div key={ci} className="min-h-[230px] sm:min-h-[255px] lg:min-h-[280px]">
                  <div
                    className="spw-item relative z-40 h-full w-full"
                    style={{
                      transformOrigin: origin,
                      transform: "scale(0)",
                    }}
                  >
                    <FeedbackCard speaker={speaker} />

                    {showCaptions && (
                      <div className="absolute -bottom-2 left-0 flex w-full translate-y-full justify-between gap-2 text-[11px] uppercase leading-tight text-muted-foreground sm:text-sm">
                        <span className="truncate">{speaker.name}</span>
                        <span className="shrink-0">({speaker.role})</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {/* Final CTA after feedback animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-50 flex justify-center pb-40"
      >
        <FeedbackDialog />
      </motion.div>
    </section>
  );
}

export default ScrollPortraitWall;