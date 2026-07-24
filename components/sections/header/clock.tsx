"use client";

import { useEffect, useState } from "react";

export function Clock() {
  function getLocalTime() {
    return new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo"
    });
  }

  const [time, setTime] = useState(getLocalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [hours, minutes] = time.split(":");

  return (
    <span
      className="hidden sm:inline font-mono text-sm tabular-nums text-gray-600 mr-1"
      suppressHydrationWarning
    >
      {hours}
      <span className="clock-colon" aria-hidden="true">
        :
      </span>
      <span className="sr-only">:</span>
      {minutes} in TYO
    </span>
  );
}
