/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{js,ts,jsx,tsx}", // your frontend React files
    "./index.html",                    // if you’re using Vite or plain HTML
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        secondary: "#9333ea", // purple-600
        accent: "#f59e0b",    // amber-500
        dark: "#0f172a",      // slate-900
        light: "#f8fafc",     // slate-50
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("daisyui"), // optional, but ideal if you're using modal/buttons
  ],
  daisyui: {
    themes: [
      "night"
    ],
  },
};
