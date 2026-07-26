"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "@/components/sections/projects/animations/pulpoo.module.css";

type Client = {
  id: string;
  name: string;
  company: string;
  city: string;
  status: string;
};

const CLIENTS: Client[] = [
  {
    id: "northstar",
    name: "Ariana Costa",
    company: "Northstar Dental",
    city: "Bogota",
    status: "Renewal in 4 days"
  },
  {
    id: "soluna",
    name: "Mateo Rojas",
    company: "Soluna Logistics",
    city: "Medellin",
    status: "18 days no reply"
  },
  {
    id: "atlas",
    name: "Daniel Kim",
    company: "Atlas Care",
    city: "San Francisco",
    status: "Renewal in 6 days"
  },
  {
    id: "lumina",
    name: "Julian Park",
    company: "Lumina Health",
    city: "Mexico City",
    status: "Renewal in 3 days"
  }
];

const MATCH_IDS = ["northstar", "atlas", "lumina"];
const QUERY = "Find clients due for renewal this week";
const TOTAL_TICKS = 36;

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={styles.icon}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function phaseForTick(tick: number) {
  if (tick < 10) {
    return {
      stage: "Query",
      caption: "Which accounts need attention?",
      queryText: QUERY.slice(
        0,
        Math.max(1, Math.round(QUERY.length * (tick / 9)))
      ),
      searchProgress: 0,
      matchesVisible: 0,
      sentCount: 0
    };
  }

  if (tick < 18) {
    return {
      stage: "Search",
      caption: "Searching client database\u2026",
      queryText: QUERY,
      searchProgress: (tick - 10) / 7,
      matchesVisible: 0,
      sentCount: 0
    };
  }

  if (tick < 27) {
    return {
      stage: "Match",
      caption: "3 clients need renewal follow-up",
      queryText: QUERY,
      searchProgress: 1,
      matchesVisible: Math.min(MATCH_IDS.length, tick - 17),
      sentCount: 0
    };
  }

  return {
    stage: "Sent",
    caption: "3 follow-ups drafted and sent",
    queryText: QUERY,
    searchProgress: 1,
    matchesVisible: MATCH_IDS.length,
    sentCount: Math.min(MATCH_IDS.length, tick - 26)
  };
}

export function PulpooAnimation() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick(current => (current + 1) % TOTAL_TICKS);
    }, 200);

    return () => window.clearInterval(interval);
  }, []);

  const phase = phaseForTick(tick);

  const visibleMatchIds = useMemo(
    () => new Set(MATCH_IDS.slice(0, phase.matchesVisible)),
    [phase.matchesVisible]
  );

  const sentIds = useMemo(
    () => new Set(MATCH_IDS.slice(0, phase.sentCount)),
    [phase.sentCount]
  );

  return (
    <div
      className={styles.frame}
      role="img"
      aria-label="Pulpoo client search and outreach animation"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.title}>Pulpoo</p>
          <p className={styles.subtitle}>{phase.caption}</p>
        </div>
        <div className={styles.stage}>{phase.stage}</div>
      </div>

      <div className={styles.queryBar}>
        <span className={styles.queryIcon}>
          <SearchIcon />
        </span>
        <span className={styles.queryText}>
          {phase.queryText}
          {phase.stage === "Query" && <span className={styles.cursor} />}
        </span>
      </div>

      <div className={styles.list}>
        {phase.stage === "Search" && (
          <div
            className={styles.scanBeam}
            style={{ top: `${phase.searchProgress * 100}%` }}
          />
        )}

        {CLIENTS.map(client => {
          const matched = visibleMatchIds.has(client.id);
          const sent = sentIds.has(client.id);
          const dimmed =
            phase.matchesVisible > 0 && !MATCH_IDS.includes(client.id);

          return (
            <div
              key={client.id}
              className={`${styles.row} ${matched ? styles.rowMatched : ""} ${
                dimmed ? styles.rowDimmed : ""
              }`}
            >
              <div className={styles.rowLeft}>
                <div className={styles.avatar}>
                  {client.name
                    .split(" ")
                    .map(p => p[0])
                    .join("")}
                </div>
                <div className={styles.rowText}>
                  <div className={styles.rowName}>{client.company}</div>
                  <div className={styles.rowMeta}>
                    {client.name} · {client.city}
                  </div>
                </div>
              </div>
              <div className={styles.rowRight}>
                {sent ? (
                  <span className={styles.sentBadge}>Sent ✓</span>
                ) : (
                  <span className={styles.rowStatus}>{client.status}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
