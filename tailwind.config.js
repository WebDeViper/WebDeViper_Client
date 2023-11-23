/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3fafc',
          100: '#e7f5f9',
          200: '#c7e4f5',
          300: '#a7d2f0',
          400: '#67afe0',
          500: '#2299cc',
          600: '#1f87b2',
          700: '#1a718f',
          800: '#165c6c',
          900: '#134c5a',
        },
        semi_primary: '#bce3ef',
        secondary: '#bfd9ff',
        danger: '#e74c3c',
      },
      screens: {
        lg: '1200px',
        md: '768px',
        sm: '640px',
      },
      container: {
        screens: {
          lg: '1200px',
          md: '768px',
          sm: '640px',
        },
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '0',
        },
      },
    },
  },
  plugins: [],
};
