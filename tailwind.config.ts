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
        background:
          "linear-gradient(135deg, var(--background) 51%, var(--background2) 100%)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
