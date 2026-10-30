import { ArrowUpRight } from "@phosphor-icons/react";
import { promo } from "./linksData";

const NODE_SIZE = 18;

const LIVE_NODES = {
  entry: { x: 70, y: 22 },
  a: { x: 150, y: 14 },
  b: { x: 130, y: 82 },
  c: { x: 28, y: 92 },
  d: { x: 212, y: 56 },
  e: { x: 86, y: 150 },
};

const DEAD_NODES = {
  f: { x: 290, y: 24 },
  g: { x: 296, y: 96 },
  h: { x: 226, y: 134 },
};

const LIVE_EDGES = [
  [LIVE_NODES.entry, LIVE_NODES.a],
  [LIVE_NODES.entry, LIVE_NODES.b],
  [LIVE_NODES.entry, LIVE_NODES.c],
  [LIVE_NODES.a, LIVE_NODES.d],
  [LIVE_NODES.b, LIVE_NODES.d],
  [LIVE_NODES.b, LIVE_NODES.e],
  [LIVE_NODES.c, LIVE_NODES.e],
];

const DEAD_EDGES = [
  [DEAD_NODES.f, DEAD_NODES.g],
  [DEAD_NODES.g, DEAD_NODES.h],
];

// A dependency graph with a cluster nothing imports: the code Deadweight finds.
export default function DeadweightPromo({ className = "" }: { className?: string }) {
  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block w-82.5 ${className}`}
    >
      <span className="ml-17.5 block pl-3">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          {promo.label}
        </span>
        <span className="mt-1 flex items-center gap-3 font-display text-3xl leading-tight text-white">
          {promo.title}
          <span className="flex size-7 items-center justify-center rounded-md border border-white/15 text-zinc-300 transition-colors group-hover:border-white/40 group-hover:text-white">
            <ArrowUpRight size={13} />
          </span>
        </span>
      </span>

      <svg aria-hidden="true" viewBox="0 0 330 170" className="mt-2 h-auto w-full overflow-visible">
        <line
          x1={LIVE_NODES.entry.x}
          y1={LIVE_NODES.entry.y}
          x2={LIVE_NODES.entry.x}
          y2={-62}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.8}
        />

        {LIVE_EDGES.map(([from, to], index) => (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={0.9}
          />
        ))}
        {DEAD_EDGES.map(([from, to], index) => (
          <line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(248,113,113,0.6)"
            strokeWidth={0.9}
            strokeDasharray="3 3"
          />
        ))}

        {Object.values(LIVE_NODES).map((node, index) => (
          <rect
            key={index}
            x={node.x - NODE_SIZE / 2}
            y={node.y - NODE_SIZE / 2}
            width={NODE_SIZE}
            height={NODE_SIZE}
            rx={5}
            fill="#0c0c0e"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth={0.9}
          />
        ))}
        {Object.values(DEAD_NODES).map((node, index) => (
          <g key={index} className="motion-safe:animate-pulse">
            <rect
              x={node.x - NODE_SIZE / 2}
              y={node.y - NODE_SIZE / 2}
              width={NODE_SIZE}
              height={NODE_SIZE}
              rx={5}
              fill="#0c0c0e"
              stroke="#f87171"
              strokeWidth={0.9}
              strokeDasharray="3 2"
            />
            <path
              d={`M${node.x - 3.5} ${node.y - 3.5}l7 7m0-7l-7 7`}
              stroke="#f87171"
              strokeWidth={1.1}
              strokeLinecap="round"
            />
          </g>
        ))}

        <circle cx={LIVE_NODES.entry.x} cy={LIVE_NODES.entry.y} r={3.2} fill="#3b82f6" />

        <text
          x={262}
          y={158}
          fill="#f87171"
          fontSize={10}
          letterSpacing={1.5}
          className="font-mono uppercase"
        >
          Unused
        </text>
      </svg>
    </a>
  );
}
