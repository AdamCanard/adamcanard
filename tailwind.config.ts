import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FEFEFE",
        primary: "#FFF8E9",
        secondary: "#FFDA86",
        text: "#131D4E",
        accent: "#E01828",
      },
      animation: {
        crawl: "crawl 40s linear forwards",
      },
    },
  },
  plugins: [],
};
export default config;
