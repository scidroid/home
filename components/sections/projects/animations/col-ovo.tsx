"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import styles from "@/components/animations/col-ovo.module.css";

const EGG_COUNT = 67;
const TOTAL_TICKS = 44;

function phaseForTick(tick: number) {
  if (tick < 10) {
    return {
      label: "Capture",
      caption: "Ovitrap strip collected from the field",
      image: "strip" as const,
      count: 0,
      confidence: "\u2014",
      status: "Smartphone camera"
    };
  }

  if (tick < 20) {
    return {
      label: "Zoom",
      caption: "Zooming into the oviposition substrate",
      image: "zoom" as const,
      count: 0,
      confidence: "\u2014",
      status: "Inspecting"
    };
  }

  if (tick < 36) {
    const progress = tick - 20;
    const count = Math.min(EGG_COUNT, Math.round((progress / 15) * EGG_COUNT));

    return {
      label: "Detect",
      caption: "Col-Ovo detecting Aedes aegypti eggs",
      image: "detect" as const,
      count,
      confidence: `${88 + Math.min(Math.round(progress * 0.6), 9)}%`,
      status: "Processing"
    };
  }

  return {
    label: "Report",
    caption: `${EGG_COUNT} eggs counted in seconds`,
    image: "detect" as const,
    count: EGG_COUNT,
    confidence: "97%",
    status: "Complete"
  };
}

export function ColOvoAnimation() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick(current => (current + 1) % TOTAL_TICKS);
    }, 200);

    return () => window.clearInterval(interval);
  }, []);

  const phase = phaseForTick(tick);

  const showStrip = phase.image === "strip";
  const showZoom = phase.image !== "strip";
  const showDetect = phase.image === "detect";

  return (
    <div
      className={styles.frame}
      role="img"
      aria-label="Col-Ovo mosquito egg detection animation"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.title}>Col-Ovo</p>
          <p className={styles.subtitle}>{phase.caption}</p>
        </div>
        <div className={styles.badge}>{phase.label}</div>
      </div>

      <div className={styles.visuals}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/colovo/colovo-strip.webp"
            alt="Full ovitrap strip"
            fill
            sizes="300px"
            className={`${styles.slide} ${showStrip ? styles.slideVisible : ""}`}
            style={{ objectFit: "cover" }}
            priority
          />
          <Image
            src="/images/colovo/colovo-0.webp"
            alt="Zoomed view of ovitrap strip"
            fill
            sizes="300px"
            className={`${styles.slide} ${showZoom ? styles.slideVisible : ""}`}
            style={{ objectFit: "cover" }}
          />
          <Image
            src="/images/colovo/colovo-1.webp"
            alt="AI detection results with eggs marked"
            fill
            sizes="300px"
            className={`${styles.slide} ${showDetect ? styles.slideVisible : ""}`}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.panel}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Eggs</span>
            <span className={styles.metricValue}>{phase.count}</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Confidence</span>
            <span className={styles.metricValueSmall}>{phase.confidence}</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Status</span>
            <span className={styles.status}>{phase.status}</span>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{
                width: `${(phase.count / EGG_COUNT) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
