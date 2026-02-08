/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-blue-600",
    "bg-ttw-aws",
  ],
  theme: {
    extend: {
      colors: {
        ttw: {
          orange: '#ff8c00',
          blue: '#0060c3',
          navy: '#072b39',
          fuchsia: '#e70059',
          pink: '#ff69c7',
          aws: '#094F66',
        },
      },
      fontFamily: {
        text: ['"Stack Sans Text"', 'system-ui', 'sans-serif'],
        headline: ['"Stack Sans Headline"', '"Stack Sans Text"', 'system-ui', 'sans-serif'],
        notch: ['"Stack Sans Notch"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
