/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Fondo principal
        textPrimary: "#FFFFFF", // Texto principal
        accentPurple: "#8f2bf9", // Morado (non-fungible)
        accentYellow: "#FFD700", // Amarillo (Login)
        accentGreen: "#00FF00", // Verde (Create account)
        accentRed: "#FF0000", // Rojo (#texisnotforyou)
        accentblue: "#2f6dc4", // Rojo (#texisnotforyou)
      },
    },
  },
  plugins: [],
};
