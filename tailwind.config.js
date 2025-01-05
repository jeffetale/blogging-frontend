// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      lg: { max: "1440px" },
      md: { max: "1050px" },
      sm: { max: "550px" },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        amber: { 900: "var(--amber-900)" },
        black: {
          900: "var(--black-900)",
          "900-33": "var(--black-900-33)",
          "900-77": "var(--black-900-77)",
        },
        deep_orange: { a200: "var(--deep_orange-a200)" },
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          400: "var(--gray-400)",
          600: "var(--gray-600)",
        },
        white: {
          a700: "var(--white-a700)",
          "a700-00": "var(--white-a700-00)",
        },
      },
      boxShadow: {
        xs: "0 4px 7px 0 #00000033",
        bs4: "inset 0 6.74px 6px 0 #00000077",
        bs5: "inset 0 6px 6px 0 #00000077",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
