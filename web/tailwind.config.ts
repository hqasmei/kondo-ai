import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        kondo: {
          primary: "#2B668E", // Dark blue
          secondary: "#7EC5CE", // Light blue
          accent: "#FFD46E", // Yellow
          light: "#F8F9FA", // Light background
        },
      },
    },
  },
  plugins: [],
};

export default config;
