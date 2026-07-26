"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Citation } from "@/components/sections/about/story/citation";
import { DOLLAR_STREET } from "@/components/sections/about/story/dollar-street";
import {
  BIN_BOTTOM,
  BIN_EDGES,
  BIN_TOP,
  BRACKETS,
  BURST_SIZE,
  CUMULATIVE,
  H,
  PAD,
  R,
  ROWS,
  TRAY,
  W,
  binAt,
  buildWalk,
  clamp,
  matchScore,
  roundShares,
  segPoint
} from "@/components/sections/about/story/pachinko/board";
import { MathNote } from "@/components/sections/about/story/pachinko/math-note";
import {
  drawScene,
  flightEnd,
  pushTrail
} from "@/components/sections/about/story/pachinko/render";
import type {
  Flight,
  Pulse
} from "@/components/sections/about/story/pachinko/render";
import {
  addBody,
  containBall,
  createBall,
  createWorld,
  metaOf,
  removeBody,
  sleep,
  speedOf,
  stepWorld
} from "@/components/sections/about/story/pachinko/world";
import {
  BOARD_SOURCES,
  referenceById
} from "@/components/sections/about/story/references";
import type Matter from "matter-js";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const BURST_STAGGER = 85; // ms between balls in a burst
const SETTLE_MS = 5000; // count a ball even if it never fully sleeps
const GIVE_UP_MS = 10000; // force it to sleep so the loop can stop
const BAR_SPRING = { type: "spring", stiffness: 140, damping: 22 } as const;
const DEMO_BRACKET = 2; // the card shown once, unprompted, to teach the hover

