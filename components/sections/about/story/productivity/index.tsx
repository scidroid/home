"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { ChartNote } from "@/components/sections/about/story/productivity/note";
import { CountrySearch } from "@/components/sections/about/story/productivity/search";
import { SourceLine } from "@/components/sections/about/story/shared/citation";
import {
  Figure,
  FigureTitle
} from "@/components/sections/about/story/shared/figure";
import { Flag } from "@/components/ui/emoji";
import type { IncomeGroup } from "@/data/income-brackets";
import { BRACKETS } from "@/data/income-brackets";
import {
  MEDIAN_HOURS,
  MEDIAN_INCOME,
  REFERENCE_YEAR,
  TRIMMED_HOURS,
  countries,
  isOutlier
} from "@/data/productivity";
import type { Country } from "@/data/productivity";
import { CHART_SOURCES } from "@/data/references";
import { useIsMobile } from "@/hooks/mobile";
import { useReducedMotion } from "motion/react";

import { clamp } from "@/utils/math";

const W = 560;
const H = 380;
const PAD = { top: 22, right: 16, bottom: 46, left: 50 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const RIGHT = PAD.left + PLOT_W;
const BOTTOM = PAD.top + PLOT_H;

// Income runs from $1.76 to $118 a day, so that axis is logarithmic. On a
// linear one every poor country would pile up on the floor.
type View = { x0: number; x1: number; y0: number; y1: number };
// The chart opens on the window that holds everything but the hours outliers,
// which is where the cloud is actually legible. ALL puts them back.
const TRIMMED: View = {
  x0: TRIMMED_HOURS.lo,
  x1: TRIMMED_HOURS.hi,
  y0: 1,
  y1: 150
};
const ALL: View = { x0: 21, x1: 55, y0: 1, y1: 150 };

const lg = Math.log10;

const REGION_COLOR: Record<string, string> = {
  Africa: "#f59e0b",
  Asia: "#0ea5e9",
  Europe: "#10b981",
  "North America": "#3b82f6",
  "South America": "#8b5cf6",
  Oceania: "#ec4899"
};
const REGIONS = Object.keys(REGION_COLOR);

// The Gini becomes a halo: the wider the ring, the more the single median dot
// hides about how that country splits what it earns.
const GINI = { min: 0.23, max: 0.6 };
const spread = (gini: number) =>
  clamp((gini - GINI.min) / (GINI.max - GINI.min), 0, 1);

// The named dots sit in the densest part of the cloud, so their labels are
// placed by hand rather than by rule. dy nudges a name off its neighbour.
const LABEL: Record<string, { side: "left" | "right"; dy: number }> = {
  DEU: { side: "left", dy: 3 },
  USA: { side: "left", dy: 3 },
  MEX: { side: "left", dy: -6 },
  COL: { side: "left", dy: 12 },
  ZAF: { side: "left", dy: 13 },
  IND: { side: "right", dy: 3 }
};

const Y_COARSE = [1, 2, 5, 10, 20, 50, 100];
const Y_FINE = [1, 1.5, 2, 3, 5, 7, 10, 15, 20, 30, 50, 70, 100];

function xTicks({ x0, x1 }: View) {
  const span = x1 - x0;
  const step = span > 13 ? 5 : span > 7 ? 2 : span > 3 ? 1 : 0.5;
  const first = Math.ceil(x0 / step);
  const out: number[] = [];
  for (let i = first; i * step <= x1; i++)
    out.push(Math.round(i * step * 2) / 2);
  return out;
}

function yTicks({ y0, y1 }: View) {
  const coarse = Y_COARSE.filter(t => t >= y0 && t <= y1);
  if (coarse.length >= 4) return coarse;
  const fine = Y_FINE.filter(t => t >= y0 && t <= y1);
  return fine.length > coarse.length ? fine : coarse;
}

export function ProductivityChart() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const [view, setView] = useState<View>(TRIMMED);
  const [box, setBox] = useState<null | {
    x: number;
    y: number;
    w: number;
    h: number;
  }>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [group, setGroup] = useState<IncomeGroup | null>(null);
  const [hovered, setHovered] = useState<Country | null>(null);
  const [picked, setPicked] = useState<Country | null>(null);
  const [entered, setEntered] = useState(false);

  const zoomed = view !== TRIMMED;

  const reset = () => {
    setView(TRIMMED);
    setRegion(null);
    setGroup(null);
    setPicked(null);
  };

  // Picking a country from the search brings it into view rather than leaving
  // the reader to find a dot that may be clipped or buried.
  const pick = (d: Country) => {
    setPicked(d);
    setRegion(null);
    setGroup(null);
    setView(v =>
      d.hours >= v.x0 && d.hours <= v.x1 && d.income >= v.y0 && d.income <= v.y1
        ? v
        : isOutlier(d)
          ? ALL
          : TRIMMED
    );
  };

  // One observer for the whole scatter, not one per dot. The per dot version
  // stalled halfway whenever the chart was scrolled past quickly.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { rootMargin: "-40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A zoom is affine in (hours, log income), so every scale is derived here
  // and everything downstream just calls sx and sy.
  const sx = useCallback(
    (h: number) => PAD.left + ((h - view.x0) / (view.x1 - view.x0)) * PLOT_W,
    [view]
  );
  const sy = useCallback(
    (v: number) =>
      PAD.top +
      (1 - (lg(v) - lg(view.y0)) / (lg(view.y1) - lg(view.y0))) * PLOT_H,
    [view]
  );

  const shown = useMemo(
    () =>
      countries.filter(
        d => (!region || d.region === region) && (!group || d.group === group)
      ),
    [region, group]
  );
  const inView = useMemo(
    () =>
      shown.filter(
        d =>
          d.hours >= view.x0 &&
          d.hours <= view.x1 &&
          d.income >= view.y0 &&
          d.income <= view.y1
      ),
    [shown, view]
  );

  const point = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * W,
      y: ((e.clientY - r.top) / r.height) * H
    };
  };

  // Hovering picks the nearest dot rather than demanding a direct hit, which is
  // the only way to reach anything inside the crowded band.
  const nearest = (px: number, py: number) => {
    let best: Country | null = null;
    let bestD = 13 * 13;
    for (const d of inView) {
      const dx = sx(d.hours) - px;
      const dy = sy(d.income) - py;
      const q = dx * dx + dy * dy;
      if (q < bestD) {
        bestD = q;
        best = d;
      }
    }
    return best;
  };

  const onDown = (e: React.PointerEvent) => {
    const p = point(e);
    if (e.pointerType !== "mouse") {
      setHovered(nearest(p.x, p.y));
      return;
    }
    drag.current = p;
    setHovered(null);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // A pointer id the browser no longer owns; the drag still works.
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const p = point(e);
    if (!drag.current) {
      setHovered(nearest(p.x, p.y));
      return;
    }
    const s = drag.current;
    setBox({
      x: Math.min(s.x, p.x),
      y: Math.min(s.y, p.y),
      w: Math.abs(p.x - s.x),
      h: Math.abs(p.y - s.y)
    });
  };

  const onUp = () => {
    const b = box;
    drag.current = null;
    setBox(null);
    if (!b || b.w < 12 || b.h < 12) return;
    const hx = (px: number) =>
      view.x0 +
      ((clamp(px, PAD.left, RIGHT) - PAD.left) / PLOT_W) * (view.x1 - view.x0);
    const hy = (py: number) =>
      10 **
      (lg(view.y0) +
        (1 - (clamp(py, PAD.top, BOTTOM) - PAD.top) / PLOT_H) *
          (lg(view.y1) - lg(view.y0)));
    setView({
      x0: hx(b.x),
      x1: hx(b.x + b.w),
      y0: hy(b.y + b.h),
      y1: hy(b.y)
    });
  };

  // The crosshair is clamped to the plot so the quadrant tints stay correct
  // even when the middle country is outside the current view.
  const cx = clamp(sx(MEDIAN_HOURS), PAD.left, RIGHT);
  const cy = clamp(sy(MEDIAN_INCOME), PAD.top, BOTTOM);
  const xs = xTicks(view);
  const ys = yTicks(view);
  const focus = hovered ?? picked;

  // The card is wide enough to bury a third of the plot, so it goes on
  // whichever side of the dot holds fewer countries. A pinned country stays put
  // for a while, which makes the difference worth measuring.
  const flipTooltip = useMemo(() => {
    if (!focus) return false;
    const pct = (sx(focus.hours) / W) * 100;
    if (pct > 62) return true; // no room on the right
    if (pct < 34) return false; // no room on the left
    const left = inView.filter(d => d.hours < focus.hours).length;
    return left < inView.length - left;
  }, [focus, inView, sx]);

  return (
    <Figure>
      <div className="mb-4 border-b border-amber-200/40 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <FigureTitle>The Productivity Paradox</FigureTitle>
            {/* The count follows what is actually on screen, filters and the
                opening trim alike. Claiming 144 while showing 136 would be the
                figure lying about itself. */}
            <p className="mt-0.5 text-xs text-gray-600">
              What a typical person lives on against the hours a typical worker
              puts in, across{" "}
              <span className="tabular-nums">
                {inView.length === countries.length
                  ? countries.length
                  : `${inView.length} of ${countries.length}`}
              </span>{" "}
              countries
            </p>
          </div>

          {/* Both controls always occupy their space, so nothing shifts. */}
          <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
            <Control
              active={view === ALL}
              onClick={() => setView(view === ALL ? TRIMMED : ALL)}
            >
              All data
            </Control>
            <Control
              active={false}
              hidden={!zoomed && !picked && !region && !group}
              onClick={reset}
            >
              Reset
            </Control>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-pan-y select-none"
          role="img"
          aria-label={`Scatter chart of median weekly working hours against median daily income for ${countries.length} countries. The countries whose people work the longest hours are largely the ones with the lowest median income.`}
        >
          <defs>
            <clipPath id="plot-clip">
              <rect x={PAD.left} y={PAD.top} width={PLOT_W} height={PLOT_H} />
            </clipPath>
          </defs>

          {cx > PAD.left && cy > PAD.top && (
            <rect
              x={PAD.left}
              y={PAD.top}
              width={cx - PAD.left}
              height={cy - PAD.top}
              fill="#22c55e"
              fillOpacity={0.07}
            />
          )}
          {cx < RIGHT && cy > PAD.top && (
            <rect
              x={cx}
              y={PAD.top}
              width={RIGHT - cx}
              height={cy - PAD.top}
              fill="#eab308"
              fillOpacity={0.05}
            />
          )}
          {cx > PAD.left && cy < BOTTOM && (
            <rect
              x={PAD.left}
              y={cy}
              width={cx - PAD.left}
              height={BOTTOM - cy}
              fill="#6b7280"
              fillOpacity={0.03}
            />
          )}
          {cx < RIGHT && cy < BOTTOM && (
            <rect
              x={cx}
              y={cy}
              width={RIGHT - cx}
              height={BOTTOM - cy}
              fill="#dc2626"
              fillOpacity={0.07}
            />
          )}

          {xs.map(t => (
            <g key={t}>
              <line
                x1={sx(t)}
                y1={PAD.top}
                x2={sx(t)}
                y2={BOTTOM}
                stroke="#e5e7eb"
                strokeDasharray="3 4"
              />
              <text
                x={sx(t)}
                y={BOTTOM + 15}
                fontSize={9.5}
                fill="#9ca3af"
                textAnchor="middle"
              >
                {t}
              </text>
            </g>
          ))}
          {ys.map(t => (
            <g key={t}>
              <line
                x1={PAD.left}
                y1={sy(t)}
                x2={RIGHT}
                y2={sy(t)}
                stroke="#e5e7eb"
                strokeDasharray="3 4"
              />
              <text
                x={PAD.left - 7}
                y={sy(t) + 3}
                fontSize={9.5}
                fill="#9ca3af"
                textAnchor="end"
              >
                ${t}
              </text>
            </g>
          ))}

          {/* The crosshair is the middle country on each axis, so half the
              dots fall on either side of each line. */}
          {cx > PAD.left && cx < RIGHT && (
            <>
              <line
                x1={cx}
                y1={PAD.top}
                x2={cx}
                y2={BOTTOM}
                stroke="#9ca3af"
                strokeDasharray="2 3"
              />
              <text
                x={cx}
                y={PAD.top - 7}
                fontSize={8.5}
                fill="#6b7280"
                textAnchor="middle"
              >
                median {MEDIAN_HOURS} hrs
              </text>
            </>
          )}
          {cy > PAD.top && cy < BOTTOM && (
            <>
              <line
                x1={PAD.left}
                y1={cy}
                x2={RIGHT}
                y2={cy}
                stroke="#9ca3af"
                strokeDasharray="2 3"
              />
              <text x={PAD.left + 3} y={cy - 5} fontSize={8.5} fill="#6b7280">
                median ${MEDIAN_INCOME.toFixed(2)}/day
              </text>
            </>
          )}

          {cx > PAD.left + 40 && cy > PAD.top + 20 && (
            <text
              x={PAD.left + 8}
              y={PAD.top + 15}
              fontSize={12}
              fontWeight={700}
              fill="#15803d"
            >
              Ideal
            </text>
          )}
          {cx < RIGHT - 40 && cy > PAD.top + 20 && (
            <text
              x={RIGHT - 8}
              y={PAD.top + 15}
              fontSize={11}
              fontWeight={600}
              fill="#a16207"
              textAnchor="end"
            >
              Grind
            </text>
          )}
          {cx > PAD.left + 40 && cy < BOTTOM - 20 && (
            <text x={PAD.left + 8} y={BOTTOM - 8} fontSize={11} fill="#9ca3af">
              Scarce
            </text>
          )}
          {cx < RIGHT - 40 && cy < BOTTOM - 20 && (
            <text
              x={RIGHT - 8}
              y={BOTTOM - 8}
              fontSize={12}
              fontWeight={700}
              fill="#b91c1c"
              textAnchor="end"
            >
              Trap
            </text>
          )}

          <g clipPath="url(#plot-clip)">
            {shown.map((d, i) => (
              <Dot
                key={d.iso}
                d={d}
                i={i}
                x={sx(d.hours)}
                y={sy(d.income)}
                entered={entered}
                picked={picked?.iso === d.iso}
                faded={focus !== null && focus.iso !== d.iso}
                still={!!prefersReducedMotion}
              />
            ))}

            {/* Names live in one layer above every dot. Inside each dot's own
                group their stacking followed array order, so one name would
                sit under a neighbouring dot and the next would sit over it. */}
            {!isMobile &&
              shown
                .filter(d => LABEL[d.iso] || picked?.iso === d.iso)
                .map(d => (
                  <Name
                    key={d.iso}
                    d={d}
                    x={sx(d.hours)}
                    y={sy(d.income)}
                    entered={entered}
                    picked={picked?.iso === d.iso}
                    faded={focus !== null && focus.iso !== d.iso}
                    still={!!prefersReducedMotion}
                  />
                ))}
          </g>

          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 8}
            fontSize={10.5}
            fontWeight={500}
            fill="#4b5563"
            textAnchor="middle"
          >
            Median hours worked per week →
          </text>
          <text
            x={12}
            y={PAD.top + PLOT_H / 2}
            fontSize={10.5}
            fontWeight={500}
            fill="#4b5563"
            textAnchor="middle"
            transform={`rotate(-90 12 ${PAD.top + PLOT_H / 2})`}
          >
            Median income per day →
          </text>

          {box && (
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              fill="#1e1b4b"
              fillOpacity={0.06}
              stroke="#4b5563"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          {/* A zoom and a filter can between them leave the plot blank, which
              otherwise reads as the chart being broken. */}
          {inView.length === 0 && (
            <text
              x={PAD.left + PLOT_W / 2}
              y={PAD.top + PLOT_H / 2}
              fontSize={11}
              fill="#9ca3af"
              textAnchor="middle"
            >
              No countries in this view
            </text>
          )}

          {/* One surface takes every pointer, so dots never steal a drag. */}
          <rect
            x={PAD.left}
            y={PAD.top}
            width={PLOT_W}
            height={PLOT_H}
            fill="transparent"
            className="cursor-crosshair"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={() => !drag.current && setHovered(null)}
          />
        </svg>

        {focus && (
          <Tooltip
            country={focus}
            x={sx(focus.hours)}
            y={sy(focus.income)}
            flip={flipTooltip}
          />
        )}
      </div>

      <div className="mt-3 space-y-1.5 border-t border-amber-200/40 pt-3">
        <div className="flex justify-center">
          <CountrySearch
            picked={picked}
            onPick={pick}
            onClear={() => setPicked(null)}
          />
        </div>
        <Legend label="Region">
          {REGIONS.map(name => (
            <Pill
              key={name}
              dot={REGION_COLOR[name]}
              on={region === name}
              dim={region !== null && region !== name}
              onClick={() => setRegion(region === name ? null : name)}
            >
              {name}
            </Pill>
          ))}
        </Legend>
        <Legend label="Income">
          {BRACKETS.map(g => (
            <Pill
              key={g.id}
              dot={g.spark}
              on={group === g.id}
              dim={group !== null && group !== g.id}
              onClick={() => setGroup(group === g.id ? null : g.id)}
            >
              {g.label}
            </Pill>
          ))}
        </Legend>
      </div>

      {/* The axis titles already say both axes are medians, so this line only
          has to explain the one thing they cannot: the halo. */}
      <p className="mt-2.5 text-balance text-center text-[11px] leading-relaxed text-gray-500">
        The halo is the Gini coefficient: the wider the ring, the more unevenly
        that country splits what it earns.
      </p>

      <div className="mt-3 flex items-start justify-between gap-3 border-t border-amber-200/40 pt-2.5">
        <SourceLine ids={CHART_SOURCES} />

        <ChartNote />
      </div>
    </Figure>
  );
}

