"use client";

import { useEffect, useState } from "react";

export function Clock() {
  function getColombianHour() {
    return new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Bogota"
    });
  }

  const [time, setTime] = useState(getColombianHour);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getColombianHour());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-xl text-neutral-700" suppressHydrationWarning>{time}</span>;
}
