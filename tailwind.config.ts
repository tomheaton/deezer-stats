import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deezer-purple": "#A238FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
