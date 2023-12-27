/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/types/**/*.{ts}'],
  theme: {
    extend: {
      colors: {
        alpha: {
          100: 'rgb(var(--color-100) / <alpha-value>)',
          200: 'rgb(var(--color-200) / <alpha-value>)',
          300: 'rgb(var(--color-300) / <alpha-value>)',
          400: 'rgb(var(--color-400) / <alpha-value>)',
          500: 'rgb(var(--color-500) / <alpha-value>)',
          600: 'rgb(var(--color-600) / <alpha-value>)',
          700: 'rgb(var(--color-700) / <alpha-value>)',
          800: 'rgb(var(--color-800) / <alpha-value>)',
          900: 'rgb(var(--color-900) / <alpha-value>)'
        } // https://coolors.co/73eedc-73c2be-776885-5f1a37-04030f
      },
      borderWidth: {
        3: '3px'
      },
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
}
