"use client";

import { useEffect } from "react";

import { showConsoleMessage } from "@/utils/console";

export function ConsoleHelper() {
  useEffect(() => {
    showConsoleMessage();
  }, []);

  return <></>;
}
