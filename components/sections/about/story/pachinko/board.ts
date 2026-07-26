// Board geometry, bracket data and the peg-field random walk.
// No canvas, physics engine or React here, so this is testable on its own.

// World Bank income groups. `share` is the percentage of world population in
// each group (2025) and also sets the bin width on the board.
//
// Thresholds are the FY2027 Atlas values exactly as the World Bank publishes
// them, $1,175 / $4,635 / $14,375 of GNI per person per YEAR, divided by 12
// and rounded to the nearest dollar: 97.9 -> 98, 386.3 -> 386, 1,197.9 ->
// 1,198. Sources: see SOURCES in dollar-street.ts.
export const BRACKETS = [
  {
    label: "Low",
    share: 9,
    tint: "#fee2e2",
    spark: "#f87171",
    income: "<$98 USD/mo",
    message: "low income. Less than $98 a month. 9% of humanity starts here."
  },
  {
    label: "Lower-mid",
    share: 36,
    tint: "#ffedd5",
    spark: "#fb923c",
    income: "$98-386 USD/mo",
    message:
      "lower-middle income. $98-386 a month. More than a third of us start here."
  },
  {
    label: "Upper-mid",
    share: 38,
    tint: "#fef3c7",
    spark: "#fbbf24",
    income: "$386-1,198 USD/mo",
    message: "upper-middle income. $386-1,198 a month. Colombia sits here."
  },
  {
    label: "High",
    share: 17,
    tint: "#d1fae5",
    spark: "#34d399",
    income: ">$1,198 USD/mo",
    message: "high income. More than $1,198 a month. The luckiest 17%."
  }
] as const;

// Board geometry in logical units; the canvas scales to fit its box.
export const W = 360;
export const H = 300;
export const PAD = 12;
export const R = 4.5; // ball radius
export const GRAVITY = 2600; // px/s², shared by the flight and the engine
export const ROWS = 16; // enough rows for every bin to be reachable
export const ROW_Y0 = 28;
export const ROW_GAP = 12;
export const STEP = 11; // lateral half-step per bounce
export const CENTER = W / 2;
export const BIN_TOP = 224;
export const BIN_BOTTOM = 268;
export const DROP_Y = 8;
export const FLOOR = BIN_BOTTOM - 3;
export const DIV_TOP = BIN_TOP - 10; // top of the divider posts as drawn
export const FENCE_TOP = 174; // dividers extend above the drawn posts
export const FENCE_CATEGORY = 0x0002; // see createBall in world.ts

export const BURST_SIZE = 20;
export const TRAY = 100; // balls available per session

export const PEG_ROWS = Array.from({ length: ROWS }, (_, row) => {
  const xs: number[] = [];
  for (let s = -ROWS; s <= ROWS; s++) {
    if ((s + row) % 2 !== 0) continue;
    const x = CENTER + s * STEP;
    if (x >= PAD + 6 && x <= W - PAD - 6) xs.push(x);
  }
  return xs;
});

const contactY = (row: number) => ROW_Y0 + row * ROW_GAP - 10;

export const BIN_EDGES = (() => {
  const inner = W - PAD * 2;
  let x = PAD;
  return BRACKETS.map(bracket => {
    const width = (inner * bracket.share) / 100;
    const edge = { x0: x, x1: x + width, cx: x + width / 2 };
    x += width;
    return edge;
  });
})();

export const DIVIDERS = BIN_EDGES.slice(0, -1).map(edge => edge.x1);

// Cumulative bracket boundaries as percentages, used for the tick marks on
// the distribution bar.
export const CUMULATIVE = BRACKETS.slice(0, -1).reduce<number[]>(
  (acc, bracket) => [...acc, (acc.at(-1) ?? 0) + bracket.share],
  []
);

export const binAt = (x: number) => {
  const i = BIN_EDGES.findIndex(edge => x < edge.x1);
  return i === -1 ? BRACKETS.length - 1 : i;
};

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
export const rand = (min: number, max: number) =>
  min + Math.random() * (max - min);