function Legend({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
      <span className="mr-0.5 shrink-0 font-mono text-[9px] uppercase tracking-wider text-gray-400">
        {label}
      </span>
      {children}
    </div>
  );
}

function Pill({
  dot,
  on,
  dim,
  onClick,
  children
}: {
  dot: string;
  on: boolean;
  dim: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 ${
        on
          ? "bg-gray-900/[0.07] text-gray-800"
          : dim
            ? "text-gray-400 hover:bg-gray-900/5"
            : "text-gray-500 hover:bg-gray-900/5"
      }`}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full transition-opacity"
        style={{ backgroundColor: dot, opacity: dim ? 0.35 : 1 }}
      />
      {children}
    </button>
  );
}

function Control({
  active,
  hidden,
  onClick,
  children
}: {
  active: boolean;
  hidden?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 ${
        active
          ? "border-gray-500 bg-gray-900 text-white"
          : "border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800"
      } ${hidden ? "pointer-events-none opacity-0" : ""}`}
    >
      {children}
    </button>
  );
}

const dotRadius = (d: Country, picked: boolean) =>
  picked ? 6 : d.highlight ? 5 : 3.5;
const haloRadius = (d: Country, picked: boolean) =>
  dotRadius(d, picked) + 1.5 + spread(d.gini) * 4.5;

