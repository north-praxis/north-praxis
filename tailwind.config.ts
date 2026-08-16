import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#080F1D',
        deep: '#0F1D33',
        slate: '#2C4A6E',
        mid: '#56708E',
        mist: '#B9CBE0',
        pale: '#EDF1F6',
        paper: '#F8FAFC',
        star: '#D8A75B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'night-wash':
          'linear-gradient(172deg, #020308 0%, #070A1A 30%, #0E1232 62%, #1C1E4E 88%, #2B2960 100%)',
        'mist-wash':
          'linear-gradient(180deg, #F8FAFC 0%, #EDF1F6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
