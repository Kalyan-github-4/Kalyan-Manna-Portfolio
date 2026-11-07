"use client"

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

// The display-heading palette. Every stop stays readable on the black pages, so
// no word fades out as the gradient travels across it.
export const HEADING_GRADIENT = ['#FDE68A', '#FB923C', '#FB7185'];

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  /** Seconds for one sweep across. */
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  /** Sweep back and forth rather than looping one way. */
  yoyo?: boolean;
}

/**
 * The sweep is a CSS animation, not a per-frame JS loop. background-position
 * cannot run on the compositor, so each frame still repaints the text — but
 * `will-change` gives the span its own layer (only this box repaints, not the
 * whole page around it), and an IntersectionObserver pauses it off screen.
 * The old framer `useAnimationFrame` version ran for every heading on the page,
 * all the time, and repainted the entire document on each frame.
 */
export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(', ');
  const vertical = direction === 'vertical';

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : vertical ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat',
    // A one-way loop has to travel a full tile (150% of the 300%-wide image)
    // to land on an identical frame; a yoyo just runs 0 → 100% and back.
    animation: `${vertical ? 'gradient-text-sweep-y' : 'gradient-text-sweep-x'} ${animationSpeed}s linear infinite ${yoyo ? 'alternate' : 'normal'}`,
    ['--gradient-text-end' as string]: yoyo ? '100%' : '150%',
  };

  return (
    <span
      ref={rootRef}
      className={`gradient-text-root relative inline-flex max-w-fit items-center justify-center overflow-hidden transition-shadow duration-500 ${showBorder ? "rounded-[1.25rem] px-2 py-1 backdrop-blur" : ""
        } ${pauseOnHover ? "gradient-text-hover-pause" : ""} ${className}`}
    >
      {showBorder && (
        <span
          className="gradient-text-anim absolute inset-0 z-0 rounded-[1.25rem] pointer-events-none"
          style={gradientStyle}
        >
          <span
            className="absolute rounded-[1.25rem] bg-black -z-10"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </span>
      )}

      <span
        className="gradient-text-anim relative z-10 inline-block bg-clip-text text-transparent italic p-2"
        style={{ ...gradientStyle, WebkitBackgroundClip: "text" }}
      >
        {children}
      </span>

      <style>{`
        @keyframes gradient-text-sweep-x {
          from { background-position: 0% 50%; }
          to { background-position: var(--gradient-text-end) 50%; }
        }
        @keyframes gradient-text-sweep-y {
          from { background-position: 50% 0%; }
          to { background-position: 50% var(--gradient-text-end); }
        }
        .gradient-text-anim {
          will-change: transform;
        }
        .gradient-text-root[data-offscreen] .gradient-text-anim,
        .gradient-text-hover-pause:hover .gradient-text-anim {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .gradient-text-anim { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