// A name sits outside its dot, on the side the LABEL table asks for, unless a
// zoom has pushed the dot near an edge and the name would run off the plot or
// into the quadrant word in that corner. Roughly 5.4px per character at this
// size is close enough to know when to send it the other way.
function Name({
  d,
  x,
  y,
  entered,
  picked,
  faded,
  still
}: {
  d: Country;
  x: number;
  y: number;
  entered: boolean;
  picked: boolean;
  faded: boolean;
  still: boolean;
}) {
  const halo = haloRadius(d, picked);
  const { side: want, dy } = LABEL[d.iso] ?? { side: "left" as const, dy: 3 };
  const wide = d.name.length * 5.4 + halo + 8;
  const side =
    want === "right" && x + wide > RIGHT - 4
      ? "left"
      : want === "left" && x - wide < PAD.left + 4
        ? "right"
        : want;

  return (
    // Two levels, one opacity each. Sharing them would make the hover fade
    // inherit the entry delay and lag by half a second.
    <g
      style={{
        // Waits for the dots to finish arriving, so the names settle onto a
        // finished scatter rather than popping in over a moving one.
        opacity: entered || still ? 1 : 0,
        transition: still ? undefined : "opacity 260ms ease 620ms"
      }}
    >
      <text
        x={x + (side === "right" ? halo + 4 : -halo - 4)}
        y={y + dy}
        fontSize={9.5}
        fontWeight={600}
        fill="#374151"
        textAnchor={side === "right" ? "start" : "end"}
        paintOrder="stroke"
        stroke="white"
        strokeWidth={2.5}
        strokeLinejoin="round"
        style={{
          opacity: faded ? 0.15 : 1,
          transition: still ? undefined : "opacity 150ms ease"
        }}
      >
        {d.name}
      </text>
    </g>
  );
}

