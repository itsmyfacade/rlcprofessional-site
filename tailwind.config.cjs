/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F4F7F6",
          100: "#E9EFEE",
          200: "#D5E0DE",
          300: "#B2C6C2",
          400: "#7FA39C",
          500: "#4E7B72",
          600: "#2F5A52",
          700: "#23453F",
          800: "#1B3531",
          900: "#1A2B3C"
        },
        accent: {
          50: "#FFF2E8",
          100: "#FFE0C8",
          200: "#FFC089",
          300: "#FFA04B",
          400: "#F28B2E",
          500: "#E67E22",
          600: "#D46F16",
          700: "#B85E10",
          800: "#944A0C",
          900: "#6B3508"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 8, 23, 0.10)"
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      }
    }
  },
  plugins: []
};