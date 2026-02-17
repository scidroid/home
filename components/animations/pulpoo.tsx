"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import styles from "./pulpoo.module.css";

const COLS = 7;
const ROWS = 3;
const TOTAL = COLS * ROWS;
const SIGNAL_COUNT = 3;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function scoreToColor(score: number): string {
  const stops: [number, number, number][] = [
    [239, 68, 68],
    [249, 115, 22],
    [234, 179, 8],
    [132, 204, 22],
    [34, 197, 94]
  ];
  const t = score * (stops.length - 1);
  const i = Math.min(Math.floor(t), stops.length - 2);
  const f = t - i;

  return `rgb(${Math.round(lerp(stops[i][0], stops[i + 1][0], f))},${Math.round(lerp(stops[i][1], stops[i + 1][1], f))},${Math.round(lerp(stops[i][2], stops[i + 1][2], f))})`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

type Phase = "idle" | "scan" | "reveal" | "fade-out";
type Shape = "person" | "car" | "doc";

const QUESTIONS: { shape: Shape; question: string; result: string }[] = [
  {
    shape: "person",
    question: "Who's best to create a presentation?",
    result: "Pulpoo found your top picks"
  },
  {
    shape: "car",
    question: "Which clients need a service?",
    result: "Pulpoo surfaced 3 matches"
  },
  {
    shape: "doc",
    question: "Which reports need a review?",
    result: "Pulpoo flagged 3 for review"
  }
];

function PersonSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className="w-full h-full">
      <circle cx="8" cy="3.5" r="2.5" />
      <path d="M5 16V12.5C5 10 6 9 8 9s3 1 3 3.5V16z" />
    </svg>
  );
}

function CarSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 14" fill={color} className="w-full h-full">
      <rect x="1" y="5" width="18" height="5.5" rx="2" />
      <path d="M5 5L7.5 1H12.5L15 5" />
      <circle cx="5" cy="11.5" r="1.5" opacity="0.7" />
      <circle cx="15" cy="11.5" r="1.5" opacity="0.7" />
    </svg>
  );
}

function StarSVG() {
  return (
    <svg viewBox="0 0 16 16" fill="#F59E0B" className="w-full h-full">
      <path d="M8 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L8 12.2l-4.8 2.4.9-5.3L.3 5.6l5.3-.8z" />
    </svg>
  );
}

function BubbleSVG() {
  return (
    <svg
      viewBox="0 0 12 11"
      fill="rgba(139,92,246,0.85)"
      className="w-full h-full"
    >
      <rect x="1" y="0.5" width="10" height="7" rx="1.5" />
      <polygon points="3,7.5 2,10.5 5.5,7.5" />
    </svg>
  );
}

function DocSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 14 18" fill={color} className="w-full h-full">
      <path d="M2 0h7l5 5v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
      <path d="M9 0v3a2 2 0 0 0 2 2h3" opacity="0.5" />
      <rect x="3" y="8" width="8" height="1.2" rx="0.6" opacity="0.4" />
      <rect x="3" y="11" width="5.5" height="1.2" rx="0.6" opacity="0.4" />
    </svg>
  );
}

function CheckSVG() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
      <circle cx="8" cy="8" r="7" fill="#22c55e" />
      <path
        d="M5 8.5l2 2 4-4.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CELL_W = 100 / COLS;
const CELL_H = 100 / ROWS;
const SCAN_STEP = Math.round(1600 / COLS);

