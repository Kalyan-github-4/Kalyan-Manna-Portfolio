"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/kalyan-manna.webp", alt: "Portrait of Kalyan Manna", caption: "That's me", position: "50% 20%" },
  { src: "/acehack-5-0/ah-05.webp", alt: "Posing in a pixel-art photo frame at AceHack 5.0", caption: "AceHack 5.0", position: "50% 40%" },
  { src: "/acehack-5-0/ah-14.webp", alt: "Looking out over Jantar Mantar in Jaipur", caption: "Jaipur", position: "50% 60%" },
  { src: "/hexafall-2-0/cover.webp", alt: "Group photo in front of a mural at Hexafall 2.0", caption: "Hexafall 2.0", position: "50% 50%" },
  { src: "/acehack-5-0/ah-04.webp", alt: "A hackathon desk with a sticker-covered laptop", caption: "Hack mode", position: "50% 50%" },
  { src: "/react-kolkata/cover.webp", alt: "Attendees together at a React Kolkata meetup", caption: "React Kolkata", position: "50% 50%" },
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

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Photos of Kalyan Manna, events and trips"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid aspect-square w-full place-items-center"
    >
      {photos.map(({ src, alt, caption, position }, index) => (
        <motion.figure
          key={src}
          initial={false}
          animate={poseFor(index, active)}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
          aria-hidden={index !== active}
          className="w-[66%] rounded-[3px] bg-[#e9e6df] p-[5%] pb-0 shadow-[0_24px_50px_rgba(0,0,0,0.6)] [grid-area:1/1]"
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
      ))}
    </div>
  );
}
