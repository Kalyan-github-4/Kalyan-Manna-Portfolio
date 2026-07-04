"use client";

import React from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

type AboutCarouselProps = {
  images: {
    src: string;
    alt: string;
    title: string;
  }[];
  className?: string;
};

const DRAG_BUFFER = 40;
const VELOCITY_THRESHOLD = 500;

export const AboutCarousel = React.forwardRef<HTMLDivElement, AboutCarouselProps>(
  ({ images, className }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(
      Math.floor(images.length / 2)
    );

    const handleNext = React.useCallback(() => {
      if (images.length === 0) return;

      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
      if (images.length === 0) return;

      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }, [images.length]);

    React.useEffect(() => {
      if (images.length <= 1) return;

      const timer = setInterval(handleNext, 4000);
      return () => clearInterval(timer);
    }, [handleNext, images.length]);

    const handleDragEnd = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const { offset, velocity } = info;

      if (offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD) {
        handleNext();
        return;
      }

      if (offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD) {
        handlePrev();
      }
    };

    if (!images.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-[560px] flex-col items-center justify-center overflow-hidden",
          className
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        </div>

        <motion.div
          className="relative flex h-[430px] w-full cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing [perspective:1000px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {images.map((image, index) => {
            const offset = index - currentIndex;
            const total = images.length;

            let pos = (offset + total) % total;

            if (pos > Math.floor(total / 2)) {
              pos = pos - total;
            }

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return (
              <motion.div
                key={image.src}
                className={cn(
                  "absolute flex items-center justify-center",
                  "h-[360px] w-[250px] sm:h-[400px] sm:w-[280px] md:h-[430px] md:w-[310px]"
                )}
                animate={{
                  x: pos * 130,
                  scale: isCenter ? 1 : isAdjacent ? 0.84 : 0.68,
                  rotateY: pos * -12,
                  rotateZ: pos * 4,
                  opacity: isCenter ? 1 : isAdjacent ? 0.75 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  zIndex: isCenter ? 20 : isAdjacent ? 10 : 1,
                  visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  className="pointer-events-none h-full w-full rounded-4xl border border-white/10 object-cover shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                />

                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-4xl",
                    isCenter
                      ? "bg-linear-to-t from-black/25 via-transparent to-white/10"
                      : "bg-black/35"
                  )}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="relative z-30 mt-6 text-center">
          <p className="text-xl font-medium text-white sm:text-2xl">
            {images[currentIndex]?.title}
          </p>
        </div>
      </div>
    );
  }
);

AboutCarousel.displayName = "AboutCarousel";