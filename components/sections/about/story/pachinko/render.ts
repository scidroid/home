// Canvas drawing for the board. Reads the scene, does not mutate it.
import {
  BIN_BOTTOM,
  BIN_EDGES,
  BIN_TOP,
  BRACKETS,
  CENTER,
  DIVIDERS,
  DIV_TOP,
  GRAVITY,
  H,
  PAD,
  PEG_ROWS,
  R,
  ROW_GAP,
  ROW_Y0,
  W,
  segPoint
} from "@/components/sections/about/story/pachinko/board";
import type { Seg } from "@/components/sections/about/story/pachinko/board";
import { metaOf } from "@/components/sections/about/story/pachinko/world";
import type Matter from "matter-js";

export type Flight = {
  segs: Seg[];
  total: number;
  exit: { vx: number; vy: number };
  t0: number;
  segIdx: number;
  impactAt: number;
  trail: { x: number; y: number }[];
};

export type Pulse = { bin: number; t0: number };

export type Scene = {
  balls: Matter.Body[];
  flights: Flight[];
  pulses: Pulse[];
  peek: number | null; // bracket being inspected, dimming the others
};

const STONE = "#d6d3d1";
const AMBER = "245, 158, 11";
const SQUASH_MS = 80;
const TRAIL_MAX = 6;

type Ctx = CanvasRenderingContext2D;

// Bins tile the full inner width with no gaps: only the two outer corners are
// rounded, and the posts sit centred on the shared edges, so nothing shows
// between a bin and the frame.
const binPath = (ctx: Ctx, i: number) => {
  const edge = BIN_EDGES[i];
  const last = BIN_EDGES.length - 1;
  const radii =
    i === 0 ? [5, 0, 0, 5] : i === last ? [0, 5, 5, 0] : [0, 0, 0, 0];
  ctx.beginPath();
  ctx.roundRect(
    edge.x0,
    BIN_TOP,
    edge.x1 - edge.x0,
    BIN_BOTTOM - BIN_TOP,
    radii
  );
};

const post = (ctx: Ctx, x: number) => {
  ctx.beginPath();
  ctx.roundRect(x, DIV_TOP, 3.5, BIN_BOTTOM - DIV_TOP, 1.75);
  ctx.fill();
};

// Squash factor for a body that collided `since` ms ago; 1 means no squash.
const squash = (since: number) =>
  since >= 0 && since < SQUASH_MS ? 0.68 + 0.32 * (since / SQUASH_MS) : 1;

function drawChute(ctx: Ctx) {
  ctx.strokeStyle = STONE;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(CENTER - 11, 2);
  ctx.lineTo(CENTER - 7, 12);
  ctx.moveTo(CENTER + 11, 2);
  ctx.lineTo(CENTER + 7, 12);
  ctx.stroke();
}

