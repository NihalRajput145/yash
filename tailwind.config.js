/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#0a0a0a',
          pure: '#000000',
          rich: '#0e0e0d',
          soft: '#161614',
          subtle: '#22211e'
        },
        charcoal: {
          DEFAULT: '#2a2826',
          light: '#3e3b38',
          deep: '#1c1b19'
        },
        stone: {
          50: '#faf8f5',
          100: '#f5f2eb',
          200: '#e8e4da',
          300: '#d5cfc2',
          400: '#aba392',
          500: '#867e6c',
          600: '#675f4f',
          700: '#4e483b',
          800: '#343027',
          900: '#1d1b16',
        },
        cream: {
          DEFAULT: '#f7f5ef',
          warm: '#fbf9f4',
          muted: '#eeebe2',
          card: '#f4f1e9',
        },
        gold: {
          accent: '#bfa16f',
          subtle: '#dfd2bc',
          muted: '#9e8457'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', '"Bodoni MT"', 'Georgia', 'serif'],
        display: ['"Italiana"', '"Cormorant Garamond"', 'Didot', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.24em',
        'editorial': '0.18em',
        'ultra': '0.35em',
        'loose-caps': '0.2em'
      },
      fontSize: {
        '2xs': '0.65rem',
        'xs-caps': ['0.7rem', { letterSpacing: '0.2em', textTransform: 'uppercase' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg': ['5rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-xl': ['6.5rem', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'luxury-slow': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
      }
    },
  },
  plugins: [],
}