// Three nested groups, one property each, because a shared property is how
// dots got stuck half drawn: the outer one carries position so a zoom animates
// as a plain transform, the middle one the entry, the inner one the hover fade.
function Dot({
  d,
  i,
  x,
  y,
  entered,
  picked,
  faded,
  still
}: {
  d: Country;
  i: number;
  x: number;
  y: number;
  entered: boolean;
  picked: boolean;
  faded: boolean;
  still: boolean;
}) {
  const r = dotRadius(d, picked);
  const halo = haloRadius(d, picked);
  const on = entered || still;

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: still
          ? undefined
          : "transform 460ms cubic-bezier(.22,1,.36,1)"
      }}
    >
      <g
        style={{
          transformOrigin: "0px 0px",
          transform: on ? "scale(1)" : "scale(0)",
          opacity: on ? 1 : 0,
          transition: still
            ? undefined
            : `transform 520ms cubic-bezier(.34,1.56,.64,1) ${i * 4}ms, opacity 300ms ease ${i * 4}ms`
        }}
      >
        <g
          style={{
            opacity: faded ? 0.15 : 1,
            transition: "opacity 150ms ease"
          }}
        >
          <circle
            r={halo}
            fill={REGION_COLOR[d.region]}
            fillOpacity={0.1 + spread(d.gini) * 0.11}
          />
          {picked && (
            <circle
              r={halo + 4}
              fill="none"
              stroke={REGION_COLOR[d.region]}
              strokeWidth={1.25}
              strokeDasharray="3 3"
              opacity={0.85}
            />
          )}
          <circle
            r={r}
            fill={REGION_COLOR[d.region]}
            stroke={d.highlight || picked ? "#1e1b4b" : "white"}
            strokeWidth={d.highlight || picked ? 1.5 : 0.75}
            tabIndex={d.highlight ? 0 : undefined}
            aria-label={
              d.highlight
                ? `${d.name}: median ${d.hours} hours a week, median income $${d.income.toFixed(2)} a day, Gini ${d.gini.toFixed(2)}`
                : undefined
            }
          />
        </g>
      </g>
    </g>
  );
}

