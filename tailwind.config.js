// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Dark mode colors are now the default
        border: "hsl(217.2 32.6% 17.5%)",
        input: "hsl(217.2 32.6% 17.5%)",
        ring: "hsl(212.7 26.8% 83.9%)",
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        primary: {
          DEFAULT: "hsl(210 40% 98%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        secondary: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(210 40% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(215 20.2% 65.1%)",
        },
        accent: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(210 40% 98%)",
        },
        popover: {
          DEFAULT: "hsl(222.2 84% 4.9%)",
          foreground: "hsl(210 40% 98%)",
        },
        card: {
          DEFAULT: "hsl(222.2 84% 4.9%)",
          foreground: "hsl(210 40% 98%)",
        },
        // Your other custom colors remain the same
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
      animation: {
        progressBar: 'progressBar 2s ease-in-out infinite',
      },
      keyframes: {
        progressBar: {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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