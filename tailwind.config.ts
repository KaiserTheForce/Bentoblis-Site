/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF5EA", // fond crème
        latte: "#F7EDE2", // variante fond
        blush: "#E7B7B2", // rose poudré
        cocoa: "#5A3A2E", // chocolat (titres/cta)
        strawberry: "#E85D6E", // accent fraise
      },
      borderRadius: {
        soft: "14px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
