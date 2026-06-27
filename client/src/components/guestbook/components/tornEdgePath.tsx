// ── Torn-paper edge (curved, not jagged) ─────────────────────────────────
// Real torn paper doesn't have sharp zigzag angles — the fibers tear in
// soft, uneven lobes. CSS polygon() can only draw straight segments, so a
// jagged zigzag is the ceiling of what it can do. This builds an SVG path
// with quadratic beziers between seeded points: each "tooth" bulges
// through a control point offset from the midpoint, which is what makes
// the lobe round instead of a sharp tent.
//
// All coordinates are in a 0–100 x 0–100 space, so the result drops
// straight into an <svg viewBox="0 0 100 100" preserveAspectRatio="none">
// and scales cleanly to any card size.

export interface TornEdge {
  /** Open path data for just the curved tear line itself (no closing). */
  d: string;
  /** Closed path data: tear line + straight sides/bottom, ready to fill
   *  as a solid panel. The fill always sits BELOW the curve (down to
   *  y=100), regardless of whether the curve was generated as a "top"
   *  or "bottom" edge — for a footer panel, the wave is the panel's top
   *  boundary and everything beneath it is the solid block. */
  panelD: string;
  xs: number[];
  ys: number[];
}

export interface TornEdgeOptions {
  edge?: "top" | "bottom";
  teeth?: number;
  /** How far the tear bulges, in viewBox units (0–100 scale). */
  depth?: number;
}

export default function tornEdgePath(
  seed: number,
  opts: TornEdgeOptions = {}
): TornEdge {
  const { edge = "bottom", teeth = 7, depth = 8 } = opts;

  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  // baseline sits near the relevant edge of the 0–100 box. For a "top"
  // edge tear used as a footer-panel boundary, the baseline sits high
  // (small y) so the wave has room to breathe above the avatar row that
  // follows beneath it. For "bottom", the baseline sits low, near the
  // card's own lower edge.
  const baseline = edge === "bottom" ? 92 : 16;
  const dir = edge === "bottom" ? 1 : -1; // which way each lobe tends to bulge

  // seeded point heights along the tear line — kept fairly tight so
  // neighboring points don't fight each other; the alternating bulge
  // step below does the actual shaping of each lobe
  const ys: number[] = [];
  for (let i = 0; i <= teeth; i++) {
    const jitter = (rand() - 0.5) * depth * 0.5;
    ys.push(baseline + jitter);
  }

  const xs: number[] = [];
  for (let i = 0; i <= teeth; i++) xs.push((100 / teeth) * i);

  // build the curved segment as a string of quadratic beziers, each
  // control point pulled outward from the segment midpoint so the lobe
  // between two teeth bows outward (the "torn" bulge) instead of forming
  // a flat connecting line or a sharp angle. Bulge direction alternates
  // per segment so the wave rises and falls evenly across the full
  // width — a continuous scallop, not one-directional jitter.
  let d = `M ${xs[0]},${ys[0]} `;
  for (let i = 0; i < teeth; i++) {
    const x0 = xs[i];
    const y0 = ys[i];
    const x1 = xs[i + 1];
    const y1 = ys[i + 1];
    const midX = (x0 + x1) / 2;
    const sign = i % 2 === 0 ? -1 : 1;
    const bulge = dir * sign * depth * (0.6 + rand() * 0.3);
    const ctrlY = (y0 + y1) / 2 + bulge;
    d += `Q ${midX},${ctrlY} ${x1},${y1} `;
  }
  d = d.trim();

  // IMPORTANT: panelD always closes downward (to y=100), never upward.
  // An earlier version closed "top" edges via `L 100,0 L 0,0`, which
  // filled the sliver ABOVE the wave instead of the footer block below
  // it — that bug is why a previous render showed almost no dark panel
  // at all. The fill we actually want, for either edge mode, is
  // "everything beneath this curve down to the bottom of the box."
  const panelD = `${d} L 100,100 L 0,100 Z`;

  return { d, panelD, xs, ys };
}