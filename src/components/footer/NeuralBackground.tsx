"use client"

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// 30fps reads the same for soft trails and halves the per-frame work.
const FRAME_INTERVAL = 1000 / 30;
// The physics below was tuned per 60fps frame; each draw steps it by elapsed time in those units.
const BASE_FRAME = 1000 / 60;

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles.
   * Defaults to a cyan/indigo mix if not specified.
   */
  color?: string;
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.1
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 800
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number;
}

export default function NeuralBackground({
  className,
  color = "#b4a0ff", // Default Indigo
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- CONFIGURATION ---
    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let lastDraw = 0;
    let started = false;
    let inView = false;
    const mouse = { x: -1000, y: -1000 }; // Start off-screen
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // --- PARTICLE CLASS ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        // Random lifespan to create natural recycling
        this.life = Math.random() * 200 + 100;
      }

      update(step: number) {
        // 1. Flow Field Math (Simplex-ish noise)
        // We calculate an angle based on position to create the "flow"
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

        // 2. Add force from flow field
        this.vx += Math.cos(angle) * 0.2 * speed * step;
        this.vy += Math.sin(angle) * 0.2 * speed * step;

        // 3. Mouse Repulsion/Attraction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          // Push away
          this.vx -= dx * force * 0.05 * step;
          this.vy -= dy * force * 0.05 * step;
        }

        // 4. Apply Velocity & Friction
        this.x += this.vx * step;
        this.y += this.vy * step;
        const friction = Math.pow(0.95, step); // Friction to stop infinite acceleration
        this.vx *= friction;
        this.vy *= friction;

        // 5. Aging
        this.age += step;
        if (this.age > this.life) {
          this.reset();
        }

        // 6. Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        // Fade in and out based on age
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
        context.globalAlpha = alpha;
        context.fillRect(this.x, this.y, 1.5, 1.5); // Tiny dots are faster than arcs
      }
    }

    // --- INITIALIZATION ---
    const init = () => {
      // Kept at 1x even on high-DPI screens: 1.5px dots under fading trails
      // look the same, and it saves up to 9x the pixels to fill every frame.
      canvas.width = width;
      canvas.height = height;

      // Fewer particles on small screens keep the density about the same.
      const count = Math.round(particleCount * (width < 640 ? 0.4 : width < 1024 ? 0.7 : 1));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    // --- ANIMATION LOOP ---
    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (now - lastDraw < FRAME_INTERVAL) return;
      // Capped so a long pause doesn't fling every particle at once.
      const step = lastDraw ? Math.min((now - lastDraw) / BASE_FRAME, 4) : 1;
      lastDraw = now;

      // "Fade" effect: Instead of clearing the canvas, we draw a semi-transparent rect
      // This creates the "Trails" look. Compounded by step so the trails keep
      // the same length at any frame rate.
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - Math.pow(1 - trailOpacity, step)})`;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(step);
        p.draw(ctx);
      });
    };

    // Runs only while the footer is on screen in a visible tab, and never
    // with reduced motion. Nothing is set up until the footer is first seen.
    const sync = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      lastDraw = 0;
      if (!inView || document.hidden || reducedMotion.matches) return;
      if (!started) {
        started = true;
        init();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT LISTENERS ---
    const resizeObserver = new ResizeObserver(() => {
      if (container.clientWidth === width && container.clientHeight === height) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (started) init();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      // Starts a little early so the trails are already flowing on arrival.
      { rootMargin: "200px 0px" },
    );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full bg-black overflow-hidden",
        className
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