export function PulpooAnimation() {
  const running = useRef(false);

  const [dots] = useState(() =>
    Array.from({ length: TOTAL }, (_, i) => ({
      id: i,
      score: Math.random()
    }))
  );

  const signalSet = useMemo(() => {
    const sorted = dots
      .map((d, i) => ({ score: d.score, idx: i }))
      .sort((a, b) => b.score - a.score);
    return new Set(sorted.slice(0, SIGNAL_COUNT).map(s => s.idx));
  }, [dots]);

  const signalOrder = useMemo(() => {
    const sorted = dots
      .map((d, i) => ({ score: d.score, idx: i }))
      .sort((a, b) => b.score - a.score);
    const map = new Map<number, number>();
    sorted.slice(0, SIGNAL_COUNT).forEach((s, rank) => map.set(s.idx, rank));
    return map;
  }, [dots]);

  const [phase, setPhase] = useState<Phase>("idle");
  const [scanCol, setScanCol] = useState(-1);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [caption, setCaption] = useState("");
  const [captionVisible, setCaptionVisible] = useState(false);

  const currentQ = QUESTIONS[questionIdx % QUESTIONS.length];

  const handleAsk = useCallback(async () => {
    if (running.current) return;
    running.current = true;

    const q = QUESTIONS[questionIdx % QUESTIONS.length];

    // Scan
    setPhase("scan");
    setCaption("Pulpoo is analyzing...");
    setCaptionVisible(true);
    setScanCol(-1);
    await sleep(50);
    for (let c = 0; c <= COLS; c++) {
      setScanCol(c);
      await sleep(SCAN_STEP);
    }

    // Reveal
    setPhase("reveal");
    setCaption(q.result);
    await sleep(3000);

    // Fade out
    setPhase("fade-out");
    setCaptionVisible(false);
    await sleep(700);

    // Reset to idle with next question
    setQuestionIdx(prev => prev + 1);
    setPhase("idle");
    setScanCol(-1);
    setCaption("");
    running.current = false;
  }, [questionIdx]);

  const scanning = phase === "scan";
  const colored = phase === "scan" || phase === "reveal";
  const revealing = phase === "reveal";
  const idle = phase === "idle";
  const fading = phase === "fade-out";

  return (
    <div>
      {/* Grid */}
      <div
        className={styles.container}
        aria-hidden
        style={{ opacity: fading ? 0 : 1 }}
      >
        {/* Scan beam */}
        {scanning && scanCol >= 0 && (
          <div
            className={styles.scanBeam}
            style={{
              left: `${((scanCol + 0.5) / COLS) * 100}%`,
              transition: `left ${SCAN_STEP}ms linear`
            }}
          />
        )}

        {/* Items */}
        {dots.map(dot => {
          const gCol = dot.id % COLS;
          const gRow = Math.floor(dot.id / COLS);
          const isSignal = signalSet.has(dot.id);

          const revealed = colored && (!scanning || gCol < scanCol);
          const color = revealed ? scoreToColor(dot.score) : "#d4d4d8";

          const shape = currentQ.shape;
          const itemW =
            shape === "car"
              ? CELL_W * 0.7
              : shape === "doc"
                ? CELL_W * 0.5
                : CELL_W * 0.55;
          const itemH =
            shape === "car"
              ? CELL_H * 0.55
              : shape === "doc"
                ? CELL_H * 0.7
                : CELL_H * 0.6;
          const offsetX = (CELL_W - itemW) / 2;
          const offsetY = (CELL_H - itemH) / 2;

          const isNoise = revealing && !isSignal;
          const isSignalRevealed = revealing && isSignal;

          const ShapeComponent =
            shape === "car" ? CarSVG : shape === "doc" ? DocSVG : PersonSVG;

          return (
            <div
              key={dot.id}
              className={`${styles.item} ${isSignalRevealed ? styles.signal : ""}`}
              style={{
                width: `${itemW}%`,
                height: `${itemH}%`,
                left: `${gCol * CELL_W + offsetX}%`,
                top: `${gRow * CELL_H + offsetY}%`,
                transform: `scale(${isSignalRevealed ? 1.25 : 1})`,
                opacity: isNoise ? 0.12 : 1
              }}
            >
              <ShapeComponent color={color} />
            </div>
          );
        })}

        {/* Badges on signal items during reveal */}
        {revealing &&
          dots
            .filter(dot => signalSet.has(dot.id))
            .map(dot => {
              const gCol = dot.id % COLS;
              const gRow = Math.floor(dot.id / COLS);
              const rank = signalOrder.get(dot.id) ?? 0;
              const shape = currentQ.shape;

              const badgeW = CELL_W * 0.35;
              const badgeH = CELL_H * 0.35;

              const BadgeIcon =
                shape === "car"
                  ? BubbleSVG
                  : shape === "doc"
                    ? CheckSVG
                    : StarSVG;
              const badgeClass = shape === "car" ? styles.bubble : styles.badge;
              const badgeDelay = shape === "car" ? rank * 200 : rank * 150;

              return (
                <div
                  key={`badge-${dot.id}`}
                  className={badgeClass}
                  style={{
                    width: `${badgeW}%`,
                    height: `${badgeH}%`,
                    left: `${gCol * CELL_W + CELL_W * 0.6}%`,
                    top: `${gRow * CELL_H - CELL_H * 0.05}%`,
                    animationDelay: `${badgeDelay}ms`
                  }}
                >
                  <BadgeIcon />
                </div>
              );
            })}
      </div>

      {/* Caption / Button area */}
      <div className={styles.footer}>
        {idle ? (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleAsk();
            }}
            className={styles.askButton}
          >
            {currentQ.question}
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.askArrow}
            >
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </button>
        ) : (
          <p
            className={styles.caption}
            style={{ opacity: captionVisible ? 1 : 0 }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
