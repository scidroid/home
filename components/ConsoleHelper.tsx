"use client";

import { showConsoleMessage } from "@/utils/console";
import { useEffect } from "react";

export function ConsoleHelper() {
  useEffect(() => {
    showConsoleMessage();
  }, []);

  return <></>;
}
