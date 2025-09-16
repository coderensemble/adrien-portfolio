/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        title: ["var(--font-title)", "serif"],
      },
    },
    colors: {
      bg: "var(--color-bg)",
      text: "var(--color-text)",
      accent: "var(--color-accent)",
      card: {
        bg: "var(--color-card-bg)",
        border: "var(--color-card-border)",
      },
    },
  },
  plugins: [],
};
