import SmokeCanvas from "@/components/shared/SmokeCanvas"
import { cn } from "@/lib/utils"

type GlowHorizonProps = {
  className?: string
}

export default function GlowHorizon({ className = '' }: GlowHorizonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("glow-horizon pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="glow-horizon-haze absolute inset-0" />
      <SmokeCanvas className="glow-horizon-deep absolute inset-0 h-full w-full" />
      <div className="glow-horizon-pale absolute inset-0" />
      <div className="glow-horizon-rim absolute inset-0" />

      <style>{`
        /* Every layer is a parent-sized gradient drawn from the same circle,
           so the colour hugs the arc and the arc stays centred at any size. */
        .glow-horizon {
          --glow-radius: max(150vw, 900px);
          --glow-apex: 78%;
          --glow-center: 50% calc(var(--glow-apex) + var(--glow-radius));
          /* Reach is capped by width too, or phones get a tall column of colour. */
          --glow-reach: min(1vh, 1.1vw);
        }

        @media (max-width: 640px) {
          .glow-horizon {
            --glow-apex: 84%;
          }
        }

        .glow-horizon-haze {
          background: radial-gradient(ellipse 48vw 46vh at 50% 48%, rgba(30, 10, 78, 0.42) 0%, rgba(30, 10, 78, 0.2) 52%, rgba(30, 10, 78, 0) 100%);
        }

        /* Violet to teal, saturated, reaching up behind the hero copy. SmokeCanvas
           paints the moving smoke; this gradient only shows if WebGL is missing. */
        .glow-horizon-deep {
          background: linear-gradient(90deg, rgba(46, 26, 130, 0) 16%, rgb(46, 26, 130) 32%, rgb(32, 54, 128) 50%, rgb(14, 86, 118) 66%, rgba(14, 86, 118, 0) 82%);
          mask-image: radial-gradient(circle at var(--glow-center), transparent calc(var(--glow-radius) - 2px), #000 var(--glow-radius), rgba(0, 0, 0, 0.62) calc(var(--glow-radius) + 9 * var(--glow-reach)), rgba(0, 0, 0, 0.24) calc(var(--glow-radius) + 19 * var(--glow-reach)), transparent calc(var(--glow-radius) + 34 * var(--glow-reach)));
        }

        /* The same sweep, paler, packed tight against the rim. */
        .glow-horizon-pale {
          background: linear-gradient(90deg, rgba(92, 78, 156, 0) 20%, rgb(92, 78, 156) 33%, rgb(118, 146, 190) 50%, rgb(96, 158, 184) 64%, rgba(96, 158, 184, 0) 78%);
          mask-image: radial-gradient(circle at var(--glow-center), transparent calc(var(--glow-radius) - 2px), rgba(0, 0, 0, 0.78) var(--glow-radius), rgba(0, 0, 0, 0.3) calc(var(--glow-radius) + 4 * var(--glow-reach)), transparent calc(var(--glow-radius) + 14 * var(--glow-reach)));
        }

        /* A hairline of white that bleeds inward, tapering off at both ends. */
        .glow-horizon-rim {
          background: radial-gradient(circle at var(--glow-center), transparent calc(var(--glow-radius) - 44px), rgba(255, 255, 255, 0.1) calc(var(--glow-radius) - 26px), rgba(255, 255, 255, 0.42) calc(var(--glow-radius) - 8px), rgb(240, 243, 248) calc(var(--glow-radius) - 1.5px), rgba(240, 243, 248, 0.5) calc(var(--glow-radius) + 1px), transparent calc(var(--glow-radius) + 7px));
          mask-image: linear-gradient(90deg, transparent 8%, rgba(0, 0, 0, 0.55) 22%, #000 38%, #000 62%, rgba(0, 0, 0, 0.55) 78%, transparent 92%);
        }

        @keyframes glow-horizon-breathe {
          0%, 100% {
            opacity: 0.82;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .glow-horizon-pale {
            animation: glow-horizon-breathe 10s ease-in-out infinite;
          }
        }
      `}</style>
    </div>
  )
}
