"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/kalyan-manna.webp", alt: "Portrait of Kalyan Manna", caption: "That's me", position: "50% 20%" },
  { src: "/hacktoberfest-x-jis/hacktoberfest-img-1.webp", alt: "The winning team on stage holding up prize T-shirts at Hacktoberfest x JIS", caption: "Hacktoberfest win", position: "45% 50%" },
  { src: "/acehack-5-0/ah-05.webp", alt: "Posing in a pixel-art photo frame at AceHack 5.0", caption: "AceHack 5.0", position: "50% 40%" },
  { src: "/about/gym.webp", alt: "Standing among dumbbells on the gym floor with a water bottle in hand", caption: "Gym days", position: "50% 50%" },
  { src: "/hexafall-2-0/cover.webp", alt: "Group photo in front of a mural at Hexafall 2.0", caption: "Hexafall 2.0", position: "50% 50%" },
  { src: "/about/football.webp", alt: "Football boots in hand beside a ball on the pitch", caption: "Football", position: "50% 55%" },
  { src: "/about/drawing.webp", alt: "Pencil sketch of a pair of eyes", caption: "Sketchbook", position: "50% 40%" },
];

const INTERVAL = 3500;

const FRONT = { x: "0%", y: "0%", rotate: -2, scale: 1, opacity: 1, filter: "brightness(1) saturate(1)", zIndex: 3 };
const RIGHT = { x: "34%", y: "3%", rotate: 8, scale: 0.9, opacity: 1, filter: "brightness(0.6) saturate(0.4)", zIndex: 2 };
const LEFT = { x: "-34%", y: "3%", rotate: -9, scale: 0.9, opacity: 1, filter: "brightness(0.6) saturate(0.4)", zIndex: 2 };
const HIDDEN = { x: "0%", y: "3%", rotate: 0, scale: 0.8, opacity: 0, filter: "brightness(0.6) saturate(0.4)", zIndex: 1 };

function poseFor(index: number, active: number) {
  const offset = (index - active + photos.length) % photos.length;
  if (offset === 0) return FRONT;
  if (offset === 1) return RIGHT;
  if (offset === photos.length - 1) return LEFT;
  return HIDDEN;
}

export default function PolaroidCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reducedMotion) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [inView, paused, reducedMotion]);

  const step = (delta: number) => setActive((current) => (current + delta + photos.length) % photos.length);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Photos of Kalyan Manna, events and trips. Use the arrow keys to browse."
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        else if (event.key === "ArrowLeft") step(-1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid aspect-square w-full place-items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {photos.map(({ src, alt, caption, position }, index) => {
        const offset = (index - active + photos.length) % photos.length;
        const isSide = offset === 1 || offset === photos.length - 1;

        return (
        <motion.figure
          key={src}
          initial={false}
          animate={poseFor(index, active)}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
          aria-hidden={index !== active}
          onClick={isSide ? () => setActive(index) : undefined}
          className={`w-[66%] rounded-[3px] bg-[#e9e6df] p-[5%] pb-0 shadow-[0_24px_50px_rgba(0,0,0,0.6)] [grid-area:1/1] ${isSide ? "cursor-pointer" : ""}`}
        >
          <div className="relative aspect-4/5 w-full overflow-hidden bg-zinc-900">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 240px, 340px"
              loading="eager"
              draggable={false}
              className="object-cover"
              style={{ objectPosition: position }}
            />
          </div>

          <figcaption className="py-3 text-center font-hand text-2xl text-zinc-800 sm:text-3xl">
            {caption}
          </figcaption>
        </motion.figure>
        );
      })}
    </div>
  );
}