// Per-peg probability of bouncing right, indexed [row][offset + ROWS].
//
// A fair Galton board produces a binomial distribution. To get the bracket
// distribution instead, the probabilities are biased with a Doob h-transform
// over the bounce lattice: each ball is still an independent random walk, but
// the landing frequencies converge on the target shares. Computed once.
const P_RIGHT = (() => {
  const choose = (n: number, k: number) => {
    let c = 1;
    for (let i = 0; i < k; i++) c = (c * (n - i)) / (i + 1);
    return c;
  };

  // Target probability per exit slot, proportional to the board width that
  // slot covers. This makes the landing x uniform, so each bin catches balls
  // in proportion to its width.
  const q = Array.from({ length: ROWS + 1 }, (_, k) => {
    const x = CENTER + (2 * k - ROWS) * STEP;
    return Math.max(
      0.0001,
      Math.min(W - PAD, x + STEP) - Math.max(PAD, x - STEP)
    );
  });
  const totalQ = q.reduce((a, b) => a + b, 0);

  // Backward pass: leaf potentials φ = q / (#paths), then V sums upward.
  // p(right) = V(child right) / V(node) reproduces q exactly.
  const V: number[][] = Array.from({ length: ROWS + 1 }, () =>
    new Array(2 * ROWS + 1).fill(0)
  );
  for (let k = 0; k <= ROWS; k++) {
    V[ROWS][2 * k] = q[k] / totalQ / choose(ROWS, k);
  }
  for (let row = ROWS - 1; row >= 0; row--) {
    for (let s = -row; s <= row; s += 2) {
      V[row][s + ROWS] = V[row + 1][s - 1 + ROWS] + V[row + 1][s + 1 + ROWS];
    }
  }
  const p: number[][] = Array.from({ length: ROWS }, () =>
    new Array(2 * ROWS + 1).fill(0.5)
  );
  for (let row = 0; row < ROWS; row++) {
    for (let s = -row; s <= row; s += 2) {
      p[row][s + ROWS] = V[row + 1][s + 1 + ROWS] / V[row][s + ROWS];
    }
  }
  return p;
})();

// One parabolic hop between two pegs: position at time t is
// (x0 + vx·dt, y0 + vy0·dt + ½·GRAVITY·dt²).
export type Seg = {
  t0: number;
  t1: number;
  x0: number;
  y0: number;
  vx: number;
  vy0: number;
  impact?: boolean;
};

export type Walk = {
  segs: Seg[];
  total: number;
  exit: { vx: number; vy: number };
  landX: number;
};

// Build the full peg-field trajectory for one ball.
//
// Velocity is continuous across bounces: each hop launches at a restitution
// fraction of the previous impact speed, and its duration is derived from the
// kinematics rather than being a fixed value. The returned `exit` velocity is
// handed to the physics engine when the flight ends.
export function buildWalk(): Walk {
  const segs: Seg[] = [];
  let t = 0;
  let s = 0;
  let x = CENTER;
  let y = DROP_Y;
  let vy = 0;

  const fall = (nx: number, ny: number, vyLaunch: number, impact?: boolean) => {
    const dy = ny - y;
    const d =
      (-vyLaunch +
        Math.sqrt(Math.max(0, vyLaunch * vyLaunch + 2 * GRAVITY * dy))) /
      GRAVITY;
    segs.push({
      t0: t,
      t1: t + d,
      x0: x,
      y0: y,
      vx: d > 0 ? (nx - x) / d : 0,
      vy0: vyLaunch,
      impact
    });
    t += d;
    x = nx;
    y = ny;
    vy = vyLaunch + GRAVITY * d;
  };

  // Free fall from the chute to the first peg, then one coin flip per row.
  fall(CENTER, contactY(0), 0);
  for (let row = 0; row < ROWS - 1; row++) {
    s += Math.random() < P_RIGHT[row][s + ROWS] ? 1 : -1;
    fall(CENTER + s * STEP, contactY(row + 1), -rand(0.3, 0.42) * vy, true);
  }
  const lastDir = Math.random() < P_RIGHT[ROWS - 1][s + ROWS] ? 1 : -1;

  // The last bounce adds lateral velocity: the half-step from the final flip
  // plus a uniform drift across the slot, which spreads landings evenly.
  const vyLaunch = -rand(0.16, 0.26) * vy;
  const drift = lastDir * STEP + rand(-STEP, STEP);
  const dEst =
    (-vyLaunch +
      Math.sqrt(vyLaunch * vyLaunch + 2 * GRAVITY * (FLOOR - R - y))) /
    GRAVITY;

  return {
    segs,
    total: t,
    exit: { vx: drift / dEst, vy: vyLaunch },
    landX: clamp(x + drift, PAD + R, W - PAD - R)
  };
}

// Position and vertical velocity of a ball at time t within a segment.
export function segPoint(seg: Seg, t: number) {
  const dt = Math.min(t, seg.t1) - seg.t0;
  return {
    x: seg.x0 + seg.vx * dt,
    y: seg.y0 + seg.vy0 * dt + 0.5 * GRAVITY * dt * dt,
    vy: seg.vy0 + GRAVITY * dt
  };
}

// Whole percentages that still sum to 100, by largest remainder. Rounding
// each share on its own leaves the row reading 99% or 101%.
export function roundShares(counts: number[]) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return counts.map(() => 0);
  const exact = counts.map(n => (n / total) * 100);
  const out = exact.map(Math.floor);
  const order = exact
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);
  let left = 100 - out.reduce((a, b) => a + b, 0);
  for (let k = 0; k < order.length && left > 0; k++, left--) out[order[k].i]++;
  return out;
}

// 1 − total variation distance between the sample and the true distribution,
// as a percentage.
export function matchScore(counts: number[]) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return 0;
  const tvd =
    0.5 *
    counts.reduce(
      (acc, n, i) => acc + Math.abs(n / total - BRACKETS[i].share / 100),
      0
    );
  return Math.round((1 - tvd) * 100);
}
