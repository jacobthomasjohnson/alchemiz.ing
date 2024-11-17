/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animationTimingFunction: {
        // Common easing functions
        'ease-linear': 'linear',
        'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
        'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',

        // Custom curves for natural movement
        'ease-smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'ease-accelerate': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'ease-decelerate': 'cubic-bezier(0.215, 0.61, 0.355, 1)',

        // Bouncy animations
        'bounce-in': 'cubic-bezier(0.55, -0.3, 0.675, 0.19)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'bounce-in-out': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

        // Elastic effects
        'elastic-in': 'cubic-bezier(0.7, -0.4, 0.8, 1.6)',
        'elastic-out': 'cubic-bezier(0.2, -0.8, 0.2, 1)',
        'elastic-in-out': 'cubic-bezier(0.87, -0.41, 0.19, 1.44)',

        // Slow start with fast end
        'slow-fast': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',

        // Fast start with slow end
        'fast-slow': 'cubic-bezier(0.075, 0.82, 0.165, 1)',

        // Snap-like motion
        'snap-start': 'cubic-bezier(0.5, 0, 0.75, -0.5)',
        'snap-end': 'cubic-bezier(0.25, 1.5, 0.5, 1)',

        // Dramatic effects
        'dramatic': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'dramatic-slow': 'cubic-bezier(0.25, 1.75, 0.75, -0.75)',
      },
    },
  },
  plugins: [],
};
