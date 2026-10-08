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
        primary: {
          DEFAULT: "#D71920",
          hover: "#B51218",
          light: "#FDEBEC",
        },
        dark: "#171717",
        secondary: "#6B7280",
        surface: "#F5F5F5",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "sans-serif"],
        chinese: ["Noto Sans SC", "Microsoft YaHei", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        floating: "0 10px 40px -10px rgba(215, 25, 32, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