function Tooltip({
  country,
  x,
  y,
  flip
}: {
  country: Country;
  x: number;
  y: number;
  flip: boolean;
}) {
  const vsIncome = ((country.income - MEDIAN_INCOME) / MEDIAN_INCOME) * 100;
  const vsHours = ((country.hours - MEDIAN_HOURS) / MEDIAN_HOURS) * 100;
  const ref = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState<{ left: number; top: number } | null>(null);

  // The card is measured rather than guessed, because a percentage that clears
  // the edge on a wide screen runs off it on a narrow one.
  useLayoutEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const hw = host.clientWidth;
    const hh = host.clientHeight;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const dotX = (x / W) * hw;
    const dotY = (y / H) * hh;
    const preferred = flip ? dotX - 12 - w : dotX + 12;
    const other = flip ? dotX + 12 : dotX - 12 - w;
    const fits = (l: number) => l >= 4 && l + w <= hw - 4;
    const left = fits(preferred)
      ? preferred
      : fits(other)
        ? other
        : clamp(preferred, 4, Math.max(4, hw - w - 4));
    setAt({ left, top: clamp(dotY - h / 2, 4, Math.max(4, hh - h - 4)) });
  }, [x, y, flip, country]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute z-10 rounded-xl border border-gray-200 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-sm"
      style={{
        left: at?.left ?? 0,
        top: at?.top ?? 0,
        visibility: at ? "visible" : "hidden"
      }}
    >
      <p className="flex items-center gap-1.5 text-sm font-semibold leading-tight text-gray-900">
        <Flag iso2={country.iso2} className="h-4 w-4" />
        {country.name}
      </p>
      {/* Income is an estimate for one shared year, so the card names both that
          year and the survey it rests on. Hours carry their own year. */}
      <p className="mt-1.5 whitespace-nowrap text-[13px] font-semibold tabular-nums text-gray-900">
        ${country.income.toFixed(2)}
        <span className="font-normal text-gray-500"> a day</span>
        <span className="ml-1 text-[10px] font-normal text-gray-400">
          {REFERENCE_YEAR}
        </span>
      </p>
      <p className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-gray-900">
        {country.hours}
        <span className="font-normal text-gray-500"> hrs a week</span>
        <span className="ml-1 text-[10px] font-normal text-gray-400">
          {country.hoursYear}
        </span>
      </p>
      <p className="mt-1 whitespace-nowrap text-[10px] tabular-nums text-gray-400">
        {country.modelled
          ? `income projected from a ${country.surveyYear} survey`
          : `income surveyed in ${country.surveyYear}`}
      </p>
      <p className="mt-1.5 whitespace-nowrap border-t border-gray-100 pt-1.5 text-xs tabular-nums text-gray-500">
        Gini{" "}
        <span className="font-semibold text-gray-700">
          {country.gini.toFixed(2)}
        </span>
        {" · "}
        <span className={vsHours > 0 ? "text-red-600" : "text-green-700"}>
          {vsHours > 0 ? "+" : ""}
          {vsHours.toFixed(0)}% hrs
        </span>
        {" · "}
        <span className={vsIncome < 0 ? "text-red-600" : "text-green-700"}>
          {vsIncome > 0 ? "+" : ""}
          {vsIncome.toFixed(0)}% income
        </span>
      </p>
    </div>
  );
}