export function WealthPachinko() {
  const prefersReducedMotion = useReducedMotion();
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [ballsLeft, setBallsLeft] = useState(TRAY);
  const [peek, setPeek] = useState<number | null>(null);

  const total = counts.reduce((a, b) => a + b, 0);
  const shares = counts.map(n => (total ? n / total : 0));
  const percent = roundShares(counts);
  const match = matchScore(counts);
  const empty = total === 0 && ballsLeft === TRAY;

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  // Renderer state, mutated in place to avoid per-frame allocation.
  const sceneRef = useRef({
    balls: [] as Matter.Body[],
    flights: [] as Flight[],
    pulses: [] as Pulse[],
    peek: null as number | null
  });

  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const lastFrameRef = useRef(0);
  const interactedRef = useRef(false);
  const autoDroppedRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ballsLeftRef = useRef(TRAY);
  const userPeekedRef = useRef(false);
  const reducedRef = useRef(false);
  reducedRef.current = !!prefersReducedMotion;

  const paint = useCallback((now = performance.now()) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawScene(ctx, sceneRef.current, now);
  }, []);

  // Mirror the inspected bracket into the scene so the canvas can dim others.
  useEffect(() => {
    sceneRef.current.peek = peek;
    if (!runningRef.current) paint();
  }, [peek, paint]);

  // Take up to n balls from the tray; returns how many were available.
  function takeBalls(n: number) {
    const take = Math.min(n, ballsLeftRef.current);
    ballsLeftRef.current -= take;
    setBallsLeft(ballsLeftRef.current);
    return take;
  }

  function recordLanding(bin: number) {
    setCounts(c => c.map((n, i) => (i === bin ? n + 1 : n)));
  }

  // Called when a ball stops moving: assign its bin and count it.
  function settleBall(body: Matter.Body, now: number) {
    const meta = metaOf(body);
    if (meta.counted) return;
    meta.counted = true;
    meta.bin = binAt(clamp(body.position.x, PAD + R, W - PAD - R));

    sceneRef.current.pulses.push({ bin: meta.bin, t0: now });
    recordLanding(meta.bin);
  }

  // Advance peg-field flights. A finished flight is replaced by a physics
  // body carrying its exit velocity.
  function updateFlights(now: number) {
    const scene = sceneRef.current;
    const stillFlying: Flight[] = [];

    for (const fl of scene.flights) {
      const t = (now - fl.t0) / 1000;

      while (fl.segIdx < fl.segs.length - 1 && t >= fl.segs[fl.segIdx].t1) {
        fl.segIdx++;
        const seg = fl.segs[fl.segIdx];
        if (seg.impact) {
          fl.impactAt = now - (t - seg.t0) * 1000;
        }
      }

      if (t < fl.total) {
        if (t > 0.05) pushTrail(fl.trail, segPoint(fl.segs[fl.segIdx], t));
        stillFlying.push(fl);
        continue;
      }

      const engine = (engineRef.current ??= createWorld());
      const end = flightEnd(fl);
      const body = createBall(end.x, end.y, fl.exit, {
        bornAt: now,
        trail: fl.trail
      });
      addBody(engine, body);
      scene.balls.push(body);
    }

    scene.flights = stillFlying;
  }

  // Per-frame bookkeeping for balls in the physics world.
  function updateBalls(now: number) {
    const scene = sceneRef.current;
    const keep: Matter.Body[] = [];

    for (const body of scene.balls) {
      const meta = metaOf(body);

      // Outside the bounds: drop this ball only. A tray of 100 fits in the
      // bins, so nothing else is removed.
      const escaped =
        body.position.y > BIN_BOTTOM + 30 ||
        body.position.x < PAD - R ||
        body.position.x > W - PAD + R ||
        body.position.y < -40;
      if (escaped) {
        if (!meta.counted) {
          meta.counted = true; // still owed its birth
          recordLanding(binAt(clamp(body.position.x, PAD + R, W - PAD - R)));
        }
        removeBody(engineRef.current, body);
        continue;
      }

      // Enable divider collisions once the ball is inside the bin area.
      if (body.position.y > BIN_TOP - 4) {
        body.collisionFilter.mask = 0xffffffff;
      }
      containBall(body);

      if (!meta.counted && (body.isSleeping || now - meta.bornAt > SETTLE_MS)) {
        settleBall(body, now);
      }
      if (!body.isSleeping && now - meta.bornAt > GIVE_UP_MS) sleep(body);

      if (!body.isSleeping && speedOf(body) > 220) {
        pushTrail(meta.trail, { x: body.position.x, y: body.position.y });
      } else if (meta.trail.length) {
        meta.trail.shift();
      }

      keep.push(body);
    }

    scene.balls = keep;
  }

  function step(now: number) {
    const scene = sceneRef.current;
    const dt = Math.min(0.05, (now - lastFrameRef.current) / 1000);
    lastFrameRef.current = now;

    updateFlights(now);
    if (engineRef.current && scene.balls.length) {
      stepWorld(engineRef.current, dt);
    }
    updateBalls(now);
    scene.pulses = scene.pulses.filter(p => now - p.t0 < 460);
    paint(now);

    const busy =
      scene.flights.length ||
      scene.pulses.length ||
      scene.balls.some(b => !b.isSleeping);
    if (busy) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      runningRef.current = false;
    }
  }

  function ensureLoop() {
    if (runningRef.current) return;
    runningRef.current = true;
    lastFrameRef.current = performance.now();
    rafRef.current = requestAnimationFrame(step);
  }

  // Drop one ball: build its walk, then animate it unless motion is reduced.
  function spawn() {
    const walk = buildWalk();
    const scene = sceneRef.current;

    // No animation: record the landing immediately.
    if (reducedRef.current || scene.flights.length > 150) {
      recordLanding(binAt(walk.landX));
      return;
    }

    scene.flights.push({
      ...walk,
      t0: performance.now(),
      segIdx: 0,
      impactAt: -1,
      trail: []
    });
    ensureLoop();
  }

  function drop() {
    interactedRef.current = true;
    if (takeBalls(1)) spawn();
  }

  function dropBurst() {
    interactedRef.current = true;
    const n = takeBalls(BURST_SIZE);
    if (!n) return;

    if (reducedRef.current) {
      for (let i = 0; i < n; i++) spawn();
      return;
    }
    for (let i = 0; i < n; i++) {
      timeoutsRef.current.push(setTimeout(() => spawn(), i * BURST_STAGGER));
    }
  }

  function reset() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const scene = sceneRef.current;
    for (const body of scene.balls) removeBody(engineRef.current, body);
    scene.balls = [];
    scene.flights = [];
    scene.pulses = [];

    ballsLeftRef.current = TRAY;

    setBallsLeft(TRAY);
    setCounts([0, 0, 0, 0]);
    paint();
  }

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const cssWidth = wrap.clientWidth;
      if (!cssWidth) return;
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssWidth * (H / W) * dpr);
      const scale = (cssWidth / W) * dpr;
      canvas.getContext("2d")?.setTransform(scale, 0, 0, scale, 0, 0);
      paint();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Drop one ball the first time the board is scrolled into view.
    const io = new IntersectionObserver(
      entries => {
        if (
          entries.some(entry => entry.isIntersecting) &&
          !interactedRef.current &&
          !autoDroppedRef.current &&
          !reducedRef.current
        ) {
          autoDroppedRef.current = true;
          timeoutsRef.current.push(
            setTimeout(() => {
              if (takeBalls(1)) spawn();
            }, 450)
          );
          // Demonstrate the bracket cards once, rather than captioning them.
          timeoutsRef.current.push(
            setTimeout(() => {
              if (!userPeekedRef.current) setPeek(DEMO_BRACKET);
            }, 2200)
          );
          timeoutsRef.current.push(
            setTimeout(() => {
              if (!userPeekedRef.current) {
                setPeek(p => (p === DEMO_BRACKET ? null : p));
              }
            }, 4400)
          );
        }
      },
      { threshold: 0.5 }
    );
    io.observe(wrap);

    const timeouts = timeoutsRef.current;
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl border border-amber-200/40 bg-white/50 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-amber-200/40 pb-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900">
            The Birth Lottery
          </h3>
          <p
            className={`mt-0.5 font-mono text-[10px] tracking-wide tabular-nums ${
              ballsLeft === 0 ? "text-amber-700" : "text-gray-400"
            }`}
            aria-live="polite"
          >
            {ballsLeft === 0
              ? "OUT OF BALLS. RESET TO BE REBORN"
              : `${ballsLeft} BALLS LEFT`}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={drop}
            disabled={ballsLeft <= 0}
            className="rounded-full bg-gray-900 px-3.5 py-1.5 text-xs font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-40 motion-safe:transition-[transform,opacity] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] disabled:motion-safe:hover:translate-y-0"
          >
            Drop a ball
          </button>
          <button
            type="button"
            onClick={dropBurst}
            disabled={ballsLeft <= 0}
            aria-label={`Drop ${BURST_SIZE} balls at once`}
            className="rounded-full border border-gray-300 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-40 disabled:hover:bg-white/70 motion-safe:transition-[transform,background-color,opacity] motion-safe:active:scale-[0.94]"
          >
            ×{BURST_SIZE}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset the board"
            aria-hidden={empty}
            tabIndex={empty ? -1 : 0}
            className={`rounded-full px-1.5 py-1.5 text-sm leading-none text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 motion-safe:transition-[transform,color,opacity] motion-safe:active:scale-[0.9] ${
              empty ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            ↺
          </button>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative select-none"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full cursor-pointer"
          style={{ touchAction: "manipulation" }}
          onPointerDown={drop}
        />

        {/* Bracket labels are also the hover targets for the family card. */}
        {BRACKETS.map((bracket, i) => {
          const wide = BIN_EDGES[i].x1 - BIN_EDGES[i].x0 > 55;
          return (
            <button
              key={bracket.label}
              type="button"
              aria-label={`See a family living on ${bracket.income.replace("/mo", " a month")}`}
              aria-expanded={peek === i}
              onPointerEnter={e => {
                if (e.pointerType === "touch") return;
                userPeekedRef.current = true;
                setPeek(i);
              }}
              onPointerLeave={() => setPeek(p => (p === i ? null : p))}
              onFocus={() => {
                userPeekedRef.current = true;
                setPeek(i);
              }}
              onBlur={() => setPeek(p => (p === i ? null : p))}
              onPointerDown={e => {
                // Touch has no hover, so a tap inspects the bracket rather
                // than dropping a ball.
                if (e.pointerType === "touch") {
                  e.preventDefault();
                  userPeekedRef.current = true;
                  setPeek(p => (p === i ? null : i));
                  return;
                }
                drop();
              }}
              className="group absolute flex cursor-pointer flex-col items-center justify-end rounded-md pb-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              style={{
                left: `${(BIN_EDGES[i].x0 / W) * 100}%`,
                width: `${((BIN_EDGES[i].x1 - BIN_EDGES[i].x0) / W) * 100}%`,
                top: `${(BIN_TOP / H) * 100}%`,
                height: `${((BIN_BOTTOM + 26 - BIN_TOP) / H) * 100}%`
              }}
            >
              <span
                className={`whitespace-nowrap font-mono text-[10px] leading-tight tracking-wide transition-colors ${
                  peek === i ? "text-gray-700" : "text-gray-500"
                }`}
              >
                {wide
                  ? `${bracket.label.toUpperCase()} · ${bracket.share}%`
                  : `${bracket.share}%`}
              </span>
              <span
                className={`whitespace-nowrap font-mono text-[10px] leading-tight underline decoration-dotted underline-offset-2 transition-colors group-hover:decoration-solid ${
                  peek === i
                    ? "text-gray-600 decoration-gray-500"
                    : "text-gray-400 decoration-gray-300"
                }`}
              >
                {bracket.income}
              </span>
            </button>
          );
        })}

        {/* Ball count above each bin. */}
        {BRACKETS.map((bracket, i) =>
          counts[i] > 0 ? (
            <span
              key={`count-${bracket.label}`}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(BIN_EDGES[i].cx / W) * 100}%`,
                top: `${((BIN_TOP - 8) / H) * 100}%`
              }}
            >
              <motion.span
                key={counts[i]}
                initial={prefersReducedMotion ? false : { scale: 1.6, y: -3 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.45 }}
                className="block rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-bold tabular-nums text-gray-800 shadow-sm"
              >
                {counts[i]}
              </motion.span>
            </span>
          ) : null
        )}

        {/* Family card for the bracket being inspected. */}
        <AnimatePresence>
          {peek !== null && (
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 6, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 4, scale: 0.98 }
              }
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-none absolute z-20 w-[380px] max-w-[96%] -translate-x-1/2 rounded-xl border border-gray-200 bg-white/95 p-2.5 shadow-xl backdrop-blur-md"
              style={{
                left: `${clamp((BIN_EDGES[peek].cx / W) * 100, 22, 78)}%`,
                bottom: `${((H - BIN_TOP + 16) / H) * 100}%`,
                transformOrigin: "bottom center"
              }}
            >
              <p className="mb-1.5 font-mono text-[10px] leading-tight tracking-wide text-gray-600">
                {DOLLAR_STREET[peek].country.toUpperCase()}
                <span className="text-gray-500">
                  {" "}
                  · ${DOLLAR_STREET[peek].usd.toLocaleString()}/MO
                </span>
                <span className="text-gray-400"> 2025 USD</span>
                <br />
                <span className="text-gray-400">
                  ${DOLLAR_STREET[peek].ppp.toLocaleString()}/MO PPP ·{" "}
                  {DOLLAR_STREET[peek].year}
                </span>
              </p>
              <div className="flex gap-1.5">
                {DOLLAR_STREET[peek].things.map(thing => (
                  <figure key={thing.src} className="flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thing.src}
                      alt={`${thing.label} of a family in ${DOLLAR_STREET[peek].country} living on $${DOLLAR_STREET[peek].usd} a month`}
                      width={320}
                      height={320}
                      loading="lazy"
                      className="aspect-square w-full rounded-md object-cover"
                    />
                    <figcaption className="mt-1 font-mono text-[9px] text-gray-500">
                      {thing.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-1.5 font-mono text-[8px] leading-tight text-gray-400">
                Dollar Street / Gapminder, CC BY 4.0
              </p>
              {/* Caret pointing at the bracket. */}
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-gray-200 bg-white/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample distribution compared against the world's. */}
      <div className="mt-4 space-y-1.5">
        <Bar
          label={`YOU · ${total}`}
          shares={shares}
          percents={percent}
          animate
          ticks
          description={
            total
              ? `Your ${total} drops: ${counts
                  .map((n, i) => `${n} ${BRACKETS[i].label.toLowerCase()}`)
                  .join(", ")}. Match with the world distribution: ${match}%.`
              : "No drops yet."
          }
          trailing={
            <span
              className={`font-mono text-[10px] tracking-wide tabular-nums ${
                match >= 90 ? "text-emerald-700" : "text-gray-600"
              }`}
              title="How closely your sample matches the world's true distribution"
            >
              MATCH {total ? `${match}%` : "—"}
            </span>
          }
        />

        <Bar
          label="WORLD"
          shares={BRACKETS.map(b => b.share / 100)}
          percents={BRACKETS.map(b => b.share)}
          dim
          description={`World distribution: ${BRACKETS.map(
            b => `${b.share}% ${b.label.toLowerCase()}`
          ).join(", ")}`}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 border-t border-amber-200/40 pt-2.5">
        {/* One quiet line; each name opens its full citation. */}
        <p className="text-balance font-mono text-[9px] leading-relaxed text-gray-400">
          Sources:{" "}
          {BOARD_SOURCES.map((id, i) => (
            <span key={id} className="whitespace-nowrap">
              {i > 0 && " · "}
              <Citation reference={referenceById(id)} />
            </span>
          ))}
        </p>

        <MathNote />
      </div>
    </div>
  );
}

// The YOU and WORLD rows are the same bar with different inputs.
function Bar({
  label,
  shares,
  percents,
  description,
  trailing,
  animate = false,
  dim = false,
  ticks = false
}: {
  label: string;
  shares: number[];
  percents: number[];
  description: string;
  trailing?: React.ReactNode;
  animate?: boolean;
  dim?: boolean;
  ticks?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-right font-mono text-[10px] tracking-wide text-gray-600">
        {label}
      </span>

      <div
        className={`relative flex h-5 flex-1 overflow-hidden rounded-full ${
          animate ? "bg-gray-100" : ""
        }`}
        role="img"
        aria-label={description}
      >
        {BRACKETS.map((bracket, i) => (
          <motion.div
            key={bracket.label}
            className={`flex h-full items-center justify-center overflow-hidden ${
              dim ? "opacity-70" : ""
            }`}
            style={{
              backgroundColor: bracket.spark,
              flexBasis: 0,
              ...(animate ? {} : { flexGrow: shares[i] })
            }}
            animate={animate ? { flexGrow: shares[i] } : undefined}
            transition={BAR_SPRING}
          >
            {shares[i] >= 0.14 && (
              <span className="font-mono text-[10px] font-semibold text-white">
                {percents[i]}%
              </span>
            )}
          </motion.div>
        ))}

        {/* Ticks at the world's cumulative boundaries. */}
        {ticks &&
          CUMULATIVE.map(p => (
            <span
              key={p}
              className="absolute inset-y-0 w-px bg-gray-900/25"
              style={{ left: `${p}%` }}
            />
          ))}
      </div>

      <span className="w-16 shrink-0">{trailing}</span>
    </div>
  );
}
