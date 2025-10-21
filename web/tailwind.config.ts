import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#1D9BF0",
          soft: "#4B8DF8"
        },
        surface: {
          dark: "#05070a",
          light: "#F7F9F9"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(29,155,240,0.25)",
        glow: "0 15px 60px rgba(29,155,240,0.35)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(29,155,240,0.35), transparent 55%)",
        "mesh-dark": "radial-gradient(circle at 20% 20%, rgba(29,155,240,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(75,141,248,0.2), transparent 55%)",
        "dot-grid": "radial-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px)",
        "line-grid": "linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(180deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px)"
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-55%, -55%) scale(1.18)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" }
        }
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "pulse-soft": "pulse-soft 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
