import { cn } from "@/lib/utils"

type GlowHorizonProps = {
  className?: string
}

export default function GlowHorizon({ className = '' }: GlowHorizonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-black", className)}
    >
      <div className="glow-horizon-haze absolute left-1/2 h-[170vh] w-[340vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(42,26,77,0.62)_0%,rgba(28,18,52,0.36)_20%,rgba(0,0,0,0)_72%)] opacity-90 blur-[110px]" />

      <div
        className="glow-horizon-core absolute left-1/2 bottom-[-170vh] h-[2250px] w-[2250px] -translate-x-1/2 rounded-full border-t border-white/90 opacity-95"
        style={{
          boxShadow:
            '0 0 28px 8px rgba(255,255,255,0.18), 0 0 72px 22px rgba(180,160,255,0.36), 0 0 180px 70px rgba(120,90,200,0.24)',
          filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.32))'
        }}
      />

      <div
        className="glow-horizon-core absolute left-1/2 bottom-[-172vh] h-[2300px] w-[2300px] -translate-x-1/2 rounded-full border-t border-white/50 opacity-60 blur-lg"
        style={{
          boxShadow:
            '0 0 64px 26px rgba(180,160,255,0.28), 0 0 150px 72px rgba(120,90,200,0.22)'
        }}
      />

      <div className="absolute left-1/2 bottom-[18%] h-[34vh] w-[88vw] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_10%,rgba(255,255,255,0)_60%)] opacity-70 blur-[18px]" />

      <div className="glow-horizon-haze absolute left-1/2 bottom-[31vh] h-[28vh] w-[76vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(42,26,77,0.7)_0%,rgba(42,26,77,0.42)_18%,rgba(0,0,0,0)_72%)] blur-[120px]" />

      <div className="absolute bottom-[18%] left-[18%] h-[34vh] w-[2px] bg-[linear-gradient(to_top,rgba(255,255,255,0.12),rgba(255,255,255,0))] opacity-35 blur-[1px]" />
      <div className="absolute bottom-[16%] left-[34%] h-[42vh] w-px bg-[linear-gradient(to_top,rgba(255,255,255,0.1),rgba(255,255,255,0))] opacity-25 blur-[1px]" />
      <div className="absolute bottom-[15%] left-1/2 h-[44vh] w-px -translate-x-1/2 bg-[linear-gradient(to_top,rgba(255,255,255,0.14),rgba(255,255,255,0))] opacity-35 blur-[1px]" />
      <div className="absolute bottom-[17%] right-[34%] h-[40vh] w-px bg-[linear-gradient(to_top,rgba(255,255,255,0.1),rgba(255,255,255,0))] opacity-25 blur-[1px]" />
      <div className="absolute bottom-[18%] right-[18%] h-[31vh] w-[2px] bg-[linear-gradient(to_top,rgba(255,255,255,0.11),rgba(255,255,255,0))] opacity-35 blur-[1px]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_58%,rgba(0,0,0,0.82)_100%)]" />

      <style>{`
        @keyframes glow-horizon-pulse {
          0%, 100% {
            opacity: 0.88;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.012);
          }
        }

        @keyframes glow-horizon-haze {
          0%, 100% {
            opacity: 0.78;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.95;
            transform: translateX(-50%) scale(1.03);
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .glow-horizon-core {
            animation: glow-horizon-pulse 10s ease-in-out infinite;
            transform-origin: center;
          }

          .glow-horizon-haze {
            animation: glow-horizon-haze 12s ease-in-out infinite;
            transform-origin: center;
          }
        }
      `}</style>
    </div>
  )
}