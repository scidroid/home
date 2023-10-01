import type { Config } from "tailwindcss";

import formsPlugin from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-main)"],
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
