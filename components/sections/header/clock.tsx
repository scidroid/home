"use client";

import { useEffect, useState } from "react";

export function Clock() {
  function getLocalTime() {
    return new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles"
    });
  }

  const [time, setTime] = useState(getLocalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="sm:text-xl text-neutral-700" suppressHydrationWarning>
      {time} in SF
    </span>
  );
}
