/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-surface', 'bg-card', 'text-ink', 'text-primary', 'text-slate-500', 'text-slate-600',
    'bg-primary', 'bg-secondary', 'border-slate-200', 'shadow-soft',
    'bg-primary-dark', 'bg-accent/15', 'text-accent-dark', 'border-accent/50',
  ],
  theme: {
    extend: {
      colors: {
        /* Dark Indigo + Soft Gray palette */
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          light: '#6366F1',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#8B5CF6',
        },
        surface: '#F1F5F9',   /* Soft Gray - background */
        card: '#FFFFFF',      /* Card / form background */
        ink: '#020617',       /* Primary text - Slate */
        accent: {
          DEFAULT: '#22D3EE', /* Cyan - icons, active states, small highlights only */
          light: '#67E8F9',
          dark: '#06B6D4',
        },
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
}