function drawBins(ctx: Ctx, scene: Scene, now: number) {
  // Bin widths come from the bracket shares. When one is being inspected the
  // others are dimmed.
  BIN_EDGES.forEach((_, i) => {
    ctx.globalAlpha = scene.peek !== null && scene.peek !== i ? 0.4 : 1;
    binPath(ctx, i);
    ctx.fillStyle = BRACKETS[i].tint;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Fading tint over a bin that just caught a ball.
  for (const pulse of scene.pulses) {
    const p = (now - pulse.t0) / 450;
    if (p >= 1) continue;
    binPath(ctx, pulse.bin);
    ctx.fillStyle = BRACKETS[pulse.bin].spark;
    ctx.globalAlpha = 0.22 * (1 - p);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Wall and divider posts, drawn from above the rims to the bin floor.
  ctx.fillStyle = STONE;
  for (const xd of DIVIDERS) post(ctx, xd - 1.75);
  post(ctx, PAD - 3.5);
  post(ctx, W - PAD);

  // Highlight ring last and inset, so the posts cannot clip it.
  if (scene.peek !== null) {
    const edge = BIN_EDGES[scene.peek];
    ctx.beginPath();
    ctx.roundRect(
      edge.x0 + 3,
      BIN_TOP + 2,
      edge.x1 - edge.x0 - 6,
      BIN_BOTTOM - BIN_TOP - 4,
      4
    );
    ctx.strokeStyle = BRACKETS[scene.peek].spark;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawPegs(ctx: Ctx) {
  ctx.fillStyle = STONE;
  PEG_ROWS.forEach((row, rowIdx) => {
    const y = ROW_Y0 + rowIdx * ROW_GAP;
    for (const x of row) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// Draw a ball: motion trail, then the body squashed/stretched along `angle`.
// The gradient highlight is offset in world space, not rotated with the body,
// so flying and resting balls share the same shading.
function drawBall(
  ctx: Ctx,
  x: number,
  y: number,
  angle: number,
  k: number,
  alpha: number,
  trail: { x: number; y: number }[]
) {
  if (alpha <= 0) return;

  if (trail.length > 1) {
    ctx.lineCap = "round";
    for (let i = 1; i < trail.length; i++) {
      const f = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.strokeStyle = `rgba(${AMBER}, ${0.16 * f * alpha})`;
      ctx.lineWidth = R * 1.5 * f;
      ctx.stroke();
    }
  }

  ctx.globalAlpha = alpha;
  const grad = ctx.createRadialGradient(x - R * 0.35, y - R * 0.35, 1, x, y, R);
  grad.addColorStop(0, "#fde68a");
  grad.addColorStop(1, "#f59e0b");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(x, y, R * k, R / k, angle, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(180, 83, 9, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawPile(ctx: Ctx, scene: Scene, now: number) {
  for (const body of scene.balls) {
    const meta = metaOf(body);
    const vx = body.velocity.x * 60;
    const vy = body.velocity.y * 60;
    const speed = body.isSleeping ? 0 : Math.hypot(vx, vy);
    const moving = speed > 40;
    const k = Math.min(
      squash(meta.impactAt > 0 ? now - meta.impactAt : -1),
      moving ? 1 + Math.min(0.2, speed / 3200) : 1
    );
    drawBall(
      ctx,
      body.position.x,
      body.position.y,
      moving ? Math.atan2(vy, vx) : 0,
      k,
      1,
      meta.trail
    );
  }
}

function drawFlights(ctx: Ctx, scene: Scene, now: number) {
  for (const fl of scene.flights) {
    const t = (now - fl.t0) / 1000;
    const seg = fl.segs[fl.segIdx];
    const { x, y, vy } = segPoint(seg, t);
    const hit = fl.impactAt > 0 ? now - fl.impactAt : -1;
    const squashed = hit >= 0 && hit < SQUASH_MS;
    drawBall(
      ctx,
      x,
      y,
      squashed ? 0 : Math.atan2(vy, seg.vx),
      squashed ? squash(hit) : 1 + Math.min(0.2, Math.hypot(seg.vx, vy) / 3200),
      t < 0.09 ? t / 0.09 : 1,
      fl.trail
    );
  }
}

export function drawScene(ctx: Ctx, scene: Scene, now: number) {
  ctx.clearRect(0, 0, W, H);
  drawChute(ctx);
  drawBins(ctx, scene, now);
  drawPegs(ctx);
  drawPile(ctx, scene, now);
  drawFlights(ctx, scene, now);
}

export function pushTrail(
  trail: { x: number; y: number }[],
  point: { x: number; y: number }
) {
  trail.push(point);
  if (trail.length > TRAIL_MAX) trail.shift();
}

// Final position of a flight, used as the spawn point for the physics body.
export function flightEnd(flight: Flight) {
  const last = flight.segs[flight.segs.length - 1];
  const d = last.t1 - last.t0;
  return {
    x: last.x0 + last.vx * d,
    y: last.y0 + last.vy0 * d + 0.5 * GRAVITY * d * d
  };
}
