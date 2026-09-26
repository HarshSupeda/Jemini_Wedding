import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f2d8dc",
        cream: "#f8f1e7",
        champagne: "#d0ad82",
        ink: "#544c49",
        sage: "#9caa93",
        rose: "#b97883",
      },
      fontFamily: {
        display: ["var(--font-cormorant)"],
        script: ["var(--font-cormorant)"],
        serif: ["var(--font-cormorant)"],
      },
      boxShadow: {
        paper: "0 30px 80px rgba(72, 45, 44, .16)",
        wax: "0 7px 16px rgba(70, 48, 39, .18), inset 0 1px 2px rgba(255,255,255,.28)",
      },
    },
  },
  plugins: [],
};

export default config;
