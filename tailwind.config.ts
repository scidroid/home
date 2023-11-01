import type { Config } from "tailwindcss";

import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import { createFluidValue } from "./utils/fluidTypes";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      fontSize: {
        "text-xs": createFluidValue(12, 14),
        "text-sm": createFluidValue(14, 16),
        "text-base": createFluidValue(16, 18),
        "text-lg": createFluidValue(18, 20),
        "text-xl": createFluidValue(20, 24),
        "text-2xl": createFluidValue(24, 28),
        "text-3xl": createFluidValue(28, 32),
      },
      animation: {
        slide: "slide 2.5s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(100%)", opacity: "0.1" },
          "15%": { transform: "translateY(0)", opacity: "1" },
          "30%": { transform: "translateY(0)", opacity: "1" },
          "45%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0.1" },
        },
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

export default config;
