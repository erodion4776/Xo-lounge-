import type { Config } from 'tailwindcss';

const config: Config = {
  // Tell Tailwind where to look for class names
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Define the custom color palette
      colors: {
        'dark-bg': '#121212', // Deep Dark Background
        'dark-card': '#1e1e1e', // Slightly lighter Dark for cards/containers
        'gold-accent': '#FFD700', // Primary Gold (The vibrant highlight)
        'gold-light': '#FFFACD', // Light Gold (For main text on dark background)
        'gold-dark': '#B8860B', // Darker Gold (For borders/subtle accents)
      },
      // You can also extend other utilities like spacing, font-size, etc.
    },
  },
  // Plugins are not needed for this project
  plugins: [],
};

export default config;
