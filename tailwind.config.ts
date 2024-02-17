import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

import { createFluidValue } from "./utils/fluidTypes";

const disabledCss = {
  "code::before": false,
  "code::after": false,
  "blockquote p:first-of-type::before": false,
  "blockquote p:last-of-type::after": false,
  pre: false,
  code: false,
  "pre code": false
};

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"]
      },
      fontSize: {
        "text-xs": createFluidValue(12, 14),
        "text-sm": createFluidValue(14, 16),
        "text-base": createFluidValue(16, 18),
        "text-lg": createFluidValue(18, 20),
        "text-xl": createFluidValue(20, 24),
        "text-2xl": createFluidValue(24, 28),
        "text-3xl": createFluidValue(28, 32)
      },
      animation: {
        "slide-in-top": "slide-in-top 0.6s ease-out",
        marquee: "marquee 60s linear infinite",
        marquee2: "marquee2 60s linear infinite"
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(100%)", opacity: "0.1" },
          "15%": { transform: "translateY(0)", opacity: "1" },
          "30%": { transform: "translateY(0)", opacity: "1" },
          "45%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0.1" }
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" }
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" }
        }
      },
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        "2xl": { css: disabledCss }
      }
    }
  },
  safelist: ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"],
  plugins: [formsPlugin, typographyPlugin]
};

export default config;
