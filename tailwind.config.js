/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, premium textile palette
        sand: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e7d9c4',
          300: '#d8c1a0',
          400: '#c5a273',
          500: '#b5895a',
        },
        ink: {
          DEFAULT: '#1c1a17',
          soft: '#2a2722',
          muted: '#6b6259',
        },
        gold: {
          DEFAULT: '#a8854e',
          light: '#c2a26a',
        },
        olive: '#5a5640',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        arabic: ['"Tajawal"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(28, 26, 23, 0.25)',
        card: '0 10px 40px -12px rgba(28, 26, 23, 0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
