import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        brand: {
          purple: {
            DEFAULT: "#453875",
            dark: "#2d244c",
          },
          mint: {
            DEFAULT: "#34aca6",
            light: "#4bdcd5",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
