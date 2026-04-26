/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-yellow": "#FFD700",
        "primary-blue": "#1E3A8A",
        "secondary-yellow": "#FBBF24",
        "secondary-blue": "#3B82F6",
        "accent-gold": "#D4AF37",
        "dark-blue": "#0F172A",
        "pure-yellow": "#ffff00",
      },
    },
  },
  plugins: [],
};
