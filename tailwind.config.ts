import type { Config } from "tailwindcss";

// Cores e fontes do Guia de Identidade Visual do Comunica +
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        azul: "#051533",
        gelo: "#EEF0F2",
        dourado: "#C9A265",
        ouro: "#B58A4A",
        papel: "#F4F2EC",
        cinza: "#5F5E5A",
      },
      fontFamily: {
        serif: ["var(--font-tinos)", "Times New Roman", "serif"],
        sans: ["var(--font-arimo)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;