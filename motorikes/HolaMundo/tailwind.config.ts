import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08060F",
        surface: "#15121B",
        'surface-dim': "#0E0A1C",
        'surface-container': "#211E29",
        'surface-container-high': "#2C2833",
        'surface-container-highest': "#37333E",
        'surface-glass': "rgba(18, 16, 42, 0.4)",
        primary: "#D2BBFF",
        'primary-container': "#7C3AED",
        'inverse-primary': "#732EE4",
        'on-primary': "#3F008E",
        secondary: "#CEBDFF",
        'secondary-container': "#4F319C",
        'on-surface': "#E8DFEE",
        'on-surface-variant': "#CCC3D8",
        outline: "#958DA1",
        'outline-variant': "#4A4455",
        'border-hairline': "rgba(149, 141, 161, 0.2)",
        'border-white-faint': "rgba(255, 255, 255, 0.05)",
        error: "#FFB4AB",
        'on-error': "#690005",
        // Additional brand accents (informative)
        'kawasaki-accent': "#39FF14",
        'honda-accent': "#CC0000",
        'yamaha-accent': "#003087",
        'suzuki-accent': "#E8840B",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      borderRadius: {
        'default': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '0.75rem',
      },
      spacing: {
        'gutter': '32px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        'section-gap': '160px',
      },
      maxWidth: {
        'container-max': '1440px',
      }
    },
  },
  plugins: [],
} satisfies Config;
